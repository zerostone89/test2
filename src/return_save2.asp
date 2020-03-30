<!--#include virtual="/include/common.asp"-->
<!-- #include file="json2.asp" -->
<!-- #include file="JSON_2.0.4.asp" -->
<!-- #include file="JSON_UTIL_0.1.1.asp" -->
<!--METADATA TYPE="Typelib" NAME="ADODB Type Library"
	FILE="C:\Program Files\Common Files\System\ado\msado15.dll"-->
<%g_loginCheck%>
<%
	'이천반품저장
	Response.Expires = 0
	Response.AddHeader "Pragma", "no-cache" 
	Response.AddHeader "cache-control", "no-store" 
	Response.CharSet = "euc-kr"
	Response.ContentType = "text/html;charset=euc-kr"

	Dim items, jArray
	Dim jObject
	Set jObject = jsObject()
	
	dpcd = trim(Session("DPCD"))
	return_date = Trim(request("return_date"))
	return_date = Mid(return_date,1,4)&Mid(return_date,6,2)&Mid(return_date,9,2)	
	'return_remark = unescape(Trim(request("return_remark")))
	items = Trim(Request("items"))
	yymm = mid(return_date,1,6)
	pp   = mid (yymm,3,4)
	a_store = Trim(request("a_store"))'창고코드
	boxno = Trim(request("boxno")) '박스번호


	Set jArray = json.parse(items)
	arrLeng = jArray.length
	Set jArray = json.parse(items)
	
	j = 0
	Dim errorcheck :errorcheck= 0
	
open_db
	

		SQL = "select max(seq2) from tbw130 where yymm = '"& yymm &"' And vdcd = '"& dpcd &"'"
		Set rs = server.CreateObject ("adodb.recordSet")
		rs.CursorLocation = adUseClient
	    rs.Open SQL,db,adOpenStatic, adLockOptimistic
	
		if isnull(rs(0)) then
			no = 1
	    
	    	sql = "insert into tbw130(YYMM, VDCD,SEQ1,SEQ2,SEQ3,SEQ4 )"
	    	sql = sql &"  values('"& yymm &"','"& dpcd &"',0,1,0,0)"

			db.execute (sql)
			
		else
			no = cint(rs(0)) + 1
			
	    	sql = "UPDATE TBW130 SET SEQ2 ="& no &" where yymm ='"& yymm &"' and vdcd='"& dpcd &"'" 
						
			db.execute (sql)

		end if

 no = cstr(no)
 seq1 ="0000"
 no1 = seq1 & no
 no1 = right(no1,3)
 
 orno  = dpcd &  pp & no1 & "B" 


	On Error Resume Next
	db.BeginTrans 
	maxseq = 0		
	
	For i = 0 To jArray.length - 1
			'전표번호 
			sql = "select nvl(max(seq),0) seq from tbw010 where whcd='"& a_store &"'"
			sql=sql&" And vdcd = '"& dpcd &"' AND orgu = 'M'"
			sql=sql&" And cbgu = '2' AND ordt = '"& return_date &"'"
			set rs0=server.createobject("adodb.recordset")
			rs0.CursorLocation = adUseClient
			rs0.open sql,db,adOpenStatic, adLockOptimistic
			'이번 판매 SEQ
			maxseq = rs0(0)
			rs0.close
			set rs0 = nothing
			'이번 판매 전표번호
			maxseq = maxseq
			save_seq	  = maxseq +  1'

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
			sql = sql &"  values('"& a_store &"','"& dpcd &"','M','2','"& saletp1 &"'"
			sql = sql &",'"& return_date &"',9,"& save_seq &",'"& orno &"','"& a_style &"','"& a_color &"'"
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
		jObject("msg") = "반품 등록 실패"		
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