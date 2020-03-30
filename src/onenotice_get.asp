<!--#include virtual="/include/common.asp"-->
<!--METADATA TYPE="Typelib" NAME="ADODB Type Library" FILE="C:\Program Files\Common Files\System\ado\msado15.dll"-->

<%
open_dbo
SQL="   SELECT (SELECT MSG FROM TBB180 WHERE BRCD = '0' AND USEYN = 'Y')||'     '|| "
SQL=SQL&"          (SELECT MSG FROM TBB180 WHERE BRCD = '"&BRAND&"' AND USEYN = 'Y')  "
SQL=SQL&"     FROM DUAL	 "

set rs=server.createobject("adodb.recordset")
rs.CursorLocation = adUseClient		
rs.open SQL,db,adOpenStatic, adLockOptimistic
if rs.eof then
	arrOneNoticeNull=true
	arrOneNotice="새해 복 많이 받으세요"
else
	arrOneNoticeNull=false
	arrOneNotice=rs(0)
end if
rs.close
set rs=nothing
close_db
%>


<%
response.write "&var1="&arrOneNotice&"&"
%>