<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--#include virtual="/include/common.asp"-->
<%g_LoginCheck_Pop%>
<%
	'Response.Expires = 0
	'Response.AddHeader "Pragma", "no-cache"
	'Response.AddHeader "cache-control", "no-store"
    Response.CharSet = "euc-kr"
    Response.ContentType = "text/html;charset=euc-kr"
    PCD = Session("PCD")
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



  ' SELECT BOX�� �귣�� ����� �޾ƿ��� ����.
      open_dbo

      SQL = "SELECT VDCD,                        "
      SQL = SQL & "     (SELECT BRSNM            FROM TBB030           WHERE TBB030.BRCD = TBB040.BRAND) "
      SQL = SQL & " BRNM    FROM TBB040 "
      SQL = SQL & " WHERE PCD = '"&PCD&"' AND USEYN = 'Y' "
      SQL = SQL & " ORDER BY DECODE (VDCD, '"&DPCD&"', 1) ASC "


      set rs9=server.createobject("adodb.recordset")
      rs9.open SQL,db

      ' response.write SQL
      'response.end
      if rs9.eof then
        arrData9=null
        arrDate9null = True
      else
        arrData9 = rs9.getrows()
      end if
      rs9.close
      Set rs9=Nothing

    	close_db
%>



<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- <meta http-equiv="x-ua-compatible" content="IE=11"> -->

	<title>
		NEW_�԰���ȸ
	</title>

	<script language="javascript" src="./js/stock_common.js"></script>
	<link rel="stylesheet" href="./css/link.css">
	<link rel="stylesheet" type="text/css" href="./css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="./css/theme.css" />
	<link rel="stylesheet" href="./css/popup.css">
	<link rel="stylesheet" href="./css/return_popup.css">
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

  <!-- 20191016 byCho ���̾ƿ����� -->
  <div class="main-top">
        <table width="100%" height="10%" >
          <tr width="100%" height="100%" cellspacing="0">
              <td width="35%"></td>
              <td width="30%" style=" font-weight: bold;text-align: center;font-size: 14pt;">�����԰���ȸ[<%=dpcd%>]</td>
              <td width="30%" style=" text-align : right;"><img class="btn-close" align="absmiddle" onclick="pos_close();">&nbsp;
            </td>
            <td width="5%"></td>
          </table>
  </div>
  <div class="main-middle1">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"  >
	<tr>
		<td width="90%" align="center">
			<table width="90%" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#5985A8">
			<tr bgcolor="#1BA892" height="30">
				<td width="12%" align="center" height="26">�԰�����</td>
				<td width="35%" bgcolor="#FFFFFF" align="center" colspan="3">
				&nbsp;
					<input type="text" id="return-from"  >
								<a href="#" onclick="return_from_cal1();" class="no-line">
								<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
								</a>
								~
								<input type="text" id="return-to">
								<a href="#" onclick="return_to_cal1();" class="no-line">
								<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
								</a>&nbsp;
				</td>
				<td  width="12%" align="center">
								<label style="width: 100%; height: 100%;" style="font-weight:bold;">����</label>
        </td>
        <td  width="15%" align="center" bgcolor="#FFFFFF">
          <select id ='gubun' >
            		<OPTION value="%">��ü</OPTION>
                <OPTION value="S1000">����(����)</OPTION>
                <OPTION value="S4000">����(������)</OPTION>
            </select>
        </td>
        <td  width="8%" align="center" >
								<label style="width: 100%; height: 100%;" style="font-weight:bold;">�귣��</label>
        </td>
        <td  width="13%" align="center" bgcolor="#FFFFFF">

                <SELECT name="select" id ='return_tag'>
								<%for i=0 to Ubound(arrData9,2) %>
							  <option  value=<%=arrData9(0,i)%> ><%=arrData9(1,i)%></option>
								<%next%>
								</SELECT>
				</td>

			</tr>
			<tr bgcolor="#1BA892" height="40">

			  <td align="center" height="26">��ǥ&�ڽ���ȣ</td>
				<td align="center" bgcolor="#FFFFFF" align="left" >
            &nbsp;<input name="radio"  style="width:10px;height:10px;" id="jun_radio" type="radio" value="1" checked>
            <label  style="cursor:pointer; font-size:10px;" for="jun_radio">��ǥ</label>
            <input name="radio"  style="width:10px;height:10px;" id="box_radio" type="radio" value="2" >
            <label  style="cursor:pointer; font-size:10px;" for="box_radio">�ڽ�</label>&nbsp;
					<input  type="text"  id = "box_barcode" style="width:50%; height:100%;vertical-align: middle; text-transform: uppercase;">&nbsp;
          <a href="#" onclick="reset_d();" class="no-line">
          <IMG src="./images/btn_delb.gif" width="15" height="15" align="absmiddle">
          </a>
		    </td>
        <td align="center" height="26" width="70" colspan="2">ǰ��</td>
        <td bgcolor="#FFFFFF" align="center" colspan="2">
					<input  type="text" id = "prd_barcode" style="width:50%; height:100%;vertical-align: middle; text-transform: uppercase;" >
          <a href="#" onclick="reset_e();" class="no-line">
          <IMG src="./images/btn_delb.gif" width="15" height="15" align="absmiddle">
          </a>
		    </td>
        <td bgcolor="#FFFFFF"  align="center"  colspan="3">
          <input  type="button" class="btn_basic" onclick="return_search();" value="�˻�"style="width:90%; height:100%;vertical-align: middle;">
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
			<table width="90%" id ="table_area_top" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#5985A8">
			<tr bgcolor="#1BA892">
				<td width="20" align="center" height="26">NO</td>
        <td width="50" align="center" >����</td>
				<td width="80" align="center" >�������</td>
				<td width="100" align="center" >��ǥ��ȣ</td>
				<td width="100" align="center" >�ڽ���ȣ</td>
				<td width="80" align="center" >����</td>

			</tr>

			</table>
		</td>
	</tr>
	</table>
	</div>
	<div class="main-content" >
			<table id="table_area" width="100%"  align="center" class="type01">

				<tbody >
				</tbody>
			</table>
	</div>
	<div class="main-content_bottom1" >

			<table id="total_area1" width="99%"  align="center" bgcolor='#dcdcdc' cellspacing="1" cellpadding="0" >
				<tbody ></tbody>
			</table>
	</div>


	<div class="bottom-btn">
		<table width="90%" >

			<tr>
					<td width="20%">
            <input type="button" id="btn-return-box" class="btn_basic1" onclick="boxlist_open();" value="�԰�����">
					</td>
					<td  width="60%" align="center">
					<label id="modi_label" style="font-weight:bold;font-size: 15pt;"></label>
						<input type="text" class="boxno" id ="modi_outdt" value = "" style="font-size: 13pt; " readonly>
						<input type="hidden" class="boxno" id ="modi_outno" style="font-size: 13pt;" >
					</td>
					<td align="right"  width="10%" ><!-- <input id="btn-spcchk-save" class="btn-save"  align="absmiddle"onclick="returnmodify_save();" >		 -->
				</tr>
		</tr>
		</table>
	</div>
	<div class="main-middle3">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
	<tr>
		<td width="90%" align="center">
			<table width="90%" id ="table_area1_top" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#5985A8">
			<tr bgcolor="#1BA892">
								<td width="25">
									<div align="center">NO</div>
								</td>
								<td width="80">
									<div align="center">��Ÿ��</div>
								</td>
								<td width="40">
									<div align="center">Į��</div>
								</td>
								<td width="50">
									<div align="center">������</div>
								</td>
                <td width="70">
                  <div align="center">�������</div>
                </td>
								<td width="80">
									<div align="center">�ǸŰ�</div>
								</td>
								<td width="40">
									<div align="center">����</div>
								</td>
                <td width="80">
									<div align="center">�ݾ�</div>
								</td>
							</tr>
			</table>
		</td>
	</tr>
	</table>
	</div>

	<div class="main-content2" >

			<table id="table_area1" width="100%"  align="center" bgcolor='grey' cellspacing="1" cellpadding="0" >
				<tbody ></tbody>
			</table>
	</div>
	<div class="main-content_bottom2" >

			<table id="total_area2" width="99%"  align="center" bgcolor='#dcdcdc' cellspacing="1" cellpadding="0" >
				<tbody ></tbody>
			</table>
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

<!-- ��ǰ���� -->
<div class="dim-returnmodify">
    <div class="dimBg-returnmodify"></div>
	<div id="returnmodify" class="pop-returnmodify">
			<div class="pop-container">
			<div class="div-header">
				<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>��ǰ��ȸ</B>
			</div>
			<div class="div-body">
				<div style="top:0px;height:40px;" >
				<table width="100%">
				<tr>
					<td width="15%">
						<input type="button" id="btn-return-del" class="btn_basic1" onclick="return_delete1();" value="��ǰ����">
						<input type="button" class="btn_basic1" onclick="boxlist_open();" value="�ڽ�������">
					</td>
					<td  width="65%" align="center">
					</td>
					<td align="center"  width="10%" ><!-- <input id="btn-spcchk-save" class="btn-save"  align="absmiddle"onclick="returnmodify_save();" >		 -->
						<input type="button" id="btn-spcchk-save"  class="btn_basic1" onclick="returnmodify_save();" value="���ü���"></td>
				</tr>
				</table>


				</div>
				<div style="top:50px;height:28px;width:99%;" >
						<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE">
							<tr bgcolor="#1BA892">
								<td width="30" height="30">
									<div align="center">��ȣ</div>
								</td>
								<td width="70">
									<div align="center">â��</div>
								</td>
								<td width="70">
									<div align="center">�Ǹ�����</div>
								</td>
								<td width="70">
									<div align="center">��Ÿ��</div>
								</td>
								<td width="70">
									<div align="center">Į��</div>
								</td>
								<td width="70">
									<div align="center">������</div>
								</td>
								<td width="70">
									<div align="center">�Ƿڼ���</div>
								</td>
								<td width="70">
									<div align="center">Ȯ������</div>
								</td>
								<td width="70">
									<div align="center">�ǸŴܰ�</div>
								</td>
								<td width="70">
									<div align="center">���޴ܰ�</div>
								</td>
								<td width="70">
									<div align="center">�ǸŰ���</div>
								</td>
								<td width="70">
									<div align="center">ó������</div>
								</td>
								<td width="70">
									<div align="center">Ȯ������</div>
								</td>
							</tr>
						</table>
				</div>
						<div style="top:80px;height:82%;overflow-y:scroll;width:100%;">
						<table width="100%" id="tb_returnmodify" class="t_container" align="center" cellspacing="1"  bgcolor="grey">
							<colgroup>
								<col width="30"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
								<col width="70"/>
							</colgroup>
							<tbody></tbody>
						</table>
						</div>

			</div>
			<div class="div-footer">
				<a href="#" class="btn-layerClose" onclick="returnmodify_close();"></a>
			</div>
		</div>
	</div>
</div>

<!-- �԰�ڽ������� -->
<div class="dim-boxlist">
    <div class="dimBg-boxlist"></div>
	<div id="boxlist" class="pop-boxlist">
			<div class="pop-container">
			<div class="div-header">
        <table width="100%">
          <tr>
            <td width="5%"></td>
            <tD width="10%">
						  <input type="button" class="btn_basic1"  onclick="javascript:printIt(document.getElementById('prt_page').innerHTML)" value="���">
            </td>
            <td width="70%" align = "center">
				      <IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>�԰� �ڽ� ������</B>
            </td>
            <tD width="10%">
               <a href="#" class="btn-layerClose" onclick="boxlist_close();"></a>
            </td>
            <td width="5%"></td>
          </table>
			</div>
			<div class="div-body" id="prt_page">
				<div style="top:0px;height:40px;" >
				<table width="100%">
				<tr>
					<td width="10%">

					</td>
					<td  width="70%" align="center">
					<label style="font-weight:bold;font-size: 15pt;">�԰�����</label>
            <label id ="list_outdt" style="font-size: 13pt;" />
						<!-- <input type="text" class="boxno" id ="list_outdt" style="font-size: 13pt;" > -->
					</td>
					<td align="center"  width="5%" >&nbsp;</td>
				</tr>
				</table>
				</div>
				<div style="top:50px;height:100%;width:100%; overflow:auto;" >
						<table border='1' width="680" align="center"  id="td_boxlist" cellspacing="0">
							<thead>
								<tr>
									<td colspan="6" align="center">
										&nbsp;
									</td>
								</tr>
								<tr>
									<td colspan="3"align="center" ><label class="text1"/>�԰����</td>
									<td colspan="3"align="center"><label class="text1" id ="list_vdnm"/></td>
								</tr>
								<tr>
									<td align="center" width="100"><label class="text2"/>�ڽ�</td>
									<td colspan="5" align="center"width="500"><label id ="list_barcode" class="barcode"></td>
								</tr>

                <tr>
									<td  align="center" width="150">
										<label class="text2"/>ǰ��
									</td>
									<td  align="center"width="50"  >
										<label class="text2"/>����
									</td>
                  <td  align="center" width="100"   >
										<label class="text2"/>�ݾ�
									</td>
									<td  align="center"  width="150">
										<label class="text2"/>ǰ��
									</td>
									<td  align="center" width="50"  >
										<label class="text2"/>����
									</td>
                  <td  align="center" width="100"  >
										<label class="text2"/>�ݾ�
									</td>
								</tr>

							</thead>
								<tbody>
								</tbody>
							<tfoot>
                <tr>
									<td  align="center"width="100">
										<label class="text2"/>����
									</td>
									<td  align="center"colspan="2">
										<label  class="text2">�԰�
									</td>
									<td align="center" width="100">
										<label class="text2"/>�Ѽ���
									</td>
									<td  align="center"colspan="2">
										<label id ="list_totqty" class="text2">
									</td>
								</tr>
								<tr>
									<td align="center" width="100">
										<label class="text2"/>��ǰâ��
									</td>
									<td align="center" colspan="2">
										<label id ="list_whnm" class="text2">
									</td>
									<td align="center" width="100">
										<label class="text2"/>�귣��
									</td>
									<td align="center" colspan="2">
										<label class="text2" id="list_brcd" />
									</td>
								</tr>
							</tfoot>
						  </table>
				</div>
			</div>
			<!-- <div class="div-footer">
				<a href="#" class="btn-layerClose" onclick="boxlist_close();"></a>
			</div> -->
		</div>
	</div>
</div>



<!-- ������ �˾� -->
<div class="dim-layer001">
    <div class="dimBg001"></div>
	<div id="layer001" class="pop-layer001">
		<div class="pop-container">
				<div class="div-header">
					<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>������</B>
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




<!-- ��ǰ��� -->
<div class="dim-return">
    <div class="dimBg-return"></div>
	<div id="return" class="pop-return">

<div class="pop-container">
		<div class="div-header">
		<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><label id="lbl_rText"/>
		</div>
		<div class="div-body" id="reload">
					<table width="100%" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#5985A8">
						<tr bgcolor="#1BA892">
							<td width="80" align="center" height="26">��ǰ����</td>
							<td width="200" bgcolor="#FFFFFF" align="center">
								<input type="text" id="return_date"  >
								<a href="#" onclick="return_date_cal();" class="no-line">
								<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
								</a></td>
							<td width="80" align="center">â��</td>
							<td width="250" bgcolor="#FFFFFF" align="left">&nbsp;
								<select id="whcdselect" style="width: 90%; font-size: 10pt;">
								</select>
							</td>
							<td width="80" align="center">���</td>
							<td width ="250" bgcolor="#FFFFFF" align="left">&nbsp;
								<input type="text" id ="return_remark" size ="35" maxlength="16" class="box" >
							</td>
							<td width="100" bgcolor="#FFFFFF" align="center" rowspan="2">
								<input type="button" id="btn-return-save"  class="btn_basic1" onclick="return_save();" value="����"></td>
								<!-- <a href="javascript:return_save();">
								<img src="../images/B_btn_Ok.gif" width="50" height="19" align="absmiddle" border="0"></a> -->&nbsp;&nbsp;&nbsp;
								</td>
						</tr>
						<tr bgcolor="#1BA892">
						<td align="center">�ڽ�NO	</td>
						<td bgcolor="#FFFFFF" align="left">&nbsp;<input id="input_boxno" type="text"  size="20" maxlength="10" class="box"onkeyup="onKeyUp_Boxchk();" >
								<a href="#" onclick="reset_box();" class="no-line">
								<IMG src="./images/btn_delb.gif" width="15" height="15" align="absmiddle">
								</a>
						</td>
						<td width="80" align="center">ǰ��</td>
							<td id="td_barcode" width="250" bgcolor="#FFFFFF" align="left" onclick="document.getElementById('input_barcode').focus();">&nbsp;
									<input class="input-barcode" id="input_barcode" type="text" autocomplete="off" maxlength="13" onkeyup="onKeyUp_Barcode();" value="" autofocus onfocus="document.getElementById('td_barcode').style.backgroundColor='yellow';" onblur="document.getElementById('td_barcode').style.backgroundColor='';" >&nbsp;
								<a href="javascript:onKeyUp_Barcode();">
								<img src="../images/B_btn_Search.gif" width="50" height="19" align="absmiddle" border="0"></a>
							</td>

						<td align="left"  bgcolor="#FFFFFF" colspan="2">&nbsp;
					<input type=file name="xlsfile" size=10 > </td>
						</tr>
			</table>
<div style=" width:99%;">
<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE" align="left">
<tr bgcolor="#1BA892">
	<td width="100" height="25">
		<div align="center">��ȣ</div>
	</td>
	<td width="100">
		<div align="center">����</div>
	</td>
	<td width="150">
		<div align="center">��Ÿ��</div>
	</td>
	<td width="150">
		<div align="center">Į��</div>
	</td>
	<td width="150">
		<div align="center">������</div>
	</td>
	<td width="120">
		<div align="center">�������</div>
	</td>
	<td width="120">
		<div align="center">��ǰ����</div>
	</td>
	<td width="120">
		<div align="center">�ǸŰ�</div>
	</td>
	<td width="120">
		<div align="center">�ǸŰ���</div>
	</td>
	<td width="100">
		<div align="center">����</div>
	</td>
</tr>
</table>
</div>
<div  id="div1" style="width:100%;height:70%;overflow-y:scroll;">
		<table width="100%" id="tb_returnlist" class="t_container" border="0" align="left" bgcolor="#6A95AE"  cellspacing="1" cellpadding="1">
			<colgroup>
				<col width="100"/>
				<col width="100"/>
				<col width="150"/>
				<col width="150"/>
				<col width="150"/>
				<col width="120"/>
				<col width="120"/>
				<col width="120"/>
				<col width="120"/>
				<col width="100"/>
			</colgroup>
			<tbody bgcolor="#dcdcdc"></tbody>
		</table>
</div>
<div style="height:50px;width:100%;">
<table width="100%" class="t_container" width="90%" height="30" border="1"   cellspacing="0" cellpadding="0" align="left" bgcolor="#6A95AE">
	<tr bgcolor="#1BA892">
	<td width="770" align="center">
		�����հ�
	</td>
	<td width="120" align="center" bgcolor="#FFFFFF">
		<input type="text" id="total_rqty" size="7" class="boxno">
	</td>
	<td width="100">
	</td>
	</tr>
</table>
</div>
		<div class="div-footer">
			<a href="#" class="btn-layerClose" onclick="return_close(1)"></a>
		</div>
	</div>
</div>

	<script language="javascript" src="./js/warehousing.js"></script>
	<script>
		$(document).ready(function() {
			console.log("jquery ready start");
			init();
			//get_chkbox();
			get_select();
		});

// 		function pos_close() {
//
// 			try{
// 				opener.closed_refresh();
// 				window.close();
// 			}
// 			catch (e) {
// 				window.close();
// 			}
//
// }
	</script>

</body>


</html>
