
function setNumber ( btn ) {
	//var inputBarcode = document.getElementById('input_barcode');

	inputBarcode = current_input;

	flag = clear_flag;

	if(flag) {
		inputBarcode.value = "";
		clear_flag = false;
	}

	var temp = inputBarcode.value;
	var input = btn.value;
	temp = temp + input;
	inputBarcode.value = temp;
	inputBarcode.focus();
	btn.style.background = "#E3E3E3";
}

function removeNumber( btn ) {
    //var inputBarcode = document.getElementById('input_barcode');
	inputBarcode = current_input;
    var temp = inputBarcode.value;
    temp = temp.substr(0, temp.length - 1);
    inputBarcode.value = temp;
    inputBarcode.focus();
    btn.style.background = "#E3E3E3";
}

function clearNumber( btn ) {
    //var inputBarcode = document.getElementById('input_barcode');
	inputBarcode = current_input;
    inputBarcode.value = "";
    inputBarcode.focus();
    btn.style.background = "#E3E3E3";

	if ($("#jsGrid").jsGrid("option", "data").length == 0) {
		$('#lbl_gettotal').text("0");
		$('#lbl_change').text("0");
	}
}

function selectBarcode( btn ) {
    var inputBarcode = document.getElementById('input_barcode');
    alert("바코드 : " + inputBarcode.value);
    inputBarcode.focus();
    btn.style.background = "#E3E3E3";
}

function onKeyDown() {
	//alert("onKeyDown() !");

	// Enter
	//if (event.keyCode == 13 && ($('#input_barcode').val().length == 12)) {
	if (event.keyCode == 13 && ($('#input_barcode').val().length > 0)) {
		/*rt_check();

		if (rt_chk && (JUWSU == false)){
			alert("새로운 수평이동받기가 있습니다.\n 처리 후 판매등록 해주세요.");
		} else {*/
			code_search($('#input_barcode').val());
		//}
	} else if (event.keyCode == 27) {
		//pos_close();
	} else {
		return;
	}
}

function onKeyUp_Barcode() {
	if ($('#input_barcode').val().length == 12 && event.keyCode != 13)	{
		/*rt_check();

		if (rt_chk && (JUWSU == false)){
			alert("새로운 수평이동받기가 있습니다.\n 처리 후 판매등록 해주세요.");
			barcodeFocus();
		} else {*/
			code_search($('#input_barcode').val());

		//}
		//code_search($('#input_barcode').val());
		return;
	}
}

function setInput(_input) {
	current_input = _input;
	clear_flag = false;

	var barcode = document.getElementById('input_barcode');
	if(current_input == barcode) {
		// barcode 검색 type
		setWorkType(1);
	}
}

function setWorkType(_type) {
	workType = _type;
}

function workFinish() {
	switch (workType)
	{
		case 1 :	// barcode
			code_search($('#input_barcode').val());
			break;
		case 2 :	// 상품 정보 edit

			$("#jsGrid").jsGrid("updateItem");
			//$("#jsGrid").jsGrid("updateItem", currentItem);
			//setSIPRICE();
			updateItems();
			//currentItem = null;
			$('#btn_count_up').attr('disabled', true);
			$('#input_barcode').focus();
			break;
		case 3 :	// 현금정산
			calc_check(true);
			break;
		case 4 :	// 카드정산
			calc_check(true);
			break;
		case 5 :	// 상품권정상
			calc_check(true);
			break;
	}
}

function editGrid() {
	if (event.keyCode == 13) {
		setWorkType(2);
		workFinish();
	}
	//currentItem = null;
	$('#btn_count_up').attr('disabled', true);
}

function additem(){
	var client = {
		XSTYCD:'테스트',
		STYCD: "테스트",
		SQTY: 1000,
		LAPRI: 500,
		SILPRI: 10,
		MILAMT: '할인',
	};
	$("#jsGrid").jsGrid("insertItem", client);
	barcodeFocus();
}

// test용 code_search
/*
function code_search() {

	var aa = document.getElementById('input_barcode');

	if(current_input == aa) {
		//alert("success");
		var barcode		= document.f_body.input_barcode.value;

		if (barcode == "")
		{
			alert("바코드를 입력하세요.");
			document.f_body.input_barcode.focus();
			return;
		}
		//alert("replace 호출");
	//document.frames["iFrame_input"].document.location.replace("../webpos/search_barcode.asp?barcode="+barcode);
	document.iFrame_input.document.location.replace("../webpos/search_barcode.asp?barcode=" + barcode);  // firefox typeError(window.frame[])

	} else {
		//$("jsGrid").jsGrid("updateItem");
		$("#jsGrid").jsGrid("updateItem");
	}
}
*/
function code_search(barcode){

	//return;

	var aa = document.getElementById('input_barcode');


	if(current_input == aa) {
		var Url
		var winl = (screen.width - 560) / 2;
		var wint = (screen.height - 210) / 2;
		//var barcd  = $('#input_barcode').val().toUpperCase();
		var barcd  = barcode.toUpperCase();



		//var pshape = document.d_sale.sgb.value;
		//var cnt =  document.d_sale.count1.value;
		var chk = 1;
		if (barcd == "") {
			alert("바코드를 입력해주세요.");
			barcodeFocus();
			return;
		} else if (barcd.length < 12) {
			alert("바코드길이가 짧습니다.");
			$('#input_barcode').val("");
			barcodeFocus();
			return;
		}
//		document.frames["iFrame_input"].document.location.replace("code_search.asp?barcd=" + barcd + "&chk=" + chk + "&day1=" + day1);

		//document.iFrame_input.document.location.replace("code_search.asp?barcd=" + barcd + "&chk=" + chk + "&day1=" + salday);
		//barcodeFocus();
		$('#input_barcode').val("");
		$('#input_barcode').focus();
		var promise = $.ajax({
			url: "./code_search.asp",
			type: "POST",
			data: {
				"barcd" : barcd,
				"chk"	: chk,
				"day1"	: salday
			},
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
				$('#input_barcode').val("");
				$('#input_barcode').focus();
			} else if (jObject.error == "0") {
				code_insert(jObject.spc_chk, jObject.barcode, jObject.xstycd, jObject.style, jObject.colcd, jObject.sizecd,
					jObject.type1, jObject.cnt, jObject.jaego, jObject.fipri, jObject.lapri, jObject.dc, jObject.mg,
					jObject.silpak, jObject.sacod, jObject.t_price_yn, jObject.t_price_gb, jObject.brcd)
			}
		});
		promise.fail(function(data) {
			alert("code_search fail : " + data);
		});

	} else {
		$("#jsGrid").jsGrid("updateItem");
	}
}

/*
	spc_chk			//특판체크
	style			//STYLE
	colcd			//COLOR
	sizecd			//SIZE
	type1			//판매유형명
	cnt				//갯수
	jeago			//현재고
	fipri			// 정상최초가
	price			//소비자가
	dc				//dc율
	mg				//마진율
	silpak			//실판매가 및 적용판매가
	sacod			//판매유형
*/
function code_insert(spc_chk, barcode, xstycd, style, colcd, sizecd, type1, cnt, jaego, fipri, lapri, dc, mg, silpak, sacod, t_price_yn, t_price_gb, brcd) {


    // append
    //$("#sale_tbl").append($.newTr);
	$('#input_barcode').val("");
	var spcchk = (spc_chk == "Y") ? "아울" : "정상";
	var items = $("#jsGrid").jsGrid("option", "data");

	var client = {
		NO: (items.length + 1),
		SPCCHK: spcchk,
		STYCD: style,
		COLCD: colcd,
		SIZECD: sizecd,
		QTY: 1
	};

	if (items.length > 0) {

		var lastItem = items[items.length - 1];
		if (barcode == lastItem.BARCODE) {

			lastItem.QTY = parseInt(lastItem.QTY) + 1;
			$.extend(lastItem, {
				QTY: parseInt(lastItem.QTY)
				//SIPRICE: numberWithCommas(parseInt(lastItem.SPRICE.replace(/,/g,"")) * (parseInt(lastItem.QTY)))
			});
			$("#jsGrid").jsGrid("updateItem", lastItem);
			/*
			tot_qty			+= client.QTY;
			tot_price		+= client.NPPRICE;
			tot_dcamt		+= client.NPPRICE - client.SPRICE;
			tot_siprice		+= client.SIPRICE;
			//tot_gift1_amt	+= item.GIFT1AMT;

			$('#input_total').val(tot_qty);					// 전체 수량
			$("#lbl_totalprice").text(tot_price);			// 전체 합계
			$("#lbl_dcamt").text(tot_dcamt);				// 전체 상품 할인금액
			$("#lbl_getprice").text(tot_siprice);			// 전체 받을 금액

			$('#input_barcode').val("");
			$("#jsGrid").jsGrid("refresh");
			currentItem = null;
			barcodeFocus();

			$("#jsGrid").jsGrid("insertItem", client);
			*/
			//$("#jsGrid").jsGrid("insertItem", client);
		} else {
			$("#jsGrid").jsGrid("insertItem", client);
		}
		//$("#jsGrid").jsGrid("insertItem", client);
	} else {
		$("#jsGrid").jsGrid("insertItem", client);
	}
	updateItems();
	currentItem = null;
	$('#btn_count_up').attr('disabled', true);
	//updateItems();
	barcodeFocus();
}

function search_error(code) {
	var msg = "code : " + code + "\n";
	if (code == "0") {
		msg += "결과가 없습니다.";
	} else {
		msg += "알수없는 에러";
	}

	alert(msg);
	barcodeFocus();
}


function dc_items_open() {
	/*
	var items = $("#jsGrid").jsGrid("option", "data");

	items.forEach(function(item) {
		item.DC = 10;
	 });

	$("#jsGrid").jsGrid("refresh");
	updateItems();
	barcodeFocus();
	*/
	var $el = $("#layer7");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg7');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer7').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

	$('#input_all_dc').focus();


	// 아래와 같이 확인 or 저장 이벤트 지정 시 중첩하여 click 이벤트 발생
	// html onclick 속성에 이벤트를 넣어주어 해결
	/*
	// 저장 버튼을 클릭
	$el.find('a.btn-layerEdit').click(function(){
		isDim ? $('.dim-layer5').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});
	*/

	$el.find('a.btn-layerClose').click(function(){
		$('#input_all_dc').val("");
		barcodeFocus();
		isDim ? $('.dim-layer7').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});

	$('.layer .dimBg7').click(function(){
		$('.dim-layer7').fadeOut();
		return false;
	});
}

function dc_all_items(_layer) {
	//clearItems(false);

	if ($('#input_all_dc').val() == "") {
		alert("DC율을 입력해주세요.");
		return;
	}

	temp_dc = parseInt($('#input_all_dc').val());
	if (temp_dc > 100) {
		alert("DC율은 100을 넘을 수 없습니다.");
		$('#input_all_dc').focus();
		$('#input_all_dc').select();
		return;
	}

	if (temp_dc < 0) {
		alert("DC율은 0보다 작을 수 없습니다.");
		$('#input_all_dc').focus();
		$('#input_all_dc').select();
		return;
	}


	var items = $("#jsGrid").jsGrid("option", "data");

	items.forEach(function(item) {
		item.DC = parseInt($('#input_all_dc').val());
		item.SPRICE = numberWithCommas(Math.round(item.LAPRI.replace(/,/g,"") * ((100 - item.DC) / 100)));
		item.DCAMT = numberWithCommas(item.LAPRI.replace(/,/g,"") - item.SPRICE.replace(/,/g,""));
	});
	$("#jsGrid").jsGrid("refresh");
	updateItems();

	$('.dim-layer7').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	$('#input_all_dc').val("");
	barcodeFocus();
	currentItem = null;
}

function milgu_dc_open() {
	/*
	var items = $("#jsGrid").jsGrid("option", "data");

	items.forEach(function(item) {
		item.DC = 10;
	 });

	$("#jsGrid").jsGrid("refresh");
	updateItems();
	barcodeFocus();
	*/
	var $el = $("#layer17");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg17');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer17').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

	$('#input_milgu_dc').val(currentItem.DC);
	$('#input_milgu_dc').focus();
	$('#input_milgu_dc').select();


	// 아래와 같이 확인 or 저장 이벤트 지정 시 중첩하여 click 이벤트 발생
	// html onclick 속성에 이벤트를 넣어주어 해결
	/*
	// 저장 버튼을 클릭
	$el.find('a.btn-layerEdit').click(function(){
		isDim ? $('.dim-layer5').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});
	*/
	/*
	$el.find('a.btn-layerClose').click(function(){
		$('#input_milgu_dc').val("");
		barcodeFocus();
		currentItem = null;
		isDim ? $('.dim-layer17').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});

	$('.layer .dimBg17').click(function(){
		$('.dim-layer17').fadeOut();
		return false;
	});
	*/
}

function milgu_dc_close() {
	$('#input_milgu_dc').val("");
	barcodeFocus();
	currentItem = null;
	$('.dim-layer17').fadeOut();
}

function set_milgu_dc() {
	if ($('#input_milgu_dc').val() == "") {
		alert("DC율을 입력해주세요.");
		$('#input_milgu_dc').focus();
		return;
	}
	if (parseInt($('#input_milgu_dc').val()) > 100) {
		alert("DC율은 100을 넘을 수 없습니다.");
		return;
	}

	currentItem.DC = $('#input_milgu_dc').val();
	$('.dim-layer17').fadeOut();
	updateItems();
	barcodeFocus();
	currentItem = null;
}

function updateItems() {
	var items = $("#jsGrid").jsGrid("option", "data");

	tot_price = 0;			// 단가 * 수량 (1)
	tot_qty = 0;
	tot_dcamt = 0;			// 할인금액 + 할인권금액 (2)

	tot_gift_amt = 0;
	tot_gift1_amt = 0;
	tot_gift2_amt = 0;
	tot_gift3_amt = 0;

	tot_siprice = 0;			// 최종 금액(3) = (1) - (2)
	tot_outamt = 0;
	result_outamt = 0;


	var lapri;
	var qty;
	var dc;
	var dcamt;

	var sprice;
	var siprice;

	var zero_cnt = 0;
	items.forEach(function(item) {
		/*lapri = item.LAPRI.toString().replace(/,/g,"");
		sprice = item.SPRICE.toString().replace(/,/g,"");
		t_price = item.T_PRICE.toString().replace(/,/g,"");*/

		qty = parseInt(item.QTY);
		tot_qty += qty;
		dc = item.DC;

		var reverse_chk = false;
		/*if (item.MGSEL == null || item.MGSEL == "0") {
			//item.MGSEL = "1";
			setMGSEL();
		}*/

		/*if (currentItem != null && currentItem.NO == item.NO) {
			if (sprice != itemSPRICE) {
				//alert("실판가 변경, DC 역추적");
				reverse_chk = true;
				dc = Math.round((100 - (sprice / lapri * 100)) * 100) / 100;
				//alert("originDC : " + itemDC + ", DC : " + dc);
				item.DC = dc;
			}

			if (dc == itemDC && sprice == itemSPRICE) {
			//item.DC = itemDC;
			// 수정전과 수정후의 DC, 실판가가 같을 때
			} else {
				if (!reverse_chk) {
					if (dc > 0)	{
						//sprice = Math.round(lapri * ((100 - dc) / 100) * 10) / 10;
						sprice = Math.round(lapri * ((100 - dc) / 100));
					} else if (dc == 0)	{
						if (item.T_PRICE_YN == "Y" && item.T_PRICE_GB == "1")	{
							sprice = item.T_PRICE;
						} else {
							sprice = lapri;
						}
					}
				}
			}
			dcamt = lapri - sprice;	// 할인금액

			siprice = (sprice * qty) - item.GIFTAMT.toString().replace(/,/g,"");	// (실판가 * 수량) - 쿠폰금액

			$.extend(item, {
				DC: dc,
				SPRICE: numberWithCommas(sprice),					// 개당 실판가
				SIPRICE: numberWithCommas(siprice),		// 실판매가 ( 실판가 * 수량 - 할인권금액 )
				DCAMT: numberWithCommas(dcamt),
				LAPRI: numberWithCommas(lapri)
			});

			//$("#jsGrid").jsGrid("updateItem", item);

			if (item.QTY == 0) {
				zero_cnt++;
			}

			$("#jsGrid").jsGrid("updateItem", item);
		} else {
			dcamt = lapri - sprice;	// 할인금액

			siprice = (sprice * qty) - item.GIFTAMT.toString().replace(/,/g,"");	// (실판가 * 수량) - 쿠폰금액

			item.SPRICE = numberWithCommas(sprice);						// 개당 실판가
			item.SIPRICE = numberWithCommas(siprice);		// 실판매가 ( 실판가 * 수량 - 할인권금액 )
			item.DCAMT = numberWithCommas(dcamt);
			item.LAPRI = numberWithCommas(lapri);
		}

		tot_price		+= lapri * qty;
		tot_dcamt		+= dcamt * qty;
		//tot_gift1_amt	+= item.GIFT1AMT;
		if (item.GIFT1AMT != "")
		{
			var jArray = JSON.parse(item.GIFT1AMT);
			jArray.forEach(function(gift) {
				tot_gift1_amt += parseInt(gift.GIFTPRI);
			});
		}
		//total_gift2_amt	+= item.GIFT2AMT.GIFTPRI;
		// 각 상품이 가지고 있는 모든 신마일리지 가격 sum
		if (item.GIFT2AMT != "")
		{
			var jArray = JSON.parse(item.GIFT2AMT);
			jArray.forEach(function(gift) {
				tot_gift2_amt += parseInt(gift.GIFTPRI);
			});
		}

		if (item.GIFT3AMT != "")
		{
			var jArray = JSON.parse(item.GIFT3AMT);
			jArray.forEach(function(gift) {
				if (gift.GIFTGU == "금액") {
					tot_gift3_amt += parseInt(gift.GIFTPRI);
				} else if (gift.GIFTGU == "DC율") {
					tot_gift3_amt += gift.GIFTPRI2;
				}

			});
		}
		//total_gift3_amt	+= item.GIFT3AMT;
		tot_siprice	+= siprice;
		if (tot_siprice < 0) {
			result_outamt = Math.abs(tot_siprice);
		}
		//result_outamt = tot_siprice + tot_outamt;*/
	 });

	$("#jsGrid").jsGrid("refresh");
	/*$('#input_total').val(tot_qty);					// 전체 수량
	$("#lbl_totalprice").text(numberWithCommas(tot_price));			// 전체 합계
	$("#lbl_dcamt").text(numberWithCommas(tot_dcamt));				// 전체 상품 할인금액
	$("#lbl_gift1_amt").text(numberWithCommas(tot_gift1_amt));		// 전체 할인쿠폰 금액
	$("#lbl_gift2_amt").text(numberWithCommas(tot_gift2_amt));		// 전체 신마일리지 금액
	$("#lbl_gift3_amt").text(numberWithCommas(tot_gift3_amt));		// 전체 인증번호쿠폰 금액
	$("#lbl_getprice").text(numberWithCommas(tot_siprice));			// 전체 받을 금액
	$('#lbl_outamt').text(result_outamt);			// 전체 반품 금액*/
	$('#input_row_barcode').val("");
	lbl_color_refresh();
	barcodeFocus();

	if (zero_cnt > 0) {
		$("#jsGrid").jsGrid("refresh");
		console.log("zero_cnt's refresh");
	}
	//barcodeFocus();
	//currentItem = null;
	//document.getElementById("lbl_getprice").textContent = total_siprice;
	//barcodeFocus();
}

function lbl_color_refresh() {
	if (tot_qty < 0)
	{
		$('#input_total').css("color", "red");
		//$('#btn_credit').attr('disabled', true);
		//$('#btn_gift').attr('disabled', true);
	} else {
		$('#input_total').css("color", "black");
		//$('#btn_credit').attr('disabled', false);
		//$('#btn_gift').attr('disabled', false);
	}

	if (tot_price < 0)
	{
		$("#lbl_totalprice").css("color", "red");
	} else {
		$("#lbl_totalprice").css("color", "black");
	}

	if (tot_dcamt < 0)
	{
		$("#lbl_dcamt").css("color", "red");
	} else {
		$("#lbl_dcamt").css("color", "black");
	}

	if (tot_gift1_amt < 0)
	{
		$("#lbl_gift1_amt").css("color", "red");
	} else {
		$("#lbl_gift1_amt").css("color", "black");
	}

	if (tot_gift2_amt < 0)
	{
		$("#lbl_gift2_amt").css("color", "red");
	} else {
		$("#lbl_gift2_amt").css("color", "black");
	}

	if (tot_gift3_amt < 0)
	{
		$("#lbl_gift3_amt").css("color", "red");
	} else {
		$("#lbl_gift3_amt").css("color", "black");
	}

	if (tot_siprice < 0)
	{
		$("#lbl_getprice").css("color", "red");
	} else {
		$("#lbl_getprice").css("color", "black");
	}
}

function selectMilCoupon() {

	if (currentItem.QTY < 0)
	{
		alert("반품상품은 할인권을 사용할 수 없습니다.");
		setMGSEL();
		return;
	}

	switch (currentItem.MGSEL)
	{
		case "1" :	// 선택
			if (currentItem.MILGU != "0" && (currentItem.GIFTAMT != 0)) {
				var mBox = confirm("입력한 할인내역이 초기화됩니다.\n진행하시겠습니까?");
				if (mBox) {
					currentItem.MILGU = "0";
					currentItem.GIFTAMT = 0;
					currentItem.GIFT1AMT = "";
					currentItem.GIFT2AMT = "";
					currentItem.GIFT3AMT = "";
					updateItems();
					barcodeFocus();
				} else {
					setMGSEL();
					return;
				}
			}
		break;
		case "3" :	// 할인쿠폰 gift1
			if ((currentItem.MILGU != "3") && (currentItem.GIFTAMT != 0)) {
				var mBox = confirm("입력한 할인내역이 초기화됩니다.\n진행하시겠습니까?");
				if (mBox) {
					currentItem.MILGU = "3";
					currentItem.GIFTAMT = 0;
					currentItem.GIFT1AMT = "";
					currentItem.GIFT2AMT = "";
					currentItem.GIFT3AMT = "";
					updateItems();
					sale_gift1_open();
				} else {
					setMGSEL();
					return;
				}
			} else {
				currentItem.MILGU = "3"
				sale_gift1_open();
			}
			break;
		case "4" :	// 신마일리지쿠폰
			if (currentItem.SPCCHK == "아울") {
				alert("아울렛제품은 " + db.gift_list[(parseInt(currentItem.MGSEL) - 2)].REFSNM + "을(를) 할 수 없습니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			/*
			if (CUS_INFO == null) {
				alert("고객정보를 먼저 검색하셔야 합니다.");
				//currentItem.MGSEL = "1";
				setMGSEL();
				$('#input_cus_nm').focus();
				break;
			}
			*/
			if (currentItem.MILGU != "4" && (currentItem.GIFTAMT != 0)) {
				var mBox = confirm("입력한 할인내역이 초기화됩니다.\n진행하시겠습니까?");
				if (mBox) {
					currentItem.MILGU = "4";
					currentItem.GIFTAMT = 0;
					currentItem.GIFT1AMT = "";
					currentItem.GIFT2AMT = "";
					currentItem.GIFT3AMT = "";
					updateItems();
					sale_gift2_open();
				} else {
					setMGSEL();
					return;
				}
			} else {
				currentItem.MILGU = "4"
				sale_gift2_open();
				//sale_gift_open();
			}
			//currentItem.CONF = "4";

			break;
		case "5" :	// VVIP우대50%
			if (currentItem.SPCCHK == "아울") {
				alert("아울렛제품은 " + db.gift_list[(parseInt(currentItem.MGSEL) - 2)].REFSNM + "을(를) 할 수 없습니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			var split_bigo = db.gift_list[(parseInt(currentItem.MGSEL) - 2)].BIGO.split(',');
			var split_etc1 = db.gift_list[(parseInt(currentItem.MGSEL) - 2)].ETC1.split(',');
			if (salday < split_etc1[0] || salday > split_etc1[1]) {
				alert("VVIP우대 할인기간이 아닙니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			if (currentItem.STYCD.substr(1,1) == "A" || currentItem.STYCD.substr(1,1) == "S" || currentItem.STYCD.substr(2,1) != split_bigo[3]) {
				alert("VVIP우대 대상상품이 아닙니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			if ((split_bigo[2] != "%") && (currentItem.BRCD != split_bigo[2])) {
				alert("VVIP우대 브랜드 상품이 아닙니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			// 시즌 제외
			if ((split_bigo[4] != "%") && (currentItem.STYCD.substr(4,1) != split_bigo[4])) {
				alert("VVIP우대 시즌 상품이 아닙니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			//판매수량제한
			if (getsum_vvip() > parseInt(split_bigo[1], 10)) {
				alert("VVIP우대 판매수량(" + split_bigo[1] + "개)을 초과했습니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			currentItem.MILGU = "5";
			currentItem.DC = split_bigo[0];
			updateItems();
			barcodeFocus();
			break;
		case "6" :	// 인증번호할인쿠폰 gift3
			if (currentItem.SPCCHK == "아울") {
				alert("아울렛제품은 " + db.gift_list[(parseInt(currentItem.MGSEL) - 2)].REFSNM + "을(를) 할 수 없습니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			/*
			if (CUS_INFO == null) {
				alert("고객정보를 먼저 검색하셔야 합니다.");
				currentItem.MGSEL = "1";
				$('#input_cus_nm').focus();
				break;
			}
			*/
			if (currentItem.MILGU != "6" && (currentItem.GIFTAMT != 0)) {
				var mBox = confirm("입력한 할인내역이 초기화됩니다.\n진행하시겠습니까?");
				if (mBox) {
					currentItem.MILGU = "6";
					currentItem.GIFTAMT = 0;
					currentItem.GIFT1AMT = "";
					currentItem.GIFT2AMT = "";
					currentItem.GIFT3AMT = "";
					updateItems();
					sale_gift3_open();
					//sale_gift3_search();
				} else {
					setMGSEL();
					return;
				}
			} else {
				currentItem.MILGU = "6"
				sale_gift3_open();
				//sale_gift3_search();
			}
			break;
		case "7" :	// 할인쿠폰 gift1
			if (currentItem.SPCCHK == "아울") {
				alert("아울렛제품은 " + db.gift_list[(parseInt(currentItem.MGSEL) - 2)].REFSNM + "을(를) 할 수 없습니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			if (CUS_INFO == null) {
				alert("고객정보를 먼저 검색하셔야 합니다.");
				currentItem.MGSEL = "1";
				$('#input_cus_nm').focus();
				break;
			}
			if ((currentItem.MILGU != "7") && (currentItem.GIFTAMT != 0)) {
				var mBox = confirm("입력한 할인내역이 초기화됩니다.\n진행하시겠습니까?");
				if (mBox) {
					currentItem.MILGU = "7";
					currentItem.GIFTAMT = 0;
					currentItem.GIFT1AMT = "";
					currentItem.GIFT2AMT = "";
					currentItem.GIFT3AMT = "";
					updateItems();
					milgu_dc_open();
				} else {
					setMGSEL();
					return;
				}
			} else {
				currentItem.MILGU = "7"
				milgu_dc_open();
			}
		break;
		case "8" :	// 할인쿠폰 gift1
			if (currentItem.SPCCHK == "아울") {
				alert("아울렛제품은 " + db.gift_list[(parseInt(currentItem.MGSEL) - 2)].REFSNM + "을(를) 할 수 없습니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			if (CUS_INFO == null) {
				alert("고객정보를 먼저 검색하셔야 합니다.");
				currentItem.MGSEL = "1";
				$('#input_cus_nm').focus();
				break;
			}
			if ((currentItem.MILGU != "8") && (currentItem.GIFTAMT != 0)) {
				var mBox = confirm("입력한 할인내역이 초기화됩니다.\n진행하시겠습니까?");
				if (mBox) {
					currentItem.MILGU = "8";
					currentItem.GIFTAMT = 0;
					currentItem.GIFT1AMT = "";
					currentItem.GIFT2AMT = "";
					currentItem.GIFT3AMT = "";
					updateItems();
					milgu_dc_open();
				} else {
					setMGSEL();
					return;
				}
			} else {
				currentItem.MILGU = "8"
				milgu_dc_open();
			}
		break;
		case "9" :	// 할인쿠폰 gift1
			if (currentItem.SPCCHK == "아울") {
				alert("아울렛제품은 " + db.gift_list[(parseInt(currentItem.MGSEL) - 2)].REFSNM + "을(를) 할 수 없습니다.");
				currentItem.MGSEL = "1";
				barcodeFocus();
				break;
			}
			if (CUS_INFO == null) {
				alert("고객정보를 먼저 검색하셔야 합니다.");
				currentItem.MGSEL = "1";
				$('#input_cus_nm').focus();
				break;
			}
			if ((currentItem.MILGU != "9") && (currentItem.GIFTAMT != 0)) {
				var mBox = confirm("입력한 할인내역이 초기화됩니다.\n진행하시겠습니까?");
				if (mBox) {
					currentItem.MILGU = "9";
					currentItem.GIFTAMT = 0;
					currentItem.GIFT1AMT = "";
					currentItem.GIFT2AMT = "";
					currentItem.GIFT3AMT = "";
					updateItems();
					milgu_dc_open();
				} else {
					setMGSEL();
					return;
				}
			} else {
				currentItem.MILGU = "9"
				milgu_dc_open();
			}
		break;
	}
	$("#jsGrid").jsGrid("refresh");
}

function setMGSEL() {
	switch (currentItem.MILGU) {
		case "0" :
			currentItem.MGSEL = "1";
			break;
		case "1" :
			currentItem.MGSEL = "2";
			break;
		case "3" :
			currentItem.MGSEL = "3";
			break;
		case "4" :
			currentItem.MGSEL = "4";
			break;
		case "6" :
			currentItem.MGSEL = "5";
			break;
	}
	$("#jsGrid").jsGrid("refresh");
}

function getsum_vvip() {
	var items = $("#jsGrid").jsGrid("option", "data");
	var sum_vvip = 0;
	items.forEach(function(item) {
		if (item.MGSEL == 5) {
			sum_vvip += item.QTY;
		}
	});

	return sum_vvip;
}

/*
function setSIPRICE() {
	var items = $("#jsGrid").jsGrid("option", "data");


	var total_price = 0;
	var total_milamt = 0;
	var total_siprice = 0;

	var npprice;
	var qty;
	var dc;
	var milamt;

	var siprice;

	var iCount = 0;
	items.forEach(function(item) {
		npprice = item.NPPRICE;
		qty = item.QTY;
		dc = item.DC;
		milamt = item.MILAMT;

		switch (item.MGSEL)
		{
			case "1" :
				item.CONF = "0";
				break;
			case "2" :
				item.CONF = "1";
				break;
			case "3" :
				item.CONF = "3";
				break;
			case "4" :
				item.CONF = "4";
				break;
			case "5" :
				item.CONF = "6";
				break;
		}

		siprice = ((npprice * ((100 - dc) / 100)) * qty) - milamt;
		item.SIPRICE = siprice;
		total_price += npprice * qty;
		total_milamt += parseInt(milamt);
		total_siprice += siprice;
		iCount++;
	 });

	$("#jsGrid").jsGrid("refresh");

	$("#lbl_totalprice").text(total_price);
	$("#lbl_milamt").text(total_milamt);
	$("#lbl_getprice").text(total_siprice);


	//document.getElementById("lbl_getprice").textContent = total_siprice;



	barcodeFocus();
}
*/
// 
// function pos_close() {
// 	//opener.location.reload();
// 	//window.opener.location.href = window.opener.URL;
// 	//window.opener.location.reload();
// 	//opener.location.reload(true);
//
// 	/*
// 	var agent = navigator.userAgent.toLowerCase();
//
// 	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
// 		alert("인터넷 익스플로러 브라우저 입니다.");
// 		opener.location.reload();
// 	} else {
// 		alert("인터넷 익스플로러 브라우저가 아닙니다.");
// 		opener.location.reload(true);
// 	}
// 	*/
// 	//session_check();
// 	try{
// 		opener.closed_refresh();
// 		window.close();
// 	}
// 	catch (e) {
// 		window.close();
// 	}
//
// }

function numberInput(btn) {
	var current = $(document.activeElement);
	var current_value = current.value;
	current_value += btn.value;

	current.value = current_value;
}

function currentRow(_item) {

	//var data =  $ ( " #grid " ). jsGrid ( " option " , " data " );

	//alert("currentRow : \n" + data);
	//var $row = $("#grid").jsGrid("rowByItem", item);
	//alert("current position : " + position);
	currentItem = _item;

	itemNo			= currentItem.NO;
	itemSPCCHK		= currentItem.SPCCHK;
	itemSTYCD		= currentItem.STYCD;
	itemCOLCD		= currentItem.COLCD;
	itemSIZECD		= currentItem.SIZECD;
	itemQTY			= currentItem.QTY;
	/*itemTYPE		= currentItem.TYPE;
	itemJAEGO		= currentItem.JAEGO;
	itemLAPRI		= currentItem.LAPRI.toString().replace(/,/g,"");
	itemDC			= currentItem.DC;
	itemMG			= currentItem.MG;
	itemFIPRICE		= currentItem.FIPRICE.toString().replace(/,/g,"");
	itemSPRICE		= currentItem.SPRICE.toString().replace(/,/g,"");
	itemSIPRICE		= currentItem.SIPRICE.toString().replace(/,/g,"");
	itemMGSEL		= currentItem.MGSEL;
	itemSALENM		= currentItem.SALENM;
	itemGIFTAMT		= currentItem.GIFTAMT.toString().replace(/,/g,"");*/
}

// 지정취소
function currentCancel() {

	if(currentItem != null) {
		var tempQTY = 0;
		if (currentItem.QTY == 0) {
			tempQTY = 1;
		} else if (tempQTY != 0) {
			tempQTY = 0;
		}
		/*
		$.extend(currentItem, {
			NO: currentItem.NO,
			SPCCHK: currentItem.SPCCHK,
			STYCD: currentItem.STYCD,
			COLCD: currentItem.COLCD,
			SIZECD: currentItem.SIZECD,
			TYPE: currentItem.TYPE,
			QTY: tempQTY,
			JAEGO: currentItem.JAEGO,
			LAPRI: currentItem.LAPRI,
			DC: currentItem.DC,
			MG: currentItem.MG,
			FIPRICE: currentItem.FIPRICE,
			SPRICE: currentItem.SPRICE,
			SIPRICE: currentItem.SIPRICE,
			MGSEL: "1",
			MILGU: "0",
			GIFTAMT: 0,
			GIFT1AMT: "",
			GIFT2AMT: "",
			GIFT3AMT: "",
        });
		*/
		$.extend(currentItem, {
			QTY: tempQTY,
			//SIPRICE: currentItem.SIPRICE,
			SIPRICE: numberWithCommas(parseInt(currentItem.SPRICE.replace(/,/g,"")) * (parseInt(tempQTY))),
			MGSEL: "1",
			MILGU: "0",
			GIFTAMT: "",
			GIFT1AMT: "",
			GIFT2AMT: "",
			GIFT3AMT: ""
        });

        //$("#jsGrid").jsGrid("updateItem", currentItem);
		//currentItem = null;
		$('#btn_count_up').attr('disabled', true);
		updateItems();
		barcodeFocus();
		currentItem = null;
	} else {
		alert("취소할 상품을 선택하세요.");

	}
	barcodeFocus();
}


// 전체취소
function all_cancel_open() {
	//var wX = screen.availWidth;
	//var wY = screen.availHeight;

	//var left = (wX / 2) - 160;
	//var top = (wY / 2) - 48;

	//child = window.open("/sang/webpos/DialogOkCancel.html", "전체취소", 'top=' + top + ', left=' + left + ', width=320, height=156, status=no, toolbar=no, location=no, titlebar=no');
	var $el = $("#layer99");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg99');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer99').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

		var iCount = 0;
	/*
	// 저장 버튼을 클릭
	$el.find('a.btn-layerSave').click(function(){
		iCount++;
		alert("취소 확인버튼 : " + iCount);
		//clearItems(false);
		isDim ? $('.dim-layer99').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});
	*/
	$el.find('a.btn-layerClose').click(function(){
		barcodeFocus();
		isDim ? $('.dim-layer99').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});
	$('.layer .dimBg99').click(function(){
		$('.dim-layer99').fadeOut();
		return false;
	});
}

function all_cancel_items() {
	var cash = $('#input_cash');
	var credit = $('#input_credit');
	var gift = $('#input_gift');

	var tot_getPrice = parseInt($('#lbl_getprice').text());
	var total = parseInt(cash.val()) + parseInt(credit.val()) + parseInt(gift.val());
		//var total = (cash.attr('value') + credit.attr('value') + gift.attr('value'));
		//alert("tot : " + tot_getPrice + "\ntotal : " + total);

	var saleTag = "Z";


	$('#lbl_gettotal').text(String(total));
	$('#lbl_change').text(String(total - tot_getPrice));

	temp_cuscd = "";
	temp_cusnm = "";
	if (CUS_INFO == null)
	{
		temp_cuscd = "";
		temp_cusnm = "";
	} else {
		temp_cuscd = CUS_INFO.CUSCD;
		temp_cusnm = CUS_INFO.CUSNM;
	}

	// 현재 판매정보
	var temp = {
		SALEDATE : salday,
		OUTDATE : salday,
		PROVIDERID : '<%=DPCD%>',
		POSNO : POSNO,
		SALETAG : saleTag,
		SALETIME : getTime(),
		TOTAMT : 0,
		GETAMT : 0,
		CASHAMT : 0,
		CARDAMT : 0,
		TICKAMT : 0,
		MILGU3AMT: 0,
		POINTAMT : 0,
		USEPOINT : 0,
		OUTAMT : 0,
		DCAMT : 0,
		CUSTOMERID : temp_cuscd,
		CUSTOMERNAME : temp_cusnm
	}
	var sale = JSON.stringify(temp);
	//alert("sale's length : " + sale.length + ", data : " + sale);

	var items = $("#jsGrid").jsGrid("option", "data");
	var str = JSON.stringify(items);
	//alert("sendData's length : " + str.length + ", data : " + str);

	var promise = $.ajax({
		url: "./push_cancel.asp",
		type: "POST",
		data: {
			"sale"		: escape(sale),
			"items"		: escape(str)
		},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		datatype: 'json',
		cache: true
	});
	promise.done(function(data) {
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1")
		{
			alert(jObject.msg);
		} else if (jObject.error == "0")
		{
			//alert(jObject.msg);
			clearItems(false);
			$('.dim-layer99').fadeOut();
		}
	});
	promise.fail(function(data) {
		alert("push_cancel fail : " + data);
	});

	//clearItems(false);
	//$('.dim-layer99').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
}

// 고객조회
function cust_search_ifrm(){//180816 LGE
	var keyword = $('#input_cus_nm').val();			// 고객명 및 전화번호
	if (keyword.length == 0)
	{
		alert("고객명을 입력해주세요.");
		$('#input_cus_nm').focus();
		return;
	}
	var search	= salday;			// 날짜

	//document.iFrame_input.document.location.replace("custom_search_ifrm.asp?chk=0&cus_no="+keyword+"&search="+search);
	var promise = $.ajax({
		url: "./custom_search_ifrm.asp",
		type: "POST",
		data: {
			"chk"			: "0",
			"cus_no"		: escape(keyword),
			"search"		: search
		},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		datatype: 'json',
		cache: true
	});
	promise.done(function(data) {
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			alert(jObject.msg);
		} else if (jObject.error == "0") {
			//alert(jObject.msg);
			//clearItems(false);
			//$('.dim-layer99').fadeOut();
			if (jObject.msg == "dup") {
				custom_dup_open(jObject.data);
			} else {
				cust_result(jObject.CUSCD, jObject.KNM, jObject.HPNO, jObject.BIRDT,
							jObject.MILE, jObject.TOTMILE, jObject.WK_CUS_MILE1,
							jObject.WK_CUS_MILE2, jObject.HPNO2, jObject.BIRGU,
							jObject.SEX, jObject.ZIPCD, jObject.ADDR, jObject.ADDR2,
							jObject.CARDNO,jObject.LASTDT,jObject.TCUSCD, jObject.MVDCD);
			}
		} else if (jObject.error == "00") {
			alert(jObject.msg);
			//tcustom_dup_open(jObject.data);
			//tcustom_search_open();
			c_reg_open(null, true);
			$('#c_reg_title').text("통합고객검색");
			$('#c_reg_birth').css('display', 'none');
			$('#c_reg_addr1').css('display', 'none');
			$('#c_reg_addr2').css('display', 'none');
			$('#c_reg_addr3').css('display', 'none');
			$('#c_reg_card').css('display', 'none');
			$('#c_reg_sms').css('display', 'none');
			$('#btn_dup').val("검색");
			$('#btn_c_reg_request').css('display', 'none');

			$('#input_hp_middle').focus();
		} else if (jObject.error == "99") {
			alert(jObject.msg);
			c_reg_open(jObject.lFlag, true);
		}else if (jObject.error == "2") {
			//alert(jObject.msg);
			var mBox = confirm("통합브랜드 고객이 아닙니다.\n통합고객으로 등록하시겠습니까?");
			if (mBox)
			{	var tcuscd  = jObject.TCUSCD;
				miss_cust_save(tcuscd);
			} else {
			return;
			}
		}
	});
	promise.fail(function(data) {
		alert("cust_search_ifrm fail : " + data);
	});
}

/*
	cusCd		: 고객코드
	cusName		: 고객명
	cusHp		: 고객 휴대폰번호
*/
// 고객조회 결과
function cust_result(cuscd, cusnm, cushp, cusbirth, cusmil, cusmiltot, cusmil1, cusmil2, hp, birgu, sex, zipcd, addr, addr2,cardno,lastdt,tcuscd, mvdcd) {//180816 LGE

	if (CUS_INFO != null)
	{
		CUS_INFO = null;
	}

	CUS_INFO = {
		CUSCD : cuscd,
		CUSNM : cusnm,
		CUSHP : cushp,
		CUSBIRTH : cusbirth,
		CUSMIL : cusmil,
		CUSMILTOT : cusmiltot,
		CUSMIL1 : cusmil1,
		CUSMIL2 : cusmil2,
		HP : hp,
		BIRGU : birgu,
		SEX : sex,
		ZIPCD : zipcd,
		ADDR : addr,
		ADDR2 : addr2,
		CARDNO : cardno ,
		LASTDT : lastdt,
		TCUSCD : tcuscd,
		MVDCD : mvdcd
	};

	$('#input_cus_nm').val(CUS_INFO.CUSNM + "(" + CUS_INFO.CUSCD + ")");
	$('#input_cus_hpno').val(CUS_INFO.HP);
	$('#input_cus_mil').val(CUS_INFO.CUSMIL + " / " + CUS_INFO.CUSMILTOT);
	$('#input_cus_mil_1_2').val(CUS_INFO.CUSMIL1 + " / " + CUS_INFO.CUSMIL2);


	$('#btn_cus_search').css('display', 'none');
	$('#btn_cus_new').css('display', 'none');
	$('#btn_cus_cancel').css('display', 'inline-block');
	$('#btn_cus_edit').css('display', 'inline-block');

	$('#input_cus_nm').attr('disabled', true);
	barcodeFocus();
	currentItem = null;
}

function cus_cancel() {//180816 LGE
	CUS_INFO = null;
	$('#input_cus_nm').val("");
	$('#input_cus_hpno').val("");
	$('#input_cus_mil').val("");
	$('#input_cus_mil_1_2').val("");


	$('#btn_cus_search').css('display', 'inline-block');
	$('#btn_cus_new').css('display', 'inline-block');
	$('#btn_cus_cancel').css('display', 'none');
	$('#btn_cus_edit').css('display', 'none');

	$('#input_cus_nm').attr('disabled', false);
	$('#input_cus_nm').focus();

	var items = $("#jsGrid").jsGrid("option", "data");
	items.forEach(function(item) {
		item.MILGU = "0";
		item.MGSEL = "1";
		item.GIFTAMT = 0;
		item.GIFT1AMT = "";
		item.GIFT2AMT = "";
		item.GIFT3AMT = "";
	});

	selectCustom = null;
	$selectCustom = null;
	updateItems();
	barcodeFocus();
	currentItem = null;
	$("#jsGrid").jsGrid("refresh");
}

function cust_void(flag) {
	// 등록된 고객 X, 신규가입 시작
	c_reg_open(flag, true);
}

// 단가조회
function r_search_open()
{
	//var barcd  = document.d_sale.prdcd.value;
	//var day1   ='<%=salday%>';

	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth();
	var day = now.getDate();

	var day1 = year + month + day;

	window.open('r_search_popup.asp?day1='+day1,'r_search_popup','width=420, height=300, top=100, left=100, scrollbars=yes');
}

// 수표조회
function c_search_open()
{
	//var barcd  = document.d_sale.prdcd.value;
	//var day1   ='<%=salday%>';

	var wX = screen.availWidth;
	var wY = screen.availHeight;

	var left = (wX / 2) - 275;
	var top = (wY / 2) - 175;

	//child = window.open('c_search_popup.html?','수표조회','width=550, height=350, top=' + top + ', left=' + left + ', status=no, toolbar=no, location=no, titlebar=no, resizable=yes');
	//layer_test("#layer2");

		var $el = $("#layer2");		//레이어의 id를 $el 변수에 저장
        var isDim = $el.prev().hasClass('dimBg2');	//dimmed 레이어를 감지하기 위한 boolean 변수

        isDim ? $('.dim-layer2').fadeIn() : $el.fadeIn();

		$('#input_no').focus();

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

		$('#datepicker').val(getDay());
		c_search_focus = "";

        $el.find('a.btn-layerClose').click(function(){
			$('#sel_ctype').val("13");
			$('#input_no').val("");
			$('#input_price').val("");
			barcodeFocus();
            isDim ? $('.dim-layer2').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
            return false;
        });

        $('.layer .dimBg2').click(function(){
            $('.dim-layer2').fadeOut();
            return false;
        });
}

/*
function clearItems() {
	// 판매List all clear
	$("#jsGrid").jsGrid("option", "data", []);
	$("#jsGrid").jsGrid("refresh");

	$('#input_cash').attr('disabled', true);
	$('#input_credit').attr('disabled', true);
	$('#input_gift').attr('disabled', true);

	$('#input_cash').val("0");
	$('#input_credit').val("0");
	$('#input_gift').val("0");

	//child.close();
	setSIPRICE();
	barcodeFocus();
}
*/


// 전체취소, 정산완료 시 현재 Item Clear
function clearItems(popup_flag) {
	// 판매List all clear

	if (popup_flag) {
		// 전체취소 및 팝업에 의한 clear
		child.close();
	}
	cus_cancel();

	calc(6);
	$("#jsGrid").jsGrid("option", "data", []);
	$("#jsGrid").jsGrid("refresh");
	updateItems();
	barcodeFocus();
	currentItem = null;
	/*
	$('#input_cash').attr('disabled', true);
	$('#input_credit').attr('disabled', true);
	$('#input_gift').attr('disabled', true);

	$('#input_cash').val("0");
	$('#input_credit').val("0");
	$('#input_gift').val("0");

	//child.close();
	setSIPRICE();
	barcodeFocus();
	*/
}

function push_hold() {

	// current sale items
	var items = $("#jsGrid").jsGrid("option", "data");
	//var holdList = $("#jsGrid8").jsGrid("option", "data");
	//var tempList = holdList;
	var hold_count = parseInt($('#hold_count').val());
	// 현재 판매 진행중인 Item이 없을 경우 pop
	if (items.length < 1)
	{
		//alert("holdList's length : " + holdList.length);
		if (hold_count == 1)
		{
			/*
			// 보류가 1일 경우 pop
			var pop = holdList.splice(holdList.length - 1, 1);

			$("#jsGrid").jsGrid("option", "data", pop[0].ITEMS);
			$("#jsGrid").jsGrid("refresh");
			*/
			search_hold(true);		// 보류가 1개일 때
			//$("#jsGrid").jsGrid("option", "data", hold_item[0]);
			//$("#jsGrid").jsGrid("refresh");
		}
		else if (hold_count > 1) {
			// 보류 개수가 2개 이상인 경우 선택을 위해 popup Show
			//alert("보류중인 Item 많음(" + arrayHold.length + "개)");


			// array.splice(index, 1) : 원하는 index의 배열 요소 반환 및 array remove
			/*
			var pop = arrayHold.splice(arrayHold.length - 1, 1);

			$("#jsGrid").jsGrid("option", "data", pop[0].ITEMS);
			$("#jsGrid").jsGrid("refresh");
			*/
			search_hold(false);

		} else {
			// 판매, 보류 목록이 전부 없을 경우
			alert("보류할 상품이 없습니다.");
		}
	} else {
		// 현재 판매가 진행중일 경우 해당 상품들 push


		var cuscd = "";
		var cusnm = "";
		if (CUS_INFO != null)
		{
			cuscd = CUS_INFO.CUSCD;
			cusnm = CUS_INFO.CUSNM;
		}
		/*
		items.forEach(function(item) {
			delete item.No;
		});
		*/
		var tempData = JSON.stringify(items);

		/*
		var tData = {
			gb : "2",
			vdcd : '<%=DPCD%>',
			posno : POSNO,
			saledt : salday,
			saletime : getTime(),
			cuscd : cuscd,
			cusnm : cusnm,
			saleamt: $("#lbl_getprice").text().replace(/,/g,""),
			data : tempData
		}
		var sendData = JSON.stringify(tData);

		alert("sendData's length : " + sendData.length + ", sendData : " + sendData);
		*/

		var promise = $.ajax({
			url: "./push_hold.asp",
			type: "POST",
			data: {
				gb : "2",
				vdcd : '<%=DPCD%>',
				posno : POSNO,
				saledt : salday,
				saletime : getTime(),
				cuscd : cuscd,
				cusnm : escape(cusnm),
				saleamt: $("#lbl_getprice").text().replace(/,/g,""),
				data : escape(tempData)
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			//async: false,
			cache: false
		});
		promise.done(function(data) {
			//alert("done : " + data);
			session_check(data);
			var jObject = JSON.parse(data);
			if (jObject.error == "1")
			{
				alert(jObject.msg);
			} else if (jObject.error == "0")
			{
				alert(jObject.msg);
				$("#jsGrid").jsGrid("option", "data", []);
				$("#jsGrid").jsGrid("refresh");
				search_hold_count();
				cus_cancel();
				//code_insert(jObject.spc_chk, jObject.barcode, jObject.style, jObject.colcd, jObject.sizecd, jObject.type1, jObject.cnt, jObject.jeago, jObject.fipri, jObject.price, jObject.dc, jObject.mg, jObject.silpak, jObject.sacod, jObject.t_price_yn)
			}
		});
		promise.fail(function(data) {
			alert("push_item fail : " + data);
		});



		/*
		var t = getDate();

		var client = {
			NO : "",
			TIME : t,
			ITEMS : items
		}
		$("#jsGrid8").jsGrid("insertItem", client);
		$("#jsGrid8").jsGrid("refresh");
		//arrayHold.push(client);

		// 판매List clear & refresh
		$("#jsGrid").jsGrid("option", "data", []);
		$("#jsGrid").jsGrid("refresh");
		*/
	}
	search_hold_count();
	//currentItem = null;
	$('#btn_count_up').attr('disabled', true);
	updateItems();

	//var str = "보류(" + holdList.length + ")";
	//$('#btn_hold').text(str);
	//document.f_body.btn_hold.textContent = "보류(" + arrayHold.length + ")";
	barcodeFocus();
	currentItem = null;
}

function ajax_success(data) {
	alert("성공");
	var jsondata = JSON.stringify(data);

	alert(jsondata);
}

function ajax_fail(data) {
	alert(data);
}

function getItemToJson() {
	var items = $("#jsGrid").jsGrid("option", "data");
	var str = JSON.stringify(items);
	return str;
}

function pop_item() {
	var holdList = $("#jsGrid8").jsGrid("option", "data");

	var index = selectHold.NO;
	var pop = holdList.splice(index - 1, 1);

	$("#jsGrid").jsGrid("option", "data", selectHold.ITEMS);
	$("#jsGrid").jsGrid("refresh");

	//$("#jsGrid8").jsGrid("option", "data", arrayHold);
	$("#jsGrid8").jsGrid("refresh");

	$('.dim-layer8').fadeOut(); // 레이어를 닫는다.

	updateItems();

	var str = "보류(" + holdList.length + ")";
	$('#btn_hold').text(str);
	barcodeFocus();
	currentItem = null;
}

function return_item() {
	if(currentItem != null) {

		// 결제 사용 X 매장일 경우 반품 제한 체크
		if (JUWSU == false && currentItem.SPCCHK == "정상" && parseInt(currentItem.QTY) > 0) {
			var promise = $.ajax({
			url: "./search_return.asp",
			type: "POST",
			data: {
				STYCD			: currentItem.STYCD,
				COLCD			: currentItem.COLCD,
				SALEDAY			: salday,
				BRAND			: currentItem.BRCD,
				SQTY			: currentItem.QTY
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: false,
			async: false,
			});
			promise.done(function(data) {
				//alert("done : " + data);
				session_check(data);
				var jObject = JSON.parse(data);
				if (jObject.error == "1") {
					//c_reg_init();
					alert(jObject.msg);
					$("#jsGrid").jsGrid("updateItem", currentItem);
					barcodeFocus();
				} else if (jObject.error == "0") {
					//alert(jObject.msg);
					console.log(jObject);
					/*
					if (parseInt(jObject.QTY) < (parseInt(jObject.FRQTY) + parseInt(currentItem.QTY))) {
						alert("반품 허용 수량(" + jObject.QTY + ")을 초과하였습니다.");
						$("#jsGrid").jsGrid("updateItem", currentItem);
						barcodeFocus();
						return;
					}
					*/
					return_history_open();
				}
			});
			promise.fail(function(data) {
				alert("search_return fail : " + data);
			});
		} else {
			var giftAmt = 0;
			if (currentItem.GIFTAMT == "") {
				giftAmt = 0;
			} else {
				giftAmt = parseInt(currentItem.GIFTAMT.replace(/,/g,""));
			}
			/*
			$.extend(currentItem, {
				NO: currentItem.NO,
				SPCCHK: currentItem.SPCCHK,
				STYCD: currentItem.STYCD,
				COLCD: currentItem.COLCD,
				SIZECD: currentItem.SIZECD,
				TYPE: currentItem.TYPE,
				QTY: parseInt(currentItem.QTY) * (-1),
				JAEGO: currentItem.JAEGO,
				LAPRI: currentItem.LAPRI,
				DC: currentItem.DC,
				MG: currentItem.MG,
				FIPRICE: currentItem.FIPRICE,
				SPRICE: currentItem.SPRICE,
				SIPRICE: currentItem.SIPRICE,
				MGSEL: currentItem.MGSEL,
				SALENM: currentItem.SALENM,
				GIFTAMT: currentItem.GIFTAMT,
				SALEKEY: ""
			});
			*/
			$.extend(currentItem, {
				QTY: parseInt(currentItem.QTY) * (-1),
				SIPRICE: numberWithCommas(parseInt(currentItem.SPRICE.replace(/,/g,"")) * (parseInt(currentItem.QTY) * (-1)) - giftAmt),
				MGSEL: "1",
				MILGU: "0",
				GIFTAMT: "",
				GIFT1AMT: "",
				GIFT2AMT: "",
				GIFT3AMT: ""
		});

			$("#jsGrid").jsGrid("updateItem", currentItem);
			$('#btn_count_up').attr('disabled', true);
			updateItems();
			currentItem = null;
			barcodeFocus();
		}
	} else {
		alert("반품할 상품을 선택하세요.");
	}

}

// 판매내역조회 open
function return_history_open() {
	var $el = $("#layer18");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg18');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer18').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

	if (CUS_INFO != null){
		$('#b_return_title').html("판매내역조회 (최근 1년간 " + CUS_INFO.CUSNM + "님의 판매내역입니다.)");
		$('#input_return_custom').val(CUS_INFO.CUSCD);
	} else {
		$('#b_return_title').html("판매내역조회 (최근 1년간 해당품번의 판매내역입니다.)");
		$('#input_return_custom').val("");
	}
	$('#input_return_item').val(currentItem.BARCODE);

	// 조회날짜 init
	$("#dp_return_from").val(getLastYear());
	$("#dp_return_to").val(getDay());

	$("#jsGrid11").jsGrid("option", "data", []);

	$('#btn_return_choice').attr('disabled', true);

	search_return_history();
	/*
	$el.find('a.btn-layerClose').click(function(){
		$("#jsGrid").jsGrid("updateItem", currentItem);
		$('#btn_count_up').attr('disabled', true);
		updateItems();
		barcodeFocus();
		$('.dim-layer18').fadeOut();
		return false;
	});

	$('.layer .dimBg18').click(function(){
		barcodeFocus();
		$('.dim-layer18').fadeOut();
		return false;
	});
	*/
}

function return_history_close() {
	$("#jsGrid").jsGrid("updateItem", currentItem);
	$('#btn_count_up').attr('disabled', true);
	updateItems();
	barcodeFocus();
	$('.dim-layer18').fadeOut();
}

function search_return_history() {

	var date_from = $("#dp_return_from").val();		// 영업일1
	var saleday1 = date_from.replace(/-/gi, "");
	var date_to = $("#dp_return_to").val();			// 영업일2
	var saleday2 = date_to.replace(/-/gi, "");

	var temp_tcuscd = "";
	var temp_cuscd = "";
	if (CUS_INFO != null) {
		temp_tcuscd = CUS_INFO.TCUSCD;
		temp_cuscd = CUS_INFO.CUSCD;
	}

	var promise = $.ajax({
		url: "./search_return_history.asp",
		type: "POST",
		data: {
			TCUSCD			: temp_tcuscd,
			CUSCD			: temp_cuscd,
			STYCD			: currentItem.STYCD,
			COLCD			: currentItem.COLCD,
			SIZECD			: currentItem.SIZECD,
			SALEDAY1		: saleday1,
			SALEDAY2		: saleday2,
			BRAND			: currentItem.BRCD
		},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		datatype: 'json',
		cache: false,
		async: false,
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			//c_reg_init();
			//alert(jObject.msg);
		} else if (jObject.error == "0") {
			//alert(jObject.msg);
			console.log(jObject);
			$("#jsGrid11").jsGrid("option", "data", jObject.data);
		}
	});
	promise.fail(function(data) {
		alert("search_return_history fail : " + data);
	});
}

function select_history(saledt, vdcd, seq) {
	// 날짜 + VDCD + SEQ
	var salekey = saledt + vdcd + seq;
	//currentItem.SALEKEY = salekey;

	$.extend(currentItem, {
		NO: currentItem.NO,
		SPCCHK: currentItem.SPCCHK,
		STYCD: currentItem.STYCD,
		COLCD: currentItem.COLCD,
		SIZECD: currentItem.SIZECD,
		TYPE: currentItem.TYPE,
		QTY: parseInt(currentItem.QTY) * (-1),
		JAEGO: currentItem.JAEGO,
		LAPRI: currentItem.LAPRI,
		DC: currentItem.DC,
		MG: currentItem.MG,
		FIPRICE: currentItem.FIPRICE,
		SPRICE: currentItem.SPRICE,
		SIPRICE: currentItem.SIPRICE,
		MGSEL: currentItem.MGSEL,
		SALENM: currentItem.SALENM,
		GIFTAMT: currentItem.GIFTAMT,
		SALEKEY: salekey
	});
	$('.dim-layer18').fadeOut();
	$("#jsGrid").jsGrid("updateItem", currentItem);
	//currentItem = null;
	$('#btn_count_up').attr('disabled', true);
	updateItems();
	barcodeFocus();
}

var calc_ing = false;
function calc_check(button) {
	// 현금 + 카드 + 상품권 = 합계 check

	if (event.keyCode == 13 || button)			// Enter 혹은 OK 버튼 클릭
	{
		if (calc_ing) {
			console.log("정산중");
			return;
		}

 		var cash = $('#input_cash');
		var credit = $('#input_credit');
		var gift = $('#input_gift');

		var tot_getPrice = parseInt($('#lbl_getprice').text().replace(/,/g,""));		// 각 할인을 제외한 받아야 할 금액
		var total = parseInt(cash.val()) + parseInt(credit.val()) + parseInt(gift.val());
			//var total = (cash.attr('value') + credit.attr('value') + gift.attr('value'));
			//alert("tot : " + tot_getPrice + "\ntotal : " + total);


		if (Math.abs(total) >= Math.abs(tot_getPrice))
		{
			//alert("받은 금액 > 받을 금액");
			calc_ing = true;

			temp_tcuscd = "";
			temp_cuscd = "";
			temp_cusnm = "";
			temp_hp	   = "";
			temp_totmile = "";
			temp_lastdt = "";
			if (CUS_INFO == null)
			{
				temp_cuscd = "";
				temp_cusnm = "";
				temp_hp = "";
				temp_totmile = "";
			} else {
				temp_tcuscd = CUS_INFO.TCUSCD;
				temp_cuscd = CUS_INFO.CUSCD;
				temp_cusnm = CUS_INFO.CUSNM;
				temp_hp = CUS_INFO.CUSHP;
				temp_totmile = CUS_INFO.CUSMIL;
				temp_lastdt = CUS_INFO.LASTDT;
			}

			$('#lbl_gettotal').text(String(total));
			$('#lbl_change').text(String(total - tot_getPrice));

			var saleTag = "";
			/*
			switch (workType)
			{
			case 3:
				saleTag = "A";
				break;
			case 4:
				saleTag = "B";
				break;
			case 5:
				saleTag = "C";
				break;
			}
			*/
			if (Math.abs(parseInt(credit.val())) > 0) {
				saleTag = "B";
			} else if (Math.abs(parseInt(gift.val())) > 0) {
				saleTag = "C";
			} else if (Math.abs(parseInt(cash.val())) > 0) {
				saleTag = "A";
			}

			//카드금액 = 받을 금액 - 현금 - 상품권
			//var card_amt =

			var sale = {
				SALEDATE			: salday,
				OUTDATE				: salday,
				PROVIDERID			: '<%=DPCD%>',
				POSNO				: POSNO,
				SALETAG				: saleTag,
				SALETIME			: getTime(),
				TOTAMT				: tot_getPrice,									// 받아야 할 금액
				GETAMT				: parseInt($('#lbl_totalprice').text().replace(/,/g,"")),		// 총 합계금액
				CASHAMT				: tot_getPrice - credit.val() - gift.val(),		// 현금 정산금액   - CASHAMT + OUTAMT = 현금 받은 돈
				CARDAMT				: credit.val(),
				TICKAMT				: gift.val(),
				MILGU3AMT			: $('#lbl_gift1_amt').text().replace(/,/g,""),
				POINTAMT			: $('#lbl_gift3_amt').text().replace(/,/g,""),
				USEPOINT			: $('#lbl_gift2_amt').text().replace(/,/g,""),
				OUTAMT				: $('#lbl_change').text().replace(/,/g,""),						// 거스름돈
				DCAMT				: $("#lbl_dcamt").text().replace(/,/g,""),
				DISCOUNTAMT			: DISCOUNTAMT,
				TCUSCD				: temp_tcuscd,
				CUSTOMERID			: temp_cuscd,
				CUSTOMERNAME		: temp_cusnm,
				CUSTOMERHP			: temp_hp,
				CHANGEMILE			: "",
				TOTMILE				: temp_totmile,
				LASTDT				: temp_lastdt,
				CARDGU				: "",
				PREFIX				: "",
				CARDID				: "",
				CARDNAME			: "",
				VALIDITY			: "",
				SLICE				: 0,
				APPROVALTIME		: "",
				APPROVALNO			: "",
				APPROVALNO2			: "",
				MAIPCD				: "",
				MAIPNAME			: "",
				CASH_APPROVALDATE	: "",
				CASH_APPROVALTIME	: "",
				CASH_APPROVALNO		: "",
				CASH_APPROVALNO2	: ""
			}

			if (currentSale != null) {
				currentSale = null;
				currentSale = sale;
			} else {
				currentSale = sale;
			}

			if ($('#cb_discountamt')[0].checked == true && (parseInt(cash.val()) > 0 || parseInt(credit.val()) > 0))
			{
				//alert("매장할인 적용중");
				discountamt_pop_open();
				return;
			}

			calc_start(sale);

			/*
			if (saleTag != "B") {

				var items = $("#jsGrid").jsGrid("option", "data");
				for (i = 0;i < items.length;i++)
				{

					if (items[i].QTY == 0)
					{
						var pop = items.splice(i, 1);
					}
				}
				var str = JSON.stringify(items);
				alert("sendData's length : " + str.length + ", data : " + str);


				// 현금정산 & 현금연수증 발급 체크
				if (parseInt(cash.val()) > 0 && $('#cb_cash_req')[0].checked == true)
				{
					// 현금영수증 발급
					var data =  {
						WON: "1004",				// 금액	 cash.val() - sale.OUTAMT 받은 금액 - 거스름돈
						SELLNO: "TEST12345"	// 임시판매번호
					};

					UPIPOS.payCash(data, function(resdata) {
						console.log(resdata);
						now_resdata = resdata;
						if(resdata.RS04 == "0000") {
							currentCashData = resdata;
							sale.CASH_APPROVALDATE	= resdata.RS07.substring(0, 6);
							sale.CASH_APPROVALTIME	= resdata.RS07.substring(6, 12);
							sale.CASH_APPROVALNO	= resdata.RS09;
							sale.CASH_APPROVALNO2	= resdata.RS08;
							//var sale = JSON.stringify(temp);
							sale_calc(sale, items, false);
						} else {		// 거래 실패
							// RS15 - D:알리고 싶은 메시지 있음, d:메시지 없음
							currentCashData = "";
							if(resdata.RS15 == "D") {
								alert("현금영수증 승인 실패.\nerrorCode : " + resdata.RS04 + "\n" + "내용 : " + resdata.RS16);
								console.log('ERR: RS04 data:', resdata.RS04);
								console.log('ERR: RS16 data:', resdata.RS16);
								console.log('ERR: RS17 data:', resdata.RS17);
							}
							// 사용자 취소
							if (resdata.MSG != null && resdata.MSG == "User Cancel")
							{
								alert("현금영수증 승인이 취소되었습니다.\n다시 시도해주세요.");
								$('#input_discount').val("0");
								calc_cancel();
								//currentCardData = "";
								//DISCOUNTAMT = 0;
								//currentSale = null;
								return;
							}

						}

					}, function(err) {
						console.log('err:', err);
					});
					return;
				}
				sale_calc(sale, items, false);
			} else if (saleTag == "B") {
				// 카드

				var $el = $("#layer11");		//레이어의 id를 $el 변수에 저장
				var isDim = $el.prev().hasClass('dimBg11');	//dimmed 레이어를 감지하기 위한 boolean 변수

				isDim ? $('.dim-layer11').fadeIn() : $el.fadeIn();

				//$('#input_no').focus();
				$('#input_discount').select();

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

				$('#input_discount').focus();
				$('#input_discount').val("0");
				$('#input_discount').select();
				$('#input_slice').val("0");

				$el.find('a.btn-layerClose').click(function(){
					$('#input_discount').val("0");
					calc_cancel();
					$('.dim-layer11').fadeOut()
					return false;
				});

				$('.layer .dimBg11').click(function(){
					$('.dim-layer11').fadeOut();
					return false;
				});
			}
			//document.if_sale_ok.document.location.replace("asp_test.asp?items=" + str + "&sale=" + sale);
			*/
		} else {
			if (workType < 5)
			{
				workType++;
				calc(workType);
			} else {
				workType = 3;
				calc(workType);
			}
		}
	} else {
		return;
	}
}

// 영수증 print
function print_receipt(sale, items, result, refresh_flag) {

	if (!JUWSU)	{
		console.log("결제단말기 사용X | print_receipt return");
		DISCOUNTAMT = 0;
		clearItems(false);
		if (refresh_flag){
			search_receipt();
		}
		return;
	}
	/*
		method : 수표조회
		checkLookup (reqdata, callback, error_callback)
	*/


	/*
	UPIPOS._USERDATA = {
		"COMPNM" : "테스아울렛",
		"ADDRESS" : "경기 성남시 중원구 순환로 101",
		"CTEL" : "010-1111-2222",
		"BIZNO" : "129-85-34482",
		"OWNERNM" : "홍길동",
		"POSNO" : result.POSNO + "번",
		"POSNM" : result.SALEEMPNAME
	};
		*/
	UPIPOS._USERDATA.POSNO = result.POSNO + "번";
	UPIPOS._USERDATA.POSNM = result.SALEEMPNAME;

	var aa = js_yyyy_mm_dd_hh_mm_ss();
	console.log('aa:', aa);

	var dataArray = [];
	items.forEach(function(item) {
		//delete item.No;

		var salenm = "";
		var qty = 0;
		var lapri = 0;
		var silpri = 0;
		var couponPri = 0;

		if (item.MILGU == "3" || item.MILGU == "4" || item.MILGU == "6")
		{
			//salenm = "쿠폰";
		}

		qty = parseInt(item.QTY);
		lapri = parseInt(item.LAPRI.toString().replace(/,/g,""));
		silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) / parseInt(item.QTY));
		if (parseInt(item.DCAMT.toString().replace(/,/g,"")) > 0)
		{
			salenm = "할인";
			//lapri = item.LAPRI;
			//silpri = (parseInt(item.SIPRICE) / parseInt(item.QTY));
		}

		if (refresh_flag) {
			qty = qty *(-1);
			//lapri = lapri * (-1);
			//silpri = silpri * (-1)
			if (qty < 0) {
				salenm = "반품";
			}
		}

		var COUPONNM = "";
		if (item.GIFT2AMT != "")
		{
			COUPONNM = "마일리지";
			if (refresh_flag) {
				//silpri = parseInt(silpri) + parseInt(item.GIFT2AMT);
				silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) + parseInt(item.GIFT2AMT)) / parseInt(item.QTY);
				couponPri = item.GIFT2AMT * (-1);
			} else {
				var jArray = JSON.parse(item.GIFT2AMT);
				jArray.forEach(function(gift) {
					couponPri += parseInt(gift.GIFTPRI.toString().replace(/,/g,""));
				});
				//silpri = parseInt(silpri) + parseInt(couponPri);
				silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) + parseInt(couponPri)) / parseInt(item.QTY);
			}
		}

		if (item.GIFT3AMT != "")
		{
			COUPONNM = "인증쿠폰";
			if (refresh_flag) {
				//silpri = parseInt(silpri) + parseInt(item.GIFT3AMT);
				silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) + parseInt(item.GIFT3AMT)) / parseInt(item.QTY);
				couponPri = item.GIFT3AMT * (-1);
			} else {
				var jArray = JSON.parse(item.GIFT3AMT);
				jArray.forEach(function(gift) {
					if (gift.GIFTGU == "금액") {
						couponPri += parseInt(gift.GIFTPRI.toString().replace(/,/g,""));
					} else if (gift.GIFTGU == "DC율") {
						couponPri += parseInt(gift.GIFTPRI2);
					}
				});
				//silpri = parseInt(silpri) + parseInt(couponPri);
				silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) + parseInt(couponPri)) / parseInt(item.QTY);
			}
		}

		if (item.GIFT1AMT != "") {
			COUPONNM = "금액권";
			//silpri = silpri + item.GIFT1AMT;
			if (refresh_flag) {
				//silpri = parseInt(silpri) + parseInt(item.GIFT1AMT);
				silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) + parseInt(item.GIFT1AMT)) / parseInt(item.QTY);
				couponPri = item.GIFT1AMT * (-1);
			} else {
				var jArray = JSON.parse(item.GIFT1AMT);
				jArray.forEach(function(gift) {
					couponPri += parseInt(gift.GIFTPRI.toString().replace(/,/g,""));
				});
				//silpri = parseInt(silpri) + parseInt(couponPri);
				silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) + parseInt(couponPri)) / parseInt(item.QTY);
			}
			//salenm = "금액권";
		}

		var ITEM_GU = "";
		if (item.SPCCHK == "아울") {
			ITEM_GU = "*";
		}

		var temp = {
			"XSTYCD"	: item.XSTYCD,			// 상품명 (최대 18bytes)
			"STYCD"		: ITEM_GU + item.STYCD + item.COLCD + item.SIZECD,		// 상품코드 (최대 18bytes)
			"SQTY"		: parseInt(qty),						// 수량 (숫자)
			"LAPRI"		: parseInt(lapri),					// 단가 (숫자)
			"SILPRI"	: parseInt(silpri),					// 판매가 (숫자)
			"COUPONPRI"	: parseInt(couponPri),
			"COUPONNM"  : COUPONNM,
			"SALENM"	: salenm
		};

		dataArray.push(temp);
	});

	var pryCredit = 0;
	var parCash = 0;
	var payCoupon = 0;
	if (refresh_flag) {
		pryCredit = sale.CARDAMT;
		parCash = sale.CASHAMT;
		payCoupon = sale.GIFTAMT;
	} else {
		pryCredit = sale.CARDAMT - DISCOUNTAMT;
		parCash = sale.CASHAMT;
		payCoupon = sale.GIFTAMT;
	}

	if (refresh_flag) {
		DISCOUNTAMT = sale.DISCOUNTAMT;
	}

	var mileageData = "";
	var reqdata = "";

	if (sale.CUSTOMERNAME != "") {
		var tempTEL = "";
		var tempNM = sale.CUSTOMERNAME.substring(0,1) + "*" + sale.CUSTOMERNAME.substring(2);
		if (sale.CUSTOMERHP != null && sale.CUSTOMERHP.length == 11) {
			tempTEL = sale.CUSTOMERHP.substring(0,3) + "-****-" + sale.CUSTOMERHP.substring(7);
		} else if (sale.CUSTOMERHP != null && sale.CUSTOMERHP.length == 10) {
			tempTEL = sale.CUSTOMERHP.substring(0,3) + "-***-" + sale.CUSTOMERHP.substring(6);
		} else if (sale.CUSTOMERHP != null && sale.CUSTOMERHP.length == 13) {
			tempTEL = sale.CUSTOMERHP.substring(0,3) + "-****-" + sale.CUSTOMERHP.substring(9);
		} else if (sale.CUSTOMERHP != null && sale.CUSTOMERHP.length == 12)	{
			tempTEL = sale.CUSTOMERHP.substring(0,3) + "-***-" + sale.CUSTOMERHP.substring(8);
		}


		mileageData = {
			"UNAME": tempNM,
			"UTEL": tempTEL,
			"UID": sale.CUSTOMERID,
			"S_POINT": numberWithCommas(parseInt(sale.CHANGEMILE)) ,		// 적립
			//"M_POINT": parseInt(sale.TOTMILE)		// 현마일리지
			"M_POINT": parseInt(sale.TOTMILE) + parseInt(sale.CHANGEMILE)		// 현마일리지
		};

		reqdata = {
			"CALDATETIME": aa,						// 영업일시
			"CALDATE": getDay(),						// 영업일
			"RECENO": String(result.SEQNO),			// 영수증번호
			"PAYCREDIT": parseInt(sale.CARDAMT),				// 카드 결제금액
			"PAYCASH": parseInt(sale.CASHAMT) + parseInt(sale.OUTAMT),				// 현금 결제금액
			//"PAYCASH": parseInt(sale.CASHAMT),				// 현금 결제금액
			//"GETMONEY": parseInt(sale.CASHAMT) + parseInt(sale.OUTAMT),		// 받은 돈
			"GIFTCARD": parseInt(sale.TICKAMT),				// 상품권 금액
			"USERDISCNT": parseInt(DISCOUNTAMT),				// 매장할인 금액

			mileage: mileageData,

			//"B_REPRINT": "N",			// 재발행여부 (Y, N)
			data : dataArray
		};
	} else {
		reqdata = {
			"CALDATETIME": aa,						// 영업일시
			"CALDATE": getDay(),						// 영업일
			"RECENO": String(result.SEQNO),			// 영수증번호
			"PAYCREDIT": parseInt(sale.CARDAMT),				// 카드 결제금액
			"PAYCASH": parseInt(sale.CASHAMT) + parseInt(sale.OUTAMT),				// 현금 결제금액
			//"PAYCASH": parseInt(sale.CASHAMT),				// 현금 결제금액
			//"GETMONEY": parseInt(sale.CASHAMT) + parseInt(sale.OUTAMT),		// 받은 돈
			"GIFTCARD": parseInt(sale.TICKAMT),				// 상품권 금액
			"USERDISCNT": parseInt(DISCOUNTAMT),				// 매장할인 금액

			//mileage: mileageData,

			//"B_REPRINT": "N",			// 재발행여부 (Y, N)
			data : dataArray
		};
	}

	//reqdata.RECENO = result.JUNPNO;
	/*
	if (sale.SALETAG == "B") {
		reqdata.credit_data = currentCardData;
	} else {
		reqdata.credit_data = "";
	}

	if (currentCashData != "") {
		reqdata.cash_data = currentCashData;
	} else {
		reqdata.cash_data = "";
	}
	*/
	//reqdata.RECENO = result.JUNPNO;
	if (sale.SALETAG == "B") {
		reqdata.credit_data = currentCardData;
		if (!PAYMODULE) {
			var credit_data = {
				RQ04 : sale.CARDID,
				RS12 : sale.MAIPNAME,
				RQ06 : sale.SLICE,
				RS09 : sale.APPROVALNO,
				RQ07 : sale.CARDAMT
			}
			reqdata.credit_data = credit_data;
		}
	} else {
		reqdata.credit_data = "";
	}

	if (currentCashData != "") {
		reqdata.cash_data = currentCashData;
	} else {
		reqdata.cash_data = "";
	}

	console.log(reqdata);


	UPIPOS.printReceipt(reqdata, function(resdata) {
		console.log(resdata);
		currentCardData = "";
		DISCOUNTAMT = 0;
		clearItems(false);
		if (refresh_flag){
			search_receipt();
		}
	}, function(err) {
		console.log(err);
		currentCardData = "";
		DISCOUNTAMT = 0;
		clearItems(false);
		if (refresh_flag){
			search_receipt();
		}
	});
}

function calc(type) {

	tot_getPrice = $('#lbl_getprice').text().replace(/,/g,"");

	var iCount = 0;
	var items = $("#jsGrid").jsGrid("option", "data");
	var coupon_amt = 0;
	for (i = items.length - 1;i >= 0;i--)
	{
		if (items[i].QTY != 0) {
			iCount++;
		}
		if (items[i].GIFT2AMT !== "" || items[i].GIFT3AMT !== "") {
			coupon_amt ++;
		}
	}

	if (CUS_INFO === null && coupon_amt > 0) {
		alert("고객정보가 없습니다.\n고객을 적용해주세요.");
		$('#input_cus_nm').focus();
		return;
	}

	if (iCount == 0 && type != 6) {
		alert("정산할 상품이 없습니다.");
		barcodeFocus();
		return;
	}

	$('#btn_cash').attr('disabled', true);
	$('#btn_credit').attr('disabled', true);
	$('#btn_gift').attr('disabled', true);

	var cash = $('#input_cash');
	var credit = $('#input_credit');
	var gift = $('#input_gift');

	var iTotal = 0;
	var sTotal = "";
	var getTotal = $('#lbl_gettotal');




	setWorkType(type);

	switch (type)
	{
		case 3:
			// 현금
			cash.attr('disabled', false);
			//$('#cb_cash_req').attr('disabled', false);		// 현금영수증 checkBox
			//$('#cb_cash_req')[0].checked = false;
			credit.attr('disabled', true);
			gift.attr('disabled', true);


			//cash.text(tot_getPrice - (credit.val() + gift.val()));

			iTotal = parseInt(credit.val()) + parseInt(gift.val());
			sTotal = String(iTotal);

			getTotal.text(sTotal);
			cash.val(tot_getPrice - sTotal);
			cash.focus();
			cash.select();
			setInput(cash[0]);
			clear_flag = true;

			$('#btn_calc_cancel').show();
			//document.f_body.input_cash.textContent = tot_getPrice - (credit.attr('value') + gift.attr('value'));
			break;
		case 4:
			// 카드
			cash.attr('disabled', true);
			//$('#cb_cash_req').attr('disabled', true);
			//$('#cb_cash_req')[0].checked = false;
			credit.attr('disabled', false);
			gift.attr('disabled', true);

			iTotal = parseInt(cash.val()) + parseInt(gift.val());
			sTotal = String(iTotal);

			getTotal.text(sTotal);
			credit.val(tot_getPrice - sTotal);

			credit.focus();
			credit.select();
			setInput(credit[0]);
			clear_flag = true;
			$('#btn_calc_cancel').show();

			break;
		case 5:
			// 상품권
			cash.attr('disabled', true);
			//$('#cb_cash_req').attr('disabled', true);
			//$('#cb_cash_req')[0].checked = false;
			credit.attr('disabled', true);
			gift.attr('disabled', false);

			iTotal = parseInt(cash.val()) + parseInt(credit.val());
			sTotal = String(iTotal);

			getTotal.text(sTotal);
			gift.val(tot_getPrice - sTotal);

			gift.focus();
			gift.select();
			setInput(gift[0]);
			clear_flag = true;
			$('#btn_calc_cancel').show();
			break;
		default :
			// 계산취소
			calcing_close();
			$('#btn_cash').attr('disabled', false);
			$('#btn_credit').attr('disabled', false);
			$('#btn_gift').attr('disabled', false);

			cash.attr('disabled', true);
			//$('#cb_cash_req').attr('disabled', true);		// 현금영수증 checkBox disabled & check false
			//$('#cb_cash_req')[0].checked = false;
			credit.attr('disabled', true);
			gift.attr('disabled', true);

			currentCardData = "";
			currentCashData = "";
			DISCOUNTAMT = 0;
			currentSale = null;
			cancel_Sale = null;

			sale_sellNo = null;

			$('#cb_cash_req')[0].checked = false;

			$('#lbl_gettotal').text("0");
			$('#lbl_change').text("0");
			cash.val("0");
			credit.val("0");
			gift.val("0");

			$('#input_slice').val("0");
			$('#input_discount').val("0");

			$('#btn_calc_cancel').hide();
			//currentItem = null;
			$('#btn_count_up').attr('disabled', true);
			//updateItems();

			calc_ing = false;
			calc_ing_count = 0;

			barcodeFocus();
			currentItem = null;
	}
}

function calc_cancel() {

	calc(6);

	alert("정산이 취소되었습니다.");
}


function getItems() {
	return $("#jsGrid").jsGrid("option", "data");
}

function barcodeFocus() {
	//document.f_body.input_barcode.focus();
	//$('#input_barcode').val("");
	$('#input_barcode').focus();
	//currentItem = null;
}



function numkeyCheck(e) {
	var keyValue = event.keyCode;
	if( ((keyValue >= 48) && (keyValue <= 57)) || (keyValue >= 96 && keyValue <= 105) || (keyValue == 8 || keyValue == 9 || keyValue == 16) )
		return true;
	else
		return false;
}

function next(pre, next, length) {
	if (pre.value.length == length) {
		$('#' + next).focus();
	}
}


function dialogClose() {
	child.close();
	document.f_body.input_barcode.focus();
}



function layer_test(_href) {
	var $href = _href;
        layer_popup($href);
}

function c_reg_init() {
	$('#input_hp_middle').val("");
	$('#input_hp_tail').val("");
	$('#input_knm').val("");
	$('#input_birth_year').val("");
	$('#input_birth_month').val("");
	$('#input_birth_day').val("");
	//$("input:radio[name='sex_check']:radio[value='M']").prop('checked', false);
	//$("input:radio[name='sex_check']:radio[value='W']").prop('checked', false);
	$('#rb_sex_m')[0].checked = false;
	$('#rb_sex_w')[0].checked = true;

	$('#input_addr_zonecode').val("");
	$('#input_addr_main').val("");
	$('#input_addr_detail').val("");

	$('#bcheckhp').val("N");
	$('#btn_dup').val("중복확인");
}

function c_reg_open(flag, edit){

	// flag 0 - 숫자, 1 - 한글

	var $el = $('#layer1');		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();

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

	//edit ? new custom : edit custom
	if (edit) {
		c_reg_init();

		if (is_number($('#input_cus_nm').val())) {
			$('#input_hp_tail').val($('#input_cus_nm').val());
			//$('#input_hp_tail').val(CUS_INFO.CUSHP.split('-')[2]);
		} else {
			$('#input_knm').val($('#input_cus_nm').val());
			//$('#input_knm').val(CUS_INFO.CUSNM);
		}
	} else {
		var cus_hp_split = "";
		if (CUS_INFO.CUSHP == "-" || CUS_INFO.CUSHP == "" || CUS_INFO.CUSHP == null) {
			$('#sel_hp_head').val("010");
		} else {
			cus_hp_split = CUS_INFO.CUSHP.split('-');
			$('#sel_hp_head').val(cus_hp_split[0]);
			$('#input_hp_middle').val(cus_hp_split[1]);
			$('#input_hp_tail').val(cus_hp_split[2]);
		}

		if (CUS_INFO.CUSNM != null) {
			$('#input_knm').val(CUS_INFO.CUSNM);
		}

		if (CUS_INFO.CUSBIRTH != null) {
			var birth_year = CUS_INFO.CUSBIRTH.substring(0,4);
			var birth_month = CUS_INFO.CUSBIRTH.substring(4,6);
			var birth_day = CUS_INFO.CUSBIRTH.substring(6,8);
			$('#input_birth_year').val(birth_year);
			$('#input_birth_month').val(birth_month);
			$('#input_birth_day').val(birth_day);
		}

		if (CUS_INFO.BIRGU == "Y") {
			$('#rb_birth_y')[0].checked = true;
		} else if (CUS_INFO.BIRGU == "N") {
			$('#rb_birth_n')[0].checked = true;
		} else {
			$('#rb_birth_y')[0].checked = true;
		}

		if (CUS_INFO.SEX == "W") {
			$('#rb_sex_w')[0].checked = true;
		} else if (CUS_INFO.SEX == "M") {
			$('#rb_sex_m')[0].checked = true;
		} else {
			$('#rb_sex_w')[0].checked = true;
		}

		if (CUS_INFO.ZIPCD != null) {
			$('#input_addr_zonecode').val(CUS_INFO.ZIPCD);
		}
		if (CUS_INFO.ADDR != null) {
			$('#input_addr_main').val(CUS_INFO.ADDR);
		}
		if (CUS_INFO.ADDR2 != null) {
			$('#input_addr_detail').val(CUS_INFO.ADDR2);
		}

		if (CUS_INFO.CARDNO != null) {
			$('#input_cardno').val(CUS_INFO.CARDNO);
		}

		if (CUS_INFO.MVDCD == DPCD) {
			$('#cb_custom_agree')[0].checked = true;
		} else {
			$('#cb_custom_agree')[0].checked = false;
		}
	}

	//$('#c_reg_birth').css('display', 'none');

	if (flag == 0) {
		$('#input_hp_tail').val($('#input_cus_nm').val());
	} else if(flag == 1) {
		$('#input_knm').val($('#input_cus_nm').val());
	}

	$('#input_knm').focus();
}

function c_reg_close() {
	c_reg_init();
	barcodeFocus();
	currentItem = null;
	$('.dim-layer').fadeOut();
}

// 고객 전화번호 중복 체크
function checkhp(){

	var hptel = '';
	var knm = '';

	if ($('#input_hp_middle').val() == "") {
		alert("가운데 번호를 입력해주세요.");
		$('#input_hp_middle').focus();
		$('#input_hp_middle').select();
		return;
	}

	if ($('#input_hp_tail').val() == "") {
		alert("뒷번호를 입력해주세요.");
		$('#input_hp_tail').focus();
		$('#input_hp_tail').select();
		return;
	}

	hptel = $('#sel_hp_head').val() + $('#input_hp_middle').val() + $('#input_hp_tail').val();
	knm = $('#input_knm').val();

	if ($('#btn_dup').val() == "중복확인") {
		xmldata = new XMLHttpRequest();
		xmldata.onreadystatechange = callbackchk;
		xmldata.open("GET","checkhp.asp?hptel=" + hptel +"&knm=" + escape(knm) , true);
		xmldata.send(null);
	} else if ($('#btn_dup').val() == "검색") {
		//alert("통합을 검색하자");
		var tcustom_hp = $('#sel_hp_head').val() + $('#input_hp_middle').val() + $('#input_hp_tail').val();
		var promise = $.ajax({
			url: "./search_tcustom.asp",
			type: "POST",
			data: {
				"KNM"		: escape($('#input_knm').val()),
				"HPNO"		: tcustom_hp
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
		});
		promise.done(function(data) {
			session_check(data);
			var jObject = JSON.parse(data);
			if (jObject.error == "1") {
				alert(jObject.msg);
				//$('.dim-layer19').fadeOut();
				/*
				c_reg_open(null, true);
				$('#input_knm').val($('#input_search_name').val());
				$('sel_hp_head').val($('#input_search_hp').val().substring(0,3));

				var hp_middle = "";
				var hp_tail = "";
				if ($('#input_search_hp').val().length == 10) {
					hp_middle = $('#input_search_hp').val().substring(3,6);
					hp_tail = $('#input_search_hp').val().substring(6,10);
				} else if ($('#input_search_hp').val().length == 11) {
					hp_middle = $('#input_search_hp').val().substring(3,7);
					hp_tail = $('#input_search_hp').val().substring(7,11);
				}

				$('#input_hp_middle').val(hp_middle);
				$('#input_hp_tail').val(hp_tail);
				*/
				$('#c_reg_title').text("고객등록");
				$('#c_reg_birth').css('display', 'inline-block');
				$('#c_reg_addr1').css('display', 'inline-block');
				$('#c_reg_addr2').css('display', 'inline-block');
				$('#c_reg_addr3').css('display', 'inline-block');
				$('#c_reg_card').css('display', 'inline-block');
				$('#c_reg_sms').css('display', 'inline-block');
				$('#btn_c_reg_request').css('display', 'inline-block');
				$('#btn_dup').val("중복확인");
			} else if (jObject.error == "0") {
				//$('.dim-layer19').fadeOut();
				//c_reg_open(null, true);
				$('#c_reg_title').text("고객등록");
				$('#c_reg_birth').css('display', 'inline-block');
				$('#c_reg_addr1').css('display', 'inline-block');
				$('#c_reg_addr2').css('display', 'inline-block');
				$('#c_reg_addr3').css('display', 'inline-block');
				$('#c_reg_card').css('display', 'inline-block');
				$('#c_reg_sms').css('display', 'inline-block');
				$('#btn_c_reg_request').css('display', 'inline-block');
				$('#btn_dup').val("중복확인");

				$('#input_knm').val(jObject.KNM);
				/*
				$('sel_hp_head').val($('#input_search_hp').val().substring(0,3));

				var hp_middle = "";
				var hp_tail = "";
				if ($('#input_search_hp').val().length == 10) {
					hp_middle = $('#input_search_hp').val().substring(3,6);
					hp_tail = $('#input_search_hp').val().substring(6,10);
				} else if ($('#input_search_hp').val().length == 11) {
					hp_middle = $('#input_search_hp').val().substring(3,7);
					hp_tail = $('#input_search_hp').val().substring(7,11);
				}

				$('#input_hp_middle').val(hp_middle);
				$('#input_hp_tail').val(hp_tail);
				*/

				$('#input_birth_year').val(jObject.BIRDT.substring(0,4));
				$('#input_birth_month').val(jObject.BIRDT.substring(4,6));
				$('#input_birth_day').val(jObject.BIRDT.substring(6,8));

				if (jObject.BIRGU == "Y") {
					$('#rb_birth_y')[0].checked = true;
				} else {
					$('#rb_birth_n')[0].checked = true;
				}

				if (jObject.SEX == "W") {
					$('#rb_sex_w')[0].checked = true;
				} else {
					$('#rb_sex_m')[0].checked = true;
				}

				$('#input_addr_zonecode').val(jObject.ZIPCD);
				$('#input_addr_main').val(jObject.ADDR);
				$('#input_addr_detail').val(jObject.ADDR2);
				$('#input_cardno').val(jObject.CARDNO);

				$('#cb_custom_agree')[0].checked = true;
			}
		});
		promise.fail(function(data) {
			alert("search_tcustom fail : " + data);
		});
	}
}

function callbackchk(){

	if(xmldata.readyState == 4){
		if(xmldata.status == 200){
			readxmlchk();
		}
	}
}

function readxmlchk(){

	//var form = document.form1;
	var result = xmldata.responseXML;
	var rootNode = result.documentElement;
	var rootValue = rootNode.firstChild.nodeValue;
	var idNode = rootNode.getElementsByTagName("rtn");
	var idValue = idNode.item(0).firstChild.nodeValue;

	var idNode2 = rootNode.getElementsByTagName("msg");
	var idValue2 = idNode2.item(0).firstChild.nodeValue;

	//form.bcheckhp.value=idValue;
	$('#bcheckhp').val(idValue);

	if (idValue=='Y')	{
		alert("등록되지 않은 번호 입니다.");
		$('#input_birth_year').focus();
	}else if (idValue=='N'){
		alert(idValue2);
	}
}

// input 번호입력 체크
function Unm_check() {
   if (event.keyCode < 48 || event.keyCode > 59) {
	  if (event.keyCode < 96 || event.keyCode > 105) {
		 if (event.keyCode != 410 && event.keyCode != 46 && event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40) {
			if (event.keyCode != 9)
			event.returnValue=false;
		 }
	  }
   }
   else   event.returnValue=true;
}

function c_reg_request() {
	var knm = $('#input_knm').val();
	//var type1 = "1";

	// 휴대전화
	var hp1 = $('#sel_hp_head').val();
	var hp2 = $('#input_hp_middle').val();
	var hp3 = $('#input_hp_tail').val();

	// 생일
	var birth1 = $('#input_birth_year').val();

	if ($('#input_birth_month').val().length < 2)
	{
		birth2 = "0" + $('#input_birth_month').val();
	} else {
		birth2 = $('#input_birth_month').val();
	}

	if ($('#input_birth_day').val().length < 2)
	{
		birth3 = "0" + $('#input_birth_day').val();
	} else {
		birth3 = $('#input_birth_day').val();
	}

	//var birth2 = $('#input_birth_month').val();
	//var birth3 = $('#input_birth_day').val();

	// 성별
	var sex = document.getElementsByName('sex_check');
	var cus_sex = "";
	for (i = 0;i < sex.length;i++)
	{
		if (sex[i].checked)
		{
			cus_sex = sex[i].value;
		}
	}

	// 생일 구분 (양 / 음 : Y / N)
	var birthType = document.getElementsByName('birth_check');
	var cus_birthType = "";
	for (i = 0;i < birthType.length;i++)
	{
		if (birthType[i].checked)
		{
			cus_birthType = birthType[i].value;
		}
	}

	// DM발송
	var dmType = document.getElementsByName('dm_check');
	var cus_dm = "";
	for (i = 0;i < dmType.length;i++)
	{
		if (dmType[i].checked)
		{
			cus_dm = dmType[i].value;
		}
	}

	// 생일 구분 (양 / 음 : Y / N)
	var smsType = document.getElementsByName('sms_check');
	var cus_sms = "";
	for (i = 0;i < smsType.length;i++)
	{
		if (smsType[i].checked)
		{
			cus_sms = smsType[i].value;
		}
	}

	var addr_zonecode = $('#input_addr_zonecode').val();
	var addr_main = $('#input_addr_main').val();
	var addr_detail = $('#input_addr_detail').val();

	if (hp2.length < 3)
	{
		alert("휴대폰번호를 입력해주세요.");
		$('#input_hp_middle').focus();
		$('#input_hp_middle').select();
		return;
	} else if (hp3.length < 3)
	{
		alert("휴대폰번호를 입력해주세요.");
		$('#input_hp_tail').focus();
		$('#input_hp_tail').select();
		return;
	}

	if (knm.length < 2)
	{
		alert("고객명을 입력해주세요.");
		$('#input_knm').focus();
		return;
	}

	if (cus_sex == "")
	{
		alert("고객 성별을 선택해주세요.");
		//$('#input_knm').focus();
		return;
	}

	if (birth1.length < 4)
	{
		alert("년도를 입력해주세요.");
		$('#input_birth_year').focus();
		$('#input_birth_year').select();
		return;
	}

	if (parseInt(birth2) < 1 || parseInt(birth2) > 12)
	{
		alert("1~12월을 입력해주세요.");
		$('#input_birth_month').focus();
		$('#input_birth_month').select();
		return;
	}

	if (parseInt(birth3) < 1 || parseInt(birth3) > 31)
	{
		alert("1~31일을 입력해주세요.");
		$('#input_birth_day').focus();
		$('#input_birth_day').select();
		return;
	}

	if (parseInt(birth1 + birth2 + birth3) > parseInt(salday))
	{
		// 생년월일이 오늘 날짜보다 클 경우
		alert("생년월일이 오늘보다 다음날입니다.\n확인해주세요.");
		$('#input_birth_year').focus();
		$('#input_birth_year').select();
		return;
	}

	if (CUS_INFO == null) {
		temp_cuscd = "";
		temp_tcuscd = "";
		if ($('#bcheckhp').val() != 'Y') {
			alert("번호 중복확인을 해주세요.");
			$('#btn_dup').focus();
			//$('#input_birth_year').select();
			return;
		}
	} else {
		if ((CUS_INFO.CUSHP != (hp1 + "-" + hp2 + "-" + hp3)) && ($('#bcheckhp').val() != 'Y')) {
			alert("번호 중복확인을 해주세요.");
			$('#btn_dup').focus();
			return;
		}
		temp_cuscd = CUS_INFO.CUSCD;
		temp_tcuscd = CUS_INFO.TCUSCD;
	}

	var cardno = $('#input_cardno').val();
	if (cardno.length > 0)
     {
		if ((cardno.substr(0,3) != "SPM") || (cardno.length != 10))
		{
		alert("카드번호를 확인하십시오." )
		$('#input_cardno').focus();
		return;
		}
     }



	if (CUS_INFO == null)
	{
		/*
		var queryString = "";
		queryString += "custom_reg.asp?knm=" + knm;
		queryString += "&type1=1";
		queryString += "&hp1=" + hp1;
		queryString += "&hp2=" + hp2;
		queryString += "&hp3=" + hp3;
		queryString += "&birth1=" + birth1;
		queryString += "&birth2=" + birth2;
		queryString += "&birth3=" + birth3;
		queryString += "&cus_sex=" + cus_sex;
		queryString += "&cus_birthType=" + cus_birthType;
		queryString += "&cus_dm=" + cus_dm;
		queryString += "&cus_sms=" + cus_sms;
		queryString += "&addr_zonecode=" + addr_zonecode;
		queryString += "&addr_main=" + addr_main;
		queryString += "&addr_detail=" + addr_detail;
		*/
		var mvdyn = "";
		if ($('#cb_custom_agree')[0].checked == true) {
			mvdyn = "on";
		} else {
			mvdyn = "off";
		}
		var promise = $.ajax({
			url: "./custom_reg.asp",
			type: "POST",
			data: {
				"knm"				: escape(knm),
				"type1"				: "1",
				"hp1"				: hp1,
				"hp2"				: hp2,
				"hp3"				: hp3,
				"birth1"			: birth1,
				"birth2"			: birth2,
				"birth3"			: birth3,
				"cus_sex"			: cus_sex,
				"cus_birthType"		: cus_birthType,
				"cus_cardno"		: $('#input_cardno').val(),
				"mvdyn"				: mvdyn,
				"addr_zonecode"		: addr_zonecode,
				"addr_main"			: escape(addr_main),
				"addr_detail"		: escape(addr_detail)
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
		});
		promise.done(function(data) {
			//alert("done : " + data);
			session_check(data);
			var jObject = JSON.parse(data);
			if (jObject.error == "1")
			{
				//c_reg_init();
				//alert(jObject.msg);
			} else if (jObject.error == "0")
			{
				alert(jObject.msg);
				console.log(jObject);
				$('.dim-layer').fadeOut();
				//alert("고객을 등록하였습니다.");
				c_reg_init();
				custom_search_cd(jObject.CUSCD);
				barcodeFocus();
				currentItem = null;
			}
		});
		promise.fail(function(data) {
			alert("custom_reg fail : " + data);
		});
		//document.iFrame_input.document.location.replace(queryString);
	} else {
		var mvdyn = "";
		if ($('#cb_custom_agree')[0].checked == true) {
			mvdyn = "on";
		} else {
			mvdyn = "off";
		}

		if (JUWSU) {
			var promise = $.ajax({
				url: "./custom_edit_1.asp",
				type: "POST",
				data: {
					"posno"				: POSNO,
					"knm"				: escape(knm),
					"tcuscd"			: temp_tcuscd,
					"cuscd"				: temp_cuscd,
					"type1"				: "1",
					"hp1"				: hp1,
					"hp2"				: hp2,
					"hp3"				: hp3,
					"birth1"			: birth1,
					"birth2"			: birth2,
					"birth3"			: birth3,
					"cus_sex"			: cus_sex,
					"cus_birthType"		: cus_birthType,
					"cus_cardno"		: $('#input_cardno').val(),
					"mvdyn"				: mvdyn,
					"addr_zonecode"		: addr_zonecode,
					"addr_main"			: escape(addr_main),
					"addr_detail"		: escape(addr_detail)
				},
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				datatype: 'json',
				cache: true
			});
			promise.done(function(data) {
				//alert("done : " + data);
				session_check(data);
				var jObject = JSON.parse(data);
				if (jObject.error == "1")
				{
					c_reg_init();
					//alert(jObject.msg);
				} else if (jObject.error == "0")
				{
					alert(jObject.msg);
					$('.dim-layer').fadeOut();
					//alert("고객을 등록하였습니다.");
					c_reg_init();
					custom_search_cd(jObject.CUSCD);
					barcodeFocus();
				}
			});
			promise.fail(function(data) {
				alert("custom_edit fail : " + data);
			});
		} else {
			var promise = $.ajax({
				url: "./custom_edit_2.asp",
				type: "POST",
				data: {
					"posno"				: POSNO,
					"knm"				: escape(knm),
					"tcuscd"			: temp_tcuscd,
					"cuscd"				: temp_cuscd,
					"type1"				: "1",
					"hp1"				: hp1,
					"hp2"				: hp2,
					"hp3"				: hp3,
					"birth1"			: birth1,
					"birth2"			: birth2,
					"birth3"			: birth3,
					"cus_sex"			: cus_sex,
					"cus_birthType"		: cus_birthType,
					"cus_cardno"		: $('#input_cardno').val(),
					"mvdyn"				: mvdyn,
					"addr_zonecode"		: addr_zonecode,
					"addr_main"			: escape(addr_main),
					"addr_detail"		: escape(addr_detail)
				},
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				datatype: 'json',
				cache: true
			});
			promise.done(function(data) {
				//alert("done : " + data);
				session_check(data);
				var jObject = JSON.parse(data);
				if (jObject.error == "1")
				{
					c_reg_init();
					//alert(jObject.msg);
				} else if (jObject.error == "0")
				{
					alert(jObject.msg);
					$('.dim-layer').fadeOut();
					//alert("고객을 등록하였습니다.");
					c_reg_init();
					custom_search_cd(jObject.CUSCD);
					barcodeFocus();
					currentItem = null;
				}
			});
			promise.fail(function(data) {
				alert("custom_edit fail : " + data);
			});
		}

	}
}

function c_reg_ok(cuscd, knm, cus_hp) {
	var $el = $('#layer1')
	var isDim = $el.prev().hasClass('dimBg');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	alert("고객을 등록하였습니다.");
	c_reg_init();
	$('#input_cus_nm').val(knm);
	cust_search_ifrm();
	barcodeFocus();
	currentItem = null;
}

function tcustom_search_cd(cuscd) {		// 181115 jsys
	var promise = $.ajax({
			url: "./tcustom_search_ifrm_cd.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				chk: 0,
				cus_no: cuscd,
				search: salday
			},
			cache: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		//console.log("search_day_sale() | " + data);
		if (jObject.error == "1")
		{
			alert(jObject.msg);
		} else if (jObject.error == "0") {
				cust_result(jObject.CUSCD, jObject.KNM, jObject.HPNO, jObject.BIRDT,
							jObject.MILE, jObject.TOTMILE, jObject.WK_CUS_MILE1,
							jObject.WK_CUS_MILE2, jObject.HPNO2, jObject.BIRGU,
							jObject.SEX, jObject.ZIPCD, jObject.ADDR, jObject.ADDR2,
							jObject.CARDNO,jObject.LASTDT,jObject.TCUSCD, jObject.MVDCD);
		}
	});
	promise.fail(function(data) {
		alert("tcustom_search_ifrm_cd fail : " + data);
	});
}

function custom_search_cd(cuscd) {//180816 LGE
	var promise = $.ajax({
			url: "./custom_search_ifrm_cd.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				chk: 0,
				cus_no: cuscd,
				search: salday
			},
			cache: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		//console.log("search_day_sale() | " + data);
		if (jObject.error == "1")
		{
			alert(jObject.msg);
		} else if (jObject.error == "0") {
				cust_result(jObject.CUSCD, jObject.KNM, jObject.HPNO, jObject.BIRDT,
							jObject.MILE, jObject.TOTMILE, jObject.WK_CUS_MILE1,
							jObject.WK_CUS_MILE2, jObject.HPNO2, jObject.BIRGU,
							jObject.SEX, jObject.ZIPCD, jObject.ADDR, jObject.ADDR2,
							jObject.CARDNO,jObject.LASTDT,jObject.TCUSCD, jObject.MVDCD);
		}
	});
	promise.fail(function(data) {
		alert("custom_search_ifrm_cd fail : " + data);
	});
}

// 고객조회 - 동일한 이름의 고객이 2명이상일 때
function custom_dup_open(jArray)//180816 LGE
{
	var $el = $("#layer3");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg3');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer3').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

	// 선택된 고객 초기화
	selectCustom = null;
	$("#jsGrid2").jsGrid("option", "data", []);
	$("#jsGrid2").jsGrid("refresh");

	//var jArray = JSON.parse(jData);
	var tempArray = [];
	for (i = 0;i < jArray.length;i++)
	{
		var hp = "";
		var tempHP = jArray[i].CUSHP;
		hp = tempHP.substring(0,3) + "-";
		if (tempHP.length == 11)
		{
			 hp = hp + tempHP.substring(3,7)  + "-";
			 hp = hp + tempHP.substring(7,11);
		}
		else if(tempHP.length == 10)
		{
			hp = hp + tempHP.substring(3,6)  + "-";
			hp = hp + tempHP.substring(6,10);
		}

		var birth = "";
		var tempBIR = jArray[i].CUSBIRTH;
		if (tempBIR != null) {
			birth = tempBIR.substring(0,4) + "년 ";
			birth += tempBIR.substring(4,6) + "월 ";
			birth += tempBIR.substring(6,8) + "일";
		}


		var client = {
			NO			: jArray[i].NO,
			CUSCD		: jArray[i].CUSCD,
			CUSNM		: jArray[i].CUSNM,
			HP			: hp,
			BIRTH		: birth,
			CUSHP		: jArray[i].CUSHP,
			CUSBIRTH	: jArray[i].CUSBIRTH,
			CUSMIL		: jArray[i].CUSMIL,
			CUSMILTOT	: jArray[i].CUSMILTOT,
			CUSMIL1		: jArray[i].CUSMIL1,
			CUSMIL2		: jArray[i].CUSMIL2,
			TCUSCD		: jArray[i].TCUSCD,
			CARDNO		: jArray[i].CARDNO,
			LASTDT		: jArray[i].LASTDT,
			BIRGU		: jArray[i].BIRGU,
			SEX			: jArray[i].SEX,
			ZIPCD		: jArray[i].ZIPCD,
			ADDR		: jArray[i].ADDR,
			ADDR2		: jArray[i].ADDR2,
			MVDCD		: jArray[i].MVDCD
		};
		tempArray.push(client);
		//$("#jsGrid2").jsGrid("insertItem", client);
	}
	$("#jsGrid2").jsGrid("option", "data", tempArray);
	//$("#jsGrid2").jsGrid("refresh");
	//$("#layer3").focus();

	/*
	// 저장 버튼을 클릭
	$el.find('a.btn-layerSave').click(function(){
		if (selectCustom == null)
		{
			alert("고객를 선택해주세요.");
			return;
		}
		CUS_INFO.CUSCD = selectCustom.CUSCD;
		$('#input_cus_nm').val(selectCustom.CUSNM);
		$('#input_cus_hpno').val(selectCustom.HP);
		$('#btn_cus_cancel').css('display', 'inline-block');

		$("#jsGrid2").jsGrid("option", "data", []);
		$("#jsGrid2").jsGrid("refresh");
		isDim ? $('.dim-layer3').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	});
	*/
	$el.find('a.btn-layerClose').click(function(){
		$("#jsGrid2").jsGrid("option", "data", []);
		$("#jsGrid2").jsGrid("refresh");
		selectCustom = null;
		$selectCustom = null;
		barcodeFocus();
		currentItem = null;
		isDim ? $('.dim-layer3').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});

	$('.layer .dimBg3').click(function(){
		barcodeFocus();
		$('.dim-layer3').fadeOut();
		return false;
	});
}

function custom_select(selectCustom) { //180816 LGE
	if (selectCustom == null)
	{
		alert("고객를 선택해주세요.");
		return;
	}

	if (CUS_INFO != null)
	{
		CUS_INFO = null;
	}

	CUS_INFO = {
		CUSCD		: selectCustom.CUSCD,
		CUSNM		: selectCustom.CUSNM,
		CUSHP		: selectCustom.HP,
		CUSBIRTH	: selectCustom.CUSBIRTH,
		CUSMIL		: selectCustom.CUSMIL,
		CUSMILTOT	: selectCustom.CUSMILTOT,
		CUSMIL1		: selectCustom.CUSMIL1,
		CUSMIL2		: selectCustom.CUSMIL2,
		HP			: selectCustom.HP,
		CARDNO		: selectCustom.CARDNO,
		LASTDT		: selectCustom.LASTDT,
		TCUSCD		: selectCustom.TCUSCD,
		BIRGU		: selectCustom.BIRGU,
		SEX			: selectCustom.SEX,
		ZIPCD		: selectCustom.ZIPCD,
		ADDR		: selectCustom.ADDR,
		ADDR2		: selectCustom.ADDR2,
		MVDCD		: selectCustom.MVDCD
	}



	var tcuscd = selectCustom.TCUSCD;			// 고객명 및 전화번호
	var search	= salday;			// 날짜
	var promise = $.ajax({
		url: "./miss_custom_search.asp",
		type: "POST",
		data: {
			"tcuscd"		: tcuscd,
			"search"		: search
		},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		datatype: 'json',
		cache: true
	});
		promise.done(function(data) {
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			//alert(jObject.msg);
			var mBox = confirm("우리매장 통합브랜드 고객이 아닙니다.\n통합고객으로 등록하시겠습니까?");
			if (mBox)
			{	var tcuscd  = selectCustom.TCUSCD;
				miss_cust_save(tcuscd);
			} else {
			return;
			}
		} else if (jObject.error == "0") {
			//alert(jObject.msg);
			$('#input_cus_nm').val(CUS_INFO.CUSNM + "(" + CUS_INFO.CUSCD + ")");
			$('#input_cus_hpno').val(CUS_INFO.HP);
			$('#input_cus_mil').val(CUS_INFO.CUSMIL + " / " + CUS_INFO.CUSMILTOT);
			$('#input_cus_mil_1_2').val(CUS_INFO.CUSMIL1 + " / " + CUS_INFO.CUSMIL2);


			$('#btn_cus_search').css('display', 'none');
			$('#btn_cus_new').css('display', 'none');
			$('#btn_cus_cancel').css('display', 'inline-block');
			$('#btn_cus_edit').css('display', 'inline-block');

			$('#input_cus_nm').attr('disabled', true);

			$("#jsGrid2").jsGrid("option", "data", []);
			$("#jsGrid2").jsGrid("refresh");

			selectCustom = null;
			$selectCustom = null;
			barcodeFocus();
			currentItem = null;

		}
	});
	promise.fail(function(data) {
		alert("miss_custom_search fail : " + data);
	});


	$('.dim-layer3').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
}

function custom_select_close() {
	$('.dim-layer3').fadeOut();
	barcodeFocus();
	currentItem = null;
	//isDim ? $('.dim-layer3').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	//setTimeout(custom_select_close_data, 1000);
}

// 고객조회 - 매장고객정보 X and 통합고객 2명이상 존재
function tcustom_dup_open(jArray)//180816 LGE
{
	var $el = $("#layer3-2");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg3-2');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer3-2').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

	// 선택된 고객 초기화
	selectTcustom = null;
	$("#jsGrid2-2").jsGrid("option", "data", []);
	//$("#jsGrid2-2").jsGrid("refresh");

	//var jArray = JSON.parse(jData);
	var tempArray = [];
	for (i = 0;i < jArray.length;i++)
	{
		var hp = "";
		var tempHP = jArray[i].CUSHP;
		hp = tempHP.substring(0,3) + "-";
		if (tempHP.length == 11)
		{
			 hp = hp + tempHP.substring(3,7)  + "-";
			 hp = hp + tempHP.substring(7,11);
		}
		else if(tempHP.length == 10)
		{
			hp = hp + tempHP.substring(3,6)  + "-";
			hp = hp + tempHP.substring(6,10);
		}

		var birth = "";
		var tempBIR = jArray[i].CUSBIRTH;
		if (tempBIR != null) {
			birth = tempBIR.substring(0,4) + "년 ";
			birth += tempBIR.substring(4,6) + "월 ";
			birth += tempBIR.substring(6,8) + "일";
		}


		var client = {
			NO			: jArray[i].NO,
			TCUSCD		: jArray[i].TCUSCD,
			CUSNM		: jArray[i].CUSNM,
			HP			: hp,
			BIRTH		: birth,
			CUSHP		: jArray[i].CUSHP,
			CUSBIRTH	: jArray[i].CUSBIRTH,
			BIRGU		: jArray[i].BIRGU,
			ZIPCD		: jArray[i].ZIPCD,
			ADDR		: jArray[i].ADDR,
			ADDR2		: jArray[i].ADDR2,
			CARDNO		: jArray[i].CARDNO
		};
		tempArray.push(client);
		//$("#jsGrid2").jsGrid("insertItem", client);
	}
	$("#jsGrid2-2").jsGrid("option", "data", tempArray);
	//$("#jsGrid2-2").jsGrid("refresh");
	//$("#layer3-2").focus();

	/*
	// 저장 버튼을 클릭
	$el.find('a.btn-layerSave').click(function(){
		if (selectCustom == null)
		{
			alert("고객를 선택해주세요.");
			return;
		}
		CUS_INFO.CUSCD = selectCustom.CUSCD;
		$('#input_cus_nm').val(selectCustom.CUSNM);
		$('#input_cus_hpno').val(selectCustom.HP);
		$('#btn_cus_cancel').css('display', 'inline-block');

		$("#jsGrid2").jsGrid("option", "data", []);
		$("#jsGrid2").jsGrid("refresh");
		isDim ? $('.dim-layer3').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	});

	$el.find('a.btn-layerClose').click(function(){
		$("#jsGrid2-2").jsGrid("option", "data", []);
		$("#jsGrid2-2").jsGrid("refresh");
		selectTcustom = null;
		$selectTcustom = null;
		barcodeFocus();
		isDim ? $('.dim-layer3-2').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});

	$('.layer .dimBg3-2').click(function(){
		barcodeFocus();
		$('.dim-layer3-2').fadeOut();
		return false;
	});
	*/
}

function tcustom_select_close() {
	//$("#jsGrid2-2").jsGrid("option", "data", []);
	selectTcustom = null;
	$selectTcustom = null;
	$('.dim-layer3-2').fadeOut();
	barcodeFocus();
	currentItem = null;
	//isDim ? $('.dim-layer3').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	//setTimeout(custom_select_close_data, 1000);
}

// 매장 고객 존재하지 않을 때 통합고객 조회창 open
function tcustom_search_open()	//180828 jsys
{
	var $el = $("#layer19");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg19');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer19').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

	$('#input_search_name').val($('#input_cus_nm').val());
	$('#input_search_hp').val("");
	$('#input_search_hp').focus();

	$el.find('a.btn-layerClose').click(function(){
		barcodeFocus();
		$('.dim-layer19').fadeOut();
		return false;
	});

	$('.layer .dimBg19').click(function(){
		barcodeFocus();
		$('.dim-layer19').fadeOut();
		return false;
	});
}

function tcustom_search_close() {
	barcodeFocus();
	$('.dim-layer19').fadeOut();
}

function search_tcustom() {

	if ($('#input_search_name').val().length == 0) {
		alert("이름을 입력해주세요.");
		$('#input_search_name').focus();
		return;
	}
	if ($('#input_search_hp').val().length == 0) {
		alert("휴대폰번호를 입력해주세요.");
		$('#input_search_hp').focus();
		return;
	} else if ($('#input_search_hp').val().length < 10) {
		alert("휴대폰번호는 10~11자리로 입력해주세요.");
		$('#input_search_hp').focus();
		return;
	}

	var promise = $.ajax({
		url: "./search_tcustom.asp",
		type: "POST",
		data: {
			"KNM"		: escape($('#input_search_name').val()),
			"HPNO"		: $('#input_search_hp').val()
		},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		datatype: 'json',
		cache: true
	});
	promise.done(function(data) {
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			alert(jObject.msg);
			$('.dim-layer19').fadeOut();
			c_reg_open(null, true);
			$('#input_knm').val($('#input_search_name').val());
			$('sel_hp_head').val($('#input_search_hp').val().substring(0,3));

			var hp_middle = "";
			var hp_tail = "";
			if ($('#input_search_hp').val().length == 10) {
				hp_middle = $('#input_search_hp').val().substring(3,6);
				hp_tail = $('#input_search_hp').val().substring(6,10);
			} else if ($('#input_search_hp').val().length == 11) {
				hp_middle = $('#input_search_hp').val().substring(3,7);
				hp_tail = $('#input_search_hp').val().substring(7,11);
			}

			$('#input_hp_middle').val(hp_middle);
			$('#input_hp_tail').val(hp_tail);

		} else if (jObject.error == "0") {
			$('.dim-layer19').fadeOut();
			c_reg_open(null, true);
			$('#input_knm').val(jObject.KNM);

			$('sel_hp_head').val($('#input_search_hp').val().substring(0,3));

			var hp_middle = "";
			var hp_tail = "";
			if ($('#input_search_hp').val().length == 10) {
				hp_middle = $('#input_search_hp').val().substring(3,6);
				hp_tail = $('#input_search_hp').val().substring(6,10);
			} else if ($('#input_search_hp').val().length == 11) {
				hp_middle = $('#input_search_hp').val().substring(3,7);
				hp_tail = $('#input_search_hp').val().substring(7,11);
			}

			$('#input_hp_middle').val(hp_middle);
			$('#input_hp_tail').val(hp_tail);

			$('#input_birth_year').val(jObject.BIRDT.substring(0,4));
			$('#input_birth_month').val(jObject.BIRDT.substring(4,6));
			$('#input_birth_day').val(jObject.BIRDT.substring(6,8));

			if (jObject.BIRGU == "Y") {
				$('#rb_birth_y')[0].checked = true;
			} else {
				$('#rb_birth_n')[0].checked = true;
			}

			if (jObject.SEX == "W") {
				$('#rb_sex_w')[0].checked = true;
			} else {
				$('#rb_sex_m')[0].checked = true;
			}

			$('#input_addr_zonecode').val(jObject.ZIPCD);
			$('#input_addr_main').val(jObject.ADDR);
			$('#input_addr_detail').val(jObject.ADDR2);
			$('#input_cardno').val(jObject.CARDNO);

			$('#cb_custom_agree')[0].checked = true;
		}
	});
	promise.fail(function(data) {
		alert("search_tcustom fail : " + data);
	});

}

function tcustom_select(selectTcustom) {//180816 LGE
	if (selectTcustom == null) {
		alert("고객를 선택해주세요.");
		return;
	}

	if (CUS_INFO != null) {
		CUS_INFO = null;
	}

	CUS_INFO = {
		TCUSCD		: selectTcustom.TCUSCD,
		CUSCD		: "",
		CUSNM		: selectTcustom.CUSNM,
		CUSHP		: selectTcustom.HP,
		CUSBIRTH	: selectTcustom.CUSBIRTH,
		BIRGU		: selectTcustom.BIRGU,
		ZIPCD		: selectTcustom.ZIPCD,
		ADDR		: selectTcustom.ADDR,
		ADDR2		: selectTcustom.ADDR2,
		CARDNO		: selectTcustom.CARDNO
	};
	var mBox = confirm("우리매장 통합브랜드 고객이 아닙니다.\n통합고객으로 등록하시겠습니까?");
	if (mBox)
	{	var tcuscd  = selectTcustom.TCUSCD;
		miss_cust_save(tcuscd);
	} else {
	return;
	}
	selectTcustom = null;
	$selectTcustom = null;
	//c_reg_open(null, false);
	CUS_INFO = null;

	$('.dim-layer3-2').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
}
// 누락통합고객저장
function miss_cust_save(tcuscd) {//180816 LGE
	var tcuscd = tcuscd;			// 고객명 및 전화번호
	var search	= salday;			// 날짜
	var promise = $.ajax({
		url: "./miss_custom_save.asp",
		type: "POST",
		data: {
			"tcuscd"		: tcuscd,
			"search"		: search
		},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		datatype: 'json',
		cache: true
	});
		promise.done(function(data) {
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			alert(jObject.msg);
		} else if (jObject.error == "0") {
			alert(jObject.msg);
			custom_search_cd(jObject.CUSCD);
		}
	});
	promise.fail(function(data) {
		alert("miss_cust_save fail : " + data);
	});
}


// 할인쿠폰 적용 popup
function sale_gift1_open() {
	var $el = $("#layer4");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg4');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer4').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

	// 할인쿠폰 금액에 맞게 현재 Item의 할인쿠폰 목록 초기화
	//var count = parseInt(currentItem.GIFT1AMT) / 5000;

	$("#jsGrid3").jsGrid("option", "data", []);
	if (currentItem.GIFT1AMT != "") {
		var iCount = 1;
		var jArray = JSON.parse(currentItem.GIFT1AMT);
		jArray.forEach(function(gift) {
			gift.NO = iCount;
			iCount++;
		});
		$("#jsGrid3").jsGrid("option", "data", jArray);
	}
	/*
	for (i = 0;i < count;i++ )
	{
		var gift1 = {
			NO : i+1,
			COUPON : "F. 5000원",
			GIFTPRI : "5000"
		}
		$("#jsGrid3").jsGrid("insertItem", gift1);
	}
	*/
	//$("#jsGrid3").jsGrid("refresh");
	/*
	// 저장 버튼을 클릭
	$el.find('a.btn-layerSave').click(function(){

		//$("#jsGrid3").jsGrid("option", "data", []);
		//$("#jsGrid3").jsGrid("refresh");
		var items = $("#jsGrid3").jsGrid("option", "data");
		var gift_amt = 5000 * items.length;
		currentItem.GIFTAMT = gift_amt;
		//currentItem.MILAMT = currentItem.GIFTAMT;
		$("#jsGrid").jsGrid("refresh");
		updateItems();
		isDim ? $('.dim-layer4').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	});
	$el.find('a.btn-layerClose').click(function(){
		$("#jsGrid3").jsGrid("option", "data", tempItems);
		$("#jsGrid3").jsGrid("refresh");
		barcodeFocus();
		isDim ? $('.dim-layer4').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});

	$('.layer .dimBg4').click(function(){
		barcodeFocus();
		$('.dim-layer4').fadeOut();
		return false;
	});
	*/
}

// 할인쿠폰 확인
function gift1_refresh() {
	$('.dim-layer4').fadeOut();
	var items = $("#jsGrid3").jsGrid("option", "data");
	//var items2 = $("#jsGrid5-2").jsGrid("option", "data");

	var gift1_tot = 0;
	var gift1List = [];
	items.forEach(function(item) {
		/*
		gift1_tot += parseInt(item.GIFTPRI);
		var gift1 = {
			NO : item.NO,
			COUPON : item.COUPON,
			GIFTPRI : item.GIFTPRI
		}
		gift1List.push(gift1);
		*/
		var gift1 = "";
		if ((gift1_tot + parseInt(item.GIFTPRI)) > (currentItem.QTY * currentItem.SPRICE.replace(/,/g,""))) {
			//item.GIFTPRI = String((currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) - gift1_tot);
			gift1 = {
				NO : item.NO,
				COUPON : item.COUPON,
				GIFTPRI : String((currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) - gift1_tot)
			};
		} else {
			gift1 = {
				NO : item.NO,
				COUPON : item.COUPON,
				GIFTPRI : item.GIFTPRI
			};
		}
		gift1_tot += parseInt(gift1.GIFTPRI);
		gift1List.push(gift1);
	 });
	 /*
	 items2.forEach(function(item) {
		if (item.CHECKED)
		{
			gift2_tot += item.GIFTPRI;
			var gift2 = {
				BASEDT : item.BASEDT,
				VALDT : item.VALDT,
				GIFTNO : item.GIFTNO,
				GIFTPRI : item.GIFTPRI
			}
			gift2List.push(gift2);
		}
	 });
	 */

	var str = JSON.stringify(gift1List);
	currentItem.GIFTAMT = numberWithCommas(parseInt(gift1_tot));				// 할인쿠폰 or 마일리지 or 인증쿠폰 의 할인 금액
	currentItem.GIFT1AMT = str;					// 신마일리지 정보



	//var gift_amt = 5000 * items.length;
	//currentItem.GIFTAMT = gift_amt;				// 할인쿠폰 or 마일리지 or 인증쿠폰 의 할인 금액
	//currentItem.GIFT1AMT = gift_amt;			// 할인쿠폰 금액
	//currentItem.MILAMT = currentItem.GIFTAMT;

	if (gift1_tot == 0) {
		currentItem.MILGU = "0";
		currentItem.GIFTAMT = 0;
		currentItem.GIFT1AMT = "";
		currentItem.GIFT2AMT = "";
		currentItem.GIFT3AMT = "";
		setMGSEL();
	}
	//$("#jsGrid").jsGrid("refresh");
	updateItems();
	barcodeFocus();
	currentItem = null;
	//$('.dim-layer4').fadeOut();
}

// 마일리지 번호 조회
function sale_gift2_code_search() {
	$("#jsGrid5-1").jsGrid("option", "data", []);
	var promise = $.ajax({
			url: "./custom_gift2_code_search.asp",
			type: "POST",
			data: {
				"search"	: salday,
				"gift_no"	: $('#input_gift_no').val(),
				"gbn"		: "1"
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			alert(jObject.msg);
			$('#input_gift_no').select();
		} else if (jObject.error == "0") {
			var saleItems = $('#jsGrid').jsGrid("option", "data");
			var items = $("#jsGrid5-2").jsGrid("option", "data");
			//alert("영수증 결과 있음(" + jObject.count + "개)");

			if (CUS_INFO == null && jObject.CUSCD === "") {
				alert("해당매장(" + UPIPOS._USERDATA.COMPNM + ")의 고객에게 발행된 쿠폰이 아닙니다.\n※본 쿠폰을 사용하기 위해서는 [구매하는 고객선택 후] 쿠폰번호를 조회해주십시오.※");
				// modified by jsys 2018-11-07
				// return 주석처리
				//return;
			}

			var dup_chk = false;
			saleItems.forEach(function(item) {
				if ((item.NO != currentItem.NO) && (item.GIFT2AMT != "")) {
					var gifts = JSON.parse(item.GIFT2AMT);
					gifts.forEach(function (gift) {
						if (gift.GIFTNO == jObject.GIFTNO) {
							dup_chk = true;
							alert("다른 상품에 이미 적용된 마일리지쿠폰입니다.");
							return;
						}
					});
				}
			});
			items.forEach(function(item) {
				if (item.GIFTNO == jObject.GIFTNO) {
					dup_chk = true;
					alert("이미 적용된 마일리지쿠폰입니다.");
					return;
				}
			});
			if (!dup_chk) {
				var temp = {
					CHECKED : false,
					NO		: 0,
					BASEDT	: jObject.BASEDT,
					VALDT	: jObject.VALDT,
					GIFTNO	: jObject.GIFTNO,
					GIFTPRI : jObject.GIFTPRI,
					TCUSCD	: jObject.TCUSCD,
					CUSCD	: jObject.CUSCD
				};
					//tList.push(temp);
				$("#jsGrid5-1").jsGrid("insertItem", temp);
			}
			//$("#jsGrid5-1").jsGrid("option", "data", tList);
			$("#jsGrid5-1").jsGrid("refresh");
			$('#input_gift_no').val("");
			$('#input_gift_no').focus();
		}
	});
	promise.fail(function(data) {
		alert("sale_gift2_search fail : " + data);
		$('#input_gift_no').val("");
	});
}

// 고객보유 신마일리지 조회
function sale_gift2_search() {
	//document.if_gift_search.document.location.replace("custom_gift2_search.asp?search=" + salday + "&cus_no=" + CUS_INFO.CUSCD + "&gbn=1");
	var promise = $.ajax({
			url: "./custom_gift2_search.asp",
			type: "POST",
			data: {
				"search"	: salday,
				"cus_no"	: CUS_INFO.TCUSCD,
				"gbn"		: "1"
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			//alert(jObject.msg);
		} else if (jObject.error == "0") {
			var saleItems = $('#jsGrid').jsGrid("option", "data");
			var items = $("#jsGrid5-2").jsGrid("option", "data");
			//alert("영수증 결과 있음(" + jObject.count + "개)");
			var jData = jObject.data;
			var tList = [];
			for (i = 0;i < jData.length;i++)
			{
				var dup_chk = false;
				saleItems.forEach(function(item) {
					if ((item.NO != currentItem.NO) && (item.GIFT2AMT != "")) {
						var gifts = JSON.parse(item.GIFT2AMT);
						gifts.forEach(function (gift) {
							if (gift.GIFTNO == jData[i].GIFTNO) {
								dup_chk = true;
								return;
							}
						});
					}
				});
				items.forEach(function(item) {
					if (item.GIFTNO == jData[i].GIFTNO)
					{
						dup_chk = true;
						return;
					}
				});
				if (!dup_chk) {
					var temp = {
						CHECKED : false,
						NO : 0,
						BASEDT : jData[i].BASEDT,
						VALDT : jData[i].VALDT,
						GIFTNO : jData[i].GIFTNO,
						GIFTPRI : jData[i].GIFTPRI
					};
					//tList.push(temp);
					$("#jsGrid5-1").jsGrid("insertItem", temp);
				}
			}
			//$("#jsGrid5-1").jsGrid("option", "data", tList);
			$("#jsGrid5-1").jsGrid("refresh");
		}
	});
	promise.fail(function(data) {
		alert("sale_gift2_search fail : " + data);
	});
}

// 신마일리지 팝업 open
var gift2SelectedPri = 0;
var gift2CurrentPri = 0;
function sale_gift2_open() {
	var $el = $("#layer5");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg5');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer5').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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
	//rb_gift_have
	if (CUS_INFO != null) {
		$('#rb_gift_have')[0].checked = true;
	} else {
		$('#rb_gift_search')[0].checked = true;
	}
	//$('#rb_gift_have')[0].checked = true;
	toggleGiftCondition();
	$('#input_gift_no').val("");
	//$('#input_gift_no').focus();
	// 해당 상품에 적용된 신마일리지 정보 insert
	$("#jsGrid5-1").jsGrid("option", "data", []);
	$("#jsGrid5-2").jsGrid("option", "data", []);

	gift2SelectedPri = 0;
	gift2CurrentPri = 0;
	if (currentItem.GIFT2AMT != "") {
		//check_pass = true;
		var iCount = 1;
		var jArray = JSON.parse(currentItem.GIFT2AMT);
		jArray.forEach(function(gift) {
			gift.CHECKED = true;
			gift.NO = iCount;
			iCount++;
			gift2SelectedPri += gift.GIFTPRI;
		});
		$("#jsGrid5-2").jsGrid("option", "data", jArray);
	}

	$("#jsGrid5-1").jsGrid("refresh");
	$("#jsGrid5-2").jsGrid("refresh");
	//check_pass = false;
}

// 신마일리지 확인
function gift2_refresh() {
	$('.dim-layer5').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	var items = $("#jsGrid5-1").jsGrid("option", "data");
	var items2 = $("#jsGrid5-2").jsGrid("option", "data");

	var gift2_tot = 0;
	var gift2List = [];
	var coupon_cuscd = "";
	items2.forEach(function(item) {
		if (item.CHECKED) {
			var gift2 = {
				BASEDT : item.BASEDT,
				VALDT : item.VALDT,
				GIFTNO : item.GIFTNO,
				GIFTPRI : item.GIFTPRI
			};
			if ((currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) < (gift2_tot + gift2.GIFTPRI)) {
				gift2.GIFTPRI = (currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) - gift2_tot;
			}
			gift2_tot += gift2.GIFTPRI;
			gift2List.push(gift2);
		}
	 });

	items.forEach(function(item) {
		if (item.CHECKED) {
			var gift2 = {
				BASEDT : item.BASEDT,
				VALDT : item.VALDT,
				GIFTNO : item.GIFTNO,
				GIFTPRI : item.GIFTPRI
			};
			if ((currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) < (gift2_tot + gift2.GIFTPRI)) {
				gift2.GIFTPRI = (currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) - gift2_tot;
			}
			gift2_tot += gift2.GIFTPRI;
			gift2List.push(gift2);
			coupon_cuscd = item.CUSCD;
		}
	 });

	 if (gift2_tot == 0) {
		currentItem.MILGU = "0";
		currentItem.GIFTAMT = 0;
		currentItem.GIFT1AMT = "";
		currentItem.GIFT2AMT = "";
		currentItem.GIFT3AMT = "";
		setMGSEL();
	} else {
		var str = JSON.stringify(gift2List);
		currentItem.GIFTAMT = numberWithCommas(parseInt(gift2_tot));				// 할인쿠폰 or 마일리지 or 인증쿠폰 의 할인 금액
		currentItem.GIFT2AMT = str;					// 신마일리지 정보
	}

	if (typeof coupon_cuscd !== "undefined" && coupon_cuscd !== "" && coupon_cuscd !== "1" && (CUS_INFO == null) ) {
		custom_search_cd(coupon_cuscd);
	}
	//currentItem.MILAMT = currentItem.GIFTAMT;
	//$("#jsGrid").jsGrid("refresh");
	updateItems();
	barcodeFocus();
	currentItem = null;

	/*
	var str = JSON.stringify(gift2List);
	currentItem.GIFTAMT = numberWithCommas(parseInt(gift2_tot));				// 할인쿠폰 or 마일리지 or 인증쿠폰 의 할인 금액
	currentItem.GIFT2AMT = str;					// 신마일리지 정보

	if (gift2_tot == 0)
	{
		currentItem.MILGU = "0";
		currentItem.GIFTAMT = 0;
		currentItem.GIFT1AMT = "";
		currentItem.GIFT2AMT = "";
		currentItem.GIFT3AMT = "";
		setMGSEL();
	}

	//currentItem.MILAMT = currentItem.GIFTAMT;
	$("#jsGrid").jsGrid("refresh");
	updateItems();
	barcodeFocus();
	$('.dim-layer5').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	*/
}
/*
// 상품권 유효성 검사
function gift2_search(gift_no) {
	document.if_gift_search.document.location.replace("tgift_search.asp?g_giftno=" + gift_no + "&cus=" + CUS_INFO.CUSCD);
}

function gift2_search_result(code, msg, gift_no, gift_price) {
	switch (code)
	{
	case "1":
		alert(msg);
		gift_flag = false;
		break;
	case "2":
		alert(msg);
		gift_flag = false;
		break;
	case "3":
		// 상품권 정상
		gift_flag = true;
		var gift = {
			NO : "",
			GIFTNO : gift_no,
			GIFTPRI : gift_price
		}
		$("#jsGrid5-1").jsGrid("insertItem", gift);
		$("#jsGrid5-1").jsGrid("clearInsert");
		$("#jsGrid5-1").jsGrid("refresh");
		gift_flag = false;
		break;
	}
}
// 상품권 유효성 검사
*/

// 인증번호쿠폰 번호 조회
function sale_gift3_code_search() {
	$("#jsGrid6-1").jsGrid("option", "data", []);
	var promise = $.ajax({
			url: "./custom_gift3_code_search.asp",
			type: "POST",
			data: {
				"search"	: salday,
				"gift_no"	: $('#input_gift3_no').val(),
				"gbn"		: "1"
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			alert(jObject.msg);
			$('#input_gift3_no').select();
		} else if (jObject.error == "0") {
			var saleItems = $('#jsGrid').jsGrid("option", "data");
			var items = $("#jsGrid6-2").jsGrid("option", "data");
			//alert("영수증 결과 있음(" + jObject.count + "개)");

			if (CUS_INFO == null && DPCD != jObject.CUSCD.substring(0, 5)) {
				alert("해당매장(" + UPIPOS._USERDATA.COMPNM + ")의 고객에게 발행된 쿠폰이 아닙니다.\n※본 쿠폰을 사용하기 위해서는 [구매하는 고객선택 후] 쿠폰번호를 조회해주십시오.※");
				// modified by jsys 2018-11-07
				// return 주석처리
				//return;
			}

			var dup_chk = false;
			saleItems.forEach(function(item) {
				if ((item.NO != currentItem.NO) && (item.GIFT3AMT != "")) {
					var gifts = JSON.parse(item.GIFT3AMT);
					gifts.forEach(function (gift) {
						if (gift.GIFTNO == jObject.GIFTNO) {
							dup_chk = true;
							alert("다른 상품에 이미 적용된 인증번호쿠폰입니다.");
							return;
						}
					});
				}
			});
			items.forEach(function(item) {
				if (item.GIFTNO == jObject.GIFTNO)
				{
					dup_chk = true;
					alert("이미 적용된 인증번호쿠폰입니다.");
					return;
				}
			});
			var tList = [];
			if (!dup_chk)
			{
				var guStr = "";
				if (jObject.GIFTGU == "1") {
					guStr = "금액"
				} else {
					guStr = "DC율"
				}
				var temp = {
					CHECKED : false,
					//NO : 0,
					BASEDT	: jObject.BASEDT,
					VALDT	: jObject.VALDT,
					GIFTNO	: jObject.GIFTNO,
					GIFTGU	: guStr,
					GIFTPRI : jObject.GIFTPRI,
					USEDT	: jObject.USEDT,
					REMARK	: jObject.REMARK,
					CUSCD	: jObject.CUSCD,
					BRCD	: jObject.BRCD
				};
				tList.push(temp);
				//$("#jsGrid6-1").jsGrid("insertItem", temp);
			}
			$("#jsGrid6-1").jsGrid("option", "data", tList);
			//$("#jsGrid6-1").jsGrid("refresh");
			$('#input_gift3_no').val("");
			$('#input_gift3_no').focus();
			//code_insert(jObject.spc_chk, jObject.barcode, jObject.style, jObject.colcd, jObject.sizecd, jObject.type1, jObject.cnt, jObject.jeago, jObject.fipri, jObject.price, jObject.dc, jObject.mg, jObject.silpak, jObject.sacod, jObject.t_price_yn)
		}
	});
	promise.fail(function(data) {
		alert("sale_gift3_search fail : " + data);
		$('#input_gift3_no').val("");
	});
}

// 인증번호 할인쿠폰 조회
function sale_gift3_search() {
	//document.if_gift_search.document.location.replace("custom_gift3_search.asp?search=" + salday + "&cus_no=" + CUS_INFO.CUSCD + "&gbn=2");
	var promise = $.ajax({
			url: "./custom_gift3_search.asp",
			type: "POST",
			data: {
				"search"	: salday,
				"tcuscd"	: CUS_INFO.TCUSCD,
				"cus_no"	: CUS_INFO.CUSCD,
				"gbn"		: "2"
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1")
		{
			//alert(jObject.msg);
		} else if (jObject.error == "0")
		{
			var saleItems = $('#jsGrid').jsGrid("option", "data");
			var items = $("#jsGrid6-2").jsGrid("option", "data");
			//alert("영수증 결과 있음(" + jObject.count + "개)");
			var jData = jObject.data;
			var tList = [];
			for (i = 0;i < jData.length;i++)
			{
				var dup_chk = false;
				saleItems.forEach(function(item) {
					if ((item.NO != currentItem.NO) && (item.GIFT3AMT != "")) {
						var gifts = JSON.parse(item.GIFT3AMT);
						gifts.forEach(function (gift) {
							if (gift.GIFTNO == jData[i].GIFTNO) {
								dup_chk = true;
								return;
							}
						});
					}
				});
				items.forEach(function(item) {
					if (item.GIFTNO == jData[i].GIFTNO)
					{
						dup_chk = true;
						return;
					}
				});
				if (!dup_chk) {
					var guStr = "";
					if (jData[i].GIFTGU == "1") {
						guStr = "금액"
					} else {
						guStr = "DC율"
					}
					var temp = {
						CHECKED : false,
						//NO : 0,
						CUSCD	: jData[i].CUSCD,
						BRCD	: jData[i].BRCD,
						BASEDT	: jData[i].BASEDT,
						VALDT	: jData[i].VALDT,
						GIFTNO	: jData[i].GIFTNO,
						GIFTGU	: guStr,
						GIFTPRI : jData[i].GIFTPRI,
						USEDT	: jData[i].USEDT,
						REMARK	: jData[i].REMARK
					};
					tList.push(temp);
					//$("#jsGrid6-1").jsGrid("insertItem", temp);
				}
			}
			$("#jsGrid6-1").jsGrid("option", "data", tList);
			$("#jsGrid6-1").jsGrid("refresh");
			//code_insert(jObject.spc_chk, jObject.barcode, jObject.style, jObject.colcd, jObject.sizecd, jObject.type1, jObject.cnt, jObject.jeago, jObject.fipri, jObject.price, jObject.dc, jObject.mg, jObject.silpak, jObject.sacod, jObject.t_price_yn)
		}
	});
	promise.fail(function(data) {
		alert("sale_gift3_search fail : " + data);
	});
}

// 인증번호 할인쿠폰 팝업 open
var gift3SelectedPri = 0;
var gift3CurrentPri = 0;
function sale_gift3_open() {
	var $el = $("#layer6");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg6');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer6').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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


	// 해당 상품에 적용된 인증번호 할인쿠폰 정보 insert
	$("#jsGrid6").jsGrid("option", "data", []);

	if (CUS_INFO != null) {
		$('#rb_gift3_have')[0].checked = true;
	} else {
		$('#rb_gift3_search')[0].checked = true;
	}
	//$('#rb_gift_have')[0].checked = true;
	toggleGift3Condition();

	//$('#input_gift3_no').attr('disabled', false);
	//$('#btn_gift3_search').attr('disabled', false);
	$('#input_gift3_no').val("");
	$('#input_gift3_no').focus();
	// 해당 상품에 적용된 신마일리지 정보 insert
	$("#jsGrid6-1").jsGrid("option", "data", []);
	$("#jsGrid6-2").jsGrid("option", "data", []);

	gift3SelectedPri = 0;
	gift3CurrentPri = 0;

	if (currentItem.GIFT3AMT != "") {
		//check_pass = true;
		var iCount = 1;
		var jArray = JSON.parse(currentItem.GIFT3AMT);
		jArray.forEach(function(gift) {
			gift.CHECKED = true;
			//gift.NO = iCount;
			//iCount++;
			//gift.GIFTPRI = numberWithCommas(gift.GIFTPRI);
			if (gift.GIFTGU == "금액") {
				gift3SelectedPri += gift.GIFTPRI;
			} else {
				gift3SelectedPri += currentItem.LAPRI.replace(/,/g,"") * (gift.GIFTPRI / 100);
			}
		});
		$("#jsGrid6-2").jsGrid("option", "data", jArray);
	}
	//$("#jsGrid6").jsGrid("refresh");
	check_pass = false;
}

// 인증번호할인쿠폰 확인
function gift3_refresh() {
	$('.dim-layer6').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	var items = $("#jsGrid6-1").jsGrid("option", "data");
	var items2 = $("#jsGrid6-2").jsGrid("option", "data");

	var gift3_tot = 0;
	var gift3List = [];
	var coupon_cuscd = "";
	 items2.forEach(function(item) {
		if (item.CHECKED) {
			var gift3 = {
				BRCD	: item.BRCD,
				BASEDT	: item.BASEDT,
				VALDT	: item.VALDT,
				GIFTNO	: item.GIFTNO,
				GIFTGU	: item.GIFTGU,
				GIFTPRI : item.GIFTPRI,
				USEDT	: item.USEDT,
				REMARK	: item.REMARK,
				GIFTPRI2: ""
			};
			/*
			if (item.GIFTGU == "DC율")
			{
				gift3.GIFTPRI2 = currentItem.LAPRI.replace(/,/g,"") * (parseInt(item.GIFTPRI.replace(/,/g,"")) / 100);
				gift3_tot += gift3.GIFTPRI2;
			} else {
				gift3_tot += gift3.GIFTPRI;
			}
			*/
			if (item.GIFTGU == "DC율") {
				gift3.GIFTPRI2 = currentItem.LAPRI.replace(/,/g,"") * (item.GIFTPRI / 100);
				if ((currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) < (gift3_tot + gift3.GIFTPRI2)) {
					gift3.GIFTPRI2 = (currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) - gift3_tot;
				}
				gift3_tot += gift3.GIFTPRI2;
			} else {
				if ((currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) < (gift3_tot + gift3.GIFTPRI)) {
					gift3.GIFTPRI = (currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) - gift3_tot;
				}
				gift3_tot += gift3.GIFTPRI;
			}
			gift3List.push(gift3);
		}
	 });
	 items.forEach(function(item) {
		if (item.CHECKED) {
			//gift3_tot += item.GIFTPRI;
			var gift3 = {
				BRCD	: item.BRCD,
				BASEDT	: item.BASEDT,
				VALDT	: item.VALDT,
				GIFTNO	: item.GIFTNO,
				GIFTGU	: item.GIFTGU,
				GIFTPRI : item.GIFTPRI,
				USEDT	: item.USEDT,
				REMARK	: item.REMARK
			};
			/*
			if (item.GIFTGU == "DC율") {
				gift3.GIFTPRI2 = currentItem.LAPRI.replace(/,/g,"") * (parseInt(item.GIFTPRI.replace(/,/g,"")) / 100);
				gift3_tot += gift3.GIFTPRI2;
			} else {
				gift3_tot += gift3.GIFTPRI;
			}
			*/
			if (item.GIFTGU == "DC율") {
				gift3.GIFTPRI2 = currentItem.LAPRI.replace(/,/g,"") * (item.GIFTPRI / 100);
				if ((currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) < (gift3_tot + gift3.GIFTPRI2)) {
					gift3.GIFTPRI2 = (currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) - gift3_tot;
				}
				gift3_tot += gift3.GIFTPRI2;
			} else {
				if ((currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) < (gift3_tot + gift3.GIFTPRI)) {
					gift3.GIFTPRI = (currentItem.QTY * currentItem.SPRICE.replace(/,/g,"")) - gift3_tot;
				}
				gift3_tot += gift3.GIFTPRI;
			}
			gift3List.push(gift3);
			coupon_cuscd = item.CUSCD;
		}
	 });

	 if (gift3_tot == 0) {
		currentItem.MILGU = "0";
		currentItem.GIFTAMT = 0;
		currentItem.GIFT1AMT = "";
		currentItem.GIFT2AMT = "";
		currentItem.GIFT3AMT = "";
		setMGSEL();
	} else {
		var str = JSON.stringify(gift3List);
		currentItem.GIFTAMT = numberWithCommas(parseInt(gift3_tot));				// 할인쿠폰 or 마일리지 or 인증쿠폰 의 할인 금액
		currentItem.GIFT3AMT = str;					// 인증쿠폰정보 정보
	}

	if (typeof coupon_cuscd !== "undefined" && coupon_cuscd !== "" && (CUS_INFO == null) && (DPCD.substring(0, 4) === coupon_cuscd.substring(0, 4)) ) {
		custom_search_cd(coupon_cuscd);
	}

	updateItems();
	barcodeFocus();
	currentItem = null;
}

// 단가조회
function fiprice_search() {
	var item_cd = $('#input_item_cd').val().toUpperCase();
	$("#jsGrid9").jsGrid("option", "data", []);
	//$("#jsGrid9").jsGrid("refresh");
	if (item_cd == "" || item_cd.length < 3) {
		alert("조회할 품번을 입력하세요.(3자 이상)");
		$('#input_item_cd').focus();
		$('#input_item_cd').select();
		return;
	} else {
		if (item_cd.length > 7) {
			item_cd = item_cd.substring(0, 7);
			//console.log("code > 7, split index 7\nstycd : " + item_cd);
		}
		searching_open();
		var promise = $.ajax({
			url: "./fiprice_search.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"barcd" : item_cd,
				"day1"	: salday
			},
			cache: false
		});
		promise.done(function(data) {
			//alert("done : " + data);
			session_check(data);
			var jObject = JSON.parse(data);
			if (jObject.error == "1")
			{
				alert(jObject.msg);
			} else if (jObject.error == "0")
			{
				//alert(jObject.data);
				var jData = jObject.data;
				//var tempList = [];
				//for (i = 0;i < jData.length;i++)
				//{

				//}
				$("#jsGrid9").jsGrid("option", "data", jData);
				//$("#jsGrid9").jsGrid("refresh");
			}
			$('#input_item_cd').focus();
			$('#input_item_cd').val("");
			searching_close();
		});
		promise.fail(function(data) {
			alert("fiprice_search fail : " + data);
			searching_close();
		});
		//document.if_gift_search.document.location.replace("fiprice_search.asp?barcd=" + item_cd + "&day1=" + salday);
	}
}
/*
function fiprice_search_result(code, msg, jData) {
	switch (code)
	{
	case "1":
		alert(msg);
		break;
	case "2":
		// 상품권 정상
		var jArray = JSON.parse(jData);
		for (i = 0;i < jArray.length;i++)
		{
			var temp = {
				STYCD	: jArray[i].STYCD,
				COLCD	: jArray[i].COLCD,
				SIZECD	: jArray[i].SIZECD,
				STATUS	: jArray[i].STATUS,
				LAPRI	: jArray[i].LAPRI
			}

			//tList.push(temp);

			//$("#jsGrid9").jsGrid("insertItem", temp);
		}
		//$("#jsGrid9").jsGrid("refresh");
		//fiprice_search_open();
		break;
	}
}
*/
// 단가조회 팝업 open
function fiprice_search_open() {
	var $el = $("#layer9");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg9');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer9').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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
	$("#jsGrid9").jsGrid("option", "data", []);
	$('#btn_fiprice').attr('disabled', true);
	$('#input_item_cd').val("");
	$('#input_item_cd').focus();

	/*
	$el.find('a.btn-layerClose').click(function(){
		$('#input_item_cd').val("");
		$("#jsGrid9").jsGrid("option", "data", []);
		$("#jsGrid9").jsGrid("refresh");
		barcodeFocus();
		isDim ? $('.dim-layer9').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});


	$('.layer .dimBg9').click(function(){
		$('.dim-layer9').fadeOut();
		return false;
	});
	*/
	//$("#jsGrid9").jsGrid("refresh");
}

function fiprice_popup_close() {
	barcodeFocus();
	currentItem = null;
	$('.dim-layer9').fadeOut();
}

function search_hold_count() {
	var promise = $.ajax({
			url: "./search_hold_count.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"posno" : POSNO
			},
			cache: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1")
		{
			alert(jObject.msg);
		} else if (jObject.error == "0")
		{
			//alert(jObject.data);
			var str = "보류(" + jObject.data + ")";
			$('#hold_count').val(jObject.data);
			$('#btn_hold').text(str);
			//code_insert(jObject.spc_chk, jObject.barcode, jObject.style, jObject.colcd, jObject.sizecd, jObject.type1, jObject.cnt, jObject.jeago, jObject.fipri, jObject.price, jObject.dc, jObject.mg, jObject.silpak, jObject.sacod, jObject.t_price_yn)
		}
	});
	promise.fail(function(data) {
		alert("push_item fail : " + data);
	});
}


/*
*	true : 보류가 1개, false 보류가 2개 이상
*/
function search_hold(flag) {
	var iArray;
	var promise = $.ajax({
			url: "./search_hold_list.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"posno" : POSNO
			},
			async: false,
			cache: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data);
		var dataArray = jObject.data;
		//var result	=  data.split("|");
		if (dataArray.length > 0)
		{
			if (flag)
			{
				var SALEDT		= dataArray[0].SALEDT;
				var SALETIME	= dataArray[0].SALETIME;
				var CUSCD		= dataArray[0].CUSCD;
				var CUSNM		= dataArray[0].CUSNM;
				/*
				if (CUSNM != null)
				{
					document.iFrame_input.document.location.replace("custom_search_ifrm.asp?chk=0&cus_no="+CUSNM+"&search="+salday);
				}
				*/
				search_hold_detail("2", POSNO, SALEDT, SALETIME, CUSCD);
				//$("#jsGrid").jsGrid("option", "data", items);
				//$("#jsGrid").jsGrid("refresh");
			} else {
				var $el = $("#layer8");		//레이어의 id를 $el 변수에 저장
				var isDim = $el.prev().hasClass('dimBg8');	//dimmed 레이어를 감지하기 위한 boolean 변수

				isDim ? $('.dim-layer8').fadeIn() : $el.fadeIn();

				//$('#input_no').focus();

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

				$("#jsGrid8").jsGrid("option", "data", dataArray);
				//$("#jsGrid8").jsGrid("refresh");

				$el.find('a.btn-layerClose').click(function(){
					//isDim ? $('.dim-layer8').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
					selectHold = null;
					barcodeFocus();
					$('.dim-layer8').fadeOut();
					return false;
				});
				$('.layer .dimBg8').click(function(){
					$("#jsGrid8").jsGrid("option", "data", []);
					//$("#jsGrid8").jsGrid("refresh");
					selectHold = null;
					barcodeFocus();
					$('.dim-layer8').fadeOut();
					return false;
				});
			}
		}

		//var dataArray = JSON.parse(jObject.data);
		//alert(dataArray);
	});
	promise.fail(function(data) {
		alert("search_hold fail : " + data);
	});
}

function search_hold_detail(gb, posno, saledt, saletime, cuscd) {
	var iArray;
	var promise = $.ajax({
			url: "./search_hold_detail.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"gb"		: gb,
				"posno"		: posno,
				"saledt"	: saledt,
				"saletime"	: saletime
			},
			cache: false
	});
	promise.done(function(data) {
		//alert("done : " + data);
		session_check(data);
		var jObject = JSON.parse(data.replace("\"\"[", "[").replace("]\"\"", "]"));
		var dataArray = jObject.data;
		//var result	=  data.split("|");
		if (dataArray.length > 0)
		{
			if (cuscd != null)
			{
				//document.iFrame_input.document.location.replace("custom_search_ifrm.asp?chk=0&cus_no="+cusnm+"&search="+salday);
				custom_search_cd(cuscd);
			}
			$("#jsGrid").jsGrid("option", "data", dataArray);
			//$("#jsGrid").jsGrid("refresh");
		}

		$("#jsGrid8").jsGrid("option", "data", []);
		//$("#jsGrid8").jsGrid("refresh");
		barcodeFocus();
		$('.dim-layer8').fadeOut();
		//var dataArray = JSON.parse(jObject.data);
		//alert(dataArray);
		search_hold_count();
		updateItems();
		barcodeFocus();
	});
	promise.fail(function(data) {
		alert("search_hold_detail fail : " + data);
	});
}

// 영수증조회 팝업 open
function search_receipt_open() {
	var $el = $("#layer10");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg10');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer10').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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
	selectReceipt = null;
	$selectReceipt = null;

	$("#input_receipt_picker").val(getDay());
	var date = new Date($("#input_receipt_picker").val());
	$('#lbl_receipt_yoil').text("[" + week[date.getDay()] + "]");
	$('#input_receipt_no').focus();
	$('#btn_cash_receipt_open').attr('disabled', true);
	$('#btn_receipt_resale').attr('disabled', true);
	$('#btn_receipt_cancel').attr('disabled', true);
	$('#btn_receipt_reprint').attr('disabled', true);

	$('#rb_pos_condition')[0].checked = true;
	$('#sel_pos_no').val(POSNO);

	$('#receipt_no').text("");
	$('#receipt_gb').text("");
	$('#receipt_sale_time').text("");
	$('#receipt_saleemp_name').text("");

	$('#receipt_total_pri').text("0");
	//$('#receipt_get_pri').text(numberWithCommas(parseInt(selectReceipt.CASHAMT.replace(/,/g,"")) + parseInt(selectReceipt.OUTAMT.replace(/,/g,""))));
	$('#receipt_get_pri').text("0");
	$('#receipt_change').text("0");
	$('#receipt_dcamt').text("0");

	$('#receipt_cash').text("0");
	$('#receipt_card').text("0");
	$('#receipt_tick').text("0");
	$('#receipt_cash_approval').text("");

	$('#receipt_approval_no').text("");
	$('#receipt_approval_time').text("");
	$('#receipt_cancel_time').text("");
	$('#receipt_maipname').text("");

	$('#receipt_giftamt').text("0");
	$('#receipt_discountamt').text("0");
	/*
	$el.find('a.btn-layerClose').click(function(){
		$selectReceipt = null;
		$('#input_receipt_no').val("");
		$("#jsGrid10-1").jsGrid("option", "data", []);
		//$("#jsGrid10-1").jsGrid("refresh");
		$("#jsGrid10-2").jsGrid("option", "data", []);
		//$("#jsGrid10-2").jsGrid("refresh");
		barcodeFocus();
		isDim ? $('.dim-layer10').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});

	$('.layer .dimBg10').click(function(){
		$selectReceipt = null;
		selectReceipt = null;
		barcodeFocus();
		$('.dim-layer10').fadeOut();
		return false;
	});
	*/
	//$("#jsGrid10").jsGrid("refresh");
	// 팝업 생성 & 당일 영수증 조회
	search_receipt();
}

function search_receipt_close() {
	$('.dim-layer10').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	barcodeFocus();
	currentItem = null;
	//setTimeout(search_receipt_close_data, 1000);
}

function setTagAll() {
	$('#cb_t_all')[0].checked = true;
	search_receipt();
}

// 영수증 조회
function search_receipt() {

	selectReceipt = null;
	$selectReceipt = null;

	$('#btn_cash_receipt_open').attr('disabled', true);
	$('#btn_receipt_resale').attr('disabled', true);
	$('#btn_receipt_cancel').attr('disabled', true);
	$('#btn_receipt_reprint').attr('disabled', true);

	$("#jsGrid10-1").jsGrid("option", "data", []);
	$("#jsGrid10-2").jsGrid("option", "data", []);
	//$("#jsGrid10-1").jsGrid("refresh");

	var posno = "";
	var seqno = "";
	var saleTag = "";

	var date = $("#input_receipt_picker").val();		// 영업일
	var date2 = new Date($("#input_receipt_picker").val());
	$('#lbl_receipt_yoil').text("[" + week[date2.getDay()] + "]");
	var shortDate = date.replace(/-/gi, "");

	seqno = $('#input_receipt_no').val();

	if ($('#cb_t_all')[0].checked == true)
	{
		var tag = document.getElementsByName('sale_tag');
		//var cus_sex = "";
		var Chk = false;
		for (i = 0;i < tag.length;i++) {
			if (tag[i].checked)	{
				saleTag = tag[i].value;
				Chk = true;
			}
		}
		if (!Chk) {
			saleTag = "All";
		}
	} else {
		saleTag = "All";
	}

	if ($('#rb_pos_condition')[0].checked == true) {
		posno = $('#sel_pos_no').val();
	} else {
		posno = "All";
	}


	var promise = $.ajax({
			url: "./search_receipt.asp",
			type: "POST",
			data: {
				"posno"		: posno,
				"seqno"		: seqno,
				"saletag"	: saleTag,
				"saledate"	: shortDate
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: false
		});
		promise.done(function(data) {
			//alert("done : " + data);
			session_check(data);
			var jObject = JSON.parse(data);
			if (jObject.error == "1")
			{
				//alert(jObject.msg);
			} else if (jObject.error == "0")
			{
				//alert("영수증 결과 있음(" + jObject.count + "개)");
				/*
				var jData = jObject.data;
				var tempList = [];
				for (i = 0;i < jData.length;i++)
				{
					saleTag = ""
					switch (jData[i].SALETAG)
					{
					case "A" :
						saleTag = "현금";
						break;
					case "B" :
						saleTag = "카드";
						break;
					case "C" :
						saleTag = "상품권";
						break;
					case "P" :
						saleTag = "-";
						break;
					case "Z" :
						saleTag = "취소";
						break;
					}

					var milGu = "";
					var pointTotAmt = 0;
					if (jData[i].POINTAMT != "0")
					{
						pointTotAmt += parseInt(jData[i].POINTAMT);
						milGu = "인증번호쿠폰";
					}
					if (jData[i].USEPOINT != "0")
					{
						pointTotAmt += parseInt(jData[i].USEPOINT);
						milGu = "신마일리지";
					}
					if (jData[i].MILGU3AMT != "0") {
						pointTotAmt += parseInt(jData[i].MILGU3AMT);
						milGu = "할인쿠폰";
					} else {
						pointAmt = "0";
					}

					var temp = {
						NO					: i+1,
						POSNO				: jData[i].POSNO,
						SEQNO				: jData[i].SEQNO,
						SALETAG				: saleTag,
						SALEDATE			: jData[i].SALEDATE,
						SALETIME			: jData[i].SALETIME,
						TOTAMT				: numberWithCommas(jData[i].TOTAMT),			// 받은 금액
						GETAMT				: numberWithCommas(jData[i].GETAMT),			// 전체 금액
						DCAMT				: numberWithCommas(jData[i].DCAMT),
						POINTTOTAMT			: numberWithCommas(pointTotAmt),
						CASHAMT				: numberWithCommas(jData[i].CASHAMT),
						CARDAMT				: numberWithCommas(jData[i].CARDAMT),
						TICKAMT				: numberWithCommas(jData[i].TICKAMT),
						OUTAMT				: numberWithCommas(jData[i].OUTAMT),
						DISCOUNTAMT			: numberWithCommas(jData[i].DISCOUNTAMT),
						CUSTOMERID			: jData[i].CUSTOMERID,
						CUSTOMERNAME		: jData[i].CUSTOMERNAME,
						MILGU				: milGu,
						MILGU3AMT			: numberWithCommas(jData[i].MILGU3AMT),
						USEPOINT			: numberWithCommas(jData[i].USEPOINT),
						POINTAMT			: numberWithCommas(jData[i].POINTAMT),
						SALEEMPNAME			: jData[i].SALEEMPNAME,
						CARDID				: jData[i].CARDID,
						APPROVALNO			: jData[i].APPROVALNO,
						APPROVALNO2			: jData[i].APPROVALNO2,
						SLICE				: jData[i].SLICE,
						APPROVALTIME		: jData[i].APPROVALTIME,
						CANCELTIME			: jData[i].CANCELTIME,
						MAIPNAME			: jData[i].MAIPNAME,
						CASH_APPROVALNO		: jData[i].CASH_APPROVALNO,
						CASH_APPROVALNO2	: jData[i].CASH_APPROVALNO2,
						CASH_APPROVALTIME	: jData[i].CASH_APPROVALTIME,
						CASH_CANCELTIME		: jData[i].CASH_CANCELTIME
					}
					tempList.push(temp);

					//$("#jsGrid10-1").jsGrid("insertItem", temp);
				}
				*/
				$("#jsGrid10-1").jsGrid("option", "data", jObject.data);
				//$("#jsGrid10-1").jsGrid("refresh");
				//code_insert(jObject.spc_chk, jObject.barcode, jObject.style, jObject.colcd, jObject.sizecd, jObject.type1, jObject.cnt, jObject.jeago, jObject.fipri, jObject.price, jObject.dc, jObject.mg, jObject.silpak, jObject.sacod, jObject.t_price_yn)
			}
		});
		promise.fail(function(data) {
			alert("receipt_search fail : " + data);
		});
}

// 영수증 디테일 조회
function search_receipt_detail(seqno, saletag, saletime) {

	$("#jsGrid10-2").jsGrid("option", "data", []);
	//$("#jsGrid10-2").jsGrid("refresh");

	var posno = "";
	//var seqno = "";
	//var saleTag = "";

	var date = $("#input_receipt_picker").val();		// 영업일
	var shortDate = date.replace(/-/gi, "");

	//posno = $('#sel_pos_no').val();
	/*
	if ($('#rb_pos_condition')[0].checked == true) {
		posno = $('#sel_pos_no').val();
	} else {
		posno = POSNO;
	}
	*/
	posno = selectReceipt.POSNO;
	//seqno = $('#input_receipt_no').val();
	var resultArray = "";
	if (saletag == "취소")
	{
		gb = "1"
		var promise = $.ajax({
			url: "./search_hold_detail.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"gb"		: gb,
				"posno"		: posno,
				"saledt"	: shortDate,
				"saletime"	: saletime
			},
			async: true,
			cache: false
		});
		promise.done(function(data) {
			//alert("done : " + data);
			session_check(data);
			var jObject = JSON.parse(data.replace("\"\"[", "[").replace("]\"\"", "]"));
			resultArray = jObject.data;
			var tempList = [];
			for (i = 0;i < resultArray.length;i++)
			{
				var T_PRICE = 0;
				var T_YN	= "N";
				if (parseInt(resultArray[i].DC) == 0 && parseInt(resultArray[i].LAPRI) > parseInt(resultArray[i].SPRICE))
				{
					T_PRICE = resultArray[i].SPRICE;
					T_YN = "Y";
				}
				var temp = {
					NO				: i+1,
					STYCD			: resultArray[i].STYCD,
					COLCD			: resultArray[i].COLCD,
					SIZECD			: resultArray[i].SIZECD,
					QTY				: resultArray[i].QTY,
					LAPRI			: numberWithCommas(resultArray[i].LAPRI),
					DC				: resultArray[i].DC,
					DCAMT			: numberWithCommas(resultArray[i].DCAMT),
					MILAMT			: numberWithCommas(resultArray[i].GIFTAMT),
					SIPRICE			: numberWithCommas(resultArray[i].SIPRICE),
					TYPE			: resultArray[i].TYPE,
					SPC_CHK			: resultArray[i].SPCCHK,
					MILGU			: resultArray[i].MILGU,
					XSTYCD			: resultArray[i].XSTYCD,
					SALEGU			: resultArray[i].SALEGU,
					SPCCHK			: resultArray[i].SPCCHK,
					MILSTR			: "",
					MGSEL			: resultArray[i].MGSEL,
					MILGU			: resultArray[i].MILGU,
					XSTYCD			: resultArray[i].XSTYCD,
					FIPRICE			: numberWithCommas(resultArray[i].FIPRICE),
					SPRICE			: numberWithCommas(resultArray[i].SPRICE),
					GIFTAMT			: numberWithCommas(resultArray[i].MILAMT),
					GIFT1AMT		: "",
					GIFT2AMT		: "",
					GIFT3AMT		: "",
					MG				: resultArray[i].MG,
					BARCODE			: resultArray[i].BARCODE,
					T_PRICE			: numberWithCommas(T_PRICE),
					T_PRICE_YN		: T_YN,
					BRCD			: resultArray[i].BRCD
				}
				tempList.push(temp);
				//$("#jsGrid10-1").jsGrid("insertItem", temp);
			}
			$("#jsGrid10-2").jsGrid("option", "data", tempList);
			//$("#jsGrid10-2").jsGrid("refresh");
		});
		promise.fail(function(data) {
			alert("search_hold_detail fail : " + data);
		});
	} else {
		var promise = $.ajax({
			url: "./search_receipt_detail.asp",
			type: "POST",
			data: {
				"posno"		: posno,
				"seqno"		: seqno,
				"saledate"	: shortDate
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: false
		});
		promise.done(function(data) {
			//alert("done : " + data);
			session_check(data);
			var jObject = JSON.parse(data);
			if (jObject.error == "1") {
				//alert(jObject.msg);
			} else if (jObject.error == "0") {
				$("#jsGrid10-2").jsGrid("option", "data", jObject.data);
			}
		});
		promise.fail(function(data) {
			alert("receipt_search fail : " + data);
		});
	}





}



function receipt_resale() {
	if (selectReceipt == null)
	{
		alert("재매출 할 영수증을 선택하세요.");
		return;
	}

	var current_sales = $("#jsGrid").jsGrid("option", "data");
	if (current_sales.length > 0)
	{
		var mBox = confirm("이미 진행중인 판매가 있습니다.\n무시하고 진행하시겠습니까?");
		if (mBox)
		{
			$("#jsGrid").jsGrid("option", "data", []);
		} else {
			return;
		}
	}
	var items = $("#jsGrid10-2").jsGrid("option", "data");
	items.forEach(function(item) {
		delete item.SALEGU;
		item.MILGU = "0";
		item.MGSEL = "1"
		item.GIFTAMT = 0;
		item.GIFT1AMT = "";
		item.GIFT2AMT = "";
		item.GIFT3AMT = "";
	 });
	$("#jsGrid").jsGrid("option", "data", items);
	//$("#jsGrid").jsGrid("refresh");
	$selectReceipt = null;
	selectReceipt = null;
	$('.dim-layer10').fadeOut();
	updateItems();
	barcodeFocus();
}

function receipt_cancel() {
	if (selectReceipt == null) {
		alert("취소할 영수증을 선택하세요.");
		return;
	}

	if ((selectReceipt.APPROVALNO != null || selectReceipt.CASH_APPROVALNO != null) && JUWSU && !PAYMODULE) {
		alert("결제단말기를 사용하도록 변경해주세요.");
		barcodeFocus();
		currentItem = null;
		return;
	}

	if (selectReceipt.MAIPNAME != null) {
		if (JUWSU && PAYMODULE && selectReceipt.MAIPNAME.substring(selectReceipt.MAIPNAME.length - 4, selectReceipt.MAIPNAME.length) == "(수기)") {
			alert("수기 카드판매는 취소할 수 업습니다.");
			return;
		}
	}

	calc_ing = true;

	var pointAmt = 0;
	var usePoint = 0;

	var items = $("#jsGrid10-2").jsGrid("option", "data");

	temp_cuscd = "";
	temp_cusnm = "";
	if (selectReceipt.CUSTOMERID == null)
	{
		temp_cuscd = "";
	} else {
		temp_cuscd = selectReceipt.CUSTOMERID;
	}

	if (selectReceipt.CUSTOMERNAME == null)
	{
		temp_cusnm = "";
	} else {
		temp_cusnm = selectReceipt.CUSTOMERNAME;
	}

	var saleTag = "";
	switch (selectReceipt.SALETAG)
	{
	case "현금" :
		saleTag = "A";
		break;
	case "카드" :
		saleTag = "B";
		break;
	case "상품권" :
		saleTag = "C";
		break;
	case "-" :
		saleTag = "P";
		break;
	case "취소" :
		saleTag = "Z";
		break;
	}

	var s = selectReceipt.SLICE;

	if (parseInt(s) < 10)	{
		s = "0" + s;
	}

	var temp = {
		SEQ					: selectReceipt.SEQNO,
		SALEDATE			: salday,
		CANCELDATE			: selectReceipt.SALEDATE,
		PROVIDERID			: '<%=DPCD%>',
		//CANCELPOSNO			: $('#sel_pos_no').val(),
		CANCELPOSNO			: selectReceipt.POSNO,
		POSNO				: POSNO,
		SALETAG				: saleTag,
		SALETIME			: getTime(),
		TOTAMT				: parseInt(selectReceipt.TOTAMT.replace(/,/g,"")) * (-1),
		GETAMT				: parseInt(selectReceipt.GETAMT.replace(/,/g,"")) * (-1),
		CASHAMT				: parseInt(selectReceipt.CASHAMT.replace(/,/g,"")) * (-1),
		CARDAMT				: parseInt(selectReceipt.CARDAMT.replace(/,/g,"")) * (-1),
		TICKAMT				: parseInt(selectReceipt.TICKAMT.replace(/,/g,"")) * (-1),
		MILGU3AMT			: parseInt(selectReceipt.MILGU3AMT.replace(/,/g,"")) * (-1),
		USEPOINT			: parseInt(selectReceipt.USEPOINT.replace(/,/g,"")) * (-1),
		POINTAMT			: parseInt(selectReceipt.POINTAMT.replace(/,/g,"")) * (-1),
		OUTAMT				: parseInt(selectReceipt.OUTAMT.replace(/,/g,"")) * (-1),
		DCAMT				: parseInt(selectReceipt.DCAMT.replace(/,/g,"")) * (-1),
		DISCOUNTAMT			: parseInt(selectReceipt.DISCOUNTAMT.replace(/,/g,"")) * (-1),
		CUSTOMERID			: temp_cuscd,
		CUSTOMERNAME		: temp_cusnm,
		CUSTOMERHP			: "",
		CHANGEMILE			: "",
		TOTMILE				: "",
		CARDGU				: "",
		PREFIX				: "",
		CARDID				: "",
		CARDNAME			: "",
		VALIDITY			: "",
		SLICE				: s,
		APPROVALTIME		: "",
		APPROVALNO			: "",
		APPROVALNO2			: "",
		MAIPCD				: "",
		MAIPNAME			: "",
		CASH_APPROVALDATE	: "",
		CASH_APPROVALTIME	: "",
		CASH_TYPE			: "",
		CASH_APPROVALNO		: "",
		CASH_APPROVALNO2	: "",
		CASH_CANCELDATE		: "",
		CASH_CANCELTIME		: "",
		ITEMCOUNT			: $("#jsGrid10-2").jsGrid("option", "data").length
	}


	if (saleTag != "B") {
		if (selectReceipt.CASH_APPROVALNO != null && selectReceipt.CASH_APPROVALNO2 != null && selectReceipt.CASH_CANCELTIME == null && PAYMODULE) {
			cancel_Sale = temp;
			cash_cancel_open();
		} else {
			var sale = JSON.stringify(temp);
			//var items = $("#jsGrid10-2").jsGrid("option", "data");
			sale_cancel(temp, items, true);
		}

		//alert("AorC sale : " + temp);
		/*
		if (selectReceipt.CASH_APPROVALNO != null && selectReceipt.CASH_APPROVALNO2 != null && selectReceipt.CASH_CANCELTIME == null && PAYMODULE)
		{
			var now_cdate = js_yymmdd(new Date());

			var data =  {
				WON: parseInt(selectReceipt.CASHAMT.replace(/,/g,"")) + parseInt(selectReceipt.TICKAMT.replace(/,/g,"")),
				//WON: "1004",		// 금액
				CDATE: "",	// 거래승인일자 6자리 (YYMMDD)
				RS08: "",			// 거래 고유번호. 현금승인시 RS08 값
				RS09: ""			// 거래 승인번호. 현금승인시 RS09 값
			};
			data.CDATE = selectReceipt.SALEDATE.substring(2, 8);
			data.RS08 = selectReceipt.CASH_APPROVALNO2;
			data.RS09 = selectReceipt.CASH_APPROVALNO;
			// 현금영수증 취소
			UPIPOS.payCashCancel(data, function(resdata) {
				console.log(resdata);
				if(resdata.RS04 == "0000") {
					currentCashData = resdata;
					temp.CASH_APPROVALDATE	= resdata.RS07.substring(0, 6);
					temp.CASH_APPROVALTIME	= resdata.RS07.substring(6, 12);
					temp.CASH_APPROVALNO	= resdata.RS09;
					temp.CASH_APPROVALNO2	= resdata.RS08;
					temp.CASH_CANCELDATE	= temp.SALEDATE;
					temp.CASH_CANCELTIME	= temp.SALETIME;
					//var sale = JSON.stringify(temp);
					sale_cancel(temp, items, true);
				} else {		// 거래 실패
					// RS15 - D:알리고 싶은 메시지 있음, d:메시지 없음
					currentCashData = "";
					if(resdata.RS15 == "D") {
						console.log('ERR: RS04 data:', resdata.RS04);
						console.log('ERR: RS16 data:', resdata.RS16);
						console.log('ERR: RS17 data:', resdata.RS17);
					}
					alert("현금영수증 취소 승인 실패.");
				}

			}, function(err) {
				console.log(err);
			});
			return;
		}
		var sale = JSON.stringify(temp);
		//var items = $("#jsGrid10-2").jsGrid("option", "data");
		sale_cancel(temp, items, true);
		*/
	} else if (saleTag == "B") {
		cancel_Sale = temp;
		card_cancel_open();
		/*
		if (!PAYMODULE) {
			var sale = JSON.stringify(temp);
			sale_cancel(temp, items, true);
			return;
		}
		var now_cdate = js_yymmdd(new Date());

		var data =  {
			//WON: selectReceipt.CARDAMT.replace(/,/g,""),
			WON: "1004",		// 금액
			//WON: "51004",		// 금액
			INSM: temp.SLICE,
			CDATE: now_cdate,	// 거래승인일자 6자리 (YYMMDD)
			RS08: "",			// 거래 고유번호. 현금승인시 RS08 값
			RS09: ""			// 거래 승인번호. 현금승인시 RS09 값
		};
		data.CDATE = selectReceipt.SALEDATE.substring(2, 8);
		data.RS08 = selectReceipt.APPROVALNO2;
		data.RS09 = selectReceipt.APPROVALNO;

		// 결제 취소요청
		UPIPOS.payCreditCancel(data, function(resdata) {
			console.log(resdata);
			currentCardData = resdata;
			if(resdata.RS04 == "0000") {	// 거래성공
				//printReceipt(resdata);
				temp.CARDGU			= resdata.RS11;
				temp.PREFIX			= "";
				temp.CARDID			= selectReceipt.CARDID;
				temp.CARDNAME		= resdata.RS12;
				temp.VALIDITY		= resdata.RS06;
				temp.SLICE			= resdata.RQ06;
				temp.APPROVALTIME	= resdata.RS07.substring(6, 12);
				temp.APPROVALNO		= resdata.RS09;
				temp.APPROVALNO2	= resdata.RS08;
				temp.MAIPCD			= resdata.RS05;
				temp.MAIPNAME		= resdata.RS14;

				currentCardData.RQ04 = selectReceipt.CARDID;

				if (selectReceipt.CASH_APPROVALNO != null && selectReceipt.CASH_APPROVALNO2 != null && selectReceipt.CASH_CANCELTIME == null)
				{
					var data =  {
						WON: parseInt(sale.CASHAMT.replace(/,/g,"")) + parseInt(sale.TICKAMT.replace(/,/g,"")),
						//WON: "1004",		// 금액
						CDATE: "",	// 거래승인일자 6자리 (YYMMDD)
						RS08: "",			// 거래 고유번호. 현금승인시 RS08 값
						RS09: ""			// 거래 승인번호. 현금승인시 RS09 값
					};
					data.CDATE = selectReceipt.SALEDATE.substring(2, 8);
					data.RS08 = selectReceipt.CASH_APPROVALNO2;
					data.RS09 = selectReceipt.CASH_APPROVALNO;
					// 현금영수증 취소
					UPIPOS.payCashCancel(data, function(resdata) {
						console.log(resdata);
						if(resdata.RS04 == "0000") {
							currentCashData = resdata;
							temp.CASH_APPROVALDATE	= resdata.RS07.substring(0, 6);
							temp.CASH_APPROVALTIME	= resdata.RS07.substring(6, 12);
							temp.CASH_APPROVALNO	= resdata.RS09;
							temp.CASH_APPROVALNO2	= resdata.RS08;
							temp.CASH_CANCELDATE	= temp.SALEDATE;
							temp.CASH_CANCELTIME	= temp.SALETIME;
							var sale = JSON.stringify(temp);
							sale_cancel(temp, items, true);
						} else {		// 거래 실패
							// RS15 - D:알리고 싶은 메시지 있음, d:메시지 없음
							currentCashData = "";
							if(resdata.RS15 == "D") {
								console.log('ERR: RS04 data:', resdata.RS04);
								console.log('ERR: RS16 data:', resdata.RS16);
								console.log('ERR: RS17 data:', resdata.RS17);
							}
						alert("결제가 실패하였습니다.");
						}

					}, function(err) {
						console.log(err);
						currentCashData = "";
					});
					return;
				}


				var sale = JSON.stringify(temp);
				//alert("B sale : " + sale);
				sale_cancel(temp, items, true);
			} else {		// 거래 실패
				// RS15 - D:알리고 싶은 메시지 있음, d:메시지 없음
				currentCardData = "";
				if(resdata.RS15 == "D") {
					console.log('ERR: RS04 data:', resdata.RS04);
					console.log('ERR: RS16 data:', resdata.RS16);
					console.log('ERR: RS17 data:', resdata.RS17);
				}
				alert("카드 결제 취소 실패.");
			}
		}, function(err) {
			console.log(err);
		});
		*/
	}
}

function discountamt_pop_open() {
	var $el = $("#layer11");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg11');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer11').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();
	$('#input_discount').select();

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

	$('#input_discount').focus();
	$('#input_discount').val("0");
	$('#input_discount').select();

	$el.find('a.btn-layerClose').click(function(){
		$('#input_discount').val("0");
		calc_cancel();
		barcodeFocus();
		$('.dim-layer11').fadeOut()
		return false;
	});

	$('.layer .dimBg11').click(function(){
		$('.dim-layer11').fadeOut();
		return false;
	});
}

function setDiscountAMT() {
	var discount = parseInt($('#input_discount').val());
	//var slice = "";
	if (discount < 0) {
		alert("매장할인 금액은 0원 이상이여야 합니다.");
		return;
	}

	if (parseInt(currentSale.TOTAMT) - discount <= 0) {
		alert("매장할인 금액이 너무 큽니다.");
		return;
	}
	/*
	var iCount = 0; // 현금, 카드와 가격비교

	if (parseInt(currentSale.CASHAMT) > 0 && parseInt(currentSale.CASHAMT) < discount) {
		if (parseInt(currentSale.CARDAMT <= 0) {
			// 카드결제금액은 없을 경우
			alert("매장할인은 현금결제 금액보다 클 수 없습니다.\n받을 금액 : " + currentSale.CASHAMT + "\n" + "매장할인액 : " + discount);
		} else if (parseInt(currentSale.CARDAMT > 0 && parseInt(currentSale.CARDAMT) < discount) {
			alert("매장할인은 카드결제 금액보다 클 수 없습니다.\n받을 금액 : " + currentSale.CASHAMT + "\n" + "매장할인액 : " + discount);
		} else {

		}

		return;
	}
	*/
	/*
	if (parseInt($('#input_slice').val()) < 0)
	{
		alert("할부개월은 0개월 이상이여야 합니다.");
		return;
	} else if (parseInt($('#input_slice').val()) < 10)
	{
		SLICE = "0" + $('#input_slice').val();
	} else {
		SLICE = $('#input_slice').val();
	}
	*/
	$('.dim-layer11').fadeOut();
	DISCOUNTAMT = discount;		// 에누리 금액 set
	currentSale.TOTAMT			= parseInt(currentSale.TOTAMT) - parseInt(DISCOUNTAMT);		// 받아야할 금액 - DISCOUNTAMT
	currentSale.DISCOUNTAMT		= DISCOUNTAMT;

	//tot_getPrice = tot_getPrice - DISCOUNTAMT;

	//$('#lbl_gettotal').text(String(total));
	//$('#lbl_change').text();

	$('#input_discount').val("0");

	// 카드만이 아닌 현금 카드 상품권 정산 모두 실행
	 calc_start(currentSale);
	/*
	var items = $("#jsGrid").jsGrid("option", "data");
	for (i = 0;i < items.length;i++)
	{

		if (items[i].QTY == 0)
		{
			var pop = items.splice(i, 1);
		}
	}
	var itemsStr = JSON.stringify(items);
	alert("sendData's length : " + itemsStr.length + ", data : " + itemsStr);
	*/
	/*
	//calc_check(true);
	//var won = 2004 - DISCOUNTAMT;
	var data =  {
		// "WON" : $('#input_credit').val() - DISCOUNTAMT,
		"WON": "1004",			// 결제금액
		"INSM": SLICE,				// 할부
		"SELLNO": "TEST12345"		// 임시판매번호 (필수 아님)
	};

	UPIPOS.payCredit(data, function(resdata) {
		console.log(resdata);

		// RS09 : 거래승인번호가 들어옴. 취소시 사용.
		currentCardData = resdata;

		if (resdata.MSG != null && resdata.MSG == "User Cancel")
		{
			$('#input_discount').val("0");
			calc_cancel();
			//currentCardData = "";
			//DISCOUNTAMT = 0;
			//currentSale = null;
			return;
		}

		//currentRS09 = now_resdata.RS09;
		if(resdata.RS04 == "0000") {	// 거래성공
			//printReceipt(resdata);
			currentSale.TOTAMT			= parseInt(currentSale.TOTAMT) - DISCOUNTAMT;
			currentSale.CARDAMT			= parseInt(currentSale.CARDAMT) - DISCOUNTAMT;
			currentSale.DISCOUNTAMT		= DISCOUNTAMT;
			currentSale.CARDGU			= resdata.RS11;
			currentSale.PREFIX			= "";
			currentSale.CARDID			= resdata.RQ04.substring(0, 16);
			currentSale.CARDNAME		= resdata.RS12;
			currentSale.VALIDITY		= resdata.RS06;
			currentSale.SLICE			= resdata.RQ06;
			currentSale.APPROVALTIME	= resdata.RS07.substring(6, 12);
			currentSale.APPROVALNO		= resdata.RS09;
			currentSale.APPROVALNO2		= resdata.RS08;
			currentSale.MAIPCD			= resdata.RS05;
			currentSale.MAIPNAME		= resdata.RS14;

			// 카드결제 후 현금영수증 발급 여부 확인
			if ((parseInt(currentSale.CASHAMT) > 0) && ($('#cb_cash_req')[0].checked == true))	{
				// 현금영수증 발급 O
				var data =  {
					WON: "1004",				// 금액
					SELLNO: "TEST12345"	// 임시판매번호
				}

				UPIPOS.payCash(data, function(resdata) {
					console.log(resdata);
					if(resdata.RS04 == "0000") {
						currentCashData = resdata;
						currentSale.CASH_APPROVALDATE = resdata.RS07.substring(0, 6);
						currentSale.CASH_APPROVALTIME	= resdata.RS07.substring(6, 12);
						currentSale.CASH_APPROVALNO	= resdata.RS09;
						currentSale.CASH_APPROVALNO2	= resdata.RS08;
					} else {
						currentCashData = "";
						if(resdata.RS15 == "D") {
							//currentCashData = "";
							alert("현금영수증 승인 실패.\nerrorCode : " + resdata.RS04 + "\n" + "내용 : " + resdata.RS16);
							console.log('ERR: RS04 data:', resdata.RS04);
							console.log('ERR: RS16 data:', resdata.RS16);
							console.log('ERR: RS17 data:', resdata.RS17);
						}
						//alert("결제가 실패하였습니다.");
						//currentCardData = "";
						//currentCashData = "";
						//DISCOUNTAMT = 0;
						//currentSale = null;
						//$('#input_discount').val("0");
						//calc_cancel();
					}

					sale_calc(currentSale, items, false);
				}, function(err) {
					console.log('err:', err);
				});
			} else {	// 현금영수증 발급 X
				sale_calc(currentSale, items, false);
			}
		} else {		// 거래 실패
			// RS15 - D:알리고 싶은 메시지 있음, d:메시지 없음

			if(resdata.RS15 == "D") {
				alert("카드 승인 실패.\nerrorCode : " + resdata.RS04 + "\n" + "내용 : " + resdata.RS16);
				console.log('ERR: RS04 data:', resdata.RS04);
				console.log('ERR: RS16 data:', resdata.RS16);
				console.log('ERR: RS17 data:', resdata.RS17);
			}

			//alert("결제가 실패하였습니다.");
			currentCardData = "";
			DISCOUNTAMT = 0;
			currentSale = null;
			$('#input_discount').val("0");
			calc_cancel();
		}

	}, function(err) {
		console.log(err);
		currentCardData = "";
		DISCOUNTAMT = 0;
		currentSale = null;
		$('#input_discount').val("0");
		calc_cancel();
	});
	*/

}

// 할부개월 popup open
function slice_pop_open() {
	var $el = $("#layer12");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg12');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer12').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

	$('#input_slice').focus();
	$('#input_slice').val("0");
	$('#input_slice').select();
	/*
	$el.find('a.btn-layerClose').click(function(){
		$('#input_slice').val("0");
		calc_cancel();
		$('.dim-layer12').fadeOut();
		return false;
	});
	*/
	$('.layer .dimBg12').click(function(){
		$('.dim-layer12').fadeOut();
		return false;
	});
}

function slice_pop_close() {
	$('#input_slice').val("0");
	calc_cancel();
	$('.dim-layer12').fadeOut();
}

function calc_start(sale) {

	if (sale.SALETAG != "B") {
		var items = $("#jsGrid").jsGrid("option", "data");
		for (i = items.length - 1;i >= 0;i--)
		{
			if (items[i].QTY == 0) {
				var pop = items.splice(i, 1);
			} else {
				items[i].LAPRI = items[i].LAPRI.replace(/,/g,"");
				items[i].FIPRICE = items[i].FIPRICE.replace(/,/g,"");
				items[i].DCAMT = items[i].DCAMT.replace(/,/g,"");
				items[i].SPRICE = items[i].SPRICE.replace(/,/g,"");
				items[i].SIPRICE = items[i].SIPRICE.replace(/,/g,"");
			}
		}
		var str = JSON.stringify(items);
		//alert("sendData's length : " + str.length + ", data : " + str);

		if (parseInt(sale.CASHAMT) < parseInt(sale.DISCOUNTAMT)) {
			sale.TICKAMT = parseInt(sale.TICKAMT) - parseInt(sale.DISCOUNTAMT);
		} else {
			sale.CASHAMT = parseInt(sale.CASHAMT) - parseInt(sale.DISCOUNTAMT);
		}
		sale.OUTAMT = parseInt(sale.OUTAMT) + parseInt(sale.DISCOUNTAMT);

		// 현금정산 & 현금연수증 발급 체크
		if ((parseInt($('#input_cash').val()) > 0 || parseInt($('#input_gift').val()) > 0) && $('#cb_cash_req')[0].checked == true && PAYMODULE)
		{
			currentSale = sale;
			cash_pop_open();
			return;
		}
		/*
		var saleStr = JSON.stringify(sale);
		alert("A sale : " + saleStr);

		var promise = $.ajax({
			url: "./asp_test.asp",
			type: "POST",
			data: {
				"sale"		: escape(saleStr),
				"items"		: escape(str)
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
		});
		promise.done(function(data) {
			var jObject = JSON.parse(data);
			if (jObject.error == "1")
			{
				alert(jObject.msg);
			} else if (jObject.error == "0")
			{
				//alert(jObject.msg);
				alert(jObject.msg);
				//alert(jObject.msg1);
				print_receipt(sale, items, jObject, false);

			}
		});
		promise.fail(function(data) {
			alert("거래 정산 fail : " + data);
		});
		*/
		sale_calc(sale, items, false);
	} else if (sale.SALETAG == "B") {
		// 카드
		//var won = 2004 - DISCOUNTAMT;

		// 할부개월 입력 popup open
		currentSale = sale;
		if (!PAYMODULE)	{
			card_hand_open(currentSale);
			//calc_card();
			return;
		}

		if (parseInt(currentSale.CARDAMT) < 50000) {
			calc_card();
		} else if (parseInt(currentSale.CARDAMT) >= 50000) {
			slice_pop_open();
		}
		return;
	}
}

function cash_pop_open() {
	var $el = $("#layer20");		//레이어의 id를 $el 변수에 저장
	$('.dim-layer20').fadeIn();

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

	$('#rb_cash_person_pop')[0].checked = true;
	$('#rb_cash_person_pop').focus();
}

function cash_pop_close() {
	$('.dim-layer20').fadeOut();
	calc_cancel();
}

function calc_cash() {
	$('.dim-layer20').fadeOut();
	var sale = currentSale;
	var items = $("#jsGrid").jsGrid("option", "data");
	var req_use = "00";
	if ($('#rb_cash_person_pop')[0].checked == true) {
		req_use = "00";
	} else if ($('#rb_cash_company_pop')[0].checked == true) {
		req_use = "01";
	}
	// 현금영수증 발급
	var data =  {
		//WON: "1004",				// 금액	 cash.val() - sale.OUTAMT 받은 금액 - 거스름돈
		WON: parseInt(sale.CASHAMT) + parseInt(sale.TICKAMT),
		RECE_TYPE: req_use,
		SELLNO: "TEST12345"	// 임시판매번호
		//SELLNO : String(sale_sellNo)
	};
	console.log("현금영수증 승인 금액 : " + (parseInt(sale.CASHAMT) + parseInt(sale.TICKAMT)));

	calcing_open();

	UPIPOS.payCash(data, function(resdata) {
		window.focus();
		console.log(resdata);
		now_resdata = resdata;
		// 사용자 취소
		if (typeof resdata.MSG !== "undefined" && resdata.MSG == "User Cancel") {
			//$('.dim-layer999').fadeOut();
			calcing_close();
			alert("현금영수증 승인이 취소되었습니다.\n다시 시도해주세요.");
			$('#input_discount').val("0");
			calc_cancel();
			//currentCardData = "";
			//DISCOUNTAMT = 0;
			//currentSale = null;
			return;
		}
		if(resdata.SUC == "00" && resdata.RS04.substring(0, 4) == "0000") {
			// 미응답 테스트를 위한 return
			/*
			console.log("현금영수증 미응답 테스트 return");
			return;
			*/
			currentCashData = resdata;
			/* 현금영수증 발급용도에 대한 Column 추가 181001 */
			sale.CASH_TYPE			= resdata.RQ08;
			sale.CASH_APPROVALDATE	= resdata.RS07.substring(0, 6);
			sale.CASH_APPROVALTIME	= resdata.RS07.substring(6, 12);
			sale.CASH_APPROVALNO	= resdata.RS09;
			sale.CASH_APPROVALNO2	= resdata.RS08;
			//var sale = JSON.stringify(temp);
			sale_calc(sale, items, false);
		} else {		// 거래 실패
			if (typeof resdata.MSG !== "undefined" && resdata.MSG == "AllReady Conncet") {
				console.log("단말기 작업진행중");
				return;
			}
			currentCashData = "";
			if (resdata.SUC == "01") {
				//$('.dim-layer999').fadeOut();
				calcing_close();
				alert("현금영수증 승인 실패.\n내용 : " + resdata.MSG);
				calc_cancel();
				return;
			}
			// RS15 - D:알리고 싶은 메시지 있음, d:메시지 없음
			if (resdata.RS15 == "D") {
				//$('.dim-layer999').fadeOut();
				calcing_close();
				alert("현금영수증 승인 실패.\nerrorCode : " + resdata.RS04 + "\n" + "내용 : " + resdata.RS16);
				console.log('ERR: RS04 data:', resdata.RS04);
				console.log('ERR: RS16 data:', resdata.RS16);
				console.log('ERR: RS17 data:', resdata.RS17);
				calc_cancel();
				return;
			}
		}
	}, function(err) {
		window.focus();
		console.log('err:', err);
		$('#input_discount').val("0");
		alert("현금영수증 통신 실패");
		calc_cancel();

	});
}

function calc_card() {

	var sale = currentSale;

	if (parseInt($('#input_slice').val()) < 0)
	{
		alert("할부개월은 0개월 이상이여야 합니다.");
		return;
	} else if (parseInt($('#input_slice').val()) < 10)
	{
		SLICE = "0" + $('#input_slice').val();
	} else {
		SLICE = $('#input_slice').val();
	}

	$('.dim-layer12').fadeOut();

	var items = $("#jsGrid").jsGrid("option", "data");
	for (i = items.length - 1;i >= 0;i--)
	{
		if (items[i].QTY == 0) {
			var pop = items.splice(i, 1);
		} else {
			items[i].LAPRI = items[i].LAPRI.replace(/,/g,"");
			items[i].FIPRICE = items[i].FIPRICE.replace(/,/g,"");
			items[i].DCAMT = items[i].DCAMT.replace(/,/g,"");
			items[i].SPRICE = items[i].SPRICE.replace(/,/g,"");
			items[i].SIPRICE = items[i].SIPRICE.replace(/,/g,"");
		}
	}

	var str = JSON.stringify(items);
	//alert("sendData's length : " + str.length + ", data : " + str);

	if (parseInt(sale.CASHAMT) > 0 && parseInt(sale.CASHAMT) > parseInt(sale.DISCOUNTAMT)) {
			sale.CASHAMT = parseInt(sale.CASHAMT) - parseInt(sale.DISCOUNTAMT);
			sale.OUTAMT = parseInt($('#input_cash').val()) - parseInt(sale.CASHAMT);
	} else if (parseInt(sale.TICKAMT) > 0 && parseInt(sale.TICKAMT) > parseInt(sale.DISCOUNTAMT)) {
			sale.TICKAMT = parseInt(sale.TICKAMT) - parseInt(sale.DISCOUNTAMT);
			sale.OUTAMT = parseInt($('#input_cash').val()) - parseInt(sale.TICKAMT);
	}else {
		sale.CARDAMT = parseInt(sale.CARDAMT) - parseInt(sale.DISCOUNTAMT);
	}

	// 결제모듈 미사용 시 결제없이 정산시작
	if (!PAYMODULE) {
		sale_calc(sale, items, false);
		return;
	}

	// 거래 고유난수 발생
	sale_sellNo = getRandomKey();
	//alert("sellNo : " + sale_sellNo);

	var data =  {
		"WON" : sale.CARDAMT,		// 처음 카드결제액 - 매장할인금액
		//"WON": "1004",			// 결제금액
		//"WON": "51004",			// 결제금액
		"INSM": SLICE,				// 할부
		//"SELLNO": "TEST12345"		// 임시판매번호 (필수 아님)
		"SELLNO": sale_sellNo		// 임시판매번호 (필수 아님)
	};

	console.log("카드결제 승인 금액 : " + sale.CARDAMT);

	currentSale = sale;
	calcing_open();			// 결제중 팝업 open

	UPIPOS.payCredit(data, function(resdata) {
		window.focus();
		console.log(resdata);

		// RS09 : 거래승인번호가 들어옴. 취소시 사용.
		currentCardData = resdata;

		if (resdata.MSG != null && resdata.MSG == "User Cancel ")
		{
			$('#input_discount').val("0");
			$('#input_slice').val("0");
			calc_cancel();
			//currentCardData = "";
			//DISCOUNTAMT = 0;
			//currentSale = null;
			return;
		}
		//currentRS09 = now_resdata.RS09;
		if(resdata.SUC == "00" && resdata.RS04.substring(0, 4) == "0000") {	// 거래성공
			//printReceipt(resdata);
			//currentSale.TOTAMT			= parseInt(currentSale.TOTAMT) - DISCOUNTAMT;
			//currentSale.CARDAMT			= parseInt(currentSale.CARDAMT) - DISCOUNTAMT;
			//currentSale.DISCOUNTAMT		= DISCOUNTAMT;
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
			if (((parseInt(currentSale.CASHAMT) > 0) || (parseInt(currentSale.TICKAMT) > 0)) && ($('#cb_cash_req')[0].checked == true))	{
				// 현금영수증 발급 O
				calcing_close();
				// 현금영수증 발급 O
				//sale.OUTAMT = (parseInt($('#input_cash').val()) - parseInt(sale.CASHAMT)) + (parseInt($('#input_gift').val()) - parseInt(sale.TICKAMT));
				currentSale = sale;
				cash_pop_open();
				/*
				sale.OUTAMT = (parseInt($('#input_cash').val()) - parseInt(sale.CASHAMT)) + (parseInt($('#input_gift').val()) - parseInt(sale.TICKAMT));

				var data =  {
					//WON: "1004",				// 금액
					"WON": parseInt(sale.CASHAMT) + parseInt(sale.TICKAMT),
					SELLNO: "TEST12345"	// 임시판매번호
				}

				console.log("카드결제 후 현금영수증 승인 금액 : " + (parseInt(sale.CASHAMT) + parseInt(sale.TICKAMT)));

				UPIPOS.payCash(data, function(resdata) {
					console.log(resdata);
					if(resdata.RS04 == "0000") {
						currentCashData = resdata;
						sale.CASH_APPROVALDATE = resdata.RS07.substring(0, 6);
						sale.CASH_APPROVALTIME	= resdata.RS07.substring(6, 12);
						sale.CASH_APPROVALNO	= resdata.RS09;
						sale.CASH_APPROVALNO2	= resdata.RS08;
					} else {
						currentCashData = "";
						if(resdata.RS15 == "D") {
							//currentCashData = "";
							alert("현금영수증 승인 실패.\nerrorCode : " + resdata.RS04 + "\n" + "내용 : " + resdata.RS16);
							console.log('ERR: RS04 data:', resdata.RS04);
							console.log('ERR: RS16 data:', resdata.RS16);
							console.log('ERR: RS17 data:', resdata.RS17);
						}
						//alert("결제가 실패하였습니다.");
						//currentCardData = "";
						//currentCashData = "";
						//DISCOUNTAMT = 0;
						//currentSale = null;
						//$('#input_discount').val("0");
						//calc_cancel();
					}

					sale_calc(sale, items, false);
				}, function(err) {
					console.log('err:', err);
				});
				*/
			} else {	// 현금영수증 발급 X
				sale_calc(sale, items, false);
			}
		} else {		// 거래 실패
			if (resdata.MSG != null && resdata.MSG == "AllReady Conncet") {
				console.log("단말기 작업진행중");
				return;
			}
			if (resdata.SUC == "01") {
				alert("카드 승인 실패.\n내용 : " + resdata.MSG);
				currentCardData = "";
				DISCOUNTAMT = 0;
				currentSale = null;
				$('#input_slice').val("0");
				$('#input_discount').val("0");
				calc_cancel();
				return;
			}
			// RS15 - D:알리고 싶은 메시지 있음, d:메시지 없음
			if(resdata.RS15 == "D") {
				alert("카드 승인 실패.\nerrorCode : " + resdata.RS04 + "\n" + "내용 : " + resdata.RS16);
				console.log('ERR: RS04 data:', resdata.RS04);
				console.log('ERR: RS16 data:', resdata.RS16);
				console.log('ERR: RS17 data:', resdata.RS17);
			} else {
				alert("카드 승인 실패.\nerrorCode : " + resdata.RS04);
			}

			//alert("결제가 실패하였습니다.");
			currentCardData = "";
			DISCOUNTAMT = 0;
			currentSale = null;
			$('#input_slice').val("0");
			$('#input_discount').val("0");
			calc_cancel();
		}

	}, function(err) {
		console.log(err);
		currentCardData = "";
		DISCOUNTAMT = 0;
		currentSale = null;
		$('#input_slice').val("0");
		$('#input_discount').val("0");
		alert("카드 승인 통신실패.");
		calc_cancel();
	});
}

function count_up() {
	if(currentItem != null) {
	/*
	$.extend(currentItem, {
			NO: currentItem.NO,
			SPCCHK: currentItem.SPCCHK,
			STYCD: currentItem.STYCD,
			COLCD: currentItem.COLCD,
			SIZECD: currentItem.SIZECD,
			TYPE: currentItem.TYPE,
			QTY: parseInt(currentItem.QTY) + 1,
			JAEGO: currentItem.JAEGO,
			LAPRI: currentItem.LAPRI,
			DC: currentItem.DC,
			MG: currentItem.MG,
			FIPRICE: currentItem.FIPRICE,
			SPRICE: currentItem.SPRICE,
			SIPRICE: currentItem.SIPRICE,
			MGSEL: "1",
			MILGU: "0",
			GIFTAMT: 0,
			GIFT1AMT: "",
			GIFT2AMT: "",
			GIFT3AMT: "",
        });

        $("#jsGrid").jsGrid("updateItem", currentItem);
		//currentItem = null;
		//updateItems();
	} else {
		alert("수량증가 할 상품을 선택하세요.");
	}
	*/
	$.extend(currentItem, {
			QTY: parseInt(currentItem.QTY) + 1,
			SIPRICE: numberWithCommas(parseInt(currentItem.SPRICE.replace(/,/g,"")) * (parseInt(currentItem.QTY) + 1) - parseInt(currentItem.GIFTAMT.replace(/,/g,"")))
        });

        $("#jsGrid").jsGrid("updateItem", currentItem);
		//currentItem = null;
		updateItems();
		//$("#jsGrid").jsGrid("refresh");
	} else {
		alert("수량증가 할 상품을 선택하세요.");
	}
}

function receipt_reprint() {

	UPIPOS._USERDATA.POSNO = selectReceipt.POSNO + "번";
	UPIPOS._USERDATA.POSNM = selectReceipt.POSNO + "번";

	//var sale = $("#jsGrid10-1").jsGrid("option", "data");
	var items = $("#jsGrid10-2").jsGrid("option", "data");

	var aa = js_yyyy_mm_dd_hh_mm_ss();
	console.log('aa:', aa);

	var changeMile = 0;			// 구매당시 적립된 적립금

	var dataArray = [];
	items.forEach(function(item) {
		//delete item.No;

		var salenm = "";
		var lapri = 0;
		var silpri = 0;
		var couponPri = 0;
		var couponnm = "";

		lapri = item.LAPRI.toString().replace(/,/g,"");
		silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) / parseInt(item.QTY));

		if (item.DCAMT > 0)
		{
			salenm = "할인";
			lapri = item.LAPRI.toString().replace(/,/g,"");
			silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) / parseInt(item.QTY));
		}

		if (item.MILGU == "3" || item.MILGU == "4" || item.MILGU == "6")
		{
			//salenm = "쿠폰";
			switch (item.MILGU)
			{
			case "3" :
				couponnm = "금액권";
				break;
			case "4" :
				couponnm = "신마";
				break;
			case "6" :
				couponnm = "인증쿠폰";
				break;
			}
			couponPri = item.MILAMT.toString().replace(/,/g,"");
			//silpri = parseInt(silpri) + Math.abs(parseInt(couponPri));
			silpri = (parseInt(item.SIPRICE.toString().replace(/,/g,"")) + parseInt(couponPri)) / parseInt(item.QTY);
		}

		if (parseInt(item.QTY) < 0) {
			salenm = "반품";
		}

		var ITEM_GU = "";
		if (item.SPCCHK == "아울") {
			ITEM_GU = "*";
		}


		// 구매당시 마일리지 총합  190227 추가
		changeMile += parseInt(item.MILAMT2);

		var temp = {
			"XSTYCD": item.XSTYCD,			// 상품명 (최대 18bytes)
			"STYCD": ITEM_GU + item.STYCD + item.COLCD + item.SIZECD,		// 상품코드 (최대 18bytes)
			"SQTY": parseInt(item.QTY),						// 수량 (숫자)
			"LAPRI": parseInt(lapri),					// 단가 (숫자)
			"SILPRI": parseInt(silpri),				// 판매가 (숫자)
			"COUPONPRI": parseInt(couponPri),
			"COUPONNM" : couponnm,
			"SALENM": salenm
		}
		dataArray.push(temp);
	});



	/*
		modified by jsys 2019.02.27
		- 재발행 시 고객명/고객코드 /고객전화번호 정보 추가
		- 구매당시 적립 마일리지 추가
	*/
	var mileageData = "";
	var reqdata = "";

	if (selectReceipt.CUSTOMERNAME != null && selectReceipt.CUSTOMERNAME != "") {
		var tempTEL = "";
		var tempNM = selectReceipt.CUSTOMERNAME.substring(0,1) + "*" + selectReceipt.CUSTOMERNAME.substring(2);
		if (selectReceipt.CUSTOMERHP != null && selectReceipt.CUSTOMERHP.length == 11) {
			tempTEL = selectReceipt.CUSTOMERHP.substring(0,3) + "-****-" + selectReceipt.CUSTOMERHP.substring(7);
		} else if (selectReceipt.CUSTOMERHP != null && selectReceipt.CUSTOMERHP.length == 10) {
			tempTEL = selectReceipt.CUSTOMERHP.substring(0,3) + "-***-" + selectReceipt.CUSTOMERHP.substring(6);
		} else if (selectReceipt.CUSTOMERHP != null && selectReceipt.CUSTOMERHP.length == 13) {
			tempTEL = selectReceipt.CUSTOMERHP.substring(0,3) + "-****-" + selectReceipt.CUSTOMERHP.substring(9);
		} else if (selectReceipt.CUSTOMERHP != null && selectReceipt.CUSTOMERHP.length == 12)	{
			tempTEL = selectReceipt.CUSTOMERHP.substring(0,3) + "-***-" + selectReceipt.CUSTOMERHP.substring(8);
		}

		mileageData = {
			"UNAME": tempNM,
			"UTEL": tempTEL,
			"UID": selectReceipt.CUSTOMERID,
			"S_POINT": numberWithCommas(changeMile),		// 구매당시 적립된 마일리지
			//"M_POINT": parseInt(sale.TOTMILE)
			"M_POINT": ""		// 현마일리지는 가변하는 정보이므로 재발행에서 제외
		};

		reqdata = {
			"CALDATETIME": aa,						// 영업일시
			"CALDATE": selectReceipt.SALEDATE.substring(0, 4) + "-" + selectReceipt.SALEDATE.substring(4, 6) + "-" + selectReceipt.SALEDATE.substring(6),		// 영업일
			"RECENO": selectReceipt.SEQNO,				// 영수증번호
			"PAYCREDIT": parseInt(selectReceipt.CARDAMT.toString().replace(/,/g,"")),		// 카드 결제금액
			"PAYCASH": parseInt(selectReceipt.CASHAMT.toString().replace(/,/g,"")),			// 현금 결제금액
			//"GETMONEY": parseInt(selectReceipt.CASHAMT.replace(/,/g,"")) + parseInt(selectReceipt.OUTAMT.replace(/,/g,"")),
			"GIFTCARD": parseInt(selectReceipt.TICKAMT.toString().replace(/,/g,"")),
			"USERDISCNT": parseInt(selectReceipt.DISCOUNTAMT.toString().replace(/,/g,"")),
			"B_REPRINT": "Y",			// 재발행여부 (Y, N)

			mileage: mileageData,

			//"B_REPRINT": "N",			// 재발행여부 (Y, N)
			data : dataArray
		};
	} else {
		reqdata = {
			"CALDATETIME": aa,			// 영업일시
			"CALDATE": selectReceipt.SALEDATE.substring(0, 4) + "-" + selectReceipt.SALEDATE.substring(4, 6) + "-" + selectReceipt.SALEDATE.substring(6),		// 영업일
			"RECENO": selectReceipt.SEQNO,				// 영수증번호
			"PAYCREDIT": parseInt(selectReceipt.CARDAMT.toString().replace(/,/g,"")),		// 카드 결제금액
			"PAYCASH": parseInt(selectReceipt.CASHAMT.toString().replace(/,/g,"")),			// 현금 결제금액
			//"GETMONEY": parseInt(selectReceipt.CASHAMT.replace(/,/g,"")) + parseInt(selectReceipt.OUTAMT.replace(/,/g,"")),
			"GIFTCARD": parseInt(selectReceipt.TICKAMT.toString().replace(/,/g,"")),
			"USERDISCNT": parseInt(selectReceipt.DISCOUNTAMT.toString().replace(/,/g,"")),
			"B_REPRINT": "Y",			// 재발행여부 (Y, N)

			data : dataArray
		};
	}
	/*
	var reqdata = {
		"CALDATETIME": aa,			// 영업일시
		"CALDATE": selectReceipt.SALEDATE.substring(0, 4) + "-" + selectReceipt.SALEDATE.substring(4, 6) + "-" + selectReceipt.SALEDATE.substring(6),		// 영업일
		"RECENO": selectReceipt.SEQNO,				// 영수증번호
		"PAYCREDIT": parseInt(selectReceipt.CARDAMT.toString().replace(/,/g,"")),		// 카드 결제금액
		"PAYCASH": parseInt(selectReceipt.CASHAMT.toString().replace(/,/g,"")),			// 현금 결제금액
		//"GETMONEY": parseInt(selectReceipt.CASHAMT.replace(/,/g,"")) + parseInt(selectReceipt.OUTAMT.replace(/,/g,"")),
		"GIFTCARD": parseInt(selectReceipt.TICKAMT.toString().replace(/,/g,"")),
		"USERDISCNT": parseInt(selectReceipt.DISCOUNTAMT.toString().replace(/,/g,"")),
		"B_REPRINT": "Y",			// 재발행여부 (Y, N)


		data : dataArray
	};*/

	reqdata.RECENO = selectReceipt.SEQNO;
	if (selectReceipt.SALETAG == "카드") {
		var credit_data = {
			RQ04 : selectReceipt.CARDID,
			RS12 : selectReceipt.MAIPNAME,
			RQ06 : selectReceipt.SLICE,
			RS09 : selectReceipt.APPROVALNO,
			RQ07 : selectReceipt.CARDAMT
		}
		reqdata.credit_data = credit_data;
	} else {
		reqdata.credit_data = "";
	}

	if (currentCashData != "") {
		reqdata.cash_data = currentCashData;
	} else {
		reqdata.cash_data = "";
	}

	if (selectReceipt.SALETAG != "카드" && selectReceipt.CASH_CANCELTIME != null && selectReceipt.CASH_APPROVALNO != null) {
		// 영수증 취소에 대한 현금영수증 취소 내역 존재
		var cash_data = {
			RS12 : "현금 결제 취소",
			RQ04 : "-",
			RS09 : selectReceipt.CASH_APPROVALNO,
			RQ07 : parseInt(selectReceipt.CASHAMT.toString().replace(/,/g,"")) + parseInt(selectReceipt.TICKAMT.toString().replace(/,/g,""))
		}
		reqdata.cash_data = cash_data;
	} else if (selectReceipt.SALETAG != "카드" && selectReceipt.CASH_CANCELTIME == null && selectReceipt.CASH_APPROVALNO != null) {
		/*
		var cash_data = {
			RS12 : "현금(소득공제)",
			RQ04 : "-",
			RS09 : selectReceipt.CASH_APPROVALNO,
			RQ07 : parseInt(selectReceipt.CASHAMT.toString().replace(/,/g,"")) + parseInt(selectReceipt.TICKAMT.toString().replace(/,/g,""))
		}
		reqdata.cash_data = cash_data;
		*/
		var cash_data = {
			RS12 : "",
			RQ04 : "-",
			RS09 : selectReceipt.CASH_APPROVALNO,
			RQ07 : parseInt(selectReceipt.CASHAMT.toString().replace(/,/g,"")) + parseInt(selectReceipt.TICKAMT.toString().replace(/,/g,""))
		};
		if (selectReceipt.CASH_TYPE == "00") {
			cash_data.RS12 = "현금(소득공제)";
		} else if (selectReceipt.CASH_TYPE == "01") {
			cash_data.RS12 = "현금(지출증빙)";
		}
		reqdata.cash_data = cash_data;
	}
	else {
		reqdata.cash_data = "";
	}

	UPIPOS.printReceipt(reqdata, function(resdata) {
		console.log(resdata);
		currentCardData = "";
		currentCashData = "";
		DISCOUNTAMT = 0;
	}, function(err) {
		console.log(err);
		currentCardData = "";
		currentCashData = "";
		DISCOUNTAMT = 0;
	});
}

function toggleGiftCondition() {
	if ($('#rb_gift_search')[0].checked == true) {
		$("#jsGrid5-1").jsGrid("option", "data", []);
		$('#input_gift_no').attr('disabled', false);
		$('#input_gift_no').val("");
		$('#input_gift_no').focus();
		$('#btn_gift_search').attr('disabled', false);
	} else if ($('#rb_gift_have')[0].checked == true) {
		//alert("have click");
		$("#jsGrid5-1").jsGrid("option", "data", []);
		$('#input_gift_no').attr('disabled', true);
		$('#input_gift_no').val("");
		$('#btn_gift_search').attr('disabled', true);
		sale_gift2_search();
	}
}

function toggleGift3Condition() {
	if ($('#rb_gift3_search')[0].checked == true) {
		$("#jsGrid6-1").jsGrid("option", "data", []);
		$('#input_gift3_no').attr('disabled', false);
		$('#input_gift3_no').val("");
		$('#input_gift3_no').focus();
		$('#btn_gift3_search').attr('disabled', false);
	} else if ($('#rb_gift3_have')[0].checked == true) {
		$("#jsGrid6-1").jsGrid("option", "data", []);
		$('#input_gift3_no').attr('disabled', true);
		$('#input_gift3_no').val("");
		$('#btn_gift3_search').attr('disabled', true);
		sale_gift3_search();
	}
}

function cash_receipt_open(day, _posno, seqno) {
	var $el = $("#layer13");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg13');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer13').fadeIn() : $el.fadeIn();

	//$('#input_no').focus();

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

	$('#dp_cash').val(day);
	// 요일 text
	var date = new Date($("#dp_cash").val());
	$('#lbl_cash_yoil').text("[" + week[date.getDay()] + "]");

	if (_posno == "") {
		$('#sel_cash_pos').val(POSNO);
	} else {
		$('#sel_cash_pos').val(_posno);
	}
	//$('#sel_cash_pos').val(POSNO);

	$('#rb_cash_approval')[0].checked = true;
	$('#lbl_cash_amt').text("");
	$('#lbl_cash_approvalno').text("");
	$('#lbl_cash_approvalno').attr('disabled', true);
	$('#input_cr_no').val(seqno);
	$('#input_cr_no').focus();

	$('#btn_cash_req').attr('disabled', true);

	$el.find('a.btn-layerClose').click(function(){
		barcodeFocus();
		$('.dim-layer13').fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		return false;
	});

	$('.layer .dimBg13').click(function(){
		$('.dim-layer13').fadeOut();
		return false;
	});
}

function cash_receipt_date_change() {
	// 요일 text
	var date = new Date($("#dp_cash").val());
	$('#lbl_cash_yoil').text("[" + week[date.getDay()] + "]");
	$('#input_cr_no').focus();
}

// 카드승인취소
function card_cancel_open() {
	//var barcd  = document.d_sale.prdcd.value;
	//var day1   ='<%=salday%>';

	var wX = screen.availWidth;
	var wY = screen.availHeight;

	var left = (wX / 2) - 275;
	var top = (wY / 2) - 175;

	//child = window.open('c_search_popup.html?','수표조회','width=550, height=350, top=' + top + ', left=' + left + ', status=no, toolbar=no, location=no, titlebar=no, resizable=yes');
	//layer_test("#layer2");

	var $el = $("#layer14");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg14');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer14').fadeIn() : $el.fadeIn();

	$('#input_card_approvalno').focus();

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
	$('#C_CARDNAME').text($('#receipt_maipname').text());
	$('#C_CARDAMT').text($('#receipt_card').text());
	/*
	$el.find('a.btn-layerClose').click(function(){
		$('#input_card_approvalno').val("");
		isDim ? $('.dim-layer14').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		calc_ing = false;
		calc_ing_count = 0;
		return false;
	});

	$('.layer .dimBg14').click(function(){
		$('.dim-layer14').fadeOut();
		return false;
	});
	*/
}

function card_cancel_close() {
	$('#input_card_approvalno').val("");
	$('.dim-layer14').fadeOut();
	calc_ing = false;
	calc_ing_count = 0;
}

function card_cancel() {

	var cardnm = $('#input_card_approvalno').val();
	if (selectReceipt.APPROVALNO != cardnm )
	{
		alert("카드 승인번호를 확인해주세요!");
		$('#input_card_approvalno').focus();
		return;
	}

	calc_ing_count++;
	if (calc_ing_count > 1) {
		console.log("취소중 | calc_ing_count : " + calc_ing_count);
		return;
	}

	console.log("카드취소 start");

	var items = $("#jsGrid10-2").jsGrid("option", "data");
	var temp = cancel_Sale ;
	if (!PAYMODULE) {
		var sale = JSON.stringify(temp);
		sale_cancel(temp, items, true);
		return;
	}
	var now_cdate = js_yymmdd(new Date());

	var data =  {
		WON: selectReceipt.CARDAMT.replace(/,/g,""),
		//WON: "1004",		// 금액
		//WON: "51004",		// 금액
		INSM: temp.SLICE,
		CDATE: now_cdate,	// 거래승인일자 6자리 (YYMMDD)
		RS08: "",			// 거래 고유번호. 현금승인시 RS08 값
		RS09: ""			// 거래 승인번호. 현금승인시 RS09 값
	};
	data.CDATE = selectReceipt.SALEDATE.substring(2, 8);
	data.RS08 = selectReceipt.APPROVALNO2;
	data.RS09 = selectReceipt.APPROVALNO;
	// 결제 취소요청
	UPIPOS.payCreditCancel(data, function(resdata) {
		console.log(resdata);
		currentCardData = resdata;
		if (resdata.MSG != null && resdata.MSG == "User Cancel ") {
			$('#input_card_approvalno').val("");
			calc_ing_count = 0;
			return;
		}
		if(resdata.RS04 == "0000") {	// 거래성공
			$('#input_card_approvalno').val("");
			$('.dim-layer14').fadeOut();
			//printReceipt(resdata);
			temp.CARDGU			= resdata.RS11;
			temp.PREFIX			= "";
			temp.CARDID			= selectReceipt.CARDID;
			temp.CARDNAME		= resdata.RS12;
			temp.VALIDITY		= resdata.RS06;
			temp.SLICE			= resdata.RQ06;
			temp.APPROVALTIME	= resdata.RS07.substring(6, 12);
			temp.APPROVALNO		= resdata.RS09;
			temp.APPROVALNO2	= resdata.RS08;
			temp.MAIPCD			= resdata.RS05;
			temp.MAIPNAME		= resdata.RS14;

			currentCardData.RQ04 = selectReceipt.CARDID;

			if (selectReceipt.CASH_APPROVALNO != null && selectReceipt.CASH_APPROVALNO2 != null && selectReceipt.CASH_CANCELTIME == null) {
				cancel_Sale = temp;
				cash_cancel_open();
				return;
			}
			var sale = JSON.stringify(temp);
			//alert("B sale : " + sale);
			sale_cancel(temp, items, true);
		} else {		// 거래 실패
			if (resdata.MSG != null && resdata.MSG == "AllReady Conncet") {
				console.log("단말기 작업진행중");
				return;
			}
			// RS15 - D:알리고 싶은 메시지 있음, d:메시지 없음
			currentCardData = "";
			if(resdata.RS15 == "D") {
				console.log('ERR: RS04 data:', resdata.RS04);
				console.log('ERR: RS16 data:', resdata.RS16);
				console.log('ERR: RS17 data:', resdata.RS17);
				alert("카드 승인취소 실패.\nerrorCode : " + resdata.RS04 + "\n" + "내용 : " + resdata.RS16);
			}
			alert("카드 결제 취소 실패.");
			calc_ing_count = 0;
		}
	}, function(err) {
		console.log(err);
		currentCardData = "";
		calc_ing_count = 0;
	});
}

// 현금승인취소
function cash_cancel_open() {

	var $el = $("#layer15");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg15');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer15').fadeIn() : $el.fadeIn();

	$('#reciept_cash_approvalno').val("");
	$('#reciept_cash_approvalno').focus();

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

	//$('#C_CASHAMT').text(parseInt($('#receipt_cash').text().replace(/,/g,""))+parseInt($('#receipt_tick').text().replace(/,/g,"")));
	$('#C_CASHAMT').text(numberWithCommas(String(parseInt($('#receipt_cash').text().replace(/,/g,""))+parseInt($('#receipt_tick').text().replace(/,/g,"")))));
	/*
	$el.find('a.btn-layerClose').click(function(){
		//$('#input_card_approvalno').val("");
		isDim ? $('.dim-layer15').fadeOut() : $el.fadeOut(); // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		calc_ing = false;
		calc_ing_count = 0;
		return false;
	});

	$('.layer .dimBg15').click(function(){
		$('.dim-layer15').fadeOut();
		return false;
	});
	*/
}

function cash_cancel_close() {
	$('.dim-layer15').fadeOut();
	calc_ing = false;
	calc_ing_count = 0;
}

// 단말기 승인 저장 팝업
function card_hand_open(sale) {

	var $el = $("#layer16");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg16');	//dimmed 레이어를 감지하기 위한 boolean 변수

	isDim ? $('.dim-layer16').fadeIn() : $el.fadeIn();

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

	$('#lbl_hand_cardamt').text(parseInt(sale.CARDAMT));
	//$('#sel_hand_card').val(cardCompanys[0].REFSNM);
	$('#sel_hand_card').val("0");
	$('#input_hand_card_id').val("");
	$('#sel_hand_slice').val("0");
	$('#input_hand_card_approvalno').val("");
	$('#input_hand_card_id').focus();
	/*
	$('.layer .dimBg16').click(function(){
		$('.dim-layer16').fadeOut();
		return false;
	});
	*/
	calc_ing = false;
}

function card_hand_save(sale) {
	if ($('#sel_hand_card').val() == "0") {
		alert("카드사를 선택해주세요.");
		return;
	}
	var approvalno = $('#input_hand_card_approvalno').val();
	if (approvalno.length == "") {
		alert("승인번호를 입력해주세요.");
		$('#input_hand_card_approvalno').focus();
		return;
	}

	if (calc_ing == true) {
		//console.log("수기결제중");
		return;
	}
	calc_ing = true;

	sale.APPROVALNO = approvalno;
	var temp_slice = $('#sel_hand_slice').val();
	if (parseInt(temp_slice) < 10) {
		temp_slice = "0" + temp_slice;
	}

	var temp_cardname = "";
	var temp_maipcd = "";
	var temp_maipname = "";
	temp_cardgu = $('#sel_hand_card').val();
	for (var i=0;i<cardCompanys.length;i++){
		if (temp_cardgu == cardCompanys[i].REFSNM) {
			temp_cardname	= cardCompanys[i].REFNM;
			temp_maipcd		= cardCompanys[i].ETC1;
			temp_maipname	= cardCompanys[i].ETC2;

			break;
		}
	}

	sale.CARDGU			= temp_cardgu;
	sale.PREFIX			= "";
	sale.CARDID			= $('#input_hand_card_id').val() + "000000000000";
	sale.CARDNAME		= temp_cardname + "(수기)";
	sale.VALIDITY		= "0000";
	sale.SLICE			= temp_slice;
	sale.APPROVALTIME	= getTime();
	sale.APPROVALNO		= approvalno;
	sale.MAIPCD			= temp_maipcd;
	sale.MAIPNAME		= temp_maipname + "(수기)";
	currentSale = sale;
	$('#lbl_hand_cardamt').text("");
	$('#sel_hand_card').val(cardCompanys[0].REFSNM);
	$('#sel_hand_slice').val("0");
	$('#input_hand_card_id').val("");
	$('#input_hand_card_approvalno').val("");
	$('.dim-layer16').fadeOut();
	calc_card();
}

function card_hand_close() {
	$('#lbl_hand_cardamt').text("");
	$('#sel_hand_card').val(cardCompanys[0].REFSNM);
	$('#sel_hand_slice').val("0");
	$('#input_hand_card_id').val("");
	$('#input_hand_card_approvalno').val("");
	$('.dim-layer16').fadeOut();
	calc_cancel();
}

function cash_cancel() {

	var cashnm = $('#reciept_cash_approvalno').val();
	if (selectReceipt.CASH_APPROVALNO != cashnm ) {
			alert("현금영수증 승인번호를 확인해주세요!");
			$('#reciept_cash_approvalno').focus();
			return;
	}

	calc_ing_count++;
	if (calc_ing_count > 1) {
		console.log("취소중 | calc_ing_count : " + calc_ing_count);
		return;
	}

	console.log("현금영수증 취소 start");

	var items = $("#jsGrid10-2").jsGrid("option", "data");
	var temp = cancel_Sale ;
	if (selectReceipt.CASH_APPROVALNO != null && selectReceipt.CASH_APPROVALNO2 != null && selectReceipt.CASH_CANCELTIME == null && PAYMODULE) {
		var now_cdate = js_yymmdd(new Date());

		var data =  {
			WON: parseInt(selectReceipt.CASHAMT.replace(/,/g,"")) + parseInt(selectReceipt.TICKAMT.replace(/,/g,"")),
			//WON: "1004",		// 금액
			CDATE: "",	// 거래승인일자 6자리 (YYMMDD)
			RECE_TYPE: "",
			RS08: "",			// 거래 고유번호. 현금승인시 RS08 값
			RS09: ""			// 거래 승인번호. 현금승인시 RS09 값
		};
		data.CDATE = selectReceipt.CASH_APPROVALDATE;
		data.RECE_TYPE = selectReceipt.CASH_TYPE;
		data.RS08 = selectReceipt.CASH_APPROVALNO2;
		data.RS09 = selectReceipt.CASH_APPROVALNO;
		// 현금영수증 취소
		UPIPOS.payCashCancel(data, function(resdata) {
			console.log(resdata);
			if (resdata.MSG != null && resdata.MSG == "User Cancel ") {
				$('#reciept_cash_approvalno').val("");
				calc_ing_count = 0;
				return;
			}
			if(resdata.RS04 == "0000") {
				$('#reciept_cash_approvalno').val("");
				$('.dim-layer15').fadeOut();
				currentCashData = resdata;
				temp.CASH_TYPE			= resdata.RQ08;
				temp.CASH_APPROVALDATE	= resdata.RS07.substring(0, 6);
				temp.CASH_APPROVALTIME	= resdata.RS07.substring(6, 12);
				temp.CASH_APPROVALNO	= resdata.RS09;
				temp.CASH_APPROVALNO2	= resdata.RS08;
				temp.CASH_CANCELDATE	= temp.SALEDATE;
				temp.CASH_CANCELTIME	= temp.SALETIME;
				//var sale = JSON.stringify(temp);
				sale_cancel(temp, items, true);
			} else {		// 거래 실패
				if (resdata.MSG != null && resdata.MSG == "AllReady Conncet") {
					console.log("단말기 작업진행중");
					return;
				}
				// RS15 - D:알리고 싶은 메시지 있음, d:메시지 없음
				currentCashData = "";
				if(resdata.RS15 == "D") {
					console.log('ERR: RS04 data:', resdata.RS04);
					console.log('ERR: RS16 data:', resdata.RS16);
					console.log('ERR: RS17 data:', resdata.RS17);
					alert("현금영수증 승인취소 실패.\nerrorCode : " + resdata.RS04 + "\n" + "내용 : " + resdata.RS16);
				}
				alert("현금영수증 취소 승인 실패.");
				calc_ing = false;
				calc_ing_count = 0;
			}

		}, function(err) {
			console.log(err);
			currentCashData = "";
			calc_ing_count = 0;
		});
		return;
	}
}


function sale_calc(sale, items, flag) {

	if (!PAYMODULE)	{
		//sale.SALETAG = "P";
	}

	var saleStr = JSON.stringify(sale);
	var itemsStr = JSON.stringify(items);

	var promise = $.ajax({
		url: "./sale_calc.asp", //modified by jsys 20190227 파일명 변경
		type: "POST",
		data: {
			"sale"		: escape(saleStr),
			"items"		: escape(itemsStr)
		},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		datatype: 'json',
		cache: true,
		async: false
	});
	promise.done(function(data) {
		//console.log(data);
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			alert(jObject.msg);
			calc_ing = false;
		} else if (jObject.error == "999") {
			alert("동일한 거래전표가 존재합니다.\n아울렛전산(ssiiss.com/sang)과 같은 POS번호를 사용 할 수 없습니다.\nPOS번호를 바꾸어 다시 접속해 주십시오.");
			calc_ing = false;
			calc(6);
			opener.show_prepare();
			//var wX = screen.availWidth;
			//var wY = screen.availHeight;
			//var top = (wY / 2) - 100;
			//var left = (wX / 2) - 250;
			//ssiissPre = window.open("/webpos/prepare_webpos.asp", "ssiiss_prepare", 'top=' + top + ', left=' + left + ', width=500, height=200, status=no, menubar=no, toolbar=no, fullscreen=no, resizable=no, direction=yes, channelmodel=yes, location=no');
		}else if (jObject.error == "0") {
			//alert(jObject.msg);
			sale.CHANGEMILE = jObject.CHANGEMILE;
			sale_ok();
			search_smp();
			//alert(jObject.msg);
			print_receipt(sale, items, jObject, flag);
			//search_day_sale();
		}
	});
	promise.fail(function(data) {
		alert("거래 정산 fail : " + data);
		calc_ing = false;
		calc_ing_count = 0;
	});
}

function sale_ok() {
	$("#dialog").dialog();
    setTimeout(alert_close, 1000); //1000 ms = 1 second
}
function alert_close() {
	$("#dialog").dialog("close");
	barcodeFocus();
}

function sale_cancel(sale, items, flag) {
	var saleStr = JSON.stringify(sale);
	var promise = $.ajax({
		url: "./receipt_cancel.asp",
		type: "POST",
		data: {
			"sale"		: escape(saleStr)
		},
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		datatype: 'json',
		cache: true,
		async: false
	});
	promise.done(function(data) {
		session_check(data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {
			alert(jObject.msg);
			calc_ing = false;
			calc_ing_count = 0;
		} else if (jObject.error == "999") {
			alert("동일한 거래전표가 존재합니다.\n아울렛전산(ssiiss.com/sang)과 같은 POS번호를 사용 할 수 없습니다.\nPOS번호를 바꾸어 다시 접속해 주십시오.");
			calc_ing = false;
			calc_ing_count = 0;
		} else if (jObject.error == "0") {
			//alert(jObject.msg);
			//clearItems(false);
			var items = $("#jsGrid10-2").jsGrid("option", "data");
			sale.CUSTOMERHP = jObject.CUSTOMERHP;
			sale.CHANGEMILE = jObject.CHANGEMILE;
			sale.TOTMILE	= jObject.TOTMILE;
			print_receipt(sale, items, jObject, true);
			//search_day_sale();
			alert(jObject.msg);
			//search_receipt();
		}
	});
	promise.fail(function(data) {
		alert("거래 정산 fail : " + data);
		calc_ing = false;
		calc_ing_count = 0;
	});
}
