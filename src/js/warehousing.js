

function pos_close() {

  try{
    opener.closed_refresh();
    window.close();
  }
  catch (e) {
    window.close();
  }

}

function return_from_cal1(){
 document.getElementById('return-from').focus();
}
function return_to_cal1(){
 document.getElementById('return-to').focus();
}
function return_date_cal(){
 document.getElementById('return_date').focus();
}
function confirm_from_cal1(){
 document.getElementById('confirm-from').focus();
}
function confirm_to_cal1(){
 document.getElementById('confirm-to').focus();
}
function select_from_cal1(){
 document.getElementById('select-from').focus();
}
function select_to_cal1(){
 document.getElementById('select-to').focus();
}

function s_confirm_from_cal1(){
 document.getElementById('s-confirm-from').focus();
}
function s_confirm_to_cal1(){
 document.getElementById('s-confirm-to').focus();
}
function pre_date(){ //-1일

	$('#datepicker1').val(pre_getDay());
}
function pre_getDay() {
	var date =    $( "#datepicker1" ).val();
	var date1 = date.substr(0,4)+date.substr(5,2)+date.substr(8,2);
	var year = String(date1).substr(0,4);
	var month = String(date1).substr(4,2);
	var day = String(date1).substr(6,2);
	var p_date = new Date(year,month-1,day);
	p_date.setDate(p_date.getDate() - 1);

	year = p_date.getFullYear();
    month = p_date.getMonth()+1 ;
    day = p_date.getDate();
	if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

	return String(year) + "-" + month + "-" + day;
}

function next_date(){//+1일

	$('#datepicker1').val(next_getDay());
}

function pre_date2($datePicker){ //-1일

	$datePicker.val(pre_getDay2($datePicker));
}

function next_date2($datePicker){//+1일

	$datePicker.val(next_getDay2($datePicker));
}

function pre_getDay2($datePicker) {
	var date =    $datePicker.val();
	var date1 = date.substr(0,4)+date.substr(5,2)+date.substr(8,2);
	var year = String(date1).substr(0,4);
	var month = String(date1).substr(4,2);
	var day = String(date1).substr(6,2);
	var p_date = new Date(year,month-1,day);
	p_date.setDate(p_date.getDate() - 1);

	year = p_date.getFullYear();
    month = p_date.getMonth()+1 ;
    day = p_date.getDate();
	if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

	return String(year) + "-" + month + "-" + day;
}

function next_getDay2($datePicker) {
	var date =    $datePicker.val();
	var date1 = date.substr(0,4)+date.substr(5,2)+date.substr(8,2);
	var year = String(date1).substr(0,4);
	var month = String(date1).substr(4,2);
	var day = String(date1).substr(6,2);
	var p_date = new Date(year,month-1,day);
	p_date.setDate(p_date.getDate() + 1);

	year = p_date.getFullYear();
    month = p_date.getMonth()+1 ;
    day = p_date.getDate();
	if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

	return String(year) + "-" + month + "-" + day;
}

function next_getDay() {
	var date =    $( "#datepicker1" ).val();
	var date1 = date.substr(0,4)+date.substr(5,2)+date.substr(8,2);
	var year = String(date1).substr(0,4);
	var month = String(date1).substr(4,2);
	var day = String(date1).substr(6,2);
	var p_date = new Date(year,month-1,day);
	p_date.setDate(p_date.getDate() + 1);

	year = p_date.getFullYear();
    month = p_date.getMonth()+1 ;
    day = p_date.getDate();
	if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

	return String(year) + "-" + month + "-" + day;
}

/* 달력*/


function reset_d(){
	$('#box_barcode').val('');
}
function reset_e(){
	$('#prd_barcode').val('');
}
//반품등록open
var return_gb = "" ; //반품구분확인
function return_open(chk) {
	var $el = $("#return");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg-return');	//dimmed 레이어를 감지하기 위한 boolean 변수
	if (chk == 1)
	{
		$('#lbl_rText').text("성남반품 등록");
	}else{
		$('#lbl_rText').text("이천반품 등록");
	}
	return_gb = chk;
	//chk에 따라서 성남인지 이천인지 창고 분류
	if (chk == 1)//성남반품
	{
			//whcd
		$.ajax({
				url: "./select_box_option.asp",
				type: "POST",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				datatype: 'json',
				data: {
					"selectoption"		: "s_whcd"
				},
				success:function(data) {

								var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
								if (jObject.error == "1")
								{
									alert(jObject.msg);
								} else if (jObject.error == "0")
								{
									var dataArray = jObject.data;
									if (dataArray.length == 0)
									{
											$("#whcdselect").append("<option value=''>선택</option>");
									}else
									{
										for (var i =0 ;i< dataArray.length ; i++ )
										{
											$("#whcdselect").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
										}
									}

								}
					}
		});
	}
	else if (chk == 2)//이천반품
	{
			//whcd
			$.ajax({
					url: "./select_box_option.asp",
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					datatype: 'json',
					data: {
						"selectoption"		: "i_whcd"
					},
					success:function(data) {

									var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
									if (jObject.error == "1")
									{
										alert(jObject.msg);
									} else if (jObject.error == "0")
									{
										var dataArray = jObject.data;
										if (dataArray.length == 0)
										{
												$("#whcdselect").append("<option value=''>선택</option>");
										}else
										{
											for (var i =0 ;i< dataArray.length ; i++ )
											{
												$("#whcdselect").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
											}
										}

									}
						}
			});
	}



	 $('.dim-return').fadeIn() ;
	 //$("#stock").load("./stock.asp");
	//	searching_close();
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

function return_close(chk_gb) {

	$('.dim-return').fadeOut() ; // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	$("#whcdselect").find("option").remove();
	clear_page();
	return_search(chk_gb);
	//setTimeout(stock_close_data, 1000);
}
// 재고반품수정open

var total_count = 0 ; //검색된 결과 카운트
function modify_return(ordt,row){
	var ordt = ordt ;
	var i =row;
	// var rows = $('#table_area').find('tbody')[0].rows;
	// var tag = rows.item(i).cells.item(5).innerHTML;
	var tag = document.getElementById('area_tag'+i).value;
	var orno = document.getElementById('area_orno'+i).value;
	var boxno = document.getElementById('area_boxno'+i).value;
	console.log(tag+":"+orno+":"+ordt);
	var $el = $("#returnmodify");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg-returnmodify');	//dimmed 레이어를 감지하기 위한 boolean 변수

	 $('.dim-returnmodify').fadeIn() ;
	 //$("#layer100").load("./sokbo_pop.asp");
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
	if (tag != "N" )
	{

		$('#btn-spcchk-save').attr('disabled', true);
		$('#btn-return-del').attr('disabled',true);
	}
	else
	{
		$('#btn-spcchk-save').attr('disabled', false);
		$('#btn-return-del').attr('disabled',false);
	}

	searching_open();
	 var promise = $.ajax({
        url: "./return_modify_search.asp",
        type: "POST",
        data: {
				"day1"		: ordt,
				"orno"		: orno
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        datatype: 'json',
        cache: false
    });
    promise.done(function(data) {
        //alert("done : " + data);
        try {
            var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
            if (jObject.error === "1") {
               alert(jObject.msg);
			   searching_close();
            } else if (jObject.error === "0") {

                console.log("조회 성공");
                var t_data = "";
                for(var i = 0; i < jObject.data.length; i++) {

				var OUTAMT = parseInt(jObject.data[i].REQQTY  * jObject.data[i].OUTPRI );

                    t_data += "<tr><td align='center'bgcolor='white'><input id ='modi_seq"+i+"'  type='hidden' value='"+ jObject.data[i].SEQ + "'>"+ jObject.data[i].SEQ + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].WHNM + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].REFSNM + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].STYCD + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].COLCD + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].SIZECD + "</td>"
							+ "<td align='center'bgcolor='white'><input id ='modi_reqqty"+i+"' class ='input-box' type='text' value='"+ jObject.data[i].REQQTY + "'></td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].CFQTY + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].OUTPRI + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].SUPPRI + "</td>"
							+ "<td align='center'bgcolor='white'>" + OUTAMT + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].OUTYN + "</td>"
							+ "<td align='center'bgcolor='white'><input id ='modi_orno"+i+"'  type='hidden' value='"+ jObject.data[i].ORNO + "'>" + jObject.data[i].OUTDT + "</td>"
							+ "</tr>";
                }
                $('#tb_returnmodify').find('tbody').append(t_data);
				document.getElementById('modi_ordt').value = ordt;
				document.getElementById('modi_orno').value = orno;
				document.getElementById('modi_boxno').value = boxno;
				total_count  = jObject.data.length + 1;
				searching_close();
            }

        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();
        }
    });
    promise.fail(function(data) {
        alert("search_area fail1 : " + data);
		console.log(data);
		searching_close();

    });



}


function returnmodify_save() {
	var dataList = new Array();
	var ordt = $('#modi_ordt').val();

		for (var j = 0 ;j < total_count-1; j++)
			{
				var data = new Object();
				data.SEQ  = document.getElementById('modi_seq'+j).value;
				data.QTY = parseInt(document.getElementById('modi_reqqty'+j).value);
				data.ORNO =document.getElementById('modi_orno'+j).value;

				dataList.push(data);
		}

	var itemsStr = JSON.stringify(dataList);

	console.log(itemsStr);
	var promise = $.ajax({
			url: "./return_modify_save.asp",
			type: "POST",
			data: {
				"ordt" : ordt,
				"items"   : itemsStr
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
		});
		promise.done(function(data) {
			//alert("done : " + data);

			var jObject = JSON.parse(data);
			if (jObject.error == "1")
			{
				alert(jObject.msg);
				console.log(jObject);
			} else if (jObject.error == "0")
			{
				alert(jObject.msg);
				console.log(jObject);
				return_search();

			}
		});
		promise.fail(function(data) {
			alert("return_modify_save fail : " + data);
		});
}

function returnmodify_close() {

	$('.dim-returnmodify').fadeOut() ; // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		total_count = 0 ;
		$('#tb_returnmodify > tbody').empty();
	return_search();


}
function onKeyUp_Boxchk() {
	str = 	$('#input_boxno').val();
	check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

	if ($('#input_boxno').val().length == 10 && event.keyCode != 13)	{


			if((check.test(str))){
				alert("영문으로 입력해주세요");
				return;
			}
			boxchk_search($('#input_boxno').val());
	}
}



function boxchk_search(boxno) {
	var promise = $.ajax({
			url:  "./boxno_chk.asp",
			type: "POST",
			data: {
				"barcd" : boxno
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: false
		});
		promise.done(function(data) {
			//alert("done : " + data);
			session_check(data);
			var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
			if (jObject.error == "1") {
				console.log(jObject.msg);

			} else if (jObject.error == "0") {

				for(var i = 0; i < jObject.data.length; i++) {

				var box_chk = jObject.data[i].CNT;


                }
				if (box_chk == 0)
				{
					// 텍스트 박스 readonly 처리
					$("#input_boxno").attr("readonly",true);
					return;
				}else
				{
					alert("이미 등록되어있는 박스입니다.");
					$('#input_boxno').val('');

				}

			}
		});
		promise.fail(function(data) {
			alert("code_search fail : " + data);
		});
}

function reset_box() {
		// 텍스트 박스 readonly 처리
		$("#input_boxno").attr("readonly",false);
		$("#input_boxno").val('');
}
function onKeyUp_Barcode() {
	str = 	$('#input_barcode').val();
	check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

	if ($('#input_barcode').val().length == 12 && event.keyCode != 13)	{


			if((check.test(str))){
				alert("상품을 찾을 수 없습니다. 영문으로 입력해주세요");
				return;
			}
			code_search($('#input_barcode').val());
	}
}

function barcodeFocus() {
	$('#input_barcode').focus();

}


function code_search(barcode){
	var a_store = $('whcdselect').val();
		var Url
		var winl = (screen.width - 560) / 2;
		var wint = (screen.height - 210) / 2;
		var barcd  = barcode.toUpperCase();
		var chk = 1;

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
		$('#input_barcode').val("");
		$('#input_barcode').focus();

		if (return_gb == 1)//성남반품이라면
		{
			url_code = "./code_search1.asp";
		}else if (return_gb ==2)//이천반품이라면
		{
			url_code = "./code_search2.asp";
		}
		var promise = $.ajax({
			url: url_code,
			type: "POST",
			data: {
				"barcd" : barcd,
				"day1"	: salday,
				"a_store": a_store
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
				code_insert(jObject.spc_chk, jObject.style, jObject.colcd, jObject.sizecd,
					jObject.cnt, jObject.jaego, jObject.dc, jObject.mg,
					jObject.silpak, jObject.sacod,jObject.price,jObject.supri )

			}
		});
		promise.fail(function(data) {
			alert("code_search fail : " + data);
		});
		$('#input_barcode').val("");


}
var rowcnt =0 ;//전체 row
function code_insert(spc_chk, style, colcd, sizecd, cnt, jaego, dc, mg, silpak, sacod , price ,supri ) {


    // append
    //$("#sale_tbl").append($.newTr);
	$('#input_barcode').val("");
	var spcchk = (spc_chk == "Y") ? "Y" : "N";


	var client = {
		NO : rowcnt + 1 ,
		SPCCHK: spcchk,
		STYCD: style,
		COLCD: colcd,
		SIZECD: sizecd,
		QTY: 1 ,
		JAEGO : jaego , //20190812 현재고부분 추가
		PRICE : price ,
		SUPRI : supri ,
		SALETP : sacod ,
		DC	   : dc ,
		MG	   : mg

	};

	if (client.SPCCHK == "N")
	{
		var spcchk = "정상";

	}else
	{
		var spcchk ="아울";
	}
		if (rowcnt == 0 )
		{
				var t_data = "";

				t_data += "<tr><td align='center'><input type='text' id='silseq"+rowcnt+"' size='5' class='boxno' value='"+ client.NO +"' readonly style='text-align: center'></td>"
				+ "<td align='center'><input type='hidden' id='h_spcchk"+rowcnt+"' value='"+client.SPCCHK+"'><input type='text' id='spcchk"+rowcnt+"' size ='5'  value='"+ spcchk + "' class='boxno'  readonly style='text-align: center'></td>"
				+ "<td align='center'><input type='text' id='stylecd"+rowcnt+"' size='13' maxlength='9' class='boxno' value='"+ client.STYCD +"' readonly style='text-align: center'></td>"
				+ "<td align='center'><input type='text' id='colcd"+rowcnt+"' size='10' maxlength='9' class='boxno' value='"+ client.COLCD +"' readonly style='text-align: center'></td>"
				+ "<td align='center'><input type='text' id='sizecd"+rowcnt+"' size='10' maxlength='9' class='boxno' value='"+ client.SIZECD + "' readonly style='text-align: center'></td>"
				+ "<td align='center'><input type='text' id='jaego"+rowcnt+"' size='10' maxlength='9' class='boxno' value='"+ client.JAEGO + "' readonly style='text-align: center'></td>"
				+ "<td align='center'><input type='text' id='rqty"+rowcnt+"' size='7' maxlength='3' class='box' value='" + client.QTY + "' style='text-align: right' onkeyup='javascript:sum_tqty();'></td>"
				+ "<td align='center'><input type='text' id='price"+rowcnt+"' size='7' maxlength='3' class='boxno' value='" + client.PRICE + "' readonly style='text-align: right' onkeyup='javascript:sum_tqty();'></td>"
				+ "<td align='center'><input type='text' id='amt"+rowcnt+"' size='7' maxlength='3' class='boxno' value='" + client.PRICE + "'  readonly style='text-align: right' onkeyup='javascript:sum_tqty();'></td>"
				+ "<td align='center'><a href='javascript:js_tempdelete("+rowcnt+");'><img src='./images/icon_delete.gif' width='50' height='19' border='0'></a></td>"
				+ "<td><input type='hidden' id='supri"+rowcnt+"' value='"+client.SUPRI+"'><input type='hidden' id='saletp"+rowcnt+"' value='"+client.SALETP+"'>"
				+ "<input type='hidden' id='dc"+rowcnt+"' value='"+client.DC+"'><input type='hidden' id='mg"+rowcnt+"' value='"+client.MG+"'></tr>";

                $('#tb_returnlist > tbody').append(t_data);
				rowcnt += 1;
		}
		else
		{
			var u = 0;
			var j = 0;
			for (var i = 0; i <= rowcnt-1 ; i++)
			{
				if ( document.getElementById('stylecd'+i).value == "" ) break;
				u = eval(u) + 1;
				j = i ;
			}

				if (document.getElementById('stylecd'+j).value == client.STYCD && document.getElementById('colcd'+j).value == client.COLCD && document.getElementById('sizecd'+j).value == client.SIZECD )
				{

					document.getElementById('rqty'+j).value = parseInt(document.getElementById('rqty'+j).value) + parseInt(client.QTY) ;
				}
				else
				{
					var t_data = "";

					t_data += "<tr><td align='center'><input type='text' id='silseq"+rowcnt+"' size='5' class='boxno' value='"+ client.NO +"' readonly style='text-align: center'></td>"
					+ "<td align='center'><input type='hidden' id='h_spcchk"+rowcnt+"' value='"+client.SPCCHK+"'><input type='text' id='spcchk"+rowcnt+"' size ='5' value='"+ spcchk + "' class='boxno' readonly style='text-align: center' ></td>"
					+ "<td align='center'><input type='text' id='stylecd"+rowcnt+"' size='13' maxlength='9' class='boxno' value='"+ client.STYCD +"' readonly style='text-align: center'></td>"
					+ "<td align='center'><input type='text' id='colcd"+rowcnt+"' size='10' maxlength='9' class='boxno' value='"+ client.COLCD +"' readonly style='text-align: center'></td>"
					+ "<td align='center'><input type='text' id='sizecd"+rowcnt+"' size='10' maxlength='9' class='boxno' value='"+ client.SIZECD + "' readonly style='text-align: center'></td>"
					+ "<td align='center'><input type='text' id='jaego"+rowcnt+"' size='10' maxlength='9' class='boxno' value='"+ client.JAEGO + "' readonly style='text-align: center'></td>"
					+ "<td align='center'><input type='text' id='rqty"+rowcnt+"' size='7' maxlength='3' class='box' value='" + client.QTY + "' style='text-align: right'onkeyup='javascript:sum_tqty();' ></td>"
					+ "<td align='center'><input type='text' id='price"+rowcnt+"' size='7' maxlength='3' class='boxno' value='" + client.PRICE + "' readonly style='text-align: right' onkeyup='javascript:sum_tqty();'></td>"
					+ "<td align='center'><input type='text' id='amt"+rowcnt+"' size='7' maxlength='3' class='boxno' value='" + client.PRICE + "'  readonly style='text-align: right' onkeyup='javascript:sum_tqty();'></td>"
					+ "<td align='center'><a href='javascript:js_tempdelete("+rowcnt+");'><img src='./images/icon_delete.gif' width='50' height='19' border='0'></a></td>"
					+ "<td><input type='hidden' id='supri"+rowcnt+"' value='"+client.SUPRI+"'><input type='hidden' id='saletp"+rowcnt+"' value='"+client.SALETP+"'>"
					+ "<input type='hidden' id='dc"+rowcnt+"' value='"+client.DC+"'><input type='hidden' id='mg"+rowcnt+"' value='"+client.MG+"'></tr>";

					$('#tb_returnlist > tbody').append(t_data);
					rowcnt += 1;
				}

		}
		$('#div1').scrollTop($('#div1')[0].scrollHeight);
		sum_tqty();
		barcodeFocus();
}

function sum_tqty(){
	var hap = 0
	var sum_amt =0
	for (var z = 0;z<rowcnt ;z++ )
	{

			hap = hap + parseInt(document.getElementById('rqty'+z).value,10);
			sum_amt = parseInt(document.getElementById('rqty'+z).value,10)*parseInt(document.getElementById('price'+z).value,10)
			document.getElementById('amt'+z).value = sum_amt;
	}

	document.getElementById('total_rqty').value = hap;

}

function return_save() {
	var dataList = new Array();
	if (rowcnt == 0 )
	{
			alert("저장 할 데이터가 없습니다!");
			return barcodeFocus();
	}


	var return_date = $('#return_date').val();
	var return_remark = $('#return_remark').val();
	var a_store = $('#whcdselect').val();//창고코드
	var boxno = $('#input_boxno').val();//박스번호
	if (boxno == "")
	{
			alert("박스번호를 입력해주세요!!");
			return;
	}
	var u = 0 ;
	for (var i = 0; i < rowcnt ; i++)
		{
			if ( document.getElementById('stylecd'+i).value == "" ) break;
			u = eval(u) + 1;
		}
		for (var j = 0 ;j < u; j++)
			{
				var data = new Object();
				data.SPCCHK = document.getElementById('h_spcchk'+j).value;
				data.SEQ  = document.getElementById('silseq'+j).value;
				data.STYCD = document.getElementById('stylecd'+j).value;
				data.COLCD = document.getElementById('colcd'+j).value;
				data.SIZECD = document.getElementById('sizecd'+j).value;
				data.QTY = parseInt(document.getElementById('rqty'+j).value);
				data.PRICE = parseInt(document.getElementById('price'+j).value);
				data.SUPRI = parseInt(document.getElementById('supri'+j).value);
				data.SALETP = parseInt(document.getElementById('saletp'+j).value);
				data.DC = parseInt(document.getElementById('dc'+j).value);
				data.MG = parseInt(document.getElementById('mg'+j).value);

				dataList.push(data);
		}

	var itemsStr = JSON.stringify(dataList);

	console.log(itemsStr+":"+return_date+":"+a_store+":"+boxno);
	if (return_gb == 1)//성남반품이라면
	{
			url_code = "./return_save1.asp";
	}else if (return_gb ==2)//이천반품이라면
	{
		url_code = "./return_save2.asp";
	}



	$('#btn-return-save').attr('disabled', true);//저장시 저장버튼 비활성화
	save_open();
	var promise = $.ajax({
			url: url_code,
			type: "POST",
			data: {
				"return_date" : return_date,
				//"return_remark" : escape(return_remark) ,
				"a_store"	: a_store ,
				"boxno"		: boxno ,
				"items"   : itemsStr
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
		});
		promise.done(function(data) {
			//alert("done : " + data);

			var jObject = JSON.parse(data);
			if (jObject.error == "1")
			{	save_close();
				alert(jObject.msg);
				console.log(jObject);

			} else if (jObject.error == "0")
			{	save_close();
				alert(jObject.msg);
				console.log(jObject);
				clear_page();  //등록페이지 초기화
				$('#btn-return-save').attr('disabled', false);
			}
		});
		promise.fail(function(data) {
			alert("return_save fail : " + data);
			console.log(data);
		});
}

function clear_page(){
		//alert(rowcnt);
		/*for (var i = 0; i < rowcnt ; i++)
		{

			document.getElementById('silseq'+i).value = ""	;
			document.getElementById('spcchk'+i).value = ""	;
			document.getElementById('stylecd'+i).value =""	;
			document.getElementById('colcd'+i).value = ""	;
			document.getElementById('sizecd'+i).value =""	;
			document.getElementById('rqty'+i).value = ""	;
			document.getElementById('jaego'+i).value = ""	;

		}	 */
		rowcnt = 0 ;
		document.getElementById('return_remark').value ="";
		document.getElementById('total_rqty').value    ="";
		document.getElementById('total_rqty').value    ="";
		$('#input_boxno').val('');
		$('#tb_returnlist > tbody').empty();
	barcodeFocus();

}
//반품목록삭제
function js_tempdelete(as_row){
	var as_row = as_row;
	var dataList = new Array();
	var u = 0 ;
	//alert(as_row);
		if (document.getElementById('stylecd'+as_row).value == ""){
			alert('삭제할 자료가 존재하지 않습니다.');
			return;
		}
		for (var i = 0; i < rowcnt ; i++)
		{
			if ( document.getElementById('stylecd'+i).value == "" ) break;
			var u = eval(u) + 1;
		}

		if (confirm("삭제 하시겠습니까?")){
			document.getElementById('silseq'+as_row).value = ""	;
			document.getElementById('spcchk'+as_row).value = ""	;
			document.getElementById('stylecd'+as_row).value =""	;
			document.getElementById('colcd'+as_row).value = ""	;
			document.getElementById('sizecd'+as_row).value =""	;
			document.getElementById('rqty'+as_row).value = ""	;
			document.getElementById('jaego'+as_row).value = ""	;
			document.getElementById('h_spcchk'+as_row).value= ""	;
			document.getElementById('price'+as_row).value= ""	;
			document.getElementById('supri'+as_row).value= ""	;
			document.getElementById('saletp'+as_row).value= ""	;
			document.getElementById('dc'+as_row).value= ""	;
			document.getElementById('mg'+as_row).value= ""	;
			var up_row = as_row+1;
			for (up_row;up_row < u; up_row++)
			{

				document.getElementById('silseq'+as_row).value = parseInt(document.getElementById('silseq'+up_row).value)-1;
				document.getElementById('spcchk'+as_row).value = document.getElementById('spcchk'+up_row).value;
				document.getElementById('stylecd'+as_row).value = document.getElementById('stylecd'+up_row).value;
				document.getElementById('colcd'+as_row).value = document.getElementById('colcd'+up_row).value;
				document.getElementById('sizecd'+as_row).value = document.getElementById('sizecd'+up_row).value;
				document.getElementById('rqty'+as_row).value = parseInt(document.getElementById('rqty'+up_row).value);
				document.getElementById('jaego'+as_row).value = document.getElementById('jaego'+up_row).value ;
				document.getElementById('h_spcchk'+as_row).value = document.getElementById('h_spcchk'+up_row).value;
				document.getElementById('price'+as_row).value = document.getElementById('price'+up_row).value;
				document.getElementById('supri'+as_row).value = document.getElementById('supri'+up_row).value;
				document.getElementById('saletp'+as_row).value = document.getElementById('saletp'+up_row).value ;
				document.getElementById('dc'+as_row).value = document.getElementById('dc'+up_row).value;
				document.getElementById('mg'+as_row).value = document.getElementById('mg'+up_row).value;
				as_row = as_row+1;
				/*var data = new Object();
				data.SPCCHK = document.getElementById('spcchk'+up_row).value;
				data.SEQ  = document.getElementById('silseq'+up_row).value;
				data.STYCD = document.getElementById('stylecd'+up_row).value;
				data.COLCD = document.getElementById('colcd'+up_row).value;
				data.SIZECD = document.getElementById('sizecd'+up_row).value;
				data.QTY = parseInt(document.getElementById('jaegoqty'+up_row).value);
				data.JAEGO = document.getElementById('jaego'+up_row).value ;
				dataList.push(data);*/
			}
			u = u-1;
			document.getElementById('silseq'+u).value = ""	;
			document.getElementById('spcchk'+u).value = ""	;
			document.getElementById('stylecd'+u).value =""	;
			document.getElementById('colcd'+u).value = ""	;
			document.getElementById('sizecd'+u).value =""	;
			document.getElementById('rqty'+u).value = ""	;
			document.getElementById('jaego'+u).value = ""	;
			document.getElementById('h_spcchk'+u).value = "";
			document.getElementById('price'+u).value = "";
			document.getElementById('supri'+u).value = "";
			document.getElementById('saletp'+u).value = "";
			document.getElementById('dc'+u).value = "";
			document.getElementById('mg'+u).value = "";
			//var itemsStr = JSON.stringify(dataList);
			//console.log(dataList);
			$('#tb_returnlist > tbody:last > tr:last').remove();
			rowcnt = rowcnt-1;
		}
		sum_tqty();
	}

/*-----20190925 검색눌렀을때조회----------*/
function return_search() {
  $('#table_area').find('tbody').empty();		//테이블초기화
	$('#total_area1').find('tbody').empty();//테이블초기화
	$('#table_area1 tbody').empty();
	var iArray;
	var date_from = $('#return-from').val();
  // var date_from1 = date_from.replace(/\-/g,'');
	var date_to = $('#return-to').val();
  var radio = $(":input:radio[name=radio]:checked").val();
  // var date_to1 = date_to.replace(/\-/g,'');
	// var gubun  = "2"
	var w_vdcd = $('#return_tag').val();
	var box_barcode = $('#box_barcode').val();
  var prd_barcode = $('#prd_barcode').val();
  var gubun = $('#gubun').val();
  				var promise = $.ajax({
				url: "./wh_search.asp",
				type: "POST",
				data: {
						"day1"		: date_from,
						"day2"	: date_to,
						"w_vdcd" : w_vdcd,
            "radio" : radio,
            "box_barcode" : box_barcode,
            "prd_barcode" : prd_barcode,
            "gubun" : gubun,
				},
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				datatype: 'json',
				cache: false
			});
			searching_open();
			promise.done(function(data) {
        try {
					var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
					if (jObject.error === "1") {
            searching_close();
					   alert(jObject.msg);
             console.log(jObject.sql);
					} else if (jObject.error === "0") {

            $('#table_area_top').find('tbody').empty();
            						var top_data ="";
            						top_data += "<tr  bgcolor='#1BA892'><td width='20' align='center' height='26'>NO</td>"
                                    + "<td width='50' align='center' >구분</td>"
            												+ "<td width='80' align='center' >입고일자</td>"
            												+ "<td width='100' align='center' >전표번호</td>"
            												+ "<td width='100' align='center' >박스번호</td>"
            												+ "<td width='80' align='center' >수량</td>"
            												+ "</tr>";

            						$('#table_area_top').find('tbody').append(top_data);


                        // console.log(data);
                        var t_data = "";
                        var t_data1 = "";
                        var j = 0 ;
            						var result ;
            						var p_ordt = "" ;
                        for(var i = 0; i < jObject.data.length; i++) {
                          var ordt = jObject.data[i].OUTDT;
                          if (p_ordt != ordt)
            							{
            								j = j+1;
            							}
                          result = j % 2 ;
            							if (  result == 0 )
            							{
            									bgcolor="#dcdcdc";
            							}
            							else
            							{
            								bgcolor ="#FFFFFF";
            							}
            							p_ordt = ordt;


                        t_data += "<tr bgcolor='"+bgcolor+"'><td width='20' align='center' height='26'>"+ jObject.data[i].NUM + "</td>"
                        + "<td width='50' align='center'  value = '" + jObject.data[i].WHNM + "'>"+ jObject.data[i].WHNM + "</td>"
                        + "<td width='80' align='center'  value = '"+ jObject.data[i].OUTDT + "'>"+ jObject.data[i].OUTDT + "</td>"
                        + "<td width='100' align='center' value = '"+ jObject.data[i].OUTNO + "'>"+ jObject.data[i].OUTNO + "</td>"
                        + "<td width='100' align='center'  value = '"+ jObject.data[i].BOXNO + "'>"+ jObject.data[i].BOXNO + "</td>"
                        + "<td width='80' align='center'  value = '"+ jObject.data[i].OUTQTY + "' >"+ jObject.data[i].OUTQTY + "</td>"
                        + "</tr>";

                      }

                      t_data1 += "<tr><td align='center' width='30'></td>"
									+ "<td align='center' width='80'></td>"
									+ "<td align='center' width='80'></td>"
									+ "<td align='center' width='100'></td>"
									+ "<td align='center' width='120'></td>"
									+ "<td align='center' width='70'></td>"
									+ "<td align='center' style='font-Weight : bold;' width='70'>총계</td>"
									+ "<td align='center' width='60'></td>"
									+ "<td align='center' style='font-Weight : bold;' width='130' align  = 'center'>" + jObject.T_OUTQTY + "</td>"
									+ "</tr>";



                      $('#table_area').find('tbody').append(t_data);
                    	$('#total_area1').find('tbody').append(t_data1);
                      searching_close();
                      console.log("전표 조회 성공");
                      // console.log(jObject.sql1);
          }
        }catch (e) {
					console.log("error 1001 : " + e.toString());

					searching_close();
				}
			});
			promise.fail(function(data) {
				alert("search_area fail2 : " + data);
				console.log(data);
				searching_close();
        console.log("조회 실패2");

			});
}

function return_delete() {
    var sildt = "";
    var tag = "";

	productList = [];

    var rows = $('#table_area').find('tbody')[0].rows;
	//console.log(rows);  //전체 테이블 row
   for(var i = 0; i < rows.length; i++) {
        if ($('#' + i)[0].checked === true) {
            ordt = document.getElementById('area_ordt'+i).value ;
            tag = document.getElementById('area_tag'+i).value
            orno = document.getElementById('area_orno'+i).value
            boxno = document.getElementById('area_boxno'+i).value
            console.log("ordt : " + ordt + ", tag : " + tag+", orno : " +orno+" , boxno : " +boxno);//선택 된 행의 데이터
			var item = {
				ordt	: ordt,
				tag	: tag,
				boxno : boxno ,
				orno : orno
			};
			productList.push(item);
        }
    }

    if (productList.length == 0) {
        alert("삭제할 반품을 선택해주세요 .");
        return;
    } else if (productList.length > 0) {
			for (j=0;j < productList.length-1 ;j++ )
			{
				var p_tag = productList[0].tag ;
				if (p_tag == "Y")
				{
					alert("확정된 데이터는 삭제 할 수 없습니다!");
					return;
				}

			}
		if (confirm("선택 된 반품을 삭제 하시겠습니까?")){
			delete_return(productList);
		}
    }
}

function return_delete1() {
    var ordt = "";
    var orno = "";
	var boxno = "" ;
	productList = [];

	var checkbox = $("input[name=detail_check]:checked");

			 var rows = $('#table_area1').find('tbody')[0].rows;
			//console.log(rows);  //전체 테이블 row
		   for(var i = 0; i < rows.length; i++) {
				if ($('#d_check' + i)[0].checked === true) {

					modi_seq = document.getElementById('modi_seq'+i).value ;
					ordt = document.getElementById('modi_ordt').value ;
					orno = document.getElementById('modi_orno').value ;
					boxno = document.getElementById('modi_boxno').value;
					var item = {
						ordt	: ordt,
						boxno : boxno ,
						orno : orno ,
						modi_seq : modi_seq
					};
					productList.push(item);
				}
			}



			// 체크된 체크박스 값을 가져온다
		/*	checkbox.each(function(i) {
				modi_seq = document.getElementById('modi_seq'+i).value ;
				ordt = document.getElementById('modi_ordt').value ;
				orno = document.getElementById('modi_orno').value ;
				boxno = document.getElementById('modi_boxno').value;
				// console.log("ordt : " + ordt + ", tag : " + tag+", orno : " +orno+" , boxno : " +boxno);//선택 된 행의 데이터
					var item = {
						ordt	: ordt,
						boxno : boxno ,
						orno : orno ,
						modi_seq : modi_seq
					};
				productList.push(item);
			});
			//var itemsStr = JSON.stringify(productList);*/
			console.log(productList);






  if (productList.length == 0) {
        alert("삭제할 반품을 선택해주세요 .");
        return;
    } else if (productList.length > 0) {

		if (confirm("선택 된 반품을 삭제 하시겠습니까?")){
			delete_return(productList);
		}
    }
}

function delete_return(productList){
	var itemsStr = JSON.stringify(productList);

	console.log(itemsStr);
	var promise = $.ajax({
			url: "./return_delete.asp",
			type: "POST",
			data: {
				"items"   : itemsStr
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
		});
		promise.done(function(data) {
			//alert("done : " + data);

			var jObject = JSON.parse(data);
			if (jObject.error == "1")
			{
				alert(jObject.msg);
				console.log(jObject);
			} else if (jObject.error == "0")
			{
				alert(jObject.msg);
				console.log(jObject);
				return_search();

			}
		});
		promise.fail(function(data) {
			alert("return_delete fail : " + data);
		});
}


//브랜드
function sales3brcdchk() {
	$('#sales3_brcdchk')[0].checked = true;
	select_return_sum();
}
//년도
function sales3yearchk() {
	$('#sales3_yearchk')[0].checked = true;
	select_return_sum();
}
//시즌
function sales3seasonchk() {
	$('#sales3_seasonchk')[0].checked = true;
	select_return_sum();
}
//성별
function sales3sexchk() {
	$('#sales3_sexchk')[0].checked = true;
	select_return_sum();
}

//정상/아울렛구분
function sales3spcchk() {
	$('#sales3_spcchk')[0].checked = true;
	select_return_sum();
}
//형태
function sales3itypechk() {
	$('#sales3_itypechk')[0].checked = true;
	var select_itype = $("#sales3_itype").val();
	$("#sales3_item").find("option").remove();

	$.ajax({
		url: "./select_box_option.asp",
		type: "POST",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		datatype: 'json',
		data: {
			"selectoption"		: "item",
			"select_itype"		: select_itype
		},
		success:function(data) {
			var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
			if (jObject.error == "1") {
				alert(jObject.msg);
			} else if (jObject.error == "0") {
				var dataArray = jObject.data;
				if (dataArray.length == 0) {
						$("#sales3_item").append("<option value=''>선택</option>");
				} else {
					for (var i =0 ;i< dataArray.length ; i++ ) {
						$("#sales3_item").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
					}
				}
			}
		}
	});
	select_return_sum();
}

//아이템
function sales3itemchk() {
	$('#sales3_itemchk')[0].checked = true;
	select_return_sum();
}


/////선택 조회
ArrList = [];
function select_search() {
    var sildt = "";
    var tag = "";

	productList = [];

    var rows = $('#table_area').find('tbody')[0].rows;
	//console.log(rows);  //전체 테이블 row
   for(var i = 0; i < rows.length; i++) {
        if ($('#' + i)[0].checked === true) {
            ordt = document.getElementById('area_ordt'+i).value ;
			orno = document.getElementById('area_orno'+i).value;
            // tag = rows.item(i).cells.item(5).innerHTML;
            console.log("ordt : " + ordt + ", tag : " + tag+ ", orno : " + orno);//선택 된 행의 데이터
			var item = {
				ordt	: ordt,
				orno	: orno
			};
			productList.push(item);
			ArrList.push(item);
        }
    }


    if (productList.length == 0) {
        alert("조회 할 반품일자를 선택해주세요 .");
        return;
    } else if (productList.length > 0) {

			select_return_sum();

    }
}

function select_return_sum(){
	var itemsStr = JSON.stringify(ArrList);
	console.log(itemsStr);
	//------브랜드-------//
	if ($('#sales3_brcdchk')[0].checked == true){

		chk = "brand";
		var select_brcd = $("#sales3_brcd").val();
	}
	else
	{	var select_brcd = "";
		chk = "ALL";
	}
	//------년도--------//
	if ($('#sales3_yearchk')[0].checked == true){

		chk1 = "year";
		var select_year = $("#sales3_year").val();
	}
	else
	{	var select_year = "";
		chk1 = "ALL";
	}
	//------시즌--------//
	if ($('#sales3_seasonchk')[0].checked == true){

		chk2 = "season";
		var select_season = $("#sales3_season").val();
	}
	else
	{	var select_season = "";
		chk2 = "ALL";
	}
	//------성별--------//
	if ($('#sales3_sexchk')[0].checked == true){

		chk3 = "sex";
		var select_sex = $("#sales3_sex").val();
	}
	else
	{	var select_sex = "";
		chk3 = "ALL";
	}
	//------형태--------//
	if ($('#sales3_itypechk')[0].checked == true){

		chk4 = "itype";
		var select_itype = $("#sales3_itype").val();
	}
	else
	{	var select_itype = "";
		chk4 = "ALL";
	}
	//------아이템--------//
	if ($('#sales3_itemchk')[0].checked == true){

		chk5 = "item";
		var select_item = $("#sales3_item").val();
	}
	else
	{	var select_item = "";
		chk5 = "ALL";
	}
	//------정상,아울렛구분--------//
	/*if ($('#sales3_spcchk')[0].checked == true){

		chk6 = "spc_chk";
		var sales3_spcchk = $("#sales3_spc").val();
	}
	else
	{	var sales3_spcchk = "";
		chk6 = "ALL";
	}*/

	var barcode = $('#sel_barcode').val();
	var radiochk = $(":input:radio[name=select_radio]:checked").val();

	var $el = $("#returnsearch");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg-returnsearch');	//dimmed 레이어를 감지하기 위한 boolean 변수

	 $('.dim-returnsearch').fadeIn() ;
	 //$("#layer100").load("./sokbo_pop.asp");
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

	$('#tb_returnsearch').find('tbody').empty();
	searching_open();
	var promise = $.ajax({
			url: "./return_select_search_sum.asp",
			type: "POST",
			data: {
				"items"   : itemsStr,
				"select_brcd" : select_brcd,
				"select_year" : select_year,
				"select_season" : select_season,
				"select_sex" : select_sex,
				"select_itype" : select_itype,
				"select_item" : select_item,
				"chk"		  : chk,
				"chk1"		  : chk1,
				"chk2"		  : chk2,
				"chk3"		  : chk3,
				"chk4"		  : chk4,
				"chk5"		  : chk5,
				"barcode"	  : barcode,
				"radiochk"	  : radiochk
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
		});
		promise.done(function(data) {
		try {
            var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
            if (jObject.error === "1") {
               alert(jObject.msg);
			   console.log(jObject.sql);
			   searching_close();
            } else if (jObject.error === "0") {

                console.log("조회 성공");

                var t_data = "";
                for(var i = 0; i < jObject.data.length; i++) {

				var OUTAMT = parseInt(jObject.data[i].REQQTY  * jObject.data[i].OUTPRI );
				var tag  = jObject.data[i].OUTYN;
							if (tag=="N")
						{
								OUTYN ="미처리";
								CFQTY = 0 ;
								F_QTY = "-" ;

						}
						else
						{
								OUTYN="처리";
								CFQTY = jObject.data[i].CFQTY;
								REQQTY = jObject.data[i].REQQTY;
								F_QTY = parseInt(CFQTY - REQQTY) ;
								if (F_QTY > 0)
								{
									F_QTY = "+"+F_QTY
								}
						}

						if (F_QTY == 0 )
						{
							fontcolor = "black";
						}else
						{
							fontcolor = "red";
						}



                     t_data += "<tr>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].ORDT + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].OUTDT + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].WHNM + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].REFSNM + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].STYCD + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].COLCD + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].SIZECD + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].REQQTY + "</td>"
							+ "<td align='center'bgcolor='white'>" + CFQTY + "</td>"
							+ "<td align='center'bgcolor='white' style='color:"+fontcolor+"';'>" + F_QTY + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].OUTPRI + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].SUPPRI + "</td>"
							+ "<td align='center'bgcolor='white'>" + OUTAMT + "</td>"
							+ "<td align='center'bgcolor='white'>" + OUTYN + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].OUTDT + "</td>"
							+ "</tr>";
                }
                $('#tb_returnsearch').find('tbody').append(t_data);
				$('#total_reqqty').text(jObject.T_REQQTY);
				$('#total_cfqty').text(jObject.T_CFQTY);
				total_count  = jObject.data.length + 1;
				searching_close();
            }

        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();

        }
    });
		promise.fail(function(data) {
			alert("return_select fail : " + data);
			searching_close();
		});
}




function select_return(productList){
	var itemsStr = JSON.stringify(productList);
	console.log(itemsStr);
	var i = ArrList.length-1;
	$('#select-from').val(ArrList[0].ordt);
	$('#select-to').val(ArrList[i].ordt);

	var $el = $("#returnsearch");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg-returnsearch');	//dimmed 레이어를 감지하기 위한 boolean 변수

	 $('.dim-returnsearch').fadeIn() ;
	 //$("#layer100").load("./sokbo_pop.asp");
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

	searching_open();
	var promise = $.ajax({
			url: "./return_select_search.asp",
			type: "POST",
			data: {
				"items"   : itemsStr
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
		});
		promise.done(function(data) {
		try {
            var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
            if (jObject.error === "1") {
               alert(jObject.msg);
			   console.log(jObject.sql);
			   searching_close();
            } else if (jObject.error === "0") {

                console.log("조회 성공");

                var t_data = "";
                for(var i = 0; i < jObject.data.length; i++) {

				var OUTAMT = parseInt(jObject.data[i].REQQTY  * jObject.data[i].OUTPRI );
				var tag  = jObject.data[i].OUTYN;
							if (tag=="N")
						{
								OUTYN ="미처리";
								CFQTY = 0 ;
								F_QTY = "-" ;

						}
						else
						{
								OUTYN="처리";
								CFQTY = jObject.data[i].CFQTY;
								REQQTY = jObject.data[i].REQQTY;
								F_QTY = parseInt(CFQTY - REQQTY) ;
								if (F_QTY > 0)
								{
									F_QTY = "+"+F_QTY
								}
						}

						if (F_QTY == 0 )
						{
							fontcolor = "black";
						}else
						{
							fontcolor = "red";
						}



                     t_data += "<tr>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].ORDT + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].OUTDT + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].WHNM + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].REFSNM + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].STYCD + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].COLCD + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].SIZECD + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].REQQTY + "</td>"
							+ "<td align='center'bgcolor='white'>" + CFQTY + "</td>"
							+ "<td align='center'bgcolor='white' style='color:"+fontcolor+"';'>" + F_QTY + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].OUTPRI + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].SUPPRI + "</td>"
							+ "<td align='center'bgcolor='white'>" + OUTAMT + "</td>"
							+ "<td align='center'bgcolor='white'>" + OUTYN + "</td>"
							+ "<td align='center'bgcolor='white'>" + jObject.data[i].OUTDT + "</td>"
							+ "</tr>";
                }
                $('#tb_returnsearch').find('tbody').append(t_data);
				total_count  = jObject.data.length + 1;
				searching_close();
            }

        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();

        }
    });
		promise.fail(function(data) {
			alert("return_select fail : " + data);
			searching_close();
		});
}




function returnsearch_close() {
	ArrList = []; //배열초기화
	$('.dim-returnsearch').fadeOut() ; // 닫기 버튼을 클릭하면 레이어가 닫힌다.
		total_count = 0 ;
		$('#tb_returnsearch > tbody').empty();
		return_search();

}




$("#table_area tbody").on("click", "tr td:not(':first-child')", function(e) {//행 클릭시 하단에 반품내역조회
var w_vdcd = $('#return_tag').val();
	var gubun  = $('#gubun').val();
		//체크박스가 선택되어 있다면 체크해제
		var chk =  $('input[name="radiogroup"]:checked').length;
		if (chk > 0)
		{

           $('input[name*="radiogroup"]').prop('checked', false);
		}//체크박스가 선택되어 있다면 체크해제
			var str = ""
            var tdArr = new Array();    // 배열 선언
            productList = [];
            // 현재 클릭된 Row(<tr>)
            var tr = $(this).parent();
            var td = tr.children();

			// tr.text()는 클릭된 Row 즉 tr에 있는 모든 값을 가져온다.
			//console.log("클릭한 Row의 모든 데이터 : "+tr.text());


			//행 클릭시 색상 변경
				var selected = tr.hasClass("col_selected");
				$("#table_area tr").removeClass("col_selected");
				if(!selected){
						tr.addClass("col_selected");
					}
					else{

						$("#table_area tr").removeClass("col_selected");

					return;
					}
				//행 클릭시 색상 변경 end  20190925 하단디테일조회
			if (document.getElementById('jun_radio').checked)//전표 조회면
			{
        var outdt = td.eq(2).text();
				var outno = td.eq(3).text();
			}else if (document.getElementById('box_radio').checked) // 박스 조회면
			{
        var outdt = td.eq(2).text();
				var outno = td.eq(3).text();
			}

			//console.log("sildt : "+ordt+" junpno : "+orno+"gubun:"+gubun);
			var item = {
					outno	: outno,
          outdt : outdt,
          w_vdcd : w_vdcd

			};
				productList.push(item);
	$('#modi_label').text("입고일자");
	document.getElementById('modi_outdt').value =  outdt;
	document.getElementById('modi_outno').value =  outno;
	$('#btn-return-box').attr('disabled',false);

	$('#table_area1 tbody').empty();
	detail_search(productList);



			// 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
			/*td.each(function(i){
				tdArr.push(td.eq(i).text());
			});*/
			/*var checkbox = $("input[name=radiogroup]:checked");
			if(checkbox.length > 0 ){
				//체크박스 선택시 조회 안됨
				return;
			}*/
			//console.log("배열에 담긴 값 : "+tdArr);

			// td.eq(index)를 통해 값을 가져올 수도 있다.








});

//전체체크박스 선택
//$('input[name="tpiSeqs"]').click(function(){ //동적 생성된 HTML에서는 작동 안됨
$(document).on('click', 'input[name="allchk"]', function(){ //동적 생성된 HTML에서도 작동됨
    //var totLength = $(this).length; //이건 항상 1이 나왔음
   /* var totLength = $('input[name="tpiSeqs"]').length; //이건 예상했던 개수가 나옴
    var chkLength = $('input[name="tpiSeqs"]:checked').length;

    if (totLength > 0 && totLength == chkLength) {
        console.log("on:");
        $('#table-03 thead input:checkbox').prop("checked",true);
    } else {
        console.log("off");
        $('#table-03 thead input:checkbox').prop("checked",false);
    }*/

	var chk = $(this).is(":checked");
             productList = [];
                    if(chk){
						//체크박스 선택시 버튼 비활성
						$('#btn-spcchk-save').attr('disabled', true);
						$('#btn-return-del').attr('disabled', true);
						$('#btn-return-box').attr('disabled',true);
						//alert("체크박스");
                      $('input[name*="radiogroup"]').prop('checked', true);
					   var rows = $('#table_area').find('tbody')[0].rows;
									//console.log(rows);  //전체 테이블 row
								   for(var i = 0; i < rows.length; i++) {
										if ($('#' + i)[0].checked === true) {
											ordt = document.getElementById('area_ordt'+i).value ;
											orno = document.getElementById('area_orno'+i).value;
											tag = document.getElementById('area_tag'+i).value;
											// tag = rows.item(i).cells.item(5).innerHTML;
											console.log("ordt : " + ordt + "tag:"+tag+", orno : " + orno);//선택 된 행의 데이터
													var item = {
														ordt	: ordt,
														orno	: orno
														};
											productList.push(item);
										}
									}
										var itemsStr = JSON.stringify(productList);
										console.log(itemsStr);
										detail_search(productList);


                    }else{
						//alert("체크해제");
                       $('input[name*="radiogroup"]').prop('checked', false);
					   $('#table_area1 tbody').empty();
                    }

});

//동적으로 행에 생성된 체크박스 클릭 시
$(document).on('click', 'input[name="radiogroup"]', function(){ //동적 생성된 HTML에서도 작동됨


	var gubun  = $('#gubun').val();
	var chk = $(this).is(":checked");
	var cnt = $("input[name=radiogroup]:checkbox:checked").length;
	productList = [];
	var tr = $(this).parent().parent();
     var td = tr.children();
	//체크박스 클릭시 색상 변경
		var selected = tr.hasClass("col_selected");
		//$("#table_area tr").removeClass("col_selected");
		if (chk)
		{

		tr.addClass("col_selected");



		}
		else{

				tr.removeClass("col_selected");

			return;
		}//체크박스 클릭시 색상 변경 end




	if (cnt > 0)
	{
			//체크박스 선택시 버튼 비활성
			$('#btn-spcchk-save').attr('disabled', true);
			$('#btn-return-del').attr('disabled', true);
			$('#btn-return-box').attr('disabled',true);
			var checkbox = $("input[name=radiogroup]:checked");

			// 체크된 체크박스 값을 가져온다
			checkbox.each(function(i) {

				// checkbox.parent() : checkbox의 부모는 <td>이다.
				// checkbox.parent().parent() : <td>의 부모이므로 <tr>이다.
				var tr = checkbox.parent().parent().eq(i);
				var td = tr.children();

				// td.eq(0)은 체크박스 이므로  td.eq(1)의 값부터 가져온다.
			if (gubun == 2)//매장반품이면
			{
				var ordt = td.eq(1).text();
				var orno = td.eq(4).text();
				ordt = ordt.replace(/-/g,"");
			}else if (gubun == 3)
			{
				var ordt = td.eq(1).text();
				var orno = td.eq(3).text();
				ordt = ordt.replace(/-/g,"");
			}

				// 가져온 값을 배열에 담는다.
				var item = {
							ordt	: ordt,
							orno	: orno
				};
				productList.push(item);


			});
			//var itemsStr = JSON.stringify(productList);
			//console.log(itemsStr);


			detail_search(productList);
	}else
	{
		$('#table_area1').find('tbody').empty();
	}







});


function detail_search(productList){//반품디테일조회 20191106 하단디테일조회 펑션
	var itemsStr = JSON.stringify(productList);

						$('#table_area1_top').find('tbody').empty();
						var top_data ="";
            var w_vdcd = $('#return_tag').val();
            console.log(itemsStr);
						top_data += "<tr  bgcolor='#1BA892'>"
												+ "<td align='center' width='25'>NO</td>"
												+ "<td align='center' width='80'>스타일</td>"
												+ "<td align='center' width='40'>칼라</td>"
												+ "<td align='center' width='50'>사이즈</td>"
												+ "<td align='center' width='70'>출고유형</td>"
												+ "<td align='center' width='80'>판매가</td>"
                        + "<td align='center' width='40'>수량</td>"
                        + "<td align='center' width='80'>금액</td>"
												+ "</tr>";

						$('#table_area1_top').find('tbody').append(top_data);
					searching_open();
					 var promise = $.ajax({
						url: "./wh_detail_search.asp",
						type: "POST",
						data: {
								// "day1"		: ordt,
								// "orno"		: orno,
                "w_vdcd"		: w_vdcd,
								"items"			: itemsStr
						},
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						datatype: 'json',
						cache: false
					});
					promise.done(function(data) {
						//alert("done : " + data);
						try {
							var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
							if (jObject.error === "1") {

							   alert(jObject.msg);
                 console.log("세부조회 실패: "+jObject.sql1);
							   searching_close();
							} else if (jObject.error === "0") {
              //
								console.log("세부 조회 성공");
							 	var t_data = "";
							 	var t_data1 = "";
								for(var i = 0; i < jObject.data.length; i++) {
								var tag  = jObject.data[i].OUTYN;


								$('#table_area1').find('tbody').empty(); //조회테이블 초기화
								$('#total_area2').find('tbody').empty();
								var OUTAMT = parseInt(jObject.data[i].REQQTY  * jObject.data[i].OUTPRI );

									 t_data += "<tr><td align='center' bgcolor='white' width='25'>" + jObject.data[i].NUM + "</td>"
											+ "<td align='center' bgcolor='white' width='80'>" + jObject.data[i].STYCD + "</td>"
											+ "<td align='center' bgcolor='white' width='40'>" + jObject.data[i].COLCD + "</td>"
											+ "<td align='center'bgcolor='white' width='50'>" + jObject.data[i].SIZECD + "</td>"
											+ "<td align='center'bgcolor='white' width='70'>" + jObject.data[i].SALEGU + "</td>"
											+ "<td align='right'bgcolor='white' width='80'>" + jObject.data[i].OUTPRI + " &nbsp; &nbsp;</td>"
											+ "<td align='center'bgcolor='white' width='40'>" + jObject.data[i].OUTQTY + "</td>"
											+ "<td align='right'bgcolor='white' width='80'>" + jObject.data[i].SUM + " &nbsp; &nbsp;</td>"
											+ "</tr>";






								}

								t_data1 += "<tr><td align='center'  width='25'></td>"
                + "<td align='center'  width='80'></td>"
                + "<td align='center'  width='40'></td>"
                + "<td align='center'  width='50'></td>"
                + "<td align='center'  width='70'>합계</td>"
                + "<td align='right' style='font-Weight : bold;' width='80'></td>"
                + "<td align='center' style='font-Weight : bold;' width='40'>" + jObject.D_OUTQTY + "</td>"
                + "<td align='right' style='font-Weight : bold;' width='80'>" + jObject.D_SUM + " &nbsp; &nbsp; &nbsp;</td>"
                + "</tr>";



								$('#table_area1').find('tbody').append(t_data);
								$('#total_area2').find('tbody').append(t_data1);
								// total_count  = jObject.data.length + 1;
								searching_close();
							}

						} catch (e) {
							console.log("error 1001 : " + e.toString());
							searching_close();
						}
					});
					promise.fail(function(data) {
						alert("search_area fail3 : " + data);
						console.log(data);
						searching_close();

					});



}

//전체체크박스 선택
//$('input[name="tpiSeqs"]').click(function(){ //동적 생성된 HTML에서는 작동 안됨
$(document).on('click', 'input[name="d_allchk"]', function(){ //동적 생성된 HTML에서도 작동됨
   	var chk = $(this).is(":checked");
             productList = [];
                    if(chk){
                      $('input[name*="detail_check"]').prop('checked', true);


                    }else{
						//alert("체크해제");
                       $('input[name*="detail_check"]').prop('checked', false);
                    }

});


//boxlist open
function boxlist_open() {
	var $el = $("#boxlist");		//레이어의 id를 $el 변수에 저장
	var isDim = $el.prev().hasClass('dimBg-boxlist');	//dimmed 레이어를 감지하기 위한 boolean 변수
	 $('.dim-boxlist').fadeIn() ;
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
	searching_open();
  var w_vdcd = $('#return_tag').val();
	var outdt = $("#modi_outdt").val();
	var outno = $("#modi_outno").val();
	var promise = $.ajax({
			url: "./wh_boxlist.asp",
			type: "POST",
			data: {
				"outdt"   : outdt ,
				"outno"	 : outno ,
        "w_vdcd"	 : w_vdcd
			},
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			cache: true
		});
		promise.done(function(data) {
		try {
            var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
            if (jObject.error === "1") {
               alert(jObject.msg);
			   console.log(jObject.sql);
			   searching_close();
            } else if (jObject.error === "0") {

                console.log("박스내역서 조회 성공");



				$('#list_whnm').text(jObject.data1[0].WHNM);
				$('#list_vdnm').text(jObject.data1[0].VDNM+"["+jObject.data1[0].VDCD+"]");
				$('#list_boxno').text(jObject.data1[0].BOXNO);
				$('#list_barcode').text(jObject.data1[0].BOXNO);
				$('#list_totqty').text(jObject.data1[0].TOTQTY);
        $('#list_brcd').text(jObject.data1[0].BRCD);

                var t_data = "";
				var j = 0 ;
				var result ;
				var list_len = jObject.data.length ;
				result = list_len % 2 ;
				result1 = list_len / 2;

                console.log(list_len);
				if (result == 0 )
				{
					u = Math.floor(result1) ;
					for(var i = 0; i < u ; i++) {


						 t_data += "<tr>"
              + "<td width='150'  align='center'>" + jObject.data[j].STYCD + "-" +jObject.data[j].COLCD  + "-" +jObject.data[j].SIZECD +  "</td>"
              + "<td width='50' align='center' >" + jObject.data[j].OUTQTY + "</td>"
              + "<td width='100' align='right'  >" + jObject.data[j].OUTMAT +  "</td>"
              + "<td width='150' align='center'>" + jObject.data[j+1].STYCD + "-" +jObject.data[j+1].COLCD  + "-" +jObject.data[j+1].SIZECD + "</td>"
              + "<td width='50' align='center'  >" + jObject.data[j+1].OUTQTY + "</td>"
              + "<td width='100' align='right'  >" + jObject.data[j+1].OUTMAT+   "</td>"
              + "</tr>";
						j = j+2;
					 }
				}else
				{
					u = Math.floor(result1) + 1 ;
					var list  = 0 ;
					for(var i = 0; i < u ; i++) {

							if (i == list && list < u-1 )
							{
								 t_data += "<tr>"
                 + "<td width='150'  align='center'>"+ jObject.data[j].STYCD + "-" +jObject.data[j].COLCD  + "-" +jObject.data[j].SIZECD +  "</td>"
                 + "<td width='50' align='center'  >" + jObject.data[j].OUTQTY + "</td>"
                 + "<td width='100' align='right'  >" + jObject.data[j].OUTMAT+  "</td>"
                 + "<td width='150' align='center'>"+ jObject.data[j+1].STYCD + "-" +jObject.data[j+1].COLCD  + "-" +jObject.data[j+1].SIZECD + "</td>"
                 + "<td width='50' align='center'  >" + jObject.data[j+1].OUTQTY + "</td>"
                 + "<td width='100' align='right'  >" + jObject.data[j+1].OUTMAT +   "</td>"
                 + "</tr>";
							}else if (list  == u-1)
							{
									t_data += "<tr>"
                  + "<td width='150'  align='center'>"+ jObject.data[j].STYCD + "-" +jObject.data[j].COLCD  + "-" +jObject.data[j].SIZECD +  "</td>"
                  + "<td width='50' align='center'  >" + jObject.data[j].OUTQTY + "</td>"
                  + "<td width='100' align='right'  >" + jObject.data[j].OUTMAT +   "</td>"
                  + "<td width='150' align='center'></td>"
                  + "<td width='50' align='center'  ></td>"
                  + "<td width='100' align='center'  ></td>"
                  + "</tr>";
							}
							list += 1;
							j = j+2;
					 }
				}
				$('#list_outdt').val(outdt);
                $('#td_boxlist').find('tbody').append(t_data);
				searching_close();
            }

        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();

        }
    });
		promise.fail(function(data) {
			alert("return_select fail : " + data);
			searching_close();
		});

}


function boxlist_close() {
	$('.dim-boxlist').fadeOut() ; // 닫기 버튼을 클릭하면 레이어가 닫힌다.
	$('#td_boxlist').find('tbody').empty();
}


function JSONToCSVConvertor() {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData =  $("#jsGrid-sales2").jsGrid("option", "data");
    var ReportTitle = "브랜드별";
	var ShowLabel = true;
    var CSV = '';



    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';
	arrData.forEach(function(item) {
      delete item.NO;

    });


	for (i = arrData.length - 1;i >= 0;i--)
      {
         if (arrData[i].SPC_CHK == 0 || arrData[i].SPC_CHK == 1) {
            var pop = arrData.splice(i, 1);
         }
      }



    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "Brand_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");

    //Initialize file format you want csv or xls
    //var uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(CSV);
    var uri = 'data:application/vnd.ms-excel;charset=utf-8,\uFEFF' + encodeURI(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;
    var agent = navigator.userAgent.toLowerCase();
   if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		var oWin = window.open();

		oWin.document.charset="utf-8";
		oWin.document.write('sep=,\r\n' + CSV);
		oWin.document.close();
		oWin.document.execCommand('SaveAs', true, fileName + ".xls");
		oWin.close();

   } else {

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    //link.download = fileName + ".csv";
	link.download = fileName + ".xls";
	 document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   }




    //this part will append the anchor tag and remove it after automatic click

}

function get_chkbox(){
		$.ajax({
			url: "./check_box_option.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"selectoption"		: "shopmanager"
			},
			success:function(data) {

							var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
							if (jObject.error == "1")
							{
								alert(jObject.msg);
							} else if (jObject.error == "0")
							{
								var dataArray = jObject.data;
								if (dataArray.length == 0)
								{
										$("#td_radio").append("<input type='radio' name='shop_rd' value=''>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										$("#td_radio").append("<input type='radio' name='shop_rd' id='chkr"+i+"' value='"+dataArray[i].REFNM+"'><label for='chkr"+i+"'>"+dataArray[i].REFNM)+"</label>";
									}
								}
								//$("#td_radio").append("<input type='radio' name='shop_rd' id='chk11' value='1'><label for='chk11'>가나다</label>");
							}
				}
	});






}

//브랜드,년도 selectbox 만들기
function get_select(){
	//year
	$.ajax({
			url: "./select_box_option.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"selectoption"		: "year"
			},
			success:function(data) {

							var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
							if (jObject.error == "1")
							{
								alert(jObject.msg);
							} else if (jObject.error == "0")
							{
								var dataArray = jObject.data;
								if (dataArray.length == 0)
								{
										$("#yearselect").append("<option value=''>선택</option>");
										$("#sales3_year").append("<option value=''>선택</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										$("#yearselect").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
										$("#sales3_year").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
									}
								}

							}
				}
	});
	//brcd
	$.ajax({
			url: "./select_box_option.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"selectoption"		: "brcd"
			},
			success:function(data) {

							var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
							if (jObject.error == "1")
							{
								alert(jObject.msg);
							} else if (jObject.error == "0")
							{
								var dataArray = jObject.data;
								if (dataArray.length == 0)
								{
										$("#brcdselect").append("<option value=''>선택</option>");
										$("#sales3_brcd").append("<option value=''>선택</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										$("#brcdselect").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
										$("#sales3_brcd").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
									}
								}

							}
				}
	});
	//season
	$.ajax({
			url: "./select_box_option.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"selectoption"		: "season"
			},
			success:function(data) {

							var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
							if (jObject.error == "1")
							{
								alert(jObject.msg);
							} else if (jObject.error == "0")
							{
								var dataArray = jObject.data;
								if (dataArray.length == 0)
								{
										$("#sales3_season").append("<option value=''>선택</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{

										$("#sales3_season").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
									}
								}

							}
				}
	});
	//itype
	$.ajax({
			url: "./select_box_option.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"selectoption"		: "itype"
			},
			success:function(data) {

							var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
							if (jObject.error == "1")
							{
								alert(jObject.msg);
							} else if (jObject.error == "0")
							{
								var dataArray = jObject.data;
								if (dataArray.length == 0)
								{
										$("#sales3_itype").append("<option value=''>선택</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{

										$("#sales3_itype").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
									}
								}

							}
				}
	});
	//sex
	$.ajax({
			url: "./select_box_option.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"selectoption"		: "sex"
			},
			success:function(data) {

							var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
							if (jObject.error == "1")
							{
								alert(jObject.msg);
							} else if (jObject.error == "0")
							{
								var dataArray = jObject.data;
								if (dataArray.length == 0)
								{
										$("#sales3_sex").append("<option value=''>선택</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{

										$("#sales3_sex").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
									}
								}

							}
				}
	});

	//정상/아울렛
	$.ajax({
			url: "./select_box_option.asp",
			type: "POST",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			datatype: 'json',
			data: {
				"selectoption"		: "spc_chk"
			},
			success:function(data) {

							var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
							if (jObject.error == "1")
							{
								alert(jObject.msg);
							} else if (jObject.error == "0")
							{
								var dataArray = jObject.data;
								if (dataArray.length == 0)
								{
										$("#spcselect").append("<option value=''>선택</option>");
										$("#sales3_spc").append("<option value=''>선택</option>");
										$("#sales4_spc").append("<option value=''>선택</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{

						$("#spcselect").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
						$("#sales3_spc").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
						$("#sales4_spc").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");

									}
								}

							}
				}
	});
}

function printIt(printThis)
{
    var win = null;
    win = window.open();
    self.focus();
    win.document.open();
    win.document.write(printThis);
    win.document.close();
    win.print();
    win.close();
}
