<!--#include virtual="/include/common.asp"-->
<!-- #include file="json2.asp" -->
<!-- #include file="JSON_2.0.4.asp" -->
<!-- #include file="JSON_UTIL_0.1.1.asp" -->
<!--METADATA TYPE="Typelib" NAME="ADODB Type Library"
	FILE="C:\Program Files\Common Files\System\ado\msado15.dll"-->
<%g_loginCheck%>
<%
	'성남반품저장
	Response.Expires = 0
	Response.AddHeader "Pragma", "no-cache" 
	Response.AddHeader "cache-control", "no-store" 
	Response.CharSet = "euc-kr"
	Response.ContentType = "text/html;charset=euc-kr"

	Dim items, jArray
	Dim jObject
	Set jObject = jsObject()
	
	dpcd = trim(Session("DPCD"))
	add_date = Trim(request("add_date"))
	items = Trim(Request("items"))
	orno = Trim(request("add_orno")) '박스번호


	Set jArray = json.parse(items)
	arrLeng = jArray.length
	Set jArray = json.parse(items)
	
	j = 0
	Dim errorcheck :errorcheck= 0
	
open_db
	

	


	On Error Resume Next
	db.BeginTrans 
	maxseq = 0		
	
	For i = 0 To jArray.length - 1
			

			spc_chk = CStr(jArray.Get(i).SPCCHK)'SPCCHK 정상 아울렛 구분
			a_style	= CStr(jArray.Get(i).STYCD) 'STYLE
			a_color = CStr(jArray.Get(i).COLCD) 'COLOR
			a_size  = CStr(jArray.Get(i).SIZECD)  'SIZE
			QTY			= jArray.Get(i).QTY		'수량
			QTY			= replace(QTY,chr(45),"")
			saletp1     = jArray.Get(i).SALETP '판매유형
			price		= jArray.Get(i).PRICE '판매가
			mg			= jArray.Get(i).MG 'mg
			dc			= jArray.Get(i).DC 'dc
			supri		= jArray.Get(i).SUPRI '공급가
		
			'전표번호 
			sql = "select nvl(max(seq),0) seq , max(whcd) whcd , nvl(max(boxno),'') boxno from tbw010 "
			sql=sql&" where vdcd = '"& dpcd &"' AND orgu = '8'"
			sql=sql&" And cbgu = '2' AND ordt = '"& add_date &"' AND orno = '"& orno &"'  "
			set rs0=server.createobject("adodb.recordset")
			rs0.CursorLocation = adUseClient
			rs0.open sql,db,adOpenStatic, adLockOptimistic
			'이번 판매 SEQ
			maxseq = rs0(0)
			whcd = rs0(1)
			boxno = rs0(2)
			rs0.close
			set rs0 = nothing
			'이번 판매 전표번호
			maxseq = maxseq
			save_seq	  = maxseq +  1'
			

			Set DbCmd = Server.CreateObject("ADODB.Command")
			Set DbCmd.ActiveConnection = db
			sql="select  BRCD,  YEAR, SEASON,   BRSEX, ITEM,   ITYPE from SUMIS.TBB070"
			sql= sql&" where stycd=?"
			sql= sql&"   and rownum = 1 "
			with DbCmd
				.CommandText=sql
				.CommandType=adCmdText
				.Parameters.Append	.CreateParameter("@a_style",	adVarChar,	adParamInput, 14)
				.Parameters("@a_style")=a_style
				.Execute
			End with
			Set Rst=DbCmd.Execute
			Set DbCmd=Nothing

			brcd   = Rst("BRCD")
			year1  = Rst("YEAR")
			season = Rst("SEASON")
			brsex  = Rst("BRSEX")
			item   = Rst("ITEM")
			itype  = Rst("ITYPE")
				
				
				
				
			sql = "insert into tbw010(WHCD,VDCD,ORGU,CBGU,SALEGU,ORDT,ORSEQ,SEQ,ORNO"
			sql = sql &",STYCD,COLCD,SIZECD,REQQTY,CFQTY,"
			sql = sql &"OUTPRI,MG,DCRT,SUPPRI,OUTYN,"
			sql = sql &"BRCD,YEAR,SEASON,BRSEX,ITYPE,ITEM,INUSER,INTIME,BOXNO)"
			sql = sql &"  values('"& whcd &"','"& dpcd &"','8','2','"& saletp1 &"'"
			sql = sql &",'"& add_date &"',0,"& save_seq &",'"& orno &"','"& a_style &"','"& a_color &"'"
			sql = sql &",'"& a_size &"',"& QTY &","& QTY &","& price &","& mg &","& dc &""
			sql = sql &","& supri &",'N','"& brcd &"','"& year1 &"','"& season &"','"& brsex &"'"
			sql = sql &",'"& itype &"','"& item &"','"& dpcd &"',to_char(sysdate,'YYYYMMDDHH24MISS'),'"& boxno &"')"

			db.execute (sql)
			  '저장쿼리
			'response.write sql & "<br><br>"
			  errorcheck = errorcheck + db.Errors.Count
			  If errorcheck <> 0 Then
				jObject("sql") = sql
			  End If 			
		
	Next

	errorcheck = errorcheck + db.Errors.Count
 
	IF errorcheck > 0 Then
		db.RollbackTrans
		db.close
		Set db = Nothing
		
		jObject("error") = "1"
		jObject("msg") = "반품 추가 등록 실패"		
		jObject("sql") = sql
		jObject.Flush
		Response.end

	ElseIf errorcheck = 0 Then

		db.CommitTrans
		db.close
		Set db = Nothing
		
		jObject("error")	= "0"
		jObject("msg")		= "저장 완료"
		jObject("sql") = sql
		jObject.Flush
		Response.End

	End If

%>