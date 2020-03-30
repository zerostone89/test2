<%@ Language="VBScript" EnableSessionState="True"%>
<%

'테스트 영역
'	session("TESTVALUE") = "This is a testing value"
'	session.Abandon()
'	Server.ScriptTimeout = 600 '(단위:초)

%>
<html>

<head>
<meta http-equiv="content-type" content="text/html; charset=euc-kr">
<title>리스트</title>
</head>

<body bgcolor="white" text="black" link="blue" vlink="purple" alink="red">
<span style="font-size:9pt;"><br><b>쿠키</b><font color="gray">(Cookies 객체)</font></span><br>
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
<span style="font-size:9pt;"><br><b>세션</b><font color="gray">(Session 객체, EnableSessionState="True")</font></span><br>
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
            <p><span style="font-size:9pt;">&nbsp;<%=Session.CodePage%>&nbsp;<font color="gray">(949가 한글페이지)</font></span></p>
        </td>
    </tr>
    <tr>
        <td width="30%" bgcolor="black">
            <p align="center"><span style="font-size:9pt;"><font color="white">Session.Timeout</font></span></p>
        </td>
        <td width="70%" bgcolor="white">
            <p><span style="font-size:9pt;">&nbsp;<%=Session.Timeout%>&nbsp;<font color="gray">(단위:분)</font></span></p>
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
<span style="font-size:9pt;"><br><b>폼</b><font color="gray">(Request.Form() : FORM방식으로 받은 값)</font></span><br>
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
<span style="font-size:9pt;"><br><b>쿼리</b><font color="gray">(Request.QueryString() : GET방식으로 받은 값)</font></span><br>
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
<span style="font-size:9pt;"><br><b>서버</b><font color="gray">(Server 객체)</font></span><br>
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
            <p><span style="font-size:9pt;">&nbsp;<%=Server.ScriptTimeout%>&nbsp;<font color="gray">(단위:초)</font></span></p>
        </td>
    </tr>
</table>
<span style="font-size:9pt;"><br><b>서버변수</b><font color="gray">(ServerVariables 객체)</font></span><br>
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
'용도 : 이 파일은 개발자들을 위해서 만든 파일입니다.
'사용법 : 다양함
'저작권 : 없음 (수정 및 재배포 가능)
'제작자 : 차민우(Richard Cha)
'문의 : atrofoce@hitel.net
'제작일 : 2001년 12월 22일

'추신 : 심심해서 만듭니다. ㅡ.ㅡ;
%>