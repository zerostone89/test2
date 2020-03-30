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
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>::::::: 매장관리시스템 :::::::</title>
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
			else document.form1.submit();
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

	<% if err_code = "1" then %>
		alert("입력하신 id를 찾을수 없습니다.");
		document.form1.id.focus();
	<% elseif err_code = "2" then %>	
		alert("비밀번호가 일치하지 않습니다.");
		document.form1.pass.focus();
	<% elseif err_code = "3" then %>	
		alert("사용권한이 없습니다.!");
		document.form1.id.focus();		
	<% elseif err_code = "4" then %>	
		alert("사용하지 않는 매장입니다.");
		document.form1.id.focus();		
	<% elseif err_code = "5" then %>	
		alert("상설매장은 상설매장관리에서 로그인해주세요.");
		document.form1.id.focus();		
	<% end if %>	
  	   
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


</style>


</head>

<% if trim(err_code) = "" then %>
<body background="/images/B_ptn_cross.gif" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" Onload="set_focus();">
<% else	%>
<body background="/images/B_ptn_cross.gif" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" Onload="Message_err();">
<% end if %>

<FORM name="form1" method="post"  action="/login_check.asp">
	<TABLE width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<TR>
		
		
         
		
			<TD height="100%">
				<TABLE border="0" align="center" cellpadding="00" cellspacing="0">
					<TR> 
						<TD width="751" height="481" align="center"  background="/Images/B_img_LoginPage.jpg"> 
							<TABLE width="650" height="341" border="0" cellpadding="00">
								<TR> 
									<TD width="40%" height="111">&nbsp;</TD>									
                  					<TD width="60%" height="111" valign="bottom" style="padding-bottom:12px"><IMG src="images/T_img_Logo.jpg" width="140" height="35"></TD>
								</TR>
								<TR> 
									<TD>&nbsp;</TD>
									<TD align="center" valign="top"> 
										<TABLE width="340" border="0" cellpadding="00">
											<TR> 
												<TD height="1" background="/Images/B_ptn_Dot.gif"></TD>
											</TR>
											<TR> 
												<TD height="85" align="center"> 
													<TABLE width="310" height="65" border="0" cellpadding="00" cellspacing="0">
														<TR> 
														  <TD colspan="3" height="9"></TD>
														</TR>
														<!--
														<b>  ※ 긴급 점검 중입니다. 
														       10:00 까지 사용을 제한합니다
														       불편을 드려서 죄송합니다. </b>
														  -->
														   
														
														<TR> 
												
														  <TD width="70" height="21" ><IMG src="/Images/B_img_Login01.gif" width="62" height="14"></TD>
														  
														 <TD width="152"><INPUT name="id" type="text" size="22" maxlength="5" value="<%=request.cookies("idchkjung")%>" onkeydown="keyCheck(1)" tabindex="1" id="capitalize" style="ime-mode:inactive"></TD> 
                              							  <TD width="83" rowspan="2"><A href="javascript:check_value()" tabindex="3"><IMG src="/Images/B_btn_Login.gif" width="72" height="43" border="0"></A></TD>
														</TR>
														<TR> 
														  <TD height="22" ><IMG src="/Images/B_img_Login02.gif" width="62" height="14"></TD>
														 <TD><INPUT name="pass" type="password" size="22" maxlength="9" onkeydown="keyCheck(2)" tabindex="2"></TD>
														</TR>
														<TR> 
														
															<TD></TD>
														  <% 
															If ( request.cookies("idchkjung") = "" ) Or IsNull(request.cookies("idchkjung")) Or IsEmpty(request.cookies("idchkjung")) Then 
																chkp = ""
															Else
																chkp = "checked"
															End If 
														  %>
														 
															<TD colspan="2" align="right" class="s" style="padding-right:14px"><INPUT type="checkbox"  name="idsave" <%=chkp%> class="nob">	아이디저장</TD>
</TR>
   
 
													</TABLE>
												</TD>
											</TR>
											<!--
											<TR> 
												<TD><IMG src="/Images/B_img_Login03.gif" width="340" height="22"></TD>
											</TR>
											-->
										</TABLE>
										<TABLE width="1" border="0" cellspacing="0" cellpadding="0">
										  <TR>
											<TD height="7"></TD>
										  </TR>
										</TABLE>
									<br /><IMG src="/Images/B_img_LoginLogo_new.gif" width="343" height="90"></TD>
								<div ID="ban">
								 <a href="http://ezh.kr/sgf1" target="_blank"><Img src="http://ssiiss.com/images/te150_01.gif" title="원격지원" ></a>
								 </div>	
								</TR>
							</TABLE>
						   
						</TD>
					</TR>
					<TR> 
						<TD align="right" style="padding-right:20px"><IMG src="/Images/F_txt_LoginCopy.gif" ></TD>
					</TR>
				</TABLE>
			</TD>
		</TR>
	</TABLE>
</FORM>
</body>
</html>
