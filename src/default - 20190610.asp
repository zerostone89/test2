<%  	
	'Option Explicit
	Response.Buffer = true
	Response.Expires = 0
	'Session.Contents.removeall
	Response.Clear() 
	Session.Abandon()
	'Session.Contents.RemoveAll  
	

     err_code = trim(Request("err_code"))  '�����ڵ� üũ
	 id = trim(Request("id"))   ' id
	 
	 'response.write err_code	
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>::::::: ��������ý��� :::::::</title>
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
				alert("\n������ڵ带 �Է��� �ּ���.");
				document.form1.id.focus();
			}	
			else if (document.form1.pass.value=="") {
				alert("\n��й�ȣ�� �Է��� �ּ���.");
				document.form1.pass.focus();
			}
			else document.form1.submit();
	}
	function keyCheck(i) {
		if(event.keyCode ==13 && i==1){
			if(document.form1.id.value==""){	
					
				alert("id�� �Է����� �ʾҽ��ϴ�.");document.form1.id.focus();return;
			                             }
			else{
						
			document.form1.pass.focus();
			     
			     }
			     		     }	                               	
		 if(event.keyCode ==13 && i==2){
			if(document.form1.pass.value==""){
			
				alert("��й�ȣ�� �Է����� �ʾҽ��ϴ�.");document.form1.pass.focus();return;
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
		alert("�Է��Ͻ� id�� ã���� �����ϴ�.");
		document.form1.id.focus();
	<% elseif err_code = "2" then %>	
		alert("��й�ȣ�� ��ġ���� �ʽ��ϴ�.");
		document.form1.pass.focus();
	<% elseif err_code = "3" then %>	
		alert("�������� �����ϴ�.!");
		document.form1.id.focus();		
	<% elseif err_code = "4" then %>	
		alert("������� �ʴ� �����Դϴ�.");
		document.form1.id.focus();		
	<% elseif err_code = "5" then %>	
		alert("�󼳸����� �󼳸���������� �α������ּ���.");
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
        
body{filter='progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=#FFFFFF, EndColorStr=#d8f1ec)';} 

</style>


</head>

<% if trim(err_code) = "" then %>
<body background="/images/B_ptn_cross.gif" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" Onload="set_focus();" scroll="no">
<% else	%>
<body background="/images/B_ptn_cross.gif" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" Onload="Message_err();" scroll="no">
<% end if %>

<FORM name="form1" method="post"  action="/login_check.asp">

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
								<TD align="right" class="s" style="padding-right:14px"><INPUT type="checkbox"  name="idsave" <%=chkp%> class="nob">	���̵�����</TD>
							  <TD><A href="javascript:check_value()" tabindex="3"><IMG src="/Images/B_btn_Login_13ss.gif" width="57" height="34" border="0"></A></TD>			 
					</TR>		
					<TR>		  
						 <TD align="right" colspan="9" ><a href="http://helpu.kr/sgfc" target="_blank"><img src="http://helpu.co.kr/images/sample_banner/banner_sample2_5.gif"alt="������������" /> </a></TD>
				  </TR>
				</TABLE>
			</TD>
		</TR>
	</TABLE>
	
</FORM>
</body>
</html>