<%  'Option Explicit
	Response.Buffer = true
	Response.Expires = 0
%>
<%
	'== session ����
	'Session.Contents.RemoveAll 
	Session("DPCD") = ""
	Session("BRAND") = ""
	Session("NAME") = ""
	Session.abandon()
%>

<script language="javascript">
alert("�α׾ƿ��Ǿ����ϴ�.\n�ٽ÷α������ּ���.");

parent.window.location = "../default.asp";
</script>