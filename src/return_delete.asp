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
	items = Trim(Request("items"))
	chk = Trim(Request("chk"))
	
	Set jArray = json.parse(items)
	arrLeng = jArray.length
	
	j = 0
	Dim errorcheck :errorcheck= 0

open_db
	On Error Resume Next
	db.BeginTrans 
	maxseq = 0		
	
	For i = 0 To jArray.length - 1
			

			ordt = CStr(jArray.Get(i).ordt)			
			boxno = CStr(jArray.Get(i).boxno)	
			orno  = CStr(jArray.Get(i).orno)	
			modi_seq  = CStr(jArray.Get(i).modi_seq)	
			If chk = "1" Then 
			sql = "delete from tbw010 where  VDCD='"& dpcd &"'"
			sql = sql &" and ordt='"& ordt &"'"
			sql = sql &" and orno='"&orno&"'and seq='"&modi_seq&"' and nvl(outyn,'N') <> 'Y' and orgu ='8' "
			ElseIf chk ="2" Then 
			
			sql = "delete from tbw010 where  VDCD='"& dpcd &"'"
			sql = sql &" and ordt='"& ordt &"'"
			sql = sql &" and orno='"&orno&"'and seq='"&modi_seq&"' and nvl(outyn,'N') <> 'Y' and orgu ='M' "
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
		jObject("msg") = "반품삭제 실패"		
		'jObject("sql") = sql
		jObject.Flush
		Response.end

	ElseIf errorcheck = 0 Then

		db.CommitTrans
		db.close
		Set db = Nothing
		
		jObject("error")	= "0"
		jObject("msg")		= "반품삭제 완료"
		jObject("sql") = sql
		jObject.Flush
		Response.End

	End If

%>