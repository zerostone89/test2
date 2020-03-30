<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--#include virtual="/include/common.asp"-->
<%
	Response.Expires = 0
	Response.AddHeader "Pragma", "no-cache" 
	Response.AddHeader "cache-control", "no-store" 
    Response.CharSet = "euc-kr"
    Response.ContentType = "text/html;charset=euc-kr"

	DPCD	= Session("dpcd")
	POSNO	= Session("POSNO")
	vdcd =DPCD
	ls_currrow = "0"
		
		if currrow = "" then
			ls_currrow = "0"
		else
			ls_currrow = currrow
		End If
%>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title></title>	
	
<script language="javascript" src="./js/stock.js"></script>
<script type="text/javascript">
init();
</script>
	<script language="javascript" src="./js/stock_common.js"></script>
	<link rel="stylesheet" href="./css/link.css">  
	<link rel="stylesheet" type="text/css" href="./css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="./css/theme.css" />
	<link rel="stylesheet" href="./css/popup.css">
	<link rel="stylesheet" href="./css/stock_popup.css">
	<script src="./js/jquery.min.js"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.min.css">
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script> 
</head>

<body>
<form name="form" method="post">

<div class="pop-container">   	
		<div class="div-header">   
		<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" >매장 재고실사 등록
		</div>
		<div class="div-body" id="reload">
			<table width="923" border="0" cellspacing="0" cellpadding="0" align="center" height="26" >
			<tr> 
				<td width="923" align="center"> 
					<table width="923" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#5985A8">
					<tr bgcolor="#b5e6ff">
						<td width="80" align="center" height="26">실사일자</td>
						<td width="200" bgcolor="#FFFFFF" align="center">
							<input type="text" id="stock_date"  > 
							<a href="#" onclick="stock_date_cal();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
							</a></td>
						<td width="80" align="center">품번</td>
						<td width="250" bgcolor="#FFFFFF" align="left">&nbsp;
							<input type="text" id ="input_barcode" size="20" maxlength="15" class="box" onChange="javascript:this.value=this.value.toUpperCase();" onkeypress="onKeyUp_Barcode();"> &nbsp;
							<a href="javascript:onKeyUp_Barcode();">
							<img src="../images/B_btn_Search.gif" width="50" height="19" align="absmiddle" border="0"></a>
						<td width="393" bgcolor="#FFFFFF" align="right">
							<a href="javascript:stock_save();">
							<img src="../images/B_btn_Ok.gif" width="50" height="19" align="absmiddle" border="0"></a>&nbsp;&nbsp;&nbsp;
							</td>
					</tr>
		</table>
		
<table>
<tr>
	<td></td>
</tr>
</table>
		<table width="923" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE">
<tr bgcolor="#ceeeff"> 
	<td width="60" height="25"> 
		<div align="center">번호</div>
	</td>
	<td width="120"> 
		<div align="center">스타일</div>
	</td>
	<td width="60"> 
		<div align="center">칼라</div>
	</td>
	<td width="60"> 
		<div align="center">사이즈</div>
	</td>
	<td width="100"> 
		<div align="center">재고수량</div>
	</td>
</tr>
<%
	li_totrow = 0
	li_row    = 0
	
	
	
		for li_row = 0 To 49
%>

			<tr bgcolor="#FFFFFF"> 
				<td width="60" height="25"> 
					<div align="center">
					<input type="text" id="silseq<%=li_row%>" size="7" maxlength="7" class="boxno" value="<%=li_row+1%>" readonly style="text-align: center"></div>
				</td>
				<td width="120"> 
					<div align="center">
					<input type="text" id="stylecd<%=li_row%>" size="13" maxlength="9" class="boxno" readonly style="text-align: center">
					<input type="hidden" id="spcchk<%=li_row%>" size="2" maxlength="2" class="boxno" readonly style="text-align: center">
					</div>
				</td>
				<td width="60" bgcolor="#FFFFFF"> 
					<div align="center"> 
					<input type="text" id="colcd<%=li_row%>" size="4" maxlength="2" class="boxno" readonly style="text-align: center">
					</div>
				</td>
				<td width="60" bgcolor="#FFFFFF"> 
					<div align="center">
					<input type="text" id="sizecd<%=li_row%>" size="5" maxlength="3" class="boxno" readonly style="text-align: center">
					</div>
				</td>
				<td width="100"> 
					<div align="center"> 
					<input type="text" id="jaegoqty<%=li_row%>" size="7" maxlength="3" class="box"  style="text-align: right" >
					</div>
				</td>
			</tr>
		    
<%
		next

%>
  </table>
    </td>
</tr>
</table>
			
		</div>

		<div class="div-footer">	
			<a href="#" class="btn-layerClose" onclick="stock_close()"></a>
		</div>
	         
		
</form>



</body>




</html>