<%@ Language="VBScript" EnableSessionState="True"%>
<%

'�׽�Ʈ ����
'	session("TESTVALUE") = "This is a testing value"
'	session.Abandon()
'	Server.ScriptTimeout = 600 '(����:��)

%>
<html>

<head>
<meta http-equiv="content-type" content="text/html; charset=euc-kr">
<title>����Ʈ</title>
</head>

<body bgcolor="white" text="black" link="blue" vlink="purple" alink="red">
<span style="font-size:9pt;"><br><b>��Ű</b><font color="gray">(Cookies ��ü)</font></span><br>
<table border="0" cellpadding="0" cellspacing="1" width="100%" bgcolor="#CCCCCC">
    <tr>
        <td width="30%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Key</span></p>
        </td>
        <td width="70%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Value</span></p>
        </td>
    </tr>
<% For Each key in Request.Cookies %>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white"><%=key%></font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<% if Request.cookies(key) = "" Then %>&nbsp;<% else %><%=Request.cookies(key)%><% end if %></span></p>
        </td>
    </tr>
<% Next %>
</table>
<span style="font-size:9pt;"><br><b>����</b><font color="gray">(Session ��ü, EnableSessionState="True")</font></span><br>
<table border="0" cellpadding="0" cellspacing="1" width="100%" bgcolor="#CCCCCC">
    <tr>
        <td width="30%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Key</span></p>
        </td>
        <td width="70%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Value</span></p>
        </td>
    </tr>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white">Session.SessionID</font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<%=Session.SessionID%></span></p>
        </td>
    </tr>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white">Session.CodePage</font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<%=Session.CodePage%>&nbsp;<font color="gray">(949�� �ѱ�������)</font></span></p>
        </td>
    </tr>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white">Session.Timeout</font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<%=Session.Timeout%>&nbsp;<font color="gray">(����:��)</font></span></p>
        </td>
    </tr>
<% For Each key in Session.Contents %>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white"><%=key%></font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<% if Session(key) = "" Then %>&nbsp;<% else %><%=Session(key)%><% end if %></span></p>
        </td>
    </tr>
<% Next %>
</table>
<span style="font-size:9pt;"><br><b>��</b><font color="gray">(Request.Form() : FORM������� ���� ��)</font></span><br>
<table border="0" cellpadding="0" cellspacing="1" width="100%" bgcolor="#CCCCCC">
    <tr>
        <td width="30%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Key</span></p>
        </td>
        <td width="70%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Value</span></p>
        </td>
    </tr>
<% For Each key in Request.Form %>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white"><%=key%></font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<% if Request.Form(key) = "" Then %>&nbsp;<% else %><%=Request.Form(key)%><% end if %></span></p>
        </td>
    </tr>
<% Next %>
</table>
<span style="font-size:9pt;"><br><b>����</b><font color="gray">(Request.QueryString() : GET������� ���� ��)</font></span><br>
<table border="0" cellpadding="0" cellspacing="1" width="100%" bgcolor="#CCCCCC">
    <tr>
        <td width="30%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Key</span></p>
        </td>
        <td width="70%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Value</span></p>
        </td>
    </tr>
<% For Each key in Request.QueryString %>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white"><%=key%></font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<% if Request.QueryString(key) = "" Then %>&nbsp;<% else %><%=Request.QueryString(key)%><% end if %></span></p>
        </td>
    </tr>
<% Next %>
</table>
<span style="font-size:9pt;"><br><b>����</b><font color="gray">(Server ��ü)</font></span><br>
<table border="0" cellpadding="0" cellspacing="1" width="100%" bgcolor="#CCCCCC">
    <tr>
        <td width="30%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Key</span></p>
        </td>
        <td width="70%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Value</span></p>
        </td>
    </tr>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white">Server.ScriptTimeout</font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<%=Server.ScriptTimeout%>&nbsp;<font color="gray">(����:��)</font></span></p>
        </td>
    </tr>
</table>
<span style="font-size:9pt;"><br><b>��������</b><font color="gray">(ServerVariables ��ü)</font></span><br>
<table border="0" cellpadding="0" cellspacing="1" width="100%" bgcolor="#CCCCCC">
    <tr>
        <td width="30%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Key</span></p>
        </td>
        <td width="70%" bgcolor="#EBEBEB">
            <p align="center"><span style="font-size:9pt;">Value</span></p>
        </td>
    </tr>
<% For Each key in Request.ServerVariables %>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white"><%=key%></font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<% if Request.ServerVariables(key) = "" Then %>&nbsp;<% else %><%=Request.ServerVariables(key)%><% end if %></span></p>
        </td>
    </tr>
<% Next %>
</table>
</body>

</html>
<%
'�뵵 : �� ������ �����ڵ��� ���ؼ� ���� �����Դϴ�.
'���� : �پ���
'���۱� : ���� (���� �� ����� ����)
'������ : ���ο�(Richard Cha)
'���� : atrofoce@hitel.net
'������ : 2001�� 12�� 22��

'�߽� : �ɽ��ؼ� ����ϴ�. ��.��;
%>