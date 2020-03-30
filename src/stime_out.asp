<%  'Option Explicit
	Response.Buffer = true
	Response.Expires = 0
%>
<%
	'== session 삭제
	'Session.Contents.RemoveAll 
	Session("DPCD") = ""
	Session("BRAND") = ""
	Session("NAME") = ""
	Session.abandon()
%>

<script language="javascript">
alert("로그아웃되었습니다.\n다시로그인해주세요.");

parent.window.location = "../default.asp";
</script>