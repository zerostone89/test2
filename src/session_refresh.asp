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
' �����ޱ�

	Dim jObject
	Set jObject = jsObject()

	Session("DPCD")    = trim(Session("DPCD"))    '�����ڵ� ����
	'Session("REFNM")  = Rs7("REFNM")   '����� ����
	Session("USRID")   = trim(Session("USRID"))   '��������
	Session("NAME")    = trim(Session("NAME"))   '����� ����
	Session("BRAND")   = trim(Session("BRAND"))   '�귣�� ����
	Session("SHGU")    = trim(Session("SHGU"))    '���屸�� ����
	Session("SHTP")    = trim(Session("SHTP"))    '���屸�� ����
	Session("POSNO")   = trim(Session("POSNO"))   'POS��ȣ ����

	jObject("error") = "0"
	jObject("REFRESH_INFO") = "==== DPCD : " & Session("DPCD") & ", POSNO : " & Session("POSNO") & " ===="
	jObject.Flush

%>
