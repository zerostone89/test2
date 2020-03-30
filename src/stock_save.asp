<!--#include virtual="/include/common.asp"-->
<!-- #include file="json2.asp" -->
<!-- #include file="JSON_2.0.4.asp" -->
<!-- #include file="JSON_UTIL_0.1.1.asp" -->
<!--METADATA TYPE="Typelib" NAME="ADODB Type Library"
	FILE="C:\Program Files\Common Files\System\ado\msado15.dll"-->
<%g_loginCheck%>
<%

	Response.Expires = 0
	Response.AddHeader "Pragma", "no-cache" 
	Response.AddHeader "cache-control", "no-store" 
	Response.CharSet = "euc-kr"
	Response.ContentType = "text/html;charset=euc-kr"

	Dim items, jArray
	Dim jObject
	Set jObject = jsObject()
	
	dpcd = trim(Session("DPCD"))
	pcd	 = Trim(Session("PCD"))
	sildate = Trim(request("sildate"))
	stock_remark = unescape(Trim(request("stock_remark")))
	sildate = Mid(sildate,1,4)&Mid(sildate,6,2)&Mid(sildate,9,2)	
	items = Trim(Request("items"))
	chk_shop = unescape(Trim(request("chk_shop")))
	
	
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
				
				

				If spc_chk = "Y" Then
					Set DbCmd = Server.CreateObject("ADODB.Command")
					Set DbCmd.ActiveConnection = db
					sql="select  BRCD,  YEAR, SEASON,   BRSEX, ITEM,   ITYPE from SUSPC.TBB070"
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
				ElseIf spc_chk = "N" Then
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
				End If
				
				brcd   = Rst("BRCD")
				year1  = Rst("YEAR")
				season = Rst("SEASON")
				brsex  = Rst("BRSEX")
				item   = Rst("ITEM")
				itype  = Rst("ITYPE")

				QTY			= jArray.Get(i).QTY		'수량
				QTY			= replace(QTY,chr(45),"")
				
				If spc_chk = "Y" Then
					'전표번호 
					sql = "SELECT nvl(max(nvl(seq,0)),0) as maxseq "
					sql = sql & " FROM SUSPC.TBW110"
					sql = sql & " WHERE sildt = '" & sildate & "'"
					sql = sql & " and vdcd = '" & pcd & "'"

				Else
					SQL = "       SELECT MAX(VDCD) VDCD  FROM SUMIS.TBB040"  
					SQL = SQL & "  WHERE PCD = '" & pcd & "'"
					SQL = SQL & "  AND BRAND = '" & brcd & "'"	
					set Rs9=server.createobject("adodb.recordset")
					Rs9.CursorLocation = adUseClient
					Rs9.open SQL,db,adOpenStatic, adLockOptimistic
					
					IF Rs9.BOF OR Rs9.EOF  THEN
						'jeago= "0"
					else 
					   dpcd  = trim(Rs9("VDCD"))
						
					End If					
					Rs9.close
					set Rs9 = nothing			


					'전표번호 
					sql = "SELECT nvl(max(nvl(seq,0)),0) as maxseq "
					sql = sql & " FROM TBW110"
					sql = sql & " WHERE sildt = '" & sildate & "'"
					sql = sql & " and vdcd = '" & dpcd & "'"
				End If 
					set rs0=server.createobject("adodb.recordset")
					rs0.CursorLocation = adUseClient
					rs0.open sql,db,adOpenStatic, adLockOptimistic
					'이번 실사 SEQ
					maxseq = rs0(0)
					rs0.close
					set rs0 = nothing
					'이번 실사 전표번호
					maxseq = maxseq
					save_seq	  = maxseq +  1

			If spc_chk = "Y" Then
				save_inuser = pcd&"_"&chk_shop
				sql = "insert into SUSPC.tbw110(SilDt, VdCd, Seq, StyCd, ColCd, SizeCd, SilQty, Pageno, Tag, Htyn, BrCd, Year, Season, BrSex, Item, Itype, Inuser, Intime ,AREA , SPC_CHK ) "
				sql = sql &"  values('"& sildate &"','"& pcd &"','"& save_seq &"','"& a_style &"','"& a_color &"','"& a_size &"','"& QTY &"',1,'N','N', "
				sql = sql &"  '"&brcd&"','"&year1&"','"&season&"','"&brsex&"','"&item&"','"&itype&"','"& save_inuser& "',to_char(sysdate,'YYYYMMDDHH24MISS') , '"&stock_remark&"' ,'"&spc_chk&"') "
				
			else
				save_inuser = dpcd&"_"&chk_shop
				sql = "insert into tbw110(SilDt, VdCd, Seq, StyCd, ColCd, SizeCd, SilQty, Pageno, Tag, Htyn, BrCd, Year, Season, BrSex, Item, Itype, Inuser, Intime ,AREA , SPC_CHK ) "
				sql = sql &"  values('"& sildate &"','"& dpcd &"','"& save_seq &"','"& a_style &"','"& a_color &"','"& a_size &"','"& QTY &"',1,'N','N', "
				sql = sql &"  '"&brcd&"','"&year1&"','"&season&"','"&brsex&"','"&item&"','"&itype&"','"& save_inuser& "',to_char(sysdate,'YYYYMMDDHH24MISS') , '"&stock_remark&"' ,'"&spc_chk&"') "
			End If 

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
		jObject("msg") = "실사 등록 실패"		
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