<!--#include virtual="/include/common.asp"-->
<!-- #include file="json2.asp" -->
<!-- #include file="JSON_2.0.4.asp" -->
<!-- #include file="JSON_UTIL_0.1.1.asp" -->
<%g_loginCheck%>
<%

	Response.Expires = 0
	Response.AddHeader "Pragma", "no-cache"
	Response.AddHeader "cache-control", "no-store"
	Response.CharSet = "euc-kr"
	Response.ContentType = "text/html;charset=euc-kr"

	'dpcd = trim(Session("DPCD"))
' 변수받기

	Dim jObject
	Set jObject = jsObject()

	Session("DPCD")    = trim(Session("DPCD"))    '매장코드 세션
	'Session("REFNM")  = Rs7("REFNM")   '매장명 세션
	Session("USRID")   = trim(Session("USRID"))   '매장사용자
	Session("NAME")    = trim(Session("NAME"))   '매장명 세션
	Session("BRAND")   = trim(Session("BRAND"))   '브랜드 세션
	Session("SHGU")    = trim(Session("SHGU"))    '매장구분 세션
	Session("SHTP")    = trim(Session("SHTP"))    '매장구분 세션
	Session("POSNO")   = trim(Session("POSNO"))   'POS번호 세션

	jObject("error") = "0"
	jObject("REFRESH_INFO") = "==== DPCD : " & Session("DPCD") & ", POSNO : " & Session("POSNO") & " ===="
	jObject.Flush

%>
