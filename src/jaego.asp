<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--#include virtual="/include/common.asp"-->
<%g_LoginCheck_Pop%>
<%
	'Response.Expires = 0
	'Response.AddHeader "Pragma", "no-cache"
	'Response.AddHeader "cache-control", "no-store"
    Response.CharSet = "euc-kr"
    Response.ContentType = "text/html;charset=euc-kr"

	pcd   = trim(Session("PCD"))
	DPCD	= Session("DPCD")
	tday1 = Right("0000"&Year(now),4)&Right("00"&Month(now),2)&Right("00"&Day(Now),2)
	tday2 = Right("0000"&Year(DateAdd("d",-7,now)),4)&Right("00"&Month(DateAdd("d",-7,now)),2)&Right("00"&Day(DateAdd("d",-7,now)),2)
	if tday1="" then
			tday1=Right("0000"&Year(now),4)&Right("00"&Month(now),2)&Right("00"&Day(Now),2)
		end if

		if tday2="" then
			tdaya = mid(tday1,1,6)
			tdayb = "01"
			tday2 = tdaya & tdayb
		end if

%>



<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- <meta http-equiv="x-ua-compatible" content="IE=11"> -->

	<title>
		���ǻ�
	</title>

	<script language="javascript" src="./js/stock_common.js"></script>
	<link rel="stylesheet" href="./css/link.css">
	<link rel="stylesheet" type="text/css" href="./css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="./css/theme.css" />
	<link rel="stylesheet" href="./css/popup.css">
	<link rel="stylesheet" href="./css/stock_popup.css">
	<script src="./js/jquery.min.js"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.min.css">
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

	<!--<style>
		.ui-datepicker{ font-size: 1.5em; width: 450px; height: 300px; }
		.ui-datepicker select.ui-datepicker-month{ width:30%; font-size: 1.3em; }
		.ui-datepicker select.ui-datepicker-year{ width:30%; font-size: 1.3em; }
		.ui-datepicker select.ui-datepicker-day{ width:30%; font-size: 1.3em; }
	</style>-->

</head>
<body>

<iframe name="iFrame_input"  id="iFrame_input"  style="display:none"></iframe>
<iframe name="if_sale_ok" id="if_sale_ok"  style="display:none"></iframe>
<iframe name="if_gift_search"  id="if_gift_search"  style="display:none"></iframe>
<label id="lbl_outamt" style="display:none;"></label>

<form name="f_body">
<input id="hold_count" type="hidden" value="">

<div class="main-body">
	<div class="main-top">
        <table width="100%" height="10%">
            <tr width="100%" height="100%" cellspacing="0">
				<td width="5%">&nbsp;&nbsp;</td>
			   <td width="5%"><img class="btn-close" align="absmiddle" onclick="pos_close();"></td>
			    <td width="55%" style="font-weight: bold;text-align: center;font-size: 14pt;">���� �ǻ� ���[<%=dpcd%>]</td>
			   <td width ="25%"align="right">
					<!-- <input type="button" class="btn_basic1" onclick="stock_delete();" value="���û���">&nbsp; -->
					<input type="button" class="btn_basic1" onclick="select_search1();" value="������ȸ">&nbsp;<!--
					<input type="button" class="btn_basic1" onclick="select_search();" value="������ȸ">&nbsp; -->
					<input type="button" class="btn_basic1" onclick="stock_open();" value="�ǻ���">&nbsp;
			   </td>
			   <td width="5%">&nbsp;&nbsp;</td>


            </tr>
        </table>

	</div >

	<div class="main-middle1">
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"  >
<tr>
	<td width="90%" align="center">
		<table width="90%" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="grey">
        <tr height="35">
			<td width="80%" bgcolor="#FFFFFF" align="left">
			&nbsp;	<label style="width: 100%; height: 100%;" style="font-weight:bold;">�ǻ�����</label>		&nbsp;
				<input type="text" id="sales2-from"  >
							<a href="#" onclick="sales2_from_cal1();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
							</a>
							~
							<input type="text" id="sales2-to">
							<a href="#" onclick="sales2_to_cal1();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
							</a>&nbsp;&nbsp;&nbsp;
							<label style="width: 100%; height: 100%;" style="font-weight:bold;">����</label>
								<input type="text" id="search_area" maxlength="10" >&nbsp;&nbsp;
                &nbsp;&nbsp;
								<label style="width: 100%; height: 100%;" style="font-weight:bold;">����</label>
								<select id ='stock_tag' >
									  <OPTION value="%">��ü</OPTION>
									  <OPTION value="Y">Ȯ��</OPTION>
									  <OPTION value="N">��Ȯ��</OPTION>
								</select>&nbsp;&nbsp;
								<!-- <input type="button" class="btn_basic" onclick="stock_search();" value="�˻�">&nbsp;&nbsp; -->
							 </td>
               <td width="20%" bgcolor="#FFFFFF" rowspan="2" align ="center">
                 <input type="button" class="btn_basic" onclick="stock_search();" value="�˻�">
               </td>
		</tr>

		<tr bgcolor="#b5e6ff" height="35">

					<td width="80%" bgcolor="#FFFFFF" align="left">
						&nbsp;<label style="width: 100%; height: 100%;" style="font-weight:bold;">���/��������</label>
					&nbsp;
						<input type="text" id="search-from"  >
									<a href="#" onclick="search_from_cal1();" class="no-line">
									<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
									</a>
									~
									<input type="text" id="search-to">
									<a href="#" onclick="search_to_cal1();" class="no-line">
									<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
									</a>&nbsp;&nbsp;&nbsp;
									<label style="width: 100%; height: 100%;" style="font-weight:bold;">�����</label>
										<input type="text" id="search_inuser" maxlength="10" >&nbsp;&nbsp;
								<input type="button" class="btn_basic1" onclick="stock_reset();" value="��ü����">
					</td>

		</tr>
		</table>
    </td>
</tr>
</table>
	</div>
	<div class="main-middle2">
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
<tr>
	<td width="90%" align="center">
		<table width="90%" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#5985A8">
        <tr  bgcolor="#1BA892">
			<td align='center'height='26'  width='1%'><!-- <input type='checkbox' id='main_chk' name='allchk'> --></td>
			<td width="10%" align="center">�ǻ�����</td>
			<td width="10%"  align="center">����</td>
			<td width="10%" align="center">���/���� ����</td>
			<td width="10%" align="center">�Ѱ�</td>
			<td width="10%" align="center">����</td>
			<td width="10%" align="center">�����</td>
		</tr>

		</table>
    </td>
</tr>
</table>
	</div>
	<div class="body-diff">
		<div class="main-content" >
			<table id="table_area"  width="100%"  align="center" bgcolor='grey' cellspacing="1" cellpadding="0" >
				<colgroup>
					<col width="1%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
				</colgroup>
				<tbody></tbody>

			</table>
		</div>
		<div class="main-content1" >
			<table width="100%"  align="center" cellspacing="1" cellpadding="0" bgcolor="gray">
				<tr bgcolor="lightgray" >
					<td align='center'height='26'  width='31%' colspan="4" style = 'font-weight:bold;' >�Ѱ�</td>
					<td width="10%" align="right" style = 'font-weight:bold;'><label id ="total_silqty"></label></td>
					<td width="10%" align="center">&nbsp;</td>
					<td width="10%" align="center" colspan="2">&nbsp;</td>
				</tr>
			</table>
		</div>
	</div>
</div>

</form>

<!-- ��ȸ�� �˾� -->
<div class="dim-layer000">
    <div class="dimBg000"></div>
	<div id="layer000" class="pop-layer000">
		<div class="pop-container">
				<div class="div-header">
					<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>��ȸ��</B>
				</div>
				<div class="div-body">
					<!-- <div id="search_progress" style="font-size:0.2em;float: left;display:inline-block;"></div>
					<div style="float: left;">��ø� ��ٷ��ּ���...</div> -->
					<p align="center">��ø� ��ٷ��ּ���...</p>
				</div>
				<div class="div-footer">
					<!-- <input type="button" class="btn-ok" onclick="dc_all_items();">
					<a href="#" class="btn-layerClose" onclick="dc_all_items_close();"></a> -->
				</div>
			</div>
	</div>
</div>
<!-- ������ -->
<div class="dim-stockmodify">
    <div class="dimBg-stockmodify"></div>
	<div id="stockmodify" class="pop-stockmodify">
			<div class="pop-container">
			<div class="div-header">
				<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>���ǻ�</B>
			</div>
			<div class="div-body">
				<div style="top:0px;height:70px;width:98%;" >
				<table width="100%">
				<tr height="30px">
					<td width="25%">
						<input type="button" id="btn-stock-del" class="btn_basic1" onclick="stock_delete1();" value="���û���">&nbsp;
						<!-- <input id="btn-spcchk-save" class="btn-save"  align="absmiddle"onclick="stockmodify_save();" > -->
					</td>
					<td  width="55%" align="center">
					<label style="font-weight:bold;font-size: 15pt;">�ǻ�����</label>
						<input type="text" class="boxno" id ="modi_sildt" style="font-size: 13pt;" >
						<input type="hidden" id ="modi_svdcd">
						<input type="hidden" id ="modi_tag">
						<input type="hidden" id ="modi_area">
					</td>
					<td align="right"  width="20%" >

						<input type="button" id="btn-spcchk-save"  class="btn_basic1" onclick="stockmodify_save();" value="�ǻ����">&nbsp;
					</td>
				</tr>
				<tr height="30px">


					<td align="right" colspan="3"  width="100%" >
						<input name="filter_radio"  id="for_style" type="radio" value="1"  style="width:13px;height:13px;">
						<label style="width: 100%; height: 100%;" for="for_style" style="font-weight:bold;">��Ÿ��</label>
						<input name="filter_radio"  id="for_col"type="radio" value="2" style="width:13px;height:13px;">
						<label style="width: 100%; height: 100%;" for="for_col" style="font-weight:bold;">�÷�</label>
						<input name="filter_radio"  id="for_size" type="radio" value="3" style="width:13px;height:13px;">
						<label style="width: 100%; height: 100%;" for="for_size" style="font-weight:bold;">������</label>
						<input id="filter_barcode" type="text" size="20" maxlength="15" class="box" onChange="javascript:this.value=this.value.toUpperCase();" >&nbsp;
						<input type="button" class="btn_basic2" onclick="filter_search();" value="�˻�" style="width:38px; height:30px;vertical-align: middle;">
					</td>

				</tr>
				</table>


				</div>
				<div style="top:70px;height:28px;width:97%;" >

						<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="grey">
							<tr  bgcolor="grey">
								<td width="1%" height="25"  bgcolor="#1BA892">
									<div align="center"><input type="checkbox" name="all_silchk" style="width:15px;height:15px;" ></div>
								</td>
								<td width="5%" height="25"  bgcolor="#1BA892">
									<div align="center">��ȣ</div>
								</td>
								<td width="5%"  bgcolor="#1BA892">
									<div align="center">����</div>
								</td>
								<td width="10%"  bgcolor="#1BA892">
									<div align="center">����</div>
								</td>
								<td width="10%"  bgcolor="#1BA892">
									<div align="center">��Ÿ��</div>
								</td>
								<td width="10%"  bgcolor="#1BA892">
									<div align="center">Į��</div>
								</td>
								<td width="10%"  bgcolor="#1BA892">
									<div align="center">������</div>
								</td>
								<td width="10%"  bgcolor="#1BA892">
									<div align="center">������</div>
								</td>
							</tr>
						</table>
				</div>
						<div style="top:90px;height:75%;overflow-y:scroll;width:99%;">
						<table width="100%" id="tb_stockmodify" class="t_container" width="100%" align="center" cellspacing="1" cellpadding="1"   bgcolor='grey'>
							<colgroup>
								<col width="1%"/>
								<col width="5%"/>
								<col width="5%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
							</colgroup>
							<tbody></tbody>
						</table>
						</div>

			</div>
			<div class="div-footer">
				<a href="#" class="btn-layerClose" onclick="stockmodify_close();"></a>
			</div>
		</div>
	</div>
</div>


<!-- �ǻ�������ȸ -->
<div class="dim-stocksearch">
    <div class="dimBg-stocksearch"></div>
	<div id="stocksearch" class="pop-stocksearch">
			<div class="pop-container">
			<div class="div-header">
				<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>�ǻ�������ȸ</B>
			</div>
			<div class="div-body">
						<div style="top:0px;height:70px;width:99%;" >
						<table border = 0 width="100%" >
							<tr height="30px" bgcolor="#ffffff">

										<td align="right" width="100%" >
											<input name="select_radio"  id="s_sty" type="radio" value="1"  style="width:13px;height:13px;">
											<label style="width: 100%; height: 100%;" for="s_sty" style="font-weight:bold;">��Ÿ��</label>
											<input name="select_radio"  id="s_col"type="radio" value="2" style="width:13px;height:13px;">
											<label style="width: 100%; height: 100%;" for="s_col" style="font-weight:bold;">�÷�</label>
											<input name="select_radio"  id="s_size" type="radio" value="3" style="width:13px;height:13px;">
											<label style="width: 100%; height: 100%;" for="s_size" style="font-weight:bold;">������</label>
											<input id="sel_barcode" type="text" size="20" maxlength="15" class="box" onChange="javascript:this.value=this.value.toUpperCase();" >&nbsp;
											<input type="button" class="btn_basic2" onclick="filter_search_select();" value="�˻�" style="width:38px; height:30px;vertical-align: middle;">
										</td>

							</tr>
						</table>
								<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE">
									<tr bgcolor="#ceeeff">
										<td width="10%" height="25">
											<div align="center">�ǻ�����</div>
										</td>
										<td width="5%" height="25">
											<div align="center">��ȣ</div>
										</td>
										<td width="10%">
											<div align="center">����</div>
										</td>
										<td width="10%">
											<div align="center">��Ÿ��</div>
										</td>
										<td width="10%">
											<div align="center">Į��</div>
										</td>
										<td width="10%">
											<div align="center">������</div>
										</td>
										<td width="10%">
											<div align="center">������</div>
										</td>
									</tr>
								</table>
						</div>
						<div style="top:80px;height:82%;overflow-y:scroll;width:100%;">
						<table width="100%" id="tb_stocksearch" class="t_container" width="100%" align="center" cellspacing="1" cellpadding="1"   bgcolor='grey'>
							<colgroup>
								<col width="10%"/>
								<col width="5%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
							</colgroup>
							<tbody></tbody>
						</table>
						</div>

			</div>
			<div class="div-footer">
				<a href="#" class="btn-layerClose" onclick="stocksearch_close();"></a>
			</div>
		</div>
	</div>
</div>
<!-- ������� -->
<div class="dim-layer100">
    <div class="dimBg100"></div>
	<div id="layer100" class="pop-layer100">
			<div class="pop-container">
			<div class="div-header">
				<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>�������</B>
			</div>
			<div class="div-body">
				<div style="height: 20%;">
					<table width="100%" height="100%">
						<tr>
							<td style="width: 100%; height: 100%;">
							<label style="width: 100%; height: 100%;font-weight:bold;">�ǻ������</label>
							<input type="text" id="silsadt_from">
							<!-- <a href="#" onclick="silsadt_from_cal1();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="center">
							</a>

							<input type="text" id="silsadt_to">
							<a href="#" onclick="silsadt_to_cal1();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="center">
							</a> -->
								<input id="silsa_brcdchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;font-weight:bold;">�귣��</label>
								<select id ='silsa_brcd' onchange="silsabrcdchk();" >
									<option value="%">��ü</option>
								</select>
								</select>
								&nbsp;&nbsp;
								<input id="silsa_yearchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;font-weight:bold;">�⵵</label>
								<select id ='silsa_year' onchange="silsayearchk();" >
									<option value="%">��ü</option>
								</select>&nbsp;&nbsp;&nbsp;
								<input id="silsa_seasonchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;font-weight:bold;">����</label>
								<select id ='silsa_season' onchange="silsaseasonchk();" >
									<option value="%">��ü</option>
								</select>&nbsp;&nbsp;&nbsp;
								<!-- <input id="silsa_spcchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;">����</label>
								<select id ='silsa_spc' onchange="silsaspcchk();">
								</select>
								&nbsp;&nbsp;&nbsp; -->

							<img class="btn-search" align="center" onclick="select_stock1();">
							</td>

						</tr>
						<tr>
							<td colspan="2" width="100%" align="left">
								<input id="silsa_sexchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;font-weight:bold;">����</label>
								<select id ='silsa_sex' onchange="silsasexchk();" >
									<option value="%">��ü</option>
								</select>
								&nbsp;&nbsp;&nbsp;
								<input id="silsa_itypechk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;font-weight:bold;">����</label>
								<select id ='silsa_itype' onchange="silsaitypechk();" >
									<option value="%">��ü</option>
								</select>
								&nbsp;&nbsp;&nbsp;
								<input id="silsa_itemchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;font-weight:bold;">������</label>
								<select id ='silsa_item' onchange="silsaitemchk();" >
								</select>
											<input name="silsa_radio"  id="silsa_sty" type="radio" value="1"  style="width:13px;height:13px;">
											<label style="width: 100%; height: 100%;" for="silsa_sty" style="font-weight:bold;">��Ÿ��</label>
											<input name="silsa_radio"  id="silsa_col"type="radio" value="2" style="width:13px;height:13px;">
											<label style="width: 100%; height: 100%;" for="silsa_col" style="font-weight:bold;">�÷�</label>
											<input name="silsa_radio"  id="silsa_size" type="radio" value="3" style="width:13px;height:13px;">
											<label style="width: 100%; height: 100%;" for="silsa_size" style="font-weight:bold;">������</label>
											<input id="silsa_barcode" type="text" size="20" maxlength="15" class="box" onChange="javascript:this.value=this.value.toUpperCase();" >&nbsp;

						<td>
						</tr>

					</table>

				</div>
				<div id="jsGrid100"  style="float:left;width:79%;overflow-y: scroll; height : 90%;" >
					<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE">
									<tr bgcolor="#1BA892">
										<td width="10%" height="25">
											<div align="center">��Ÿ��</div>
										</td>
										<td width="5%" height="25">
											<div align="center">Į��</div>
										</td>
										<td width="5%">
											<div align="center">������</div>
										</td>
										<td width="10%">
											<div align="center">�ǻ����</div>
										</td>
										<td width="10%">
											<div align="center">�������</div>
										</td>
										<td width="10%">
											<div align="center">��������</div>
										</td>
										<td width="10%">
											<div align="center">�ǸŰ�*�ǻ����</div>
										</td>
										<td width="10%">
											<div align="center">�ǸŰ�*�������</div>
										</td>
										<td width="10%">
											<div align="center">�ݾ�����</div>
										</td>
										<td width="10%">
											<div align="center">���Թ�Ȯ��</div>
										</td>
										<td width="10%">
											<div align="center">�����Ȯ��</div>
										</td>
									</tr>
								</table>
								<table width="100%" id="tb_stocksearch1" class="t_container"  align="center" cellspacing="1" cellpadding="1"   bgcolor='grey'>
							<colgroup>
								<col width="10%"/>
								<col width="5%"/>
								<col width="5%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
								<col width="10%"/>
							</colgroup>
							<tbody></tbody>
						</table>
				</div>
				<div style="float:left;width:20%;height:80%;overflow-y:scroll;">
					<table width="90%" align="center" >
								<tr>
									<td   width="100%"  colspan="2" align="center">
										&#60;�ǻ�����&#62;
									</td>
								</tr>
								<tr>
									<td   width="100%"  colspan="2" align="center">
									&nbsp;&nbsp;
									</td>
								</tr>
								<tr>
									<td colspan="2" align="center"style="font-weight:bold;">
										���� / �ƿ﷿ ����
									</td>
								</tr>
								<tr>
									<td>
										����
									</td>
									<td class ="layer100_label">
										<label id ="J_SILQTY"/>
									</td>
								</tr>
								<tr>
									<td>
										�ƿ﷿
									</td>
									<td class ="layer100_label">
										<label id ="O_SILQTY"/>
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<hr style="height:2%;width:100%;" / >
									</td>
								</tr>
								<tr>
									<td colspan="2" align="center"style="font-weight:bold;">
										[���� �귣�庰 ����]
									</td>
								</tr>
								<tr>
									<td style="font-weight:bold;">
										�귣��
									</td>
									<td class ="layer100_label">
										�ǻ���� / �����
									</td>
								</tr>
								<tr>
									<td  colspan="2">
										<table id ="brcd_sum" width="100%">
											<tbody></tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td colspan="2" >
										<hr style="height:2%;width:100%;" / >
									</td>
								</tr>
                <tr>
									<td colspan="2" align="center"style="font-weight:bold;">
										[�ƿ﷿ �귣�庰 ����]
									</td>
								</tr>
								<tr>
									<td style="font-weight:bold;">
										�귣��
									</td>
									<td class ="layer100_label">
										�ǻ���� / �����
									</td>
								</tr>
								<tr>
									<td  colspan="2">
										<table id ="sang_brcd_sum" width="100%">
											<tbody></tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td colspan="2" >
										<hr style="height:2%;width:100%;" / >
									</td>
								</tr>

								<tr>
									<td colspan="2" align="center"style="font-weight:bold;">
										[���ں� ����]
									</td>
								</tr>
								<tr>
									<td  colspan="2">
										<table id ="sildt_sum" width="100%">
											<tbody></tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td colspan="2">
										<hr style="height:2%;width:100%;" / >
									</td>
								</tr>

								<tr style="font-weight:bold;">
									<td>
										�Ѱ�
									</td>
									<td class ="layer100_label">
										<label class ="layer100_label" id ="silsa_tot"/>
									</td>
								</tr>

							</table>
				</div>
			</div>
			<div class="div-footer">
				<!--
				<a href="#" class="btn-layerSave" onclick="pop_item();">����</a>

				<input type ="button" value ="�ݱ�" onclick ="sokbo_close();" class="btn-layerClose" >-->
				<a href="#" class="btn-layerClose" onclick ="stocksearch_close1();"></a>
			</div>
		</div>
	</div>
</div>


<!-- ����� -->
<div class="dim-stock">
    <div class="dimBg-stock"></div>
	<div id="stock" class="pop-stock">

<div class="pop-container">
		<div class="div-header">
		<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" >���� ���ǻ� ���
		</div>
		<div class="div-body" id="reload">
					<table width="100%" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#5985A8">
						<tr bgcolor="#1BA892">
							<td width="80" align="center" height="26">�ǻ�����</td>
							<td width="200" bgcolor="#FFFFFF" align="center">
								<input type="text" id="stock_date"  >
								<a href="#" onclick="stock_date_cal();" class="no-line">
								<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
								</a></td>
							<td width="80" align="center">ǰ��</td>
							<td id="td_barcode" width="250" bgcolor="#FFFFFF" align="left" onclick="document.getElementById('input_barcode').focus();">&nbsp;
									<input class="input-barcode" id="input_barcode" type="text" autocomplete="off" maxlength="13" onkeyup="onKeyUp_Barcode();" value="" autofocus onfocus="document.getElementById('td_barcode').style.backgroundColor='yellow';" onblur="document.getElementById('td_barcode').style.backgroundColor='';" >&nbsp;
								<a href="javascript:onKeyUp_Barcode();">
									<!-- <input class="input-barcode" id="input_barcode" type="text" autocomplete="off" maxlength="13" onkeyup="onKeyUp_Barcode();" value="" autofocus> -->&nbsp;
								<a href="javascript:onKeyUp_Barcode();">
								<img src="../images/B_btn_Search.gif" width="50" height="19" align="absmiddle" border="0"></a>
							<td align="center" width="80">�����	</td>
							<td bgcolor="#FFFFFF" width="250">
							&nbsp;&nbsp;<select id="shop_sel" style="width: 90%; font-size: 10pt;">
										</select>
							</td>
							<td width="100" bgcolor="#FFFFFF" align="right">
								<a href="javascript:stock_save();">
								<img src="../images/B_btn_Ok.gif" width="50" height="19" align="absmiddle" border="0"></a>&nbsp;&nbsp;&nbsp;
								</td>
						</tr>
						<tr bgcolor="#1BA892">
							<td  align="center">����</td>
							<td bgcolor="#FFFFFF" align="left" colspan="6">&nbsp;
								<input type="text" id ="stock_remark" size ="35" maxlength="16" class="box" >
							</td>
						</tr>
			</table>
<div style=" width:99%;">
<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE" align="left">
<tr bgcolor="#1BA892">
	<td width="90" height="25">
		<div align="center">��ȣ</div>
	</td>
	<td width="90">
		<div align="center">����</div>
	</td>
	<td width="120">
		<div align="center">��Ÿ��</div>
	</td>
	<td width="100">
		<div align="center">Į��</div>
	</td>
	<td width="100">
		<div align="center">������</div>
	</td>
	<td width="100">
		<div align="center">�����</div>
	</td>
	<td width="100">
		<div align="center">������</div>
	</td>
	<td width="100">
		<div align="center">����</div>
	</td>
</tr>
</table>
</div>
<div id="div1" style="width:100%;height:75%;overflow-y:scroll;">
		<table width="100%" id="tb_stocklist" class="t_container" border="0" align="left" cellspacing="1" cellpadding="1">
			<colgroup>
				<col width="90"/>
				<col width="90"/>
				<col width="120"/>
				<col width="100"/>
				<col width="100"/>
				<col width="100"/>
				<col width="100"/>
				<col width="100"/>
			</colgroup>
			<tbody bgcolor="white"></tbody>
		</table>
</div>
<div style="height:50px;width:100%;">
<table width="100%" class="t_container" width="90%" height="30" border="1"   cellspacing="0" cellpadding="0" align="left" bgcolor="#6A95AE">
	<tr bgcolor="#1BA892">
	<td width="770" align="center">
		�����հ�
	</td>
	<td width="120" align="center" bgcolor="#FFFFFF">
		<input type="text" id="total_qty" size="7" class="boxno">
	</td>
	<td width="100">
	</td>
	</tr>
</table>
</div>
		<div class="div-footer">
			<a href="#" class="btn-layerClose" onclick="stock_close()"></a>
		</div>
	</div>
</div>

	<script language="javascript" src="./js/stock.js"></script>
	<script>
		$(document).ready(function() {
			console.log("jquery ready start");
			init();
			get_select();
			get_chkbox();
		});

		function pos_close() {

			try{
				opener.closed_refresh();
				window.close();
			}
			catch (e) {
				window.close();
			}

}
	</script>

</body>


</html>
