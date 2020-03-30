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
	POSNO	= Session("POSNO")
	SHGU	= Session("SHGU")

%>

	<script>
		// POSNO 초기화
		DPCD	= '<%=DPCD%>'
		POSNO	= '<%=POSNO%>';
		SHGU	= '<%=SHGU%>';
	</script>

<html>
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- <meta http-equiv="x-ua-compatible" content="IE=11"> -->

	<title>
		NEW포스
	</title>

	<link rel="stylesheet" href="./css/link.css">  
	<link rel="stylesheet" type="text/css" href="./css/jsgrid.css" />
    <link rel="stylesheet" type="text/css" href="./css/theme.css" />
	<link rel="stylesheet" href="./css/popup.css">
	<link rel="stylesheet" href="./css/sale_status.css">
	<!-- <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" /> -->
	
	<script src="./js/jquery.min.js"></script>
	<!-- <script src="../include/js/jquery-3.3.1.min.js"></script> -->
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.min.css">
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script> 
	
	<style>
		.ui-datepicker{ font-size: 1.5em; width: 450px; height: 300px; }
		.ui-datepicker select.ui-datepicker-month{ width:30%; font-size: 1.3em; }
		.ui-datepicker select.ui-datepicker-year{ width:30%; font-size: 1.3em; }
		.ui-datepicker select.ui-datepicker-day{ width:30%; font-size: 1.3em; }
	</style>

	<!-- <script language="javascript" src="./js/common.js"></script>
	<script language="javascript" src="./js/pos.js"></script>
	<script language="javascript" src="./js/c_search_popup.js"></script>
	<script language="javascript" src="./js/cash_receipt_popup.js"></script>
	<script language="javascript" src="./js/upipos.js"></script>
	<script language="javascript" src="./js/search.js"></script>
	<script language="javascript" src="./js/search_rt.js"></script> -->

	<!-- <script language="javascript" src="./js/popup.js"></script> -->

	<script src="./db.js"></script>

    <script src="./src/jsgrid.core.js"></script>
    <script src="./src/jsgrid.load-indicator.js"></script>
    <script src="./src/jsgrid.load-strategies.js"></script>
    <script src="./src/jsgrid.sort-strategies.js"></script>
    <script src="./src/jsgrid.field.js"></script>
    <script src="./src/fields/jsgrid.field.text.js"></script>
    <script src="./src/fields/jsgrid.field.number.js"></script>
	<script src="./src/fields/jsgrid.field.floatnumber.js"></script>
    <script src="./src/fields/jsgrid.field.select.js"></script>
    <script src="./src/fields/jsgrid.field.checkbox.js"></script>
    <script src="./src/fields/jsgrid.field.control.js"></script>
		
</head>
<body>

<iframe name="iFrame_input"  id="iFrame_input"  style="display:none"></iframe>
<iframe name="if_sale_ok" id="if_sale_ok"  style="display:none"></iframe>
<iframe name="if_gift_search"  id="if_gift_search"  style="display:none"></iframe>
<label id="lbl_outamt" style="display:none;"></label>

<form name="f_body">
<input id="hold_count" type="hidden" value="">


 <div class="h-div">
    <div class="header-div">
        <table width="100%" height="100%">
            <tr width="100%" height="100%" cellspacing="0">
			   <td width="5%"><img class="btn-close" align="absmiddle" onclick="pos_close();"></td>	 
			   <td width="5%"><img class="btn-close" align="absmiddle" onclick="pos_close();"></td>			          		              
            </tr>      
        </table>
  </div>
 
  <div style="height: 10%;">
					<table width="100%" height="20%" border =1>
						<tr>							
							<td style="width: 5%; height: 100%;" align="center"><label style="font-weight:bold;">기준일자</label></td>
							<td style="width: 5%; height: 100%;">
							<input type="text" id="sales2-from"  > 
							<a href="#" onclick="sales2_from_cal1();" class="no-line">
							<IMG src="./images/calendar.png" width="26" height="26" align="absmiddle">
							</a>
							</td>							
							<td style="width: 5%; height: 100%;" align="center"><label style="font-weight:bold;">바코드</label></td>
							 <td id="td_barcode" width="5%" onclick="document.getElementById('input_barcode').focus();"><input class="input-barcode" id="input_barcode" type="text" autocomplete="off" maxlength="13" onkeyup="onKeyUp_Barcode();" onfocus="setInput(document.getElementById('input_barcode'));document.getElementById('td_barcode').style.backgroundColor='yellow';" onblur="document.getElementById('td_barcode').style.backgroundColor='';" value="" autofocus></td>
							<td style="width: 20%; height: 100%;"  align="right"><img class="btn-save" align="absmiddle" onclick="sales2_search();">
							</td>
						</tr>
						
						
					</table>
					
				</div>
	<div id="jsGrid" onkeydown="editGrid();" height="100%" style="width: 100%;">
                        <script>	
							$(function() {
								$("#jsGrid").jsGrid({
									height: "80%",
									width: "100%",
									filtering: false,
									editing: true,
									inserting: false,
									sorting: false,
									paging: false,
									autoload: true,
									deleteConfirm: "Do you really want to delete the client?",
									controller: db,											
									rowClick: function(args) {
										if(this.editing) {
											this.editItem($(args.event.target).closest("tr"));
										}
										
										if ($selectCurrent == null)
										{	// 최초 선택일 경우 해당 row만 toggle
											$selectCurrent = this.rowByItem(args.item);          									
											$selectCurrent.toggleClass("highlight");
										} else {
											$selectCurrent.toggleClass("highlight");
											$selectCurrent = $("#jsGrid").jsGrid("rowByItem", args.item);
											$selectCurrent.toggleClass("highlight");
										}

										currentRow(args.item);
										$('#btn_count_up').attr('disabled', false);
										$('#input_row_barcode').val(args.item.BARCODE);
										setWorkType(2);
										//showDetailsDialog("Edit", args.item);
										//alert("jsGrid row Click !");
									},
									onItemInserting: function(args) {
										var items = args.grid.option("data");
										if (items.length == 99)
										{
											args.cancel = true;
											alert("판매상품은 99개까지 입력 가능합니다.");
										}
									},
									onItemInserted: function(args) {
										// Inserted Item
										var items = args.grid.option("data");
										 args.item.NO = items.length;
										 args.grid._body.scrollTop(items.length * 40);
									},
									
									onRefreshed: function(args) {
										var items = args.grid.option("data");
										items.forEach(function(item) {
											if (item.QTY == 0) {
												var $row = $("#jsGrid").jsGrid("rowByItem", item);
												$row.toggleClass("item-cancel-highlight");
											}
										 });
									},
									
									fields: [
										{ name: "NO", type: "text", title:"No.", css: "font-bold", width: "2%", align: "center", readOnly: true },
										{ name: "SPCCHK", type: "text", title:"구분", css: "font-bold", width: "4%", align: "center", readOnly: true },
										{ name: "STYCD", type: "text", title:"스타일", css: "font-bold", width: "7%", align: "center", readOnly: true },
										{ name: "COLCD", type: "text", title:"칼라", css: "font-bold", width: "4%", align: "center", readOnly: true },
										{ name: "SIZECD", type: "text", title:"사이즈", css: "font-bold", width: "5%", align: "center", readOnly: true },
										{ name: "QTY", type: "number", title:"수량", css: "font-bold", width: "5%", align: "center", readOnly: false }
									]
								});
								//$("#jsGrid").jsGrid("insertItem", client);
							});
						</script>
						</div>
</form>



<script language="javascript" src="./js/pos.js"></script>
<script language="javascript" src="./js/search.js"></script>
<script language="javascript" src="./js/common.js"></script>
	<!--
	
	<script language="javascript" src="./js/c_search_popup.js"></script>
	<script language="javascript" src="./js/cash_receipt_popup.js"></script>
	<script language="javascript" src="./js/upipos.min.js"></script>
	-->
	


	<script>
		$(document).ready(function() {
			console.log("jquery ready start");
			init();
			get_select();
		});
	</script>

</body>

	
</html>