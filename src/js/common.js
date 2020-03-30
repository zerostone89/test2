// realTime function
setInterval("dpTime()",1000); 
setInterval("session_refresh()", 600000);
var week = new Array('일', '월', '화', '수', '목', '금', '토');

var CUS_INFO = null;

var	$selectCustom = null;
var	selectCustom = null;

var	$selectTcustom = null;
var	selectTcustom = null;

var	$selectHold = null;
var	$selectReceipt = null;

var selectHistory = null;
var $selectHistory = null;

//var POSNO = "";
var JUWSU = "";			// 결제단말기 사용유무(boolean)  사용 : 미사용
var PAYMODULE = "";

var originDC = 0;
var originSPRICE = 0;

var selectHold = null;
var selectReceipt = null;

var currentCardData = "";
var currentCashData = "";
var DISCOUNTAMT = 0;		// 카드결제 시 에누리 금액
var SLICE = "00";				// 카드결제 시 할부개월
var $selectCurrent = null;
var $selectFiprice = null;

var currentItem = null;

var currentSale = null;
var cancel_Sale = null;
var cardCompanys = null;

var sale_field = "";

var calc_ing_count = 0;
var sale_sellNo = null;

var rt_chk = false;

function init() {
	
	//document.body.requestFullscreen();
	//toggleFullScreen();

	//POSNO = '<%=POSNO%>';
	//alert("init : " + POSNO);

	$('#lbl_posno').text(POSNO +"번");

	tot_price = 0;
	tot_siprice = 0;
	tot_qty = 0;
	tot_dc = 0;
	tot_mg = 0;
	tot_milamt = 0;

	tot_dcamt = 0;
	tot_gift1_amt = 0;
	tot_gift2_amt = 0;
	tot_gift3_amt = 0;
	tot_siprice = 0;
	tot_outamt = 0;

	$("#lbl_gift1_amt").text(tot_gift1_amt);		// 전체 할인쿠폰 금액
	$("#lbl_gift2_amt").text(tot_gift2_amt);		// 전체 할인쿠폰 금액
	$("#lbl_gift3_amt").text(tot_gift3_amt);		// 전체 할인쿠폰 금액
	$('#lbl_outamt').text(tot_outamt);			// 전체 반품 금액
	
	

	//totalQty = 0;		// 현재 거래 전체 수량

	

	gift_flag = false;

	//arrayHold = [];			// 보류 items

	var now = new Date(); 
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();

	if (month < 10) {
        month = "0" + month;
    }
    
    if (day < 10) {
        day = "0" + day;
    }
	
	firstday = String(year) + String(month) + "01";
	salday = String(year) + String(month) + String(day);

	var pickerStyle = {
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		showMonthAfterYear: true,
		changeMonth: true,
		changeYear: true,
		yearSuffix: '년'  
	}

	$( "#datepicker").datepicker(pickerStyle);
	$( "#input_receipt_picker").datepicker(pickerStyle);
	$( "#dp_cash").datepicker(pickerStyle);
	$('#dp_return_from').datepicker(pickerStyle);
	$('#dp_return_to').datepicker(pickerStyle);
	

	
	//매출속보
	$( "#sokboday_from" ).datepicker(pickerStyle);	
	$( "#sokboday_from" ).val(getDay());
	$( "#sokboday_to" ).datepicker(pickerStyle);	
	$( "#sokboday_to" ).val(getDay());
	//매출현황-카드사별
	$( "#sales1-from" ).datepicker(pickerStyle);	
	$( "#sales1-from" ).val(getDay());
	$( "#sales1-to" ).datepicker(pickerStyle);	
	$( "#sales1-to" ).val(getDay());	
	//매출현황-브랜드별
	$( "#sales2-from" ).datepicker(pickerStyle);	
	$( "#sales2-from" ).val(getDay());
	$( "#sales2-to" ).datepicker(pickerStyle);	
	$( "#sales2-to" ).val(getDay());	
	//매출현황-조건별
	$( "#sales3-from" ).datepicker(pickerStyle);	
	$( "#sales3-from" ).val(getDay());
	$( "#sales3-to" ).datepicker(pickerStyle);	
	$( "#sales3-to" ).val(getDay());
	
	//매출현황-시간대별
	$( "#sales4day" ).datepicker(pickerStyle);	
	$( "#sales4day" ).val(getDay());
	$( "#sales4day2" ).datepicker(pickerStyle);	
	$( "#sales4day2" ).val(getDay());
	//매출현황-형태별
	$( "#sales7-from" ).datepicker(pickerStyle);	
	$( "#sales7-from" ).val(getDay());
	$( "#sales7-to" ).datepicker(pickerStyle);	
	$( "#sales7-to" ).val(getDay());	
	//매출현황-카드발급사별
	$( "#sales10-from" ).datepicker(pickerStyle);	
	$( "#sales10-from" ).val(getDay());
	$( "#sales10-to" ).datepicker(pickerStyle);	
	$( "#sales10-to" ).val(getDay());	
	//매출현황-카드발급사별
	$( "#sales11-from" ).datepicker(pickerStyle);	
	$( "#sales11-from" ).val(getDay());
	$( "#sales11-to" ).datepicker(pickerStyle);	
	$( "#sales11-to" ).val(getDay());

	/* Add 190107 modified by jsys */
	// 기간별 판매현황
	$("#sales15-from").datepicker(pickerStyle);
	$("#sales15-to").datepicker(pickerStyle);

	//calc(6);
	$('#btn_cash').attr('disabled', true);
	$('#btn_credit').attr('disabled', true);
	$('#btn_gift').attr('disabled', true);

	var cash = $('#input_cash');
	var credit = $('#input_credit');
	var gift = $('#input_gift');

	cash.attr('disabled', true);
	credit.attr('disabled', true);
	gift.attr('disabled', true);

	$('#lbl_gettotal').val("0");
	cash.val("0");
	credit.val("0");
	gift.val("0");
	$('#btn_calc_cancel').hide();
	//updateItems();
	barcodeFocus();

	$('#btn_mil').hide();
	$('#btn_custom_search').hide();
	$('#btn_custom_cancel').hide();

	$('#btn_cus_edit').hide();
	
	search_juwsu();
	search_hold_count();
	//search_day_sale();
	search_smp();
	search_card_company();
}

/*
/* 3자리 콤마 */
function numberWithCommas(x) {
	if (x == null || x == "null" || x == "") {
		return "0";
	}
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* 숫자 문자열 정규식 */
function is_number(x) {
    var reg = /^\d+$/;

    return reg.test(x);
}

function dpTime(){ 
    
    //var week = new Array('일', '월', '화', '수', '목', '금', '토');
    
    var now = new Date(); 
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    hours = now.getHours(); 
    minutes = now.getMinutes(); 
    seconds = now.getSeconds(); 
    
    today = now.getDay();
    todayLabel = week[today];
    
    if (hours > 12) { 
        //hours -= 12; 
        ampm = "오후 "; 
    } else{ 
        ampm = "오전 "; 
    } 
    
    if (month < 10) {
        month = "0" + month;
    }
    
    if (day < 10) {
        day = "0" + day;
    }
    
    /*
    if (hours < 10) { 
        hours = "0" + hours; 
    } 
    */
    if (minutes < 10) { 
        minutes = "0" + minutes; 
    } 
    
    if (seconds < 10) { 
        seconds = "0" + seconds; 
    } 
    
    document.getElementById("dpTime").innerHTML = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + " " + todayLabel;
}

function getDate() {
	var now = new Date(); 
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    hours = now.getHours(); 
    minutes = now.getMinutes(); 
    seconds = now.getSeconds(); 
    
    if (month < 10) {
        month = "0" + month;
    }
    
    if (day < 10) {
        day = "0" + day;
    }
    
    /*
    if (hours < 10) { 
        hours = "0" + hours; 
    } 
    */
    if (minutes < 10) { 
        minutes = "0" + minutes; 
    } 
    
    if (seconds < 10) { 
        seconds = "0" + seconds; 
    } 

	return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

function getDay() {
	var now = new Date(); 
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    
    if (month < 10) {
        month = "0" + month;
    }
    
    if (day < 10) {
        day = "0" + day;
    }    

	return year + "-" + month + "-" + day;
}

function getLastYear() {
	var now = new Date();
	var yearDate = now.getTime() - (365 * 24 * 60 * 60 * 1000);
	now.setTime(yearDate);

	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();

	if (month < 10){ month = "0" + month; }
	if (day < 10){ day = "0" + day; }

	return year + "-" + month + "-" + day;
}

function getTime() {
	var now = new Date(); 
    hours = now.getHours(); 
    minutes = now.getMinutes(); 
    seconds = now.getSeconds(); 
        
    
    if (hours < 10) { 
        hours = "0" + hours; 
    } 
    
    if (minutes < 10) { 
        minutes = "0" + minutes; 
    } 
    
    if (seconds < 10) { 
        seconds = "0" + seconds; 
    } 

	return String(hours) + String(minutes) + String(seconds);
}

function payCheck() {
	//alert($('#toggle_pay')[0].checked);
	if ($('#toggle_pay')[0].checked == true) {
		PAYMODULE = true;
		alert("결제단말기를 사용합니다.");	
		$("#btn_cash").html('현금정산');
		//$('#btn_credit').show();
		$('#btn_credit').html('카드정산');
		$('#btn_gift').show();
		$('#btn_check').show();				
		$('#btn_cash_receipt').show();
		barcodeFocus();
	} else {
		PAYMODULE = false;
		alert("결제단말기 사용을 정지합니다.");
		$("#btn_cash").html('현금저장');
		$('#btn_credit').html('카드저장');
		$('#btn_gift').hide();
		$('#btn_check').hide();				
		$('#btn_cash_receipt').hide();
		barcodeFocus();
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}

function search_juwsu() {
	var promise = $.ajax({   
			url: "./search_juwsu.asp",
			type: "POST",  			
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			datatype: 'json',			
			cache: false,
			async: true
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		console.log("search_juwsu() | " + data);
		if (jObject.error == "1")
		{
			alert(jObject.msg);
		} else if (jObject.error == "0")
		{		
			console.log("get JUWSU !");
			//console.log("session shgu : " + '<%=SHGU%>');
			if (jObject.JUWSU == "1") {
				//alert("결제기 사용매장");
				JUWSU = true;
				PAYMODULE = true;
				// 상단 결제사용 disabled & checked false
				$('#toggle_pay').attr('disabled', false);
				$('#toggle_pay')[0].checked = true;
				//search_vdcd_info();
				UPIPOS._USERDATA = {
					"COMPNM" : jObject.VDSNM,
					"ADDRESS" : jObject.ADDR,
					"CTEL" : jObject.TELNO,
					"BIZNO" : jObject.BUSNO.substring(0,3) + "-" + jObject.BUSNO.substring(3,5) + "-" + jObject.BUSNO.substring(5),
					"OWNERNM" : jObject.BOSS,
					"POSNO" : "",
					"POSNM" : ""
				};

				sale_field = [
					{ name: "NO", type: "text", title:"No.", css: "font-bold", width: "2%", align: "center", readOnly: true },
					{ name: "SPCCHK", type: "text", title:"구분", css: "font-bold", width: "4%", align: "center", readOnly: true },
					{ name: "STYCD", type: "text", title:"스타일", css: "font-bold", width: "7%", align: "center", readOnly: true },
					{ name: "COLCD", type: "text", title:"칼라", css: "font-bold", width: "4%", align: "center", readOnly: true },
					{ name: "SIZECD", type: "text", title:"사이즈", css: "font-bold", width: "5%", align: "center", readOnly: true },
					{ name: "TYPE", type: "text", title:"유형", width: "4%", align: "center", readOnly: true },
					{ name: "QTY", type: "number", title:"수량", css: "font-bold", width: "5%", align: "center", readOnly: false },
					//{ name: "JAEGO", type: "number", title:"재고", width: "4%", align: "center", readOnly: true },
					{ name: "JAEGO", type: "number", title:"재", width: "4%", align: "center", readOnly: true },
					{ name: "LAPRI", type: "text", title:"판매가", css: "font-bold", width: "7%", align: "right", readOnly: true },
					{ name: "DC", type: "floatnumber", title:"D/C", css: "font-bold", width: "5%", align: "center", readOnly: false },
					
					{ name: "FIPRICE", type: "text", title:"정상최초", width: "7%", align: "right", readOnly: true },
					{ name: "DCAMT", type: "text", title:"할인금액", width: "7%", align: "right", readOnly: true },
					{ name: "SPRICE", type: "text", title:"실판가", css: "font-bold", width: "7%", align: "right", readOnly: true },
					{ name: "SIPRICE", type: "text", title:"실판매금액", css: "font-bold", width: "8%", align: "right", readOnly: true },
					{ name: "MGSEL", type: "select", title:"할인권선택", css: "font-bold", width: "12%", css: "font-big",
						items: db.gift_list,
						valueField: "Id",
						textField: "REFSNM",
						selectedIndex: 0 
					},										
					{ name: "GIFTAMT", type: "text", title:"할인권액", css: "font-bold", width: "7%", align: "right", readOnly: true },
					{ name: "MG", type: "number", title:"M/G", css: "hide", width: "0", align: "center", readOnly: true },
					{ name: "BARCODE", type: "text", title: "바코드", css: "hide", width: "0" },
					{ name: "XSTYCD", type: "text", title: "아이템명", css: "hide", width: "0" },
					{ name: "GIFT1AMT", type: "text", title:"할인쿠폰액", css: "hide", width: "0"},
					{ name: "GIFT2AMT", type: "text", title:"신마일리지액", css: "hide", width: "0"},
					{ name: "GIFT3AMT", type: "text", title:"인증번호쿠폰액", css: "hide", width: "0"},										
					{ name: "T_PRICE", type: "text", title: "정상최초가" , css: "hide", width: "0" },
					{ name: "T_PRICE_YN", type: "text", title: "정상최초가 구분", css: "hide", width: "0" },
					{ name: "MILGU", type: "text", title: "할인권구분", css: "hide", width: "0" }
				];				
			} else {
				//alert("결제기 미사용매장");
				JUWSU = false;
				PAYMODULE = false;
				$("#btn_cash").html('현금저장');
				$('#btn_credit').html('카드저장');
				$('#btn_gift').hide();
				$('#btn_check').hide();				
				$('#btn_cash_receipt').hide();

				// 상단 결제사용 disabled & checked false
				$('#toggle_pay').attr('disabled', true);
				$('#toggle_pay')[0].checked = false;

				sale_field = [
					{ name: "NO", type: "text", title:"No.", css: "font-bold", width: "2%", align: "center", readOnly: true },
					{ name: "SPCCHK", type: "text", title:"구분", css: "font-bold", width: "4%", align: "center", readOnly: true },
					{ name: "STYCD", type: "text", title:"스타일", css: "font-bold", width: "7%", align: "center", readOnly: true },
					{ name: "COLCD", type: "text", title:"칼라", css: "font-bold", width: "4%", align: "center", readOnly: true },
					{ name: "SIZECD", type: "text", title:"사이즈", css: "font-bold", width: "5%", align: "center", readOnly: true },
					{ name: "TYPE", type: "text", title:"유형", width: "4%", align: "center", readOnly: true },
					{ name: "QTY", type: "number", title:"수량", css: "font-bold", width: "5%", align: "center", readOnly: false },
					//{ name: "JAEGO", type: "number", title:"재고", width: "4%", align: "center", readOnly: true },
					{ name: "JAEGO", type: "number", title:"재", width: "4%", align: "center", readOnly: true },
					{ name: "LAPRI", type: "text", title:"판매가", css: "font-bold", width: "7%", align: "right", readOnly: true },
					{ name: "DC", type: "floatnumber", title:"D/C", css: "font-bold", width: "5%", align: "center", readOnly: true },
					
					{ name: "FIPRICE", type: "text", title:"정상최초", width: "7%", align: "right", readOnly: true },
					{ name: "DCAMT", type: "text", title:"할인금액", width: "7%", align: "right", readOnly: true },
					{ name: "SPRICE", type: "text", title:"실판가", css: "font-bold", width: "7%", align: "right", readOnly: true },
					{ name: "SIPRICE", type: "text", title:"실판매금액", css: "font-bold", width: "8%", align: "right", readOnly: true },
					{ name: "MGSEL", type: "select", title:"할인권선택", css: "font-bold", width: "12%", css: "font-big",
						items: db.gift_list,
						valueField: "Id",
						textField: "REFSNM",
						selectedIndex: 0 
					},										
					{ name: "GIFTAMT", type: "text", title:"할인권액", css: "font-bold", width: "7%", align: "right", readOnly: true },
					{ name: "MG", type: "number", title:"M/G", css: "hide", width: "0", align: "center", readOnly: true },
					{ name: "BARCODE", type: "text", title: "바코드", css: "hide", width: "0" },
					{ name: "XSTYCD", type: "text", title: "아이템명", css: "hide", width: "0" },
					{ name: "GIFT1AMT", type: "text", title:"할인쿠폰액", css: "hide", width: "0"},
					{ name: "GIFT2AMT", type: "text", title:"신마일리지액", css: "hide", width: "0"},
					{ name: "GIFT3AMT", type: "text", title:"인증번호쿠폰액", css: "hide", width: "0"},										
					{ name: "T_PRICE", type: "text", title: "정상최초가" , css: "hide", width: "0" },
					{ name: "T_PRICE_YN", type: "text", title: "정상최초가 구분", css: "hide", width: "0" },
					{ name: "MILGU", type: "text", title: "할인권구분", css: "hide", width: "0" }
				];
			}
			// JUWSU 관계없이 G, T 매장은 DC, SPRICE 변경 가능
			if (SHGU == "G" || SHGU == "T") {
				sale_field = [
					{ name: "NO", type: "text", title:"No.", css: "font-bold", width: "2%", align: "center", readOnly: true },
					{ name: "SPCCHK", type: "text", title:"구분", css: "font-bold", width: "4%", align: "center", readOnly: true },
					{ name: "STYCD", type: "text", title:"스타일", css: "font-bold", width: "7%", align: "center", readOnly: true },
					{ name: "COLCD", type: "text", title:"칼라", css: "font-bold", width: "4%", align: "center", readOnly: true },
					{ name: "SIZECD", type: "text", title:"사이즈", css: "font-bold", width: "5%", align: "center", readOnly: true },
					{ name: "TYPE", type: "text", title:"유형", width: "4%", align: "center", readOnly: true },
					{ name: "QTY", type: "number", title:"수량", css: "font-bold", width: "5%", align: "center", readOnly: false },
					//{ name: "JAEGO", type: "number", title:"재고", width: "4%", align: "center", readOnly: true },
					{ name: "JAEGO", type: "number", title:"재", width: "4%", align: "center", readOnly: true },
					{ name: "LAPRI", type: "text", title:"판매가", css: "font-bold", width: "7%", align: "right", readOnly: true },
					{ name: "DC", type: "floatnumber", title:"D/C", css: "font-bold", width: "5%", align: "center", readOnly: false },					
					{ name: "FIPRICE", type: "text", title:"정상최초", width: "7%", align: "right", readOnly: true },
					{ name: "DCAMT", type: "text", title:"할인금액", width: "7%", align: "right", readOnly: true },
					{ name: "SPRICE", type: "text", title:"실판가", css: "font-bold", width: "7%", align: "right", readOnly: false },
					{ name: "SIPRICE", type: "text", title:"실판매금액", css: "font-bold", width: "8%", align: "right", readOnly: true },
					{ name: "MGSEL", type: "select", title:"할인권선택", css: "font-bold", width: "12%", css: "font-big",
						items: db.gift_list,
						valueField: "Id",
						textField: "REFSNM",
						selectedIndex: 0 
					},										
					{ name: "GIFTAMT", type: "text", title:"할인권액", css: "font-bold", width: "7%", align: "right", readOnly: true },
					{ name: "MG", type: "number", title:"M/G", css: "hide", width: "0", align: "center", readOnly: true },
					{ name: "BARCODE", type: "text", title: "바코드", css: "hide", width: "0" },
					{ name: "XSTYCD", type: "text", title: "아이템명", css: "hide", width: "0" },
					{ name: "GIFT1AMT", type: "text", title:"할인쿠폰액", css: "hide", width: "0"},
					{ name: "GIFT2AMT", type: "text", title:"신마일리지액", css: "hide", width: "0"},
					{ name: "GIFT3AMT", type: "text", title:"인증번호쿠폰액", css: "hide", width: "0"},										
					{ name: "T_PRICE", type: "text", title: "정상최초가" , css: "hide", width: "0" },
					{ name: "T_PRICE_YN", type: "text", title: "정상최초가 구분", css: "hide", width: "0" },
					{ name: "MILGU", type: "text", title: "할인권구분", css: "hide", width: "0" }
				];
			}
			$("#jsGrid").jsGrid('option', 'fields', sale_field);
			//$("#jsGrid").jsGrid("refresh");
		}		
	});
	promise.fail(function(data) {
		alert("search_juwsu fail : " + data);
	});
}

function get_fields() {
	return sale_field;
}

function search_card_company() {
	var promise = $.ajax({   
			url: "./search_card_company.asp",
			type: "POST",  			
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			datatype: 'json',			
			cache: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			alert(jObject.msg);
		} else if (jObject.error == "0") {			
			cardCompanys = jObject.data;
			var option = '';
			option += '<option value="'+ "0" + '">' + "선택하세요." + '</option>';
			for (var i=0;i<cardCompanys.length;i++){
				option += '<option value="'+ cardCompanys[i].REFSNM + '">' + cardCompanys[i].REFNM + '</option>';
			}
			$('#sel_hand_card').append(option);
		}		
	});
	promise.fail(function(data) {
		alert("search_card_company fail : " + data);
	});
}

function search_day_sale() {
	var promise = $.ajax({   
			url: "./search_day_sale.asp",
			type: "POST",  			
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			datatype: 'json',	
			data: {
				firstdate: firstday,
				saledate: salday
			},
			cache: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		console.log("search_day_sale() | " + data);
		if (jObject.error == "1")
		{
			alert(jObject.msg);
		} else if (jObject.error == "0")
		{			
			var d_sale = parseInt(jObject.day1);
			var d_return = parseInt(jObject.day2);
			$('#input_day_sale').text(numberWithCommas(d_sale - d_return));
			$('#input_month_sale').text(numberWithCommas(parseInt(jObject.mon1) - parseInt(jObject.mon2)));
			//return (d_sale - d_return);
		}		
	});
	promise.fail(function(data) {
		alert("search_day_sale fail : " + data);
	});
}

function search_smp() {
	var promise = $.ajax({   
			url: "./search_smp.asp",
			type: "POST",  			
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			datatype: 'json',	
			data: {
				year: salday.substring(0,4),
				month: salday.substring(4,6)
			},
			cache: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1")
		{
			console.log(jObject.msg);
			$('#sel_smpview').css('display', 'none');
			//alert(jObject.msg);
		} else if (jObject.error == "0")
		{	
			console.log("SMP 조회성공");
			$('#jaego_rate').text("※재고소진율 : " + jObject.JAEGO_RATE + "%");				
			$('#smp_rate').text("※SMP판매적중율 : " + jObject.SMP_RATE + "%");
			//return (d_sale - d_return);
			var resultArray = jObject.SMPVIEW;
			var option = '<option selected value="%">--------- SMP목표현황 ---------</option>';

			var itypenm = "";
			for (var i = 0; i < resultArray.length; i++){
				if (resultArray[i][0] != itypenm) {
					option += '<option value="' + resultArray[i][6] + '"> &nbsp;&nbsp;&nbsp;&nbsp;목표&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;실적&nbsp;&nbsp;&nbsp;&nbsp;&nbsp ▣&nbsp;' + resultArray[i][1] + '&nbsp;▣</B></option>';
					var nbsp1 = "";
					if (String(resultArray[i][3]).length == 1) {
						nbsp1 = '&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;';
					} else if (String(resultArray[i][3]).length == 2) {
						nbsp1 = '&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;';
					} else if (String(resultArray[i][3]).length == 3) {
						nbsp1 = '&nbsp;&nbsp; &nbsp;';
					}
					var nbsp2 = "";
					if (String(resultArray[i][4]).length == 1) {
						nbsp2 = '&nbsp;&nbsp; &nbsp;&nbsp; ';
					} else if (String(resultArray[i][4]).length == 2) {
						nbsp2 = '&nbsp;&nbsp;&nbsp; ';
					} else if (String(resultArray[i][4]).length == 3) {
						nbsp2 = '&nbsp;&nbsp; ';
					}
					option += '<option>' + nbsp1 + resultArray[i][3] + '&nbsp; : ' + nbsp2 + resultArray[i][4] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + resultArray[i][2];
				} else {					
					var nbsp1 = "";
					if (String(resultArray[i][3]).length == 1) {
						nbsp1 = '&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;';
					} else if (String(resultArray[i][3]).length == 2) {
						nbsp1 = '&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;';
					} else if (String(resultArray[i][3]).length == 3) {
						nbsp1 = '&nbsp;&nbsp; &nbsp;';
					}
					var nbsp2 = "";
					if (String(resultArray[i][4]).length == 1) {
						nbsp2 = '&nbsp;&nbsp; &nbsp;&nbsp; ';
					} else if (String(resultArray[i][4]).length == 2) {
						nbsp2 = '&nbsp;&nbsp;&nbsp; ';
					} else if (String(resultArray[i][4]).length == 3) {
						nbsp2 = '&nbsp;&nbsp; ';
					}
					option += '<option value="' + resultArray[i][6] + '">' + nbsp1 + resultArray[i][3] + '&nbsp; : ' + nbsp2 + resultArray[i][4] + '  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + resultArray[i][2];
				}
				option += '</option>';
				itypenm = resultArray[i][0];
				//option += '<option value="'+ cardCompanys[i].REFSNM + '">' + cardCompanys[i].REFNM + '</option>';
			}
			$('#sel_smpview').append(option);
		}		
	});
	promise.fail(function(data) {
		alert("search_day_sale fail : " + data);
	});
}


function rt_check() {
	var promise = $.ajax({   
			url: "./search_rt.asp",
			type: "POST",  			
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			datatype: 'json',				
			cache: false,
			async: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		console.log("rt_check() | " + data);
		if (jObject.error == "0" && parseInt(jObject.CNT_R) > 0) {			
			// 수평이동 존재			
			rt_chk = true;
		} else {
			rt_chk = false;
		}
	});
	promise.fail(function(data) {
		alert("rt_check fail : " + data);
	});
}

function session_refresh() {	
	var promise = $.ajax({   
			url: "./session_refresh.asp",
			type: "POST",  			
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			datatype: 'json',				
			cache: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		console.log("session_refresh() | " + data);
		if (jObject.error == "0" && jObject.REFRESH == "S") {			
			console.log("===================================== session_refresh");
		}		
	});
	promise.fail(function(data) {
		alert("session_refresh fail : " + data);
	});
}

function session_check(data) {
	if (data == "<script>top.location.href='/stime_out.asp'</script>") {
		//alert("다시 로그인해주세요.");
		opener.closed_refresh();
		window.close();
	} else if (data == "\r\n\r\n<script language=\"javascript\">\r\nalert(\"로그아웃되었습니다.\\n다시로그인해주세요.\");\r\n\r\nparent.window.location = \"../default.asp\";\r\n</script>") {
		//alert("다시 로그인해주세요.");
		opener.closed_refresh();
		window.close();
	}
}

/* 결제 sellNo 난수 */
function getRandomKey() {
    var value = "";
    for(var i = 0; i < 8; i++) {
        value += parseInt(Math.random() * (9 - 0 + 1)) + 0;
    }
    return value;
}

/* 결제 Timer */
var element, endTime, hours, mins, msLeft, time;
var calcing_timer;
function countdown( elementId, seconds ){
  function updateTimer(){
    msLeft = endTime - (+new Date);
    if ( msLeft < 0 ) {
      console.log('done');
	  if (!calc_ing) {
		  console.log("결제중이 아닙니다.");
		  return;
	  }
	  if (currentSale.SALETAG != "B") {
		  calc_cancel();
		  console.log("-- No Credit Sale --");
		  return;
	  }
	  UPIPOS.reRequest(function(resdata) {
		console.log(resdata);
		
		if (typeof resdata.RQ14 !== "undefined" &&  resdata.RQ14 == sale_sellNo) {
			if ((typeof resdata.SUC !== "undefined" && resdata.SUC == "00") && (typeof resdata.RS04 !== "undefined" && resdata.RS04.substring(0, 4) == "0000")) {	// 거래성공
				var items = $("#jsGrid").jsGrid("option", "data");
				var sale = currentSale;
				sale.CARDGU			= resdata.RS11;
				sale.PREFIX			= "";
				sale.CARDID			= resdata.RQ04.substring(0, 16);
				sale.CARDNAME		= resdata.RS12;
				sale.VALIDITY		= resdata.RS06;
				sale.SLICE			= resdata.RQ06;
				sale.APPROVALTIME	= resdata.RS07.substring(6, 12);
				sale.APPROVALNO		= resdata.RS09;
				sale.APPROVALNO2	= resdata.RS08;
				sale.MAIPCD			= resdata.RS05;
				sale.MAIPNAME		= resdata.RS14;
				
				// 카드결제 후 현금영수증 발급 여부 확인
				if (((parseInt(sale.CASHAMT) > 0) || (parseInt(sale.TICKAMT) > 0)) && ($('#cb_cash_req')[0].checked == true))	{
					//$('.dim-layer999').fadeOut();
					calcing_close();
					// 현금영수증 발급 O
					currentSale = sale;
					cash_pop_open();
					//return;	
				} else {	// 현금영수증 발급 X 
					sale_calc(sale, items, false);
				}
			} else if ((typeof resdata.SUC !== "undefined" && resdata.SUC == "00") && (typeof resdata.RS04 !== "undefined" && resdata.RS04.substring(0, 4) != "0000")) {
				if(resdata.RS15 == "D") {
					alert("카드 승인 실패.\nerrorCode : " + resdata.RS04 + "\n" + "내용 : " + resdata.RS16);
					console.log('ERR: RS04 data:', resdata.RS04);
					console.log('ERR: RS16 data:', resdata.RS16);
					console.log('ERR: RS17 data:', resdata.RS17);
				} else {
					alert("카드 승인 실패.\nerrorCode : " + resdata.RS04);
					currentCardData = "";
					DISCOUNTAMT = 0;
					currentSale = null;
					$('#input_slice').val("0");
					$('#input_discount').val("0");
					calc_cancel();
				}
			} else if (typeof resdata.SUC !== "undefined" && resdata.SUC == "01") {
				alert("카드 승인 실패.\n내용 : " + resdata.MSG);
				currentCardData = "";
				DISCOUNTAMT = 0;
				currentSale = null;
				$('#input_slice').val("0");
				$('#input_discount').val("0");
				calc_cancel();
			}			
		} else {
			alert("카드 승인 실패.");
			currentCardData = "";
			DISCOUNTAMT = 0;
			currentSale = null;
			$('#input_slice').val("0");
			$('#input_discount').val("0");
			calc_cancel();
		}
	  }, function(err) {
		console.log(err);
	  });
    } else {
      time = new Date( msLeft );
      hours = time.getUTCHours();
      mins = time.getUTCMinutes();
      element.innerHTML = time.getUTCSeconds();
      calcing_timer = setTimeout( updateTimer, time.getUTCMilliseconds());
      // if you want this to work when you unfocus the tab and refocus or after you sleep your computer and come back, you need to bind updateTimer to a $(window).focus event^^
    }
  }

  element = document.getElementById( elementId );
  endTime = (+new Date) + 1000 * (seconds + 1);
  updateTimer();
}

/* 결제중 팝업 */
function calcing_open() {
	var $el = $("#layer999");
	$('.dim-layer999').fadeIn();
	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	// 화면의 중앙에 레이어를 띄운다.
	if ($elHeight < docHeight || $elWidth < docWidth) {
		$el.css({
			marginTop: -$elHeight /2,
			marginLeft: -$elWidth/2
		})
	} else {
		$el.css({top: 0, left: 0});
	}
	countdown('calcing_count', 45);
}

function calcing_close() {
	$('.dim-layer999').fadeOut();
	clearTimeout(calcing_timer);
	document.getElementById('calcing_count').innerHTML = "45";
}

/* Data 조회중 안내 팝업 */
function searching_open() {
	var $el = $("#layer000");
	$('.dim-layer000').fadeIn();
	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	// 화면의 중앙에 레이어를 띄운다.
	if ($elHeight < docHeight || $elWidth < docWidth) {
		$el.css({
			marginTop: -$elHeight /2,
			marginLeft: -$elWidth/2
		})
	} else {
		$el.css({top: 0, left: 0});
	}	
}

function searching_close() {
	$('.dim-layer000').fadeOut();
}