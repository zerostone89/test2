<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!--#include virtual="/include/common.asp"-->
<%g_LoginCheck_Pop%>
<%
	'Response.Expires = 0
	'Response.AddHeader "Pragma", "no-cache"
	'Response.AddHeader "cache-control", "no-store"
    Response.CharSet = "euc-kr"
    Response.ContentType = "text/html;charset=euc-kr"

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
		이천반품
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
	<div class="main-top">
        <table width="100%" height="10%" >
          <tr width="100%" height="100%" cellspacing="0">
              <td width="35%"></td>
              <td width="30%" style=" font-weight: bold;text-align: center;font-size: 14pt;">이천반품등록[<%=dpcd%>]</td>
              <td width="30%" style=" text-align : right;"><input type="button" class="btn_basic1" onclick="select_search();" value="선택조회">&nbsp;
              <input type="button" class="btn_basic1" onclick="return_open(2);" value="반품등록">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img class="btn-close" align="absmiddle" onclick="pos_close();">&nbsp;
            </td>
            <td width="5%"></td>
          </table>

	</div >
	<div class="main-middle1">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center"  >
	<tr>
		<td width="90%" align="center">
			<table width="90%" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#5985A8">
			<tr bgcolor="#1BA892" height="30">
				<td width="150" align="center" height="26">의뢰일자</td>
				<td width="400" bgcolor="#FFFFFF" align="left">
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
				<td   rowspan="2"  align="center" >
								<label style="width: 100%; height: 100%; ">처리</label>
        </td>
        <td bgcolor="#FFFFFF" rowspan="2" align="center">
								<select id ='return_tag' >
									  <OPTION value="%">전체</OPTION>
									  <OPTION value="Y">처리</OPTION>
									  <OPTION value="N">미처리</OPTION>
								</select>&nbsp;&nbsp;
        </td>
        <td  rowspan="2"  align="center"  bgcolor="#FFFFFF">
                <!--
								<label style="width: 100%; height: 100%;" style="font-weight:bold;">품번</label>
								<input id="search_barcode" type="text" maxlength="13" style="width:120px;">&nbsp;&nbsp; -->
								<input type="button" class="btn_basic" onclick="return_search(2);" value="검색"style="width:60px; height:40px;vertical-align: middle;">&nbsp;&nbsp;
				</td>

			</tr>
			<tr bgcolor="#1BA892" height="30">

			<td width="150" align="center" height="26">확정일자</td>
				<td width="400" bgcolor="#FFFFFF" align="left">
				&nbsp;
					<input type="text" id="confirm-from"  >
								<a href="#" onclick="confirm_from_cal1();" class="no-line">
								<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
								</a>
								~
								<input type="text" id="confirm-to">
								<a href="#" onclick="confirm_to_cal1();" class="no-line">
								<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
								</a>

								&nbsp;
								<a href="#" onclick="reset_d();" class="no-line">
								<IMG src="./images/btn_delb.gif" width="15" height="15" align="absmiddle">
								</a>
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
				<td width="30" align="center" height="26">&nbsp;</td>
        <td width="30" align="center" height="26">NO</td>
				<td width="100" align="center" >의뢰일자</td>
				<td width="100" align="center" >확정일자</td>
				<td width="100" align="center" >BOX NO.</td>
				<td width="110" align="center" >의뢰 전표번호</td>
				<td width="110" align="center" >도착상황</td>
				<td width="70" align="center">확정유무</td>
				<td width="60" align="center">의뢰수량</td>
				<td width="60" align="center">확정수량</td>
				<td width="60" align="center">차이수량</td>
				<td width="130" align="center">등록/수정일자</td>
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

			<table id="total_area1" width="99%"  align="center"  bgcolor='#dcdcdc'cellspacing="1" cellpadding="0" >
				<tbody ></tbody>
			</table>
	</div>

	<div class="bottom-btn">
		<table width="90%" >

			<tr>
					<td width="20%">
						<input type="button" id="btn-return-del" class="btn_basic1" onclick="return_delete1();" value="선택삭제">
						<input type="button" id="btn-return-box" class="btn_basic1" onclick="boxlist_open();" value="전표내역서">
					</td>
          <td width="10%" align="left">
            <label id="modi_label1" value="" style="font-weight:bold;font-size: 8pt;"></label>
          </td>
					<td  width="50%" align="center">
					<label id="modi_label" style="font-weight:bold;font-size: 15pt;"></label>
						<input type="text" class="boxno" id ="modi_ordt" style="font-size: 13pt;" >
						<input type="hidden" class="boxno" id ="modi_orno" style="font-size: 13pt;" >
						<input type="hidden" class="boxno" id ="modi_boxno" style="font-size: 13pt;" >
            <input type="hidden" class="boxno" value="" id ="modi_tag" style="font-size: 13pt;" >
            <input type="hidden" class="boxno" value="" id ="modi_CFQTY" style="font-size: 13pt;" >
					</td>
					<td align="right"  width="30%" ><!-- <input id="btn-spcchk-save" class="btn-save"  align="absmiddle"onclick="returnmodify_save();" >		 -->
						<input type="button" id="btn-add"  class="btn_basic1" onclick="returnmodify_add(3);" value="추가">
						<input type="button" id="btn-spcchk-save"  class="btn_basic1" onclick="returnmodify_save();" value="선택수정"></td>
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
								<td width="30" height="30">
									<div align="center">번호</div>
								</td>
								<td width="70">
									<div align="center">의뢰일자</div>
								</td>
								<td width="70">
									<div align="center">확정일자</div>
								</td>
								<td width="70">
									<div align="center">도착상황</div>
								</td>
								<td width="70">
									<div align="center">판매유형</div>
								</td>
								<td width="70">
									<div align="center">스타일</div>
								</td>
								<td width="60">
									<div align="center">칼라</div>
								</td>
								<td width="60">
									<div align="center">사이즈</div>
								</td>
								<td width="60">
									<div align="center">의뢰수량</div>
								</td>
								<td width="60">
									<div align="center">확정수량</div>
								</td>
								<td width="60">
									<div align="center">차이수량</div>
								</td>
								<td width="70">
									<div align="center">판매단가</div>
								</td>
								<td width="70">
									<div align="center">공급단가</div>
								</td>
								<td width="70">
									<div align="center">판매가액</div>
								</td>
								<td width="60">
									<div align="center">처리</div>
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

			<table id="total_area2" width="99%"  align="center"  bgcolor='#dcdcdc' cellspacing="1" cellpadding="0" >
				<tbody ></tbody>
			</table>
	</div>
</div>
</form>

<!-- 조회중 팝업 -->
<div class="dim-layer000">
    <div class="dimBg000"></div>
	<div id="layer000" class="pop-layer000">
		<div class="pop-container">
				<div class="div-header">
					<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>조회중</B>
				</div>
				<div class="div-body">
					<!-- <div id="search_progress" style="font-size:0.2em;float: left;display:inline-block;"></div>
					<div style="float: left;">잠시만 기다려주세요...</div> -->
					<p align="center">잠시만 기다려주세요...</p>
				</div>
				<div class="div-footer">
					<!-- <input type="button" class="btn-ok" onclick="dc_all_items();">
					<a href="#" class="btn-layerClose" onclick="dc_all_items_close();"></a> -->
				</div>
			</div>
	</div>
</div>

<!-- 반품수정 -->
<div class="dim-returnmodify">
    <div class="dimBg-returnmodify"></div>
	<div id="returnmodify" class="pop-returnmodify">
			<div class="pop-container">
			<div class="div-header">
				<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>반품조회</B>
			</div>
			<div class="div-body">
				<div style="top:0px;height:40px;" >
				<table width="100%">
				<tr>
					<td width="15%">
						<input type="button" id="btn-return-del" class="btn_basic1" onclick="return_delete1();" value="반품삭제">
						<input type="button" class="btn_basic1" onclick="boxlist_open();" value="전표내역서">
					</td>
					<td  width="65%" align="center">
					</td>
					<td align="center"  width="10%" ><!-- <input id="btn-spcchk-save" class="btn-save"  align="absmiddle"onclick="returnmodify_save();" >		 -->
						<input type="button" id="btn-spcchk-save"  class="btn_basic1" onclick="returnmodify_save();" value="선택수정"></td>
				</tr>
				</table>


				</div>
				<div style="top:50px;height:28px;width:99%;" >
						<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE">
							<tr bgcolor="#ceeeff">
								<td width="30" height="30">
									<div align="center">번호</div>
								</td>
								<td width="70">
									<div align="center">창고</div>
								</td>
								<td width="70">
									<div align="center">판매유형</div>
								</td>
								<td width="70">
									<div align="center">스타일</div>
								</td>
								<td width="70">
									<div align="center">칼라</div>
								</td>
								<td width="70">
									<div align="center">사이즈</div>
								</td>
								<td width="70">
									<div align="center">의뢰수량</div>
								</td>
								<td width="70">
									<div align="center">확정수량</div>
								</td>
								<td width="70">
									<div align="center">판매단가</div>
								</td>
								<td width="70">
									<div align="center">공급단가</div>
								</td>
								<td width="70">
									<div align="center">판매가액</div>
								</td>
								<td width="70">
									<div align="center">처리여부</div>
								</td>
								<td width="70">
									<div align="center">확정일자</div>
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

<!-- 반품전표내역서 -->
<div class="dim-boxlist">
    <div class="dimBg-boxlist"></div>
	<div id="boxlist" class="pop-boxlist">
			<div class="pop-container">
			<div class="div-header">
        <table width="100%">
          <tr>
            <td width="5%"></td>
            <tD width="10%">
						  <input type="button" class="btn_basic1"  onclick="javascript:printIt(document.getElementById('prt_page').innerHTML)" value="출력">
            </td>
            <td width="70%" align = "center">
				      <IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>전표내역서</B>
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
					<label style="font-weight:bold;font-size: 15pt;">의뢰일자</label>
						<label id ="list_ordt" style="font-size: 13pt;" />
					</td>
					<td align="center"  width="5%" >&nbsp;</td>
				</tr>
				</table>
				</div>
				<div style="top:50px;height:100%;width:100%; overflow:auto;" >
						<table border='1' width="680" align="center"  id="td_boxlist" cellspacing="0" >
							<thead>
								<tr>
									<td colspan="8" align="center">
										&nbsp;
									</td>
								</tr>
								<tr>
									<td colspan="3"align="center" ><label class="text1"/>반품매장</td>
									<td colspan="6"align="center"><label class="text1" id ="list_vdnm"/></td>
								</tr>
								<tr>
									<td align="center" width="100"><label class="text2"/>박스</td>
									<td colspan="7" align="center"width="500"><label id ="list_barcode" class="barcode"></td>
								</tr>

                <tr>
									<td  align="center" width="130">
										<label class="text2"/>품번
									</td>
                  <td  align="center"width="40"  >
										<label class="text2"/>의뢰
									</td>
                  <td  align="center"width="40"  >
										<label class="text2"/>확정
									</td>
                  <td  align="center" width="90"   >
										<label class="text2"/>금액
									</td>
									<td  align="center"  width="130">
										<label class="text2"/>품번
									</td>
									<td  align="center" width="40"  >
										<label class="text2"/>의뢰
									</td>
                  <td  align="center"width="40"  >
										<label class="text2"/>확정
									</td>
                  <td  align="center" width="90"  >
										<label class="text2"/>금액
									</td>
								</tr>

							</thead>
								<tbody>
								</tbody>
							<tfoot>
								<tr>
									<td  align="center"width="100">
										<label class="text2"/>구분
									</td>
									<td  align="center"colspan="3">
										<label id ="list_boxno" class="text2">
									</td>
									<td align="center" width="100">
										<label class="text2"/>의뢰/확정수량
									</td>
									<td  align="center">
										<label id ="list_totqty" class="text2">
									</td>
                  <td  align="center">
										<label id ="list_totqty1" class="text2"/>
									</td>
                  <td  align="center">
                    <label id ="list_totpri" class="text2"/>
									</td>
								</tr>
								<tr>
									<td align="center" width="100">
										<label class="text2"/>반품창고
									</td>
									<td align="center" colspan="3">
										<label id ="list_whnm" class="text2">
									</td>
									<td align="center" width="100">
										<label class="text2"/>확정전표번호
									</td>
									<td align="center" colspan="3">
										<label class="text2" id="list_outno" />
									</td>
								</tr>
							</tfoot>
						  </table>
				</div>
			</div>
			<!-- <div class="div-footer"> -->
				<!-- <a href="#" class="btn-layerClose" onclick="boxlist_close();"></a> -->
			<!-- </div> -->
		</div>
	</div>
</div>


<!-- 반품선택조회 -->
<div class="dim-returnsearch">
    <div class="dimBg-returnsearch"></div>
	<div id="returnsearch" class="pop-returnsearch">
			<div class="pop-container">
			<div class="div-header">
				<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>조건별 반품 조회</B>
			</div>
			<div class="div-body">
			<div style="height: 30%;">
					<table width="100%" height="100%">
						<tr height="10%">
							<td style="width: 7%;" align="center"><label style="font-weight:bold;">의뢰기간</label></td>
							<td style="width: 30%;">
							<input type="text" id="select-from"  >
							<a href="#" onclick="select_from_cal1();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
							</a>
							~
							<input type="text" id="select-to">
							 <a href="#" onclick="select_to_cal1();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
							</a>
							</td>

							<td style="width: 7%;" align="center"><label style="font-weight:bold;">확정기간</label></td>
							<td style="width: 30%;">
							<input type="text" id="s-confirm-from"  >
							<a href="#" onclick="s_confirm_from_cal1();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
							</a>
							~
							<input type="text" id="s-confirm-to">
							<a href="#" onclick="s_confirm_to_cal1();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
							</a>
							</td>


							<td style="width: 10%;"  align="right"><img class="btn-search" align="absmiddle" onclick="select_return_sum(2);">
							</td>
						</tr>

						<tr height="10%">

							<td style="width: 100%;" colspan ="5">
							<input id="sales3_brcdchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;">브랜드</label>
								<select id ='sales3_brcd' onchange="sales3brcdchk();" >
								<option value="%">전체</option>
								</select>
								&nbsp;&nbsp;
								<input id="sales3_yearchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;">년도</label>
								<select id ='sales3_year' onchange="sales3yearchk();" >
								<option value="%">전체</option>
								</select>&nbsp;&nbsp;&nbsp;
								<input id="sales3_seasonchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;">시즌</label>
								<select id ='sales3_season' onchange="sales3seasonchk();" >
								<option value="%">전체</option>
								</select>&nbsp;&nbsp;&nbsp;
								<input id="sales3_sexchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;">성별</label>
								<select id ='sales3_sex' onchange="sales3sexchk();" >
								<option value="%">전체</option>
								</select>

							</td>

						</tr>
						<tr height="10%">

							<td style="width: 100%;" colspan ="5">

								&nbsp;&nbsp;&nbsp;
								<input id="sales3_itypechk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;">형태</label>
								<select id ='sales3_itype' onchange="sales3itypechk();" >
								<option value="%">전체</option>
								</select>
								&nbsp;&nbsp;&nbsp;
								<input id="sales3_itemchk" type="checkbox" align="absmiddle" style="width:12px;height:12px;">
								<label style="width: 100%; height: 100%;">아이템</label>
								<select id ='sales3_item' onchange="sales3itemchk();" >
								</select>

								<input name="select_radio"  id="s_sty" type="radio" value="1"  style="width:13px;height:13px;">
								<label style="width: 100%; height: 100%;" for="s_sty" style="font-weight:bold;">스타일</label>
								<input name="select_radio"  id="s_col"type="radio" value="2" style="width:13px;height:13px;">
								<label style="width: 100%; height: 100%;" for="s_col" style="font-weight:bold;">컬러</label>
								<input name="select_radio"  id="s_size" type="radio" value="3" style="width:13px;height:13px;">
								<label style="width: 100%; height: 100%;" for="s_size" style="font-weight:bold;">사이즈</label>
								<input id="sel_barcode" type="text" size="20" maxlength="15" class="box" onChange="javascript:this.value=this.value.toUpperCase();" >&nbsp;



							</td>

						</tr>
					</table>

				</div>
					<div style="height:30px;width:99%;" >
						<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE">
							<tr bgcolor="#1BA892 ">
								<td width="70" height="30">
									<div align="center">의뢰일자</div>
								</td>
								<td width="70">
									<div align="center">확정일자</div>
								</td>
								<td width="70" >
									<div align="center">창고</div>
								</td>
								<td width="70">
									<div align="center">판매유형</div>
								</td>
								<td width="70">
									<div align="center">스타일</div>
								</td>
								<td width="70">
									<div align="center">칼라</div>
								</td>
								<td width="70">
									<div align="center">사이즈</div>
								</td>
								<td width="70">
									<div align="center">의뢰수량</div>
								</td>
								<td width="70">
									<div align="center">확정수량</div>
								</td>
								<td width="70">
									<div align="center">차이수량</div>
								</td>
								<td width="70">
									<div align="center">판매단가</div>
								</td>
								<td width="70">
									<div align="center">공급단가</div>
								</td>
								<td width="70">
									<div align="center">판매가액</div>
								</td>
								<td width="70">
									<div align="center">처리여부</div>
								</td>
							</tr>
						</table>
						</div>
						<div style="height:60%;width:100%;overflow-y:auto;">
						<table width="100%" id="tb_returnsearch" class="t_container"  bgcolor="grey"align="center"cellspacing="1" cellpadding="1" >
							<colgroup>
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
								<col width="70"/>
								<col width="70"/>
							</colgroup>
							<tbody></tbody>
						</table>
						</div>
						<div style="height:5%;width:99%;">
						<table width="100%" class="t_container"  align="center"cellspacing="1" cellpadding="1" >
							<tbody>
							<tr>
								<td colspan ="7" align="right" width="490">총의뢰수량 : </td>
								<td width="70"><label id="total_reqqty"></label></td>
								<td align="right" width="80">총확정수량 : </td>
								<td width="70"><label id="total_cfqty"></td>
								<td colspan ="6" width="350"></td>
							</tr>
							</tbody>
						</table>
						</div>
				</div>
			<div class="div-footer">
				<a href="#" class="btn-layerClose" onclick="returnsearch_close();"></a>
			</div>
		</div>
	</div>
</div>

<!-- 저장중 팝업 -->
<div class="dim-layer001">
    <div class="dimBg001"></div>
	<div id="layer001" class="pop-layer001">
		<div class="pop-container">
				<div class="div-header">
					<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><B>저장중</B>
				</div>
				<div class="div-body">
					<!-- <div id="search_progress" style="font-size:0.2em;float: left;display:inline-block;"></div>
					<div style="float: left;">잠시만 기다려주세요...</div> -->
					<p align="center">잠시만 기다려주세요...</p>
				</div>
				<div class="div-footer">
					<!-- <input type="button" class="btn-ok" onclick="dc_all_items();">
					<a href="#" class="btn-layerClose" onclick="dc_all_items_close();"></a> -->
				</div>
			</div>
	</div>
</div>




<!-- 반품등록 -->
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
									<td width="80" align="center" height="26">의뢰일자</td>
									<td width="200" bgcolor="#FFFFFF" align="center">
										<input type="text" id="return_date" readonly >
										<a href="#" onclick="return_date_cal();" class="no-line">
										<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
										</a></td>
									<td width="80" align="center">창고</td>
									<td width="250" bgcolor="#FFFFFF" align="left">&nbsp;
										<select id="whcdselect" style="width: 90%; font-size: 10pt;">
										</select>
									</td>
									<td width="80" align="center">비고</td>
									<td width ="250" bgcolor="#FFFFFF" align="left">&nbsp;
										<input type="text" id ="return_remark" size ="35" maxlength="16" class="box" >
									</td>
									<td width="100" bgcolor="#FFFFFF" align="center" rowspan="2">
										<input type="button" id="btn-return-save"  class="btn_basic1" onclick="return_save();" value="저장"></td>
										<!-- <a href="javascript:return_save();">
										<img src="../images/B_btn_Ok.gif" width="50" height="19" align="absmiddle" border="0"></a> -->&nbsp;&nbsp;&nbsp;
										</td>
								</tr>
								<tr bgcolor="#1BA892">
								<td align="center">박스NO	</td>
								<td bgcolor="#FFFFFF" align="left">&nbsp;
                  <input type="checkbox" id="boxusechk"/>박스사용
                  <input id="input_boxno" type="text"  size="20" maxlength="10" class="box"onkeyup="onKeyUp_Boxchk();"  readonly style="background-color:#e2e2e2;">
								<a href="#" onclick="reset_box();" class="no-line">
										<IMG src="./images/btn_delb.gif" width="15" height="15" align="absmiddle">
										</a>
								</td>
								<td width="80" align="center">품번</td>
									<td id="td_barcode" width="250" bgcolor="#FFFFFF" align="left" onclick="document.getElementById('input_barcode').focus();">&nbsp;
											<input class="input-barcode" id="input_barcode" type="text" autocomplete="off" maxlength="13" onkeyup="onKeyUp_Barcode(1);" value=""  onfocus="document.getElementById('td_barcode').style.backgroundColor='yellow';" onblur="document.getElementById('td_barcode').style.backgroundColor='';" >&nbsp;
										<a href="javascript:onKeyUp_Barcode(1);">
										<img src="../images/B_btn_Search.gif" width="50" height="19" align="absmiddle" border="0"></a>
									</td>

								<td align="left"  bgcolor="#FFFFFF" colspan="2">&nbsp;
							<!-- <input type=file name="xlsfile" size=10 >  --></td>
								</tr>
					</table>
		<div style=" width:99%;">
		<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE" align="left">
		<tr bgcolor="#1BA892">
			<td width="100" height="25">
				<div align="center">번호</div>
			</td>
			<td width="100">
				<div align="center">구분</div>
			</td>
			<td width="150">
				<div align="center">스타일</div>
			</td>
			<td width="150">
				<div align="center">칼라</div>
			</td>
			<td width="150">
				<div align="center">사이즈</div>
			</td>
			<td width="120">
				<div align="center">매장재고</div>
			</td>
			<td width="120">
				<div align="center">반품수량</div>
			</td>
			<td width="120">
				<div align="center">판매가</div>
			</td>
			<td width="120">
				<div align="center">판매가액</div>
			</td>
			<td width="100">
				<div align="center">삭제</div>
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
					<tbody bgcolor="white"></tbody>
				</table>
		</div>
		<div style="height:50px;width:100%;">
		<table width="100%" class="t_container" width="90%" height="30" border="1"   cellspacing="0" cellpadding="0" align="left" bgcolor="#6A95AE">
			<tr bgcolor="#1BA892">
			<td width="770" align="center">
				수량합계
			</td>
			<td width="120" align="center" bgcolor="#FFFFFF">
				<input type="text" id="total_rqty" size="7" class="boxno">
			</td>
			<td width="100">
			</td>
			</tr>
		</table>
		</div>
	</div>
				<div class="div-footer">
					<a href="#" class="btn-layerClose" onclick="return_close(2)"></a>
				</div>
		</div>
	</div>
</div>


<!-- 추가반품등록 -->
<div class="dim-return-add">
    <div class="dimBg-return-add"></div>
	<div id="return-add" class="pop-return-add">

<div class="pop-container">
		<div class="div-header">
		<IMG src="/sang/images/B_bul_subtit.gif" width="16" height="16" align="center" ><label id="lbl_rText1"/>
		</div>
		<div class="div-body" id="reload">
								<table width="100%" border="0" cellspacing="1" cellpadding="0" align="center" bgcolor="#5985A8">
									<tr bgcolor="#1BA892">
										<td width="80" align="center" height="26">의뢰일자</td>
										<td width="250" bgcolor="#FFFFFF" align="left">&nbsp;&nbsp;
											<input type="text" id="add_date" class="boxno" readonly style="font-size:11pt;bold;"> </td>
										<td width="80" align="center">반품번호</td>
										<td width="250" bgcolor="#FFFFFF" align="left">&nbsp;
											<input type="text" id="add_orno" class="boxno" readonly style="font-size:11pt;bold;">

										</td>
										<td width="80" align="center">&nbsp;</td>
										<td width ="250" bgcolor="#FFFFFF" align="left">&nbsp;

										</td>
										<td width="100" bgcolor="#FFFFFF" align="center" rowspan="2">
											<input type="button" id="btn-return-save"  class="btn_basic1" onclick="add_save();" value="저장"></td>
											<!-- <a href="javascript:return_save();">
											<img src="../images/B_btn_Ok.gif" width="50" height="19" align="absmiddle" border="0"></a> -->&nbsp;&nbsp;&nbsp;
											</td>
									</tr>
									<tr bgcolor="#1BA892">
									<td align="center">박스NO	</td>
									<td bgcolor="#FFFFFF" align="left" width="250" >&nbsp;
											<input id="add_boxno" type="text"  size="20" maxlength="10" class="boxno" readonly style="font-size:11pt;bold;">

									</td>
									<td width="80" align="center">품번</td>
										<td id="td_barcode1" width="250" bgcolor="#FFFFFF" align="left" onclick="document.getElementById('input_barcode1').focus();">&nbsp;

												<input class="input-barcode" id="input_barcode1" type="text" autocomplete="off" maxlength="13" onkeyup="onKeyUp_Barcode(2);" value=""  onfocus="document.getElementById('td_barcode1').style.backgroundColor='yellow';" onblur="document.getElementById('td_barcode1').style.backgroundColor='';" >&nbsp;
											<a href="javascript:onKeyUp_Barcode(2);">
											<img src="../images/B_btn_Search.gif" width="50" height="19" align="absmiddle" border="0"></a>
										</td>

									<td align="left"  bgcolor="#FFFFFF" colspan="2">&nbsp;
								<!-- <input type=file name="xlsfile" size=10 > --> </td>
									</tr>
						</table>
							<div style=" width:99%;">
							<table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#6A95AE" align="left">
							<tr bgcolor="#1BA892">
								<td width="100" height="25">
									<div align="center">번호</div>
								</td>
								<td width="100">
									<div align="center">구분</div>
								</td>
								<td width="150">
									<div align="center">스타일</div>
								</td>
								<td width="150">
									<div align="center">칼라</div>
								</td>
								<td width="150">
									<div align="center">사이즈</div>
								</td>
								<td width="120">
									<div align="center">매장재고</div>
								</td>
								<td width="120">
									<div align="center">반품수량</div>
								</td>
								<td width="120">
									<div align="center">판매가</div>
								</td>
								<td width="120">
									<div align="center">판매가액</div>
								</td>
								<td width="100">
									<div align="center">삭제</div>
								</td>
							</tr>
							</table>
							</div>
							<div  id="add_div1" style="width:100%;height:70%;overflow-y:scroll;">
									<table width="100%" id="tb_returnlist1" class="t_container" border="0" align="left" bgcolor="#6A95AE"  cellspacing="1" cellpadding="1">
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
										<tbody bgcolor="white"></tbody>
									</table>
							</div>
							<div style="height:50px;width:100%;">
							<table width="100%" class="t_container" width="90%" height="30" border="1"   cellspacing="0" cellpadding="0" align="left" bgcolor="#6A95AE">
								<tr bgcolor="#1BA892">
								<td width="770" align="center">
									수량합계
								</td>
								<td width="120" align="center" bgcolor="#FFFFFF">
									<input type="text" id="total_rqty1" size="7" class="boxno">
								</td>
								<td width="100">
								</td>
								</tr>
							</table>
							</div>
						</div>
		<div class="div-footer">
			<a href="#" class="btn-layerClose" onclick="add_close(2)"></a>
		</div>
		</div>
	</div>
</div>



	<script language="javascript" src="./js/return_i.js"></script>
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
