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
	sildate = Trim(request("sildate"))
	items = Trim(Request("items"))
	
	Set jArray = json.parse(items)
	arrLeng = jArray.length
	
	j = 0
	Dim errorcheck :errorcheck= 0

open_db
	On Error Resume Next
	db.BeginTrans 
	maxseq = 0		
	
	For i = 0 To jArray.length - 1
			

			silqty = CStr(jArray.Get(i).modi_silqty)'
			seq	= CStr(jArray.Get(i).modi_seq) '
			spc_chk	= CStr(jArray.Get(i).modi_spcchk) '
			modi_vdcd	= CStr(jArray.Get(i).modi_vdcd) '
				
			If silqty = "0" Or silqty = "" Then '수량이 0 이거나 null 이면 해당 행 삭제 
				If spc_chk = "Y" Then 'SUSPC 테이블
					sql = " delete from  SUSPC.tbw110 "
					sql = sql &"  where vdcd = '"&modi_vdcd&"' "
					sql = sql &"  and	sildt = '"&sildate&"' "
					sql = sql &"  and	seq = '"&seq&"' "
				Else
					sql = " delete from  tbw110 "
					sql = sql &"  where vdcd = '"&modi_vdcd&"' "
					sql = sql &"  and	sildt = '"&sildate&"' "
					sql = sql &"  and	seq = '"&seq&"' "
				End If 
			Else
				If spc_chk = "Y" Then 'SUSPC 테이블
					sql = " update SUSPC.tbw110 "
					sql = sql &"  set silqty = '"&silqty&"' , updtime = to_char(sysdate,'YYYYMMDDHH24MISS')  , upduser ='"&modi_vdcd&"' "
					sql = sql &"  where vdcd = '"&modi_vdcd&"' "
					sql = sql &"  and	sildt = '"&sildate&"' "
					sql = sql &"  and	seq = '"&seq&"' "
				Else
					
					sql = " update tbw110 "
					sql = sql &"  set silqty = '"&silqty&"' , updtime = to_char(sysdate,'YYYYMMDDHH24MISS')  , upduser ='"&modi_vdcd&"' "
					sql = sql &"  where vdcd = '"&modi_vdcd&"' "
					sql = sql &"  and	sildt = '"&sildate&"' "
					sql = sql &"  and	seq = '"&seq&"' "
				End If 
			
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
		jObject("msg") = "수정 저장 실패"		
		'jObject("sql") = sql
		jObject.Flush
		Response.end

	ElseIf errorcheck = 0 Then

		db.CommitTrans
		db.close
		Set db = Nothing
		
		jObject("error")	= "0"
		jObject("msg")		= "수정 저장 완료"
		'jObject("sql") = sql
		jObject.Flush
		Response.End

	End If

%>