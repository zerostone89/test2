<%
	'Option Explicit
	Response.Buffer = true
	Response.Expires = 0
	'Session.Contents.removeall
	Response.Clear()
	Session.Abandon()
	'Session.Contents.RemoveAll


  err_code = trim(Request("err_code"))  '에러코드 체크
	id = trim(Request("id"))   ' id

	'response.write err_code


	 '20190611byCho 쿠키를 이용한 로그인 제한
	err_count5 = trim(Request("err_count5")) '로그인 제한 카운터(5번째 틀리면 막으려면 Str1 = 4입력)'
 	Str1 = "4"
 	'response.Write err_count5
	err_count = 0

 	If err_code <> ""  Then '오류가 발생하면'
		err_count = Request.Cookies("errChk")("errChkCount")
		Response.Cookies("errChk")("errChkId") = id
		Response.Cookies("errChk")("errChkCount") = err_count + 1
		err_count_up = Request.Cookies("errChk")("errChkCount") 'hidden에 들어갈 쿠키+1 변수'
			If StrComp(err_count5, Str1,1) = 0 then '문자열 비교'
				Response.Cookies("errChk").Expires = Dateadd("s",10,now()) '만료시간 설정'
			End if
 	Else '오류가 발생안하면'
		Response.Cookies("errChk")("errChkId") = id
		Response.Cookies("errChk")("errChkCount") = 0
		err_count = 0
 	End If


%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>::::::: 매장관리시스템 :::::::</title>
<META http-equiv="X-UA-Compatible" content="IE=7">
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<LINK rel="stylesheet" href="/Include/Style.css" type="text/css">
<script language="JavaScript">
<!--
//alert('<%=request.cookies("idchkjung")%>');


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
	function check_value()
	{
			if (document.form1.id.value=="") {
				alert("\n사용자코드를 입력해 주세요.");
				document.form1.id.focus();
			}
			else if (document.form1.pass.value=="") {
				alert("\n비밀번호를 입력해 주세요.");
				document.form1.pass.focus();
			}
			//'20190611byCho 쿠키를 이용한 로그인 제한 --> 쿠키 만료 후 새로고침하면 value가 login_check.asp 변수로 바뀜.
			else if (document.form1.err_count5.value >= 5) {
				alert("\n 로그인 실패 횟수가 5번 이상입니다. \n 본사로 문의하십시오.");
				document.form1.id.focus();
			}
			else {
				//alert("\n submit!");
				document.form1.submit();
			}
	//document.form1.id.focus();
	}
	function keyCheck(i) {
		if(event.keyCode ==13 && i==1){
			if(document.form1.id.value==""){

				alert("id를 입력하지 않았습니다.");document.form1.id.focus();return;
			                             }
			else{

			document.form1.pass.focus();

			     }
			     		     }
		 if(event.keyCode ==13 && i==2){
			if(document.form1.pass.value==""){

				alert("비밀번호를 입력하지 않았습니다.");document.form1.pass.focus();return;
			                             }
			else{

			check_value();

		  	    }

		                              }
                             }
	function set_focus()
	{
  		//window.moveto(0,0)
  		//window.resizeBy(800,600);
		document.form1.id.focus();
	}

	function Message_err(){
		if (document.form1.err_count5.value < 5) {
		//20190611byCho 로그인 제한 alert 메세지
	<% if err_code = "1" then %>
		alert(" 입력하신 id를 찾을수 없습니다. \n 5회 이상 실패시 로그인이 제한됩니다. \n 로그인 실패 횟수 : " + <%=err_count_up%>);
		document.form1.id.focus();
	<% elseif err_code = "2" then %>
		alert(" 비밀번호가 일치하지 않습니다. \n 5회 이상 실패시 로그인이 제한됩니다. \n 로그인 실패 횟수 : " + <%=err_count_up%>);
		document.form1.pass.focus();
	<% elseif err_code = "3" then %>
		alert(" 사용권한이 없습니다.! \n 5회 이상 실패시 로그인이 제한됩니다. \n 로그인 실패 횟수 : " + <%=err_count_up%>);
		document.form1.id.focus();
	<% elseif err_code = "4" then %>
		alert(" 사용하지 않는 매장입니다. \n 5회 이상 실패시 로그인이 제한됩니다. \n 로그인 실패 횟수 : " + <%=err_count_up%>);
		document.form1.id.focus();
	<% elseif err_code = "5" then %>
		alert(" 상설매장은 상설매장관리에서 로그인해주세요. \n 5회 이상 실패시 로그인이 제한됩니다. \n 로그인 실패 횟수 : " + <%=err_count_up%>);
		document.form1.id.focus();
	<% end if %>
} else {
	alert("\n 로그인 5회 실패 : 로그인이 제한됩니다. \n 본사로 문의하십시오.");
	document.form1.id.focus();
}

   }
function CLEAR()
{
	document.form1.id.value="";
	document.form1.pass.value="";
}

//-->
</script>

<style>

#ban { position:relative ;
        z-index:1;
        top: 380px;
        left: 550px;
        }

body{filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#FFFFFF, EndColorStr=#d8f1ec)';}

</style>


</head>

<% if trim(err_code) = "" then %>
<body background="/images/B_ptn_cross.gif" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" Onload="set_focus();" scroll="no">
<% else	%>
<body background="/images/B_ptn_cross.gif" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" Onload="Message_err();" scroll="no">
<% end if %>

<FORM name="form1" method="post"  action="/login_check.asp">
	<input type="hidden" name="err_count5" value="<%=err_count_up%>"

	<TABLE width="100%" height="103%"  border="0" cellpadding="0" cellspacing="0">
		<TR>
			<TD height="100%">
				<TABLE width="732" border="0" align="center" cellpadding="0" cellspacing="0">
					<TR>
						<TD width="732" height="462" align="center"  valign="middle" background="/Images/B_img_LoginPage_13ss.jpg"> </TD>
					</TR>
				</TABLE>

				<TABLE align="center" border="0" cellpadding="0" cellspacing="0">
					<TR>
						   <TD height="18" width="150"></TD>
							 <TD><IMG src="/Images/B_img_Login01_13ss.gif" width="62" height="14"></TD>
							 <TD><INPUT name="id" type="text" size="22" maxlength="5" value="<%=request.cookies("idchkjung")%>" onkeydown="keyCheck(1)" tabindex="1" id="capitalize" style="ime-mode:disabled"></TD>
							 <TD width="10"></TD>
							 <TD><IMG src="/Images/B_img_Login02.gif" width="62" height="14"></TD>
							 <TD><INPUT name="pass" type="password" size="22" maxlength="9" onkeydown="keyCheck(2)" tabindex="2"></TD>
							  <%
								If ( request.cookies("idchkjung") = "" ) Or IsNull(request.cookies("idchkjung")) Or IsEmpty(request.cookies("idchkjung")) Then
									chkp = ""
								Else
									chkp = "checked"
								End If
							  %>
							  <TD width=10></TD>
								<TD align="right" class="s" style="padding-right:14px"><INPUT type="checkbox"  name="idsave" <%=chkp%> class="nob">	아이디저장</TD>
							  <TD><A href="javascript:check_value()" tabindex="3"><IMG src="/Images/B_btn_Login_13ss.gif" width="57" height="34" border="0"></A></TD>
					</TR>
					<TR>
						 <TD align="right" colspan="9" ><a href="http://helpu.kr/sgfc" target="_blank"><img src="http://helpu.co.kr/images/sample_banner/banner_sample2_5.gif"alt="원격지원서비스" /> </a></TD>
				  </TR>
				</TABLE>
			</TD>
		</TR>
	</TABLE>

</FORM>
</body>
</html>
