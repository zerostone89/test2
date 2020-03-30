

function sales2_from_cal1(){
 document.getElementById('sales2-from').focus();
}
function sales2_to_cal1(){
 document.getElementById('sales2-to').focus();
}
function stock_date_cal(){
 document.getElementById('stock_date').focus();
}

function search_from_cal1(){
 document.getElementById('search-from').focus();
}
function search_to_cal1(){
 document.getElementById('search-to').focus();
}
function silsadt_from_cal1(){
 document.getElementById('silsadt-from').focus();
}
function silsadt_to_cal1(){
 document.getElementById('silsadt-to').focus();
}
function pre_date(){ //-1ÀÏ 
	
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

function next_date(){//+1ÀÏ
	
	$('#datepicker1').val(next_getDay());
}

function pre_date2($datePicker){ //-1ÀÏ 
	
	$datePicker.val(pre_getDay2($datePicker));
}

function next_date2($datePicker){//+1ÀÏ
	
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

/* ´Þ·Â*/

// Àç°í½Ç»çµî·Ïopen
function stock_open() {
	var $el = $("#stock");		//·¹ÀÌ¾îÀÇ id¸¦ $el º¯¼ö¿¡ ÀúÀå
	var isDim = $el.prev().hasClass('dimBg-stock');	//dimmed ·¹ÀÌ¾î¸¦ °¨ÁöÇÏ±â À§ÇÑ boolean º¯¼ö
	 

	 $('.dim-stock').fadeIn() ;	
	 //$("#stock").load("./stock.asp");
	//	searching_close();
	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	// È­¸éÀÇ Áß¾Ó¿¡ ·¹ÀÌ¾î¸¦ ¶ç¿î´Ù.
	if ($elHeight < docHeight || $elWidth < docWidth) {
		$el.css({
			marginTop: -$elHeight /2,
			marginLeft: -$elWidth/2
		})
	} else {
		$el.css({top: 0, left: 0});
	}
	
	
}

function stock_close() {

	$('.dim-stock').fadeOut() ; // ´Ý±â ¹öÆ°À» Å¬¸¯ÇÏ¸é ·¹ÀÌ¾î°¡ ´ÝÈù´Ù.	
	clear_page();
	stock_search();
	total_count = 0;
	row_cnt = 0;
	//setTimeout(stock_close_data, 1000);
}
// Àç°í½Ç»ç¼öÁ¤open

var total_count = 0 ; //°Ë»öµÈ °á°ú Ä«¿îÆ®
var row_cnt = 0 ;
function modify_stock(sildt,s_vdcd ,row){
	var sildt = sildt ;
	row_cnt =row;  //¸î¹øÂ° ¿­ÀÎÁö Ã¼Å©
	// var rows = $('#table_area').find('tbody')[0].rows;
	// var tag = rows.item(i).cells.item(5).innerHTML;
	var tag = document.getElementById('area_tag'+row_cnt).value;

	var $el = $("#stockmodify");		//·¹ÀÌ¾îÀÇ id¸¦ $el º¯¼ö¿¡ ÀúÀå
	var isDim = $el.prev().hasClass('dimBg-stockmodify');	//dimmed ·¹ÀÌ¾î¸¦ °¨ÁöÇÏ±â À§ÇÑ boolean º¯¼ö
	
	 $('.dim-stockmodify').fadeIn() ;
	 //$("#layer100").load("./sokbo_pop.asp");
	//$('#input_no').focus();

	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	// È­¸éÀÇ Áß¾Ó¿¡ ·¹ÀÌ¾î¸¦ ¶ç¿î´Ù.
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
		$('#btn-stock-del').attr('disabled',true);
	}
	else
	{
		$('#btn-spcchk-save').attr('disabled', false);
		$('#btn-stock-del').attr('disabled',false);
	}
	
    $('#tb_stockmodify').find('tbody').empty();//Å×ÀÌºíÃÊ±âÈ­
	searching_open();
	 var promise = $.ajax({
        url: "./stock_modify_search.asp",
        type: "POST",
        data: {
				"day1"		: sildt,
				"s_vdcd"		: s_vdcd
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
				
                console.log("Á¶È¸ ¼º°ø");
                var t_data = "";
                for(var i = 0; i < jObject.data.length; i++) {
					
				
                    t_data += "<tr><td align='center' bgcolor='white' ><input type='checkbox'  id='s_chk"+i+"' name='sil_chk' style='width:15px;heigh:15px;'></td>"
							+ "<td align='center' bgcolor='white'><input id ='modi_seq"+i+"'  class ='boxno' type='hidden' value='"+ jObject.data[i].SEQ + "'>"+ jObject.data[i].SEQ + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SPC_CHK + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].AREA + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].STYCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].COLCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SIZECD + "</td>"
							+ "<td align='center' bgcolor='white'><input id ='modi_silqty"+i+"' class ='box'type='text' value='"+ jObject.data[i].SILQTY + "'></td>"
							+ "<input id ='modi_spcchk"+i+"' type='hidden' value='"+ jObject.data[i].SPC_CHK + "'>"
							+ "<input id ='modi_vdcd"+i+"' type='hidden' value='"+ jObject.data[i].S_VDCD + "'>"
							+ "</tr>";
                }
                $('#tb_stockmodify').find('tbody').append(t_data);
				document.getElementById('modi_sildt').value = sildt;
				document.getElementById('modi_tag').value = tag;
				$('#modi_vdcd').val(s_vdcd);
				total_count  = jObject.data.length + 1;
				searching_close();
            }
			
        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();
        }
    });
    promise.fail(function(data) {
        alert("search_area fail : " + data);
		console.log(data);
		searching_close();
		
    });



}


function stockmodify_save() {
	var dataList = new Array();	
	var sildate = $('#modi_sildt').val();	
	var svdcd = $('#modi_svdcd').val();	
	/*	for (var j = 0 ;j < total_count-1; j++)
			{	
				var data = new Object();
				data.SEQ  = document.getElementById('modi_seq'+j).value;
				if ( document.getElementById('modi_silqty'+j).value == '')
				{
						alert('¼ö·®Àº ¹Ýµå½Ã ÀÔ·Â ÇØÁÖ¼¼¿ä!');
						document.getElementById('modi_silqty'+j).focus();
						
						return; 
				}
				data.QTY = parseInt(document.getElementById('modi_silqty'+j).value);	
			
				dataList.push(data);
		} 	
	
	var itemsStr = JSON.stringify(dataList);*/

	 productList = [];        	
		 var rows = $('#tb_stockmodify').find('tbody')[0].rows;
		console.log(rows);  //ÀüÃ¼ Å×ÀÌºí row
		  	
			  for(var i = 0; i < rows.length; i++) {
				if ($('#s_chk' + i)[0].checked === true) {
					
					
					modi_silqty = document.getElementById('modi_silqty'+i).value ;	
					modi_seq = document.getElementById('modi_seq'+i).value ;	
					modi_vdcd = document.getElementById('modi_vdcd'+i).value ;	
					modi_spcchk = document.getElementById('modi_spcchk'+i).value ;	
					var item = {
						modi_silqty	: modi_silqty,
						modi_seq : modi_seq , 
						modi_vdcd : modi_vdcd ,
						modi_spcchk : modi_spcchk
					};
					productList.push(item);
				}
			}
		console.log(productList);
		
	 if (productList.length == 0) {
			alert("¼öÁ¤ ÇÒ Àç°íÇ°¹øÀ» ¼±ÅÃÇØÁÖ¼¼¿ä .");
			return;
		} else if (productList.length > 0) {
				
			var itemsStr = JSON.stringify(productList);
	
			if (confirm("½Ç»ç¼öÁ¤ ÇÏ½Ã°Ú½À´Ï±î?")){




	
	console.log(itemsStr);
			var promise = $.ajax({   
							url: "./stock_modify_save.asp",
							type: "POST",  
							data: {
								"sildate" : sildate,
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
								modify_stock(sildate,svdcd,row_cnt);
								
							}		
						});
						promise.fail(function(data) {
							alert("stock_modify_save fail : " + data);
						});
			}
		}
}

function stockmodify_close() {

	$('.dim-stockmodify').fadeOut() ; // ´Ý±â ¹öÆ°À» Å¬¸¯ÇÏ¸é ·¹ÀÌ¾î°¡ ´ÝÈù´Ù.		
		total_count = 0 ;
		$('#tb_stockmodify > tbody').empty();
		$('#filter_barcode').val('')  ;
	stock_search();

	
}

function modify_stock1(sildt,row){
	var sildt = sildt ;
	var i =row; 
	var tag = document.getElementById('area_tag'+i).value;
	var tb_area = document.getElementById('area_remark'+i).value;
	

    console.log("sildt : " + sildt + ", tb_area : " + tb_area);//¼±ÅÃ µÈ ÇàÀÇ µ¥ÀÌÅÍ

	var $el = $("#stockmodify");		//·¹ÀÌ¾îÀÇ id¸¦ $el º¯¼ö¿¡ ÀúÀå
	var isDim = $el.prev().hasClass('dimBg-stockmodify');	//dimmed ·¹ÀÌ¾î¸¦ °¨ÁöÇÏ±â À§ÇÑ boolean º¯¼ö
	
	 $('.dim-stockmodify').fadeIn() ;
	 //$("#layer100").load("./sokbo_pop.asp");
	//$('#input_no').focus();

	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	// È­¸éÀÇ Áß¾Ó¿¡ ·¹ÀÌ¾î¸¦ ¶ç¿î´Ù.
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
	}
	else
	{
		$('#btn-spcchk-save').attr('disabled', false);
	}
	
	searching_open();
	 var promise = $.ajax({
        url: "./stock_modify_search.asp",
        type: "POST",
        data: {
				"day1"		: sildt,
				"tb_area"   : escape(tb_area)
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
				
                console.log("Á¶È¸ ¼º°ø");
                var t_data = "";
                for(var i = 0; i < jObject.data.length; i++) {
					
				
                    t_data += "<tr><td align='center' bgcolor='white'><input id ='modi_seq"+i+"'  class ='boxno' type='hidden' value='"+ jObject.data[i].SEQ + "'>"+ jObject.data[i].SEQ + "</td>"
								+ "<td align='center' bgcolor='white'>" + jObject.data[i].AREA + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].STYCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].COLCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SIZECD + "</td>"
							+ "<td align='center' bgcolor='white'><input id ='modi_silqty"+i+"' class ='box'type='text' value='"+ jObject.data[i].SILQTY + "'></td></tr>";
                }
                $('#tb_stockmodify').find('tbody').append(t_data);
				document.getElementById('modi_sildt').value = sildt;
				document.getElementById('modi_tag').value = tag;
				document.getElementById('modi_area').value = tb_area;
				total_count  = jObject.data.length + 1;
				searching_close();
            }
			
        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();
        }
    });
    promise.fail(function(data) {
        alert("search_area fail : " + data);
		console.log(data);
		searching_close();
		
    });



}




function onKeyUp_Barcode() {
	str = 	$('#input_barcode').val();
	check = /[¤¡-¤¾|¤¿-¤Ó|°¡-ÆR]/;
	
	if ($('#input_barcode').val().length == 12 && event.keyCode != 13)	{
		
			
			if((check.test(str))){
				alert("»óÇ°À» Ã£À» ¼ö ¾ø½À´Ï´Ù. ¿µ¹®À¸·Î ÀÔ·ÂÇØÁÖ¼¼¿ä");
				return;
			}
			code_search($('#input_barcode').val());
	}
}

function barcodeFocus() {
	//document.f_body.input_barcode.focus();
	//$('#input_barcode').val("");
	$('#input_barcode').focus();
	//currentItem = null;
}

function code_search(barcode){

	//return;

	var aa = document.getElementById('input_barcode');


	
		var Url
		var winl = (screen.width - 560) / 2; 
		var wint = (screen.height - 210) / 2;
		//var barcd  = $('#input_barcode').val().toUpperCase();
		var barcd  = barcode.toUpperCase();
		
		

		//var pshape = document.d_sale.sgb.value;
		//var cnt =  document.d_sale.count1.value;
		var chk = 1;
		if (barcd == "") {
			alert("¹ÙÄÚµå¸¦ ÀÔ·ÂÇØÁÖ¼¼¿ä.");
			barcodeFocus();
			return; 
		} else if (barcd.length < 12) {
			alert("¹ÙÄÚµå±æÀÌ°¡ Âª½À´Ï´Ù.");
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
		
		
}
var rowcnt =0 ;
function code_insert(spc_chk, barcode, xstycd, style, colcd, sizecd, type1, cnt, jaego, fipri, lapri, dc, mg, silpak, sacod, t_price_yn, t_price_gb, brcd) {
	

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
		JAEGO : jaego //20190812 ÇöÀç°íºÎºÐ Ãß°¡
	};
	/*	var u = 0;
		var j = 0;
		for (var i = 0; i < 50 ; i++) 
		{
			if ( document.getElementById('stylecd'+i).value == "" ) break;
			u = eval(u) + 1;
			j = i ; 			
		}	 

			if (document.getElementById('stylecd'+j).value == client.STYCD && document.getElementById('colcd'+j).value == client.COLCD && document.getElementById('sizecd'+j).value == client.SIZECD )
			{
				
				document.getElementById('jaegoqty'+j).value = parseInt(document.getElementById('jaegoqty'+j).value) + parseInt(client.QTY) ;
			}
			else
			{
				document.getElementById('spcchk'+u).value = client.SPCCHK;		
				document.getElementById('stylecd'+u).value = client.STYCD;
				document.getElementById('colcd'+u).value = client.COLCD;
				document.getElementById('sizecd'+u).value = client.SIZECD;
				document.getElementById('jaegoqty'+u).value = client.QTY;	
				document.getElementById('jaego'+u).value = client.JAEGO;	
			}
			
	*/
	if (client.SPCCHK == "N")
	{
		var spcchk = "Á¤»ó";
	
	}else
	{
		var spcchk ="¾Æ¿ï";
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
				+ "<td align='center'><input type='text' id='jaegoqty"+rowcnt+"' size='7' maxlength='3' class='box' value='" + client.QTY + "' style='text-align: right' onkeyup='javascript:sum_tqty();'></td>"
				+ "<td align='center'><a href='javascript:js_tempdelete("+rowcnt+");'><img src='./images/icon_delete.gif' width='50' height='19' border='0'></a></td></tr>";
	
                $('#tb_stocklist > tbody').append(t_data);
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
					
					document.getElementById('jaegoqty'+j).value = parseInt(document.getElementById('jaegoqty'+j).value) + parseInt(client.QTY) ;
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
					+ "<td align='center'><input type='text' id='jaegoqty"+rowcnt+"' size='7' maxlength='3' class='box' value='" + client.QTY + "' style='text-align: right'onkeyup='javascript:sum_tqty();' ></td>"
					+ "<td align='center'><a href='javascript:js_tempdelete("+rowcnt+");'><img src='./images/icon_delete.gif' width='50' height='19' border='0'></a></td></tr>";
		
					$('#tb_stocklist > tbody').append(t_data);
					rowcnt += 1;
				}
				
		}
		
		$('#div1').scrollTop($('#div1')[0].scrollHeight);
		sum_tqty();			
		barcodeFocus();
}

function sum_tqty(){
	var hap = 0
	for (var z = 0;z<rowcnt ;z++ )
	{
		
			hap = hap + parseInt(document.getElementById('jaegoqty'+z).value,10);
	}

	document.getElementById('total_qty').value = hap;
}

function stock_save() {
	var dataList = new Array();
	if (rowcnt == 0 )
	{
			alert("ÀúÀå ÇÒ µ¥ÀÌÅÍ°¡ ¾ø½À´Ï´Ù!");
			return barcodeFocus();
	}

	var chk_shop = $('#shop_sel').val();
	if (chk_shop == null)
	{
		alert("´ã´çÀÚ´Â ¹Ýµå½Ã ¼±ÅÃ ÇØ ÁÖ¼¼¿ä");
		$('#shop_sel').focus();
		return;
	}
	var chk_area = $('#stock_remark').val();
	if (chk_area.length == 0 )
	{
		alert("±¸¿ªÀ» ¼±ÅÃÇØÁÖ¼¼¿ä");
		$('#stock_remark').focus();
		return;
	}
	console.log(chk_shop);
	var sildate = $('#stock_date').val();
	var stock_remark = $('#stock_remark').val();
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
				data.QTY = parseInt(document.getElementById('jaegoqty'+j).value);	
			
				dataList.push(data);
		} 	
	
	var itemsStr = JSON.stringify(dataList);
	
	console.log(itemsStr);
	var promise = $.ajax({   
			url: "./stock_save.asp",
			type: "POST",  
			data: {
				"sildate" : sildate,
				"chk_shop" : escape(chk_shop) ,
				"stock_remark" : escape(stock_remark) ,
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
				clear_page();  //µî·ÏÆäÀÌÁö ÃÊ±âÈ­
				
			}		
		});
		promise.fail(function(data) {
			alert("stock_save fail : " + data);
		});	
}

function clear_page(){
		//alert(rowcnt);
		for (var i = 0; i < rowcnt ; i++) 
		{
			
			document.getElementById('silseq'+i).value = ""	;
			document.getElementById('spcchk'+i).value = ""	;
			document.getElementById('stylecd'+i).value =""	;
			document.getElementById('colcd'+i).value = ""	;
			document.getElementById('sizecd'+i).value =""	;
			document.getElementById('jaegoqty'+i).value = ""	;
			document.getElementById('jaego'+i).value = ""	;
			
		}	 
		rowcnt = 0 ;
		$('#stock_remark').val('');
		$('#shop_sel').val('');
		$('#total_qty').val('');
		$('#tb_stocklist > tbody').empty();
	barcodeFocus();
		
}

function js_tempdelete(as_row){
	var as_row = as_row;	
	var dataList = new Array();
	var u = 0 ;
	//alert(as_row);
		if (document.getElementById('stylecd'+as_row).value == ""){
			alert('»èÁ¦ÇÒ ÀÚ·á°¡ Á¸ÀçÇÏÁö ¾Ê½À´Ï´Ù.');
			return;
		}
		for (var i = 0; i < rowcnt ; i++) 
		{
			if ( document.getElementById('stylecd'+i).value == "" ) break;
			var u = eval(u) + 1;
		}	 
		
		if (confirm("»èÁ¦ ÇÏ½Ã°Ú½À´Ï±î?")){
			document.getElementById('silseq'+as_row).value = ""	;
			document.getElementById('spcchk'+as_row).value = ""	;
			document.getElementById('stylecd'+as_row).value =""	;
			document.getElementById('colcd'+as_row).value = ""	;
			document.getElementById('sizecd'+as_row).value =""	;
			document.getElementById('jaegoqty'+as_row).value = ""	;
			document.getElementById('jaego'+as_row).value = ""	;
			var up_row = as_row+1;
			for (up_row;up_row < u; up_row++)
			{	
				
				document.getElementById('silseq'+as_row).value = parseInt(document.getElementById('silseq'+up_row).value)-1;
				document.getElementById('spcchk'+as_row).value = document.getElementById('spcchk'+up_row).value;
				document.getElementById('stylecd'+as_row).value = document.getElementById('stylecd'+up_row).value;
				document.getElementById('colcd'+as_row).value = document.getElementById('colcd'+up_row).value;
				document.getElementById('sizecd'+as_row).value = document.getElementById('sizecd'+up_row).value;
				document.getElementById('jaegoqty'+as_row).value = parseInt(document.getElementById('jaegoqty'+up_row).value);	
				document.getElementById('jaego'+as_row).value = document.getElementById('jaego'+up_row).value ;
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
			document.getElementById('jaegoqty'+u).value = ""	;
			document.getElementById('jaego'+u).value = ""	;
			//var itemsStr = JSON.stringify(dataList);
			//console.log(dataList);
			$('#tb_stocklist > tbody:last > tr:last').remove();
			rowcnt = rowcnt-1;
		}
	}


/*-----Á¶È¸----------*/
function stock_search() {
	$('#table_area').find('tbody').empty();
	var iArray;
	var date_from = document.getElementById('sales2-from').value;
	var date_to = document.getElementById('sales2-to').value;	
	var stock_tag = $('#stock_tag').val();
	var search_area = $('#search_area').val();
	var search_from = $('#search-from').val();
	var search_to = $('#search-to').val();
	var search_inuser = $('#search_inuser').val();

	var j = 0 ;
	var result ;
	var p_area = "" ;
	var p_sildt = "" ;

    var promise = $.ajax({
        url: "./stock_search.asp",
        type: "POST",
        data: {
				"day1"		: date_from,
				"day2"	: date_to,
				"stock_tag" : stock_tag,
				"search_area" : escape(search_area),
				"search_from" : search_from,
				"search_to"   : search_to,
				"search_inuser" : escape(search_inuser)
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        datatype: 'json',
        cache: false
    });
	searching_open();
    promise.done(function(data) {
        //alert("done : " + data);
        try {
            var jObject = JSON.parse(data.replace("\"[", "[").replace("]\"", "]").replace("\"[", "[").replace("]\"", "]"));
            if (jObject.error === "1") {
               alert(jObject.msg);
			   searching_close();
            } else if (jObject.error === "0") {    
				
                console.log("Á¶È¸ ¼º°ø");
                var t_data = "";
				
                for(var i = 0; i < jObject.data.length; i++) {
					var sildt = jObject.data[i].SILDT;
					var tag = jObject.data[i].TAG ;
					var area = jObject.data[i].CHK;
					var area1 = jObject.data[i].AREA;
					var s_vdcd = jObject.data[i].S_VDCD;					
					var s_vdcd1 = "\""+s_vdcd+"\"";
					if (tag=="N")
					{
							tag ="¹ÌÈ®Á¤";
					}
					else
					{
							tag="È®Á¤";
					}
				
				
				if (p_area != area1)
				{
					j = j+1;	
				}
				result = j % 2 ;
				if (  result == 0 )
				{
						bgcolor ="#22741C";
				}
				else
				{
						bgcolor="#050099";
				}
				
				p_area = area1;
				if (jObject.data[i].UPDTIME != "N")
				{
					INTIME = jObject.data[i].UPDTIME;
				}else
				{
					INTIME = jObject.data[i].INTIME ;
				}
				
					if (area == "1" )
					{
							t_data += "<tr bgcolor='#dcdcdc' ><td align='center'  width='31%' colspan='4'><input id='" + i + "' type='hidden' name='radiogroup'> ¼ö·®     </td>"
									+"<td width='10%' align='right'>"+ jObject.data[i].SILQTY +" </td>"
									+"<td width='10%' align='center'>&nbsp;</td>"
									+"<td width='10%' align='center'>&nbsp;</td>"
									+ "</tr>";
					}else
					{
						if (p_sildt != sildt)
						{
								t_data += "<tr ><td align='center' bgcolor='white'><input id='" + i + "' type='checkbox' name='radiogroup'></td>"
								+ "<td align='center' bgcolor='white'><input type='hidden' id ='area_sildt"+i+"' value='"+sildt+"' ><a href='javascript:modify_stock("+sildt+","+s_vdcd1+"," + i + ");'> " + sildt.substring(0,4)+"-"+sildt.substring(4,6) +"-"+sildt.substring(6,8) + "</a></td>"
								+ "<td align='center' bgcolor='white'style='color:"+bgcolor+"' ><input type='hidden' id='area_remark"+i+"' value='"+jObject.data[i].AREA+"'> " + jObject.data[i].AREA + "</td>" //<a href='javascript:modify_stock1("+sildt+"," + i + ");' style='color:"+bgcolor+"'>
								+ "<td align='center' bgcolor='white'>"  + INTIME.substring(0,4)+"-"+INTIME.substring(4,6) +"-"+INTIME.substring(6,8) +"  "+INTIME.substring(8,10)+":"+INTIME.substring(10,12)+ "</td>"
								+ "<td align='right' bgcolor='white'>" + jObject.data[i].SILQTY + " </td>"
								+ "<td align='center' bgcolor='white'><input type='hidden' id='area_tag"+i+"' value='"+jObject.data[i].TAG+"'>" + tag + "</td>"
								+ "<td align='center' bgcolor='white'>" + jObject.data[i].INUSER + "</td></tr>";
								p_sildt = sildt;
						}else
						{

								t_data += "<tr ><td align='center' bgcolor='white'></td>"
								+ "<td align='center' bgcolor='white'><input type='hidden' id ='area_sildt"+i+"' value='"+sildt+"' ><a href='javascript:modify_stock("+sildt+","+s_vdcd1+"," + i + ");'> " + sildt.substring(0,4)+"-"+sildt.substring(4,6) +"-"+sildt.substring(6,8) + "</a></td>"
								+ "<td align='center' bgcolor='white'style='color:"+bgcolor+"' ><input type='hidden' id='area_remark"+i+"' value='"+jObject.data[i].AREA+"'> " + jObject.data[i].AREA + "</td>" //<a href='javascript:modify_stock1("+sildt+"," + i + ");' style='color:"+bgcolor+"'>
								+ "<td align='center' bgcolor='white'>"  + INTIME.substring(0,4)+"-"+INTIME.substring(4,6) +"-"+INTIME.substring(6,8) +"  "+INTIME.substring(8,10)+":"+INTIME.substring(10,12)+ "</td>"
								+ "<td align='right' bgcolor='white'>" + jObject.data[i].SILQTY + " </td>"
								+ "<td align='center' bgcolor='white'><input type='hidden' id='area_tag"+i+"' value='"+jObject.data[i].TAG+"'>" + tag + "</td>"
								+ "<td align='center' bgcolor='white'>" + jObject.data[i].INUSER + "</td></tr>";
								p_sildt = sildt;
						}
						
					}
                }
                $('#table_area').find('tbody').append(t_data);
				$('#total_silqty').text(jObject.T_SILQTY);
				//table_paging('content');
				searching_close();
            }
			
        } catch (e) {
            console.log("error 1001 : " + e.toString());
			
			searching_close();
        }
    });
    promise.fail(function(data) {
        alert("search_area fail : " + data);
		console.log(data);
		searching_close();
    });
}

function stock_delete() {
    var sildt = "";
    var tag = "";

	productList = [];
	
    var rows = $('#table_area').find('tbody')[0].rows;
	//console.log(rows);  //ÀüÃ¼ Å×ÀÌºí row
   for(var i = 0; i < rows.length; i++) {
        if ($('#' + i)[0].checked === true) {
            sildt = document.getElementById('area_sildt'+i).value ;
            tag = document.getElementById('area_tag'+i).value
            console.log("sildt : " + sildt + ", tag : " + tag);//¼±ÅÃ µÈ ÇàÀÇ µ¥ÀÌÅÍ
			var item = {
				sildt	: sildt,
				tag	: tag
			};
			productList.push(item);
        }
    }
	
    if (productList.length == 0) {
        alert("»èÁ¦ÇÒ ½Ç»ç¸¦ ¼±ÅÃÇØÁÖ¼¼¿ä .");
        return;
    } else if (productList.length > 0) {
			for (j=0;j < productList.length-1 ;j++ )
			{
				var p_tag = productList[0].tag ;
				if (p_tag == "Y")
				{
					alert("½Ç»ç È®Á¤µÈ µ¥ÀÌÅÍ´Â »èÁ¦ ÇÒ ¼ö ¾ø½À´Ï´Ù!");
					return;
				}
				
			}
		if (confirm("¼±ÅÃ µÈ ½Ç»ç¸¦ »èÁ¦ ÇÏ½Ã°Ú½À´Ï±î?")){
			delete_stock(productList);
		}
    }
}

function stock_delete1() {
    var sildt = "";
    var tag = "";
	var area = "" ;

	productList = [];
	
	//console.log(rows);  //ÀüÃ¼ Å×ÀÌºí row
  
		var sildate = $('#modi_sildt').val();	
		tag = $('#modi_tag').val();
		 productList = [];        	
		 var rows = $('#tb_stockmodify').find('tbody')[0].rows;
		console.log(rows);  //ÀüÃ¼ Å×ÀÌºí row
		  	
			  for(var i = 0; i < rows.length; i++) {
				if ($('#s_chk' + i)[0].checked === true) {
					
					
					modi_silqty = document.getElementById('modi_silqty'+i).value ;	
					modi_seq = document.getElementById('modi_seq'+i).value ;	
					modi_vdcd = document.getElementById('modi_vdcd'+i).value ;	
					modi_spcchk = document.getElementById('modi_spcchk'+i).value ;	
					var item = {
						modi_silqty	: modi_silqty,
						modi_seq : modi_seq , 
						modi_vdcd : modi_vdcd ,
						modi_spcchk : modi_spcchk,
						sildate     :  sildate
					};
					productList.push(item);
				}
			}
		console.log(productList);
    if (productList.length == 0) {
        alert("»èÁ¦ÇÒ ½Ç»ç¸¦ ¼±ÅÃÇØÁÖ¼¼¿ä .");
        return;
    } else if (productList.length > 0) {
			for (j=0;j < productList.length-1 ;j++ )
			{
				var p_tag = productList[0].tag ;
				if (p_tag == "Y")
				{
					alert("½Ç»ç È®Á¤µÈ µ¥ÀÌÅÍ´Â »èÁ¦ ÇÒ ¼ö ¾ø½À´Ï´Ù!");
					return;
				}
				
			}
		if (confirm("¼±ÅÃ µÈ ½Ç»ç¸¦ »èÁ¦ ÇÏ½Ã°Ú½À´Ï±î?")){
			delete_stock(productList);
		}
    }
}
function delete_stock(productList){
	var itemsStr = JSON.stringify(productList);	
	var sildate = $('#modi_sildt').val();	
	var svdcd = $('#modi_svdcd').val();	
	console.log(itemsStr);
	var promise = $.ajax({   
			url: "./stock_delete.asp",
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
				modify_stock(sildate,svdcd,row_cnt);
				document.getElementById('modi_area').value = "";
			}		
		});
		promise.fail(function(data) {
			alert("stock_delete fail : " + data);
		});
}

/////¼±ÅÃ Á¶È¸

function select_search() {
    var sildt = "";
    var tag = "";
	var area_remark = "" ;

	productList = [];
	
	var chk = $(this).is(":checked");
	var cnt = $("input[name=radiogroup]:checkbox:checked").length;
	productList = [];  
	var tr = $(this).parent().parent();
     var td = tr.children();
	

	if (cnt > 0)
	{
			
			var checkbox = $("input[name=radiogroup]:checked");
			
			// Ã¼Å©µÈ Ã¼Å©¹Ú½º °ªÀ» °¡Á®¿Â´Ù
			checkbox.each(function(i) {
	
				// checkbox.parent() : checkboxÀÇ ºÎ¸ð´Â <td>ÀÌ´Ù.
				// checkbox.parent().parent() : <td>ÀÇ ºÎ¸ðÀÌ¹Ç·Î <tr>ÀÌ´Ù.
				var tr = checkbox.parent().parent().eq(i);
				var td = tr.children();
				
				// td.eq(0)Àº Ã¼Å©¹Ú½º ÀÌ¹Ç·Î  td.eq(1)ÀÇ °ªºÎÅÍ °¡Á®¿Â´Ù.
			
				var sildt = td.eq(1).text();
				var area_remark = td.eq(2).text();
				var tag = td.eq(5).text();
				sildt = sildt.replace(/-/g,"");	
				console.log("sildt : " + sildt + ", tag : " + tag +",area_remark : " +area_remark);
				// °¡Á®¿Â °ªÀ» ¹è¿­¿¡ ´ã´Â´Ù.
				var item = {
							sildt	: sildt,
							area_remark: escape(area_remark)
				};
				productList.push(item);
			
				
			});
			
    if (productList.length == 0) {
        alert("Á¶È¸ ÇÒ ½Ç»çÀÏÀÚ¸¦ ¼±ÅÃÇØÁÖ¼¼¿ä .");
        return;
    } else if (productList.length > 0) {
			
			itemsStr = JSON.stringify(productList);
			select_stock(itemsStr);
       
    }

	}



    /*var rows = $('#table_area').find('tbody')[0].rows;
	//console.log(rows);  //ÀüÃ¼ Å×ÀÌºí row
   for(var i = 0; i < rows.length; i++) {
        if ($('#' + i)[0].checked === true) {
            sildt = document.getElementById('area_sildt'+i).value ;
			tag = document.getElementById('area_tag'+i).value;		
			area_remark = document.getElementById('area_remark'+i).value;
            // tag = rows.item(i).cells.item(5).innerHTML;
            console.log("sildt : " + sildt + ", tag : " + tag);//¼±ÅÃ µÈ ÇàÀÇ µ¥ÀÌÅÍ
			var item = {
				sildt	: sildt,
				tag	: tag,
				area_remark : escape(area_remark)
			};
			productList.push(item);
        }
    }
	*/
}
var itemsStr;
function select_stock(itemsStr){
	console.log(itemsStr);
	var $el = $("#stocksearch");		//·¹ÀÌ¾îÀÇ id¸¦ $el º¯¼ö¿¡ ÀúÀå
	var isDim = $el.prev().hasClass('dimBg-stocksearch');	//dimmed ·¹ÀÌ¾î¸¦ °¨ÁöÇÏ±â À§ÇÑ boolean º¯¼ö
	
	 $('.dim-stocksearch').fadeIn() ;
	 //$("#layer100").load("./sokbo_pop.asp");
	//$('#input_no').focus();

	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	// È­¸éÀÇ Áß¾Ó¿¡ ·¹ÀÌ¾î¸¦ ¶ç¿î´Ù.
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
			url: "./stock_select_search.asp",
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
				
                console.log("Á¶È¸ ¼º°ø");
				
                var t_data = "";
                for(var i = 0; i < jObject.data.length; i++) {
					
				
                    t_data += "<tr bgcolor='grey'><td align='center' bgcolor='white'>" + jObject.data[i].SILDT + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SEQ + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].AREA + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].STYCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].COLCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SIZECD + "</td>"
							+ "<td align='center' bgcolor='white'>"+ jObject.data[i].SILQTY + "</td></tr>";
                }
                $('#tb_stocksearch').find('tbody').append(t_data);
				total_count  = jObject.data.length + 1;
				searching_close();
            }
			
        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();
			
        }
    });
		promise.fail(function(data) {
			alert("stock_select fail : " + data);
			searching_close();
		});
}

function stocksearch_close() {

	$('.dim-stocksearch').fadeOut() ; // ´Ý±â ¹öÆ°À» Å¬¸¯ÇÏ¸é ·¹ÀÌ¾î°¡ ´ÝÈù´Ù.		
		total_count = 0 ;
		$('#tb_stocksearch > tbody').empty();
		$('#sel_barcode').val('');
stock_search();

	
}



//ÇÊÅÍÁ¶È¸
function filter_search(){
	
	var filter_input = $('#filter_barcode').val();
	var chk = $(":input:radio[name=filter_radio]:checked").val();
	$('#tb_stockmodify > tbody').empty();
	
	sildt =	document.getElementById('modi_sildt').value ;
	tag =	document.getElementById('modi_tag').value ;
	console.log(filter_input+":"+chk);
	searching_open();
	 var promise = $.ajax({
        url: "./stock_modify_search.asp",
        type: "POST",
        data: {
				"day1"		: sildt,
				"chk"		: chk ,
				"barcode"	: filter_input
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
				
                console.log("Á¶È¸ ¼º°ø");
                var t_data = "";
                for(var i = 0; i < jObject.data.length; i++) {
					
				
                    t_data += "<tr><td align='center' bgcolor='white'><input id ='modi_seq"+i+"'  class ='boxno' type='hidden' value='"+ jObject.data[i].SEQ + "'>"+ jObject.data[i].SEQ + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].AREA + "</td>"
								+ "<td align='center' bgcolor='white'>" + jObject.data[i].STYCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].COLCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SIZECD + "</td>"
							+ "<td align='center' bgcolor='white'><input id ='modi_silqty"+i+"' class ='box'type='text' value='"+ jObject.data[i].SILQTY + "'></td></tr>";
                }
                $('#tb_stockmodify').find('tbody').append(t_data);
				document.getElementById('modi_sildt').value = sildt;
				document.getElementById('modi_tag').value = tag;
				total_count  = jObject.data.length + 1;
				searching_close();
            }
			
        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();
        }
    });
    promise.fail(function(data) {
        alert("search_area fail : " + data);
		console.log(data);
		searching_close();
		
    });
}


//ÇÊÅÍÁ¶È¸
function filter_search_select(){
	
	var barcode = $('#sel_barcode').val();
	var chk = $(":input:radio[name=select_radio]:checked").val();
	$('#tb_stocksearch > tbody').empty();	
	console.log(itemsStr);
	searching_open();
	var promise = $.ajax({   
			url: "./stock_select_search.asp",
			type: "POST",  
			data: {
				"items"   : itemsStr,
				"barcode" : barcode,
				"chk"     : chk
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
				
                console.log("Á¶È¸ ¼º°ø");
				
                var t_data = "";
                for(var i = 0; i < jObject.data.length; i++) {
					
				
                    t_data += "<tr bgcolor='grey'><td align='center' bgcolor='white'>" + jObject.data[i].SILDT + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SEQ + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].AREA + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].STYCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].COLCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SIZECD + "</td>"
							+ "<td align='center' bgcolor='white'>"+ jObject.data[i].SILQTY + "</td></tr>";
                }
                $('#tb_stocksearch').find('tbody').append(t_data);
				total_count  = jObject.data.length + 1;
				searching_close();
            }
			
        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();
			
        }
    });
		promise.fail(function(data) {
			alert("stock_select fail : " + data);
			searching_close();
		});
}


function JSONToCSVConvertor() {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData =  $("#jsGrid-sales2").jsGrid("option", "data"); 
    var ReportTitle = "ºê·£µåº°";
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
								/*if (dataArray.length == 0)
								{
										$("#td_radio").append("<input type='radio' name='shop_rd' value=''>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										$("#td_radio").append("<input type='radio' name='shop_rd' id='chkr"+i+"' value='"+dataArray[i].REFNM+"'><label for='chkr"+i+"'>"+dataArray[i].REFNM)+"</label>";
									}
								}*/
								//$("#td_radio").append("<input type='radio' name='shop_rd' value='1'>°¡³ª´Ù");	

								if (dataArray.length == 0)
								{
										$("#shop_sel").append("<option value=''>¼±ÅÃ</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										$("#shop_sel").append("<option value="+dataArray[i].REFNM+">"+dataArray[i].REFNM+"</option>");
									}
								}


							}
				}
	});
//	$("#td_radio").append("<input type='radio' name='shop_rd' value='1'>°¡³ª´Ù");
}

//ºê·£µå,³âµµ selectbox ¸¸µé±â
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
										$("#yearselect").append("<option value=''>¼±ÅÃ</option>");
										$("#silsa_year").append("<option value=''>¼±ÅÃ</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										$("#yearselect").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
										$("#silsa_year").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
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
										$("#brcdselect").append("<option value=''>¼±ÅÃ</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										$("#brcdselect").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
									}
								}
									
							}
				}
	});
	//pcd¿¡ µû¸¥ ºê·£µå
	$.ajax({   
			url: "./select_box_option.asp",
			type: "POST",  			
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			datatype: 'json',
			data: {
				"selectoption"		: "brcd_pcd"
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
									
										$("#silsa_brcd").append("<option value=''>¼±ÅÃ</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										$("#silsa_brcd").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
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
										$("#silsa_season").append("<option value=''>¼±ÅÃ</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										
										$("#silsa_season").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
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
										$("#silsa_itype").append("<option value=''>¼±ÅÃ</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										
										$("#silsa_itype").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
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
										$("#silsa_sex").append("<option value=''>¼±ÅÃ</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										
										$("#silsa_sex").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
									}
								}
									
							}
				}
	});

	//Á¤»ó/¾Æ¿ï·¿
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
										$("#spcselect").append("<option value=''>¼±ÅÃ</option>");
										$("#silsa_spc").append("<option value=''>¼±ÅÃ</option>");
										$("#sales4_spc").append("<option value=''>¼±ÅÃ</option>");
								}else
								{
									for (var i =0 ;i< dataArray.length ; i++ )
									{
										
						$("#spcselect").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
						$("#silsa_spc").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
						$("#sales4_spc").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
										
									}
								}
									
							}
				}
	});
}

$(document).on('click', 'input[name="allchk"]', function(){ //µ¿Àû »ý¼ºµÈ HTML¿¡¼­µµ ÀÛµ¿µÊ
    //var totLength = $(this).length; //ÀÌ°Ç Ç×»ó 1ÀÌ ³ª¿ÔÀ½
   /* var totLength = $('input[name="tpiSeqs"]').length; //ÀÌ°Ç ¿¹»óÇß´ø °³¼ö°¡ ³ª¿È
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
					
                      $('input[name*="radiogroup"]').prop('checked', true);
                    }else{
						//alert("Ã¼Å©ÇØÁ¦");
                       $('input[name*="radiogroup"]').prop('checked', false);
                    }
	
});


function stock_reset(){
	$('#search_inuser').val('');
	$('#search_area').val('');
	$('#search-from').val('');
	$('#search-to').val('');
	$("#stock_tag").val("%");
	
}

//ºê·£µå
function silsabrcdchk() {
	$('#silsa_brcdchk')[0].checked = true;
	select_stock1();
}
//³âµµ
function silsayearchk() {
	$('#silsa_yearchk')[0].checked = true;
	select_stock1();
}
//½ÃÁð
function silsaseasonchk() {
	$('#silsa_seasonchk')[0].checked = true;
	select_stock1();
}
//¼ºº°
function silsasexchk() {
	$('#silsa_sexchk')[0].checked = true;
	select_stock1();
}

//Á¤»ó/¾Æ¿ï·¿±¸ºÐ
function silsaspcchk() {
	$('#silsa_spcchk')[0].checked = true;
	select_stock1();
}
//ÇüÅÂ
function silsaitypechk() {
	$('#silsa_itypechk')[0].checked = true;
	var select_itype = $("#silsa_itype").val();
	$("#silsa_item").find("option").remove();

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
						$("#silsa_item").append("<option value=''>¼±ÅÃ</option>");
				} else {
					for (var i =0 ;i< dataArray.length ; i++ ) {
						$("#silsa_item").append("<option value="+dataArray[i].REFCD+">"+dataArray[i].REFNM+"</option>");
					}
				}
			}
		}
	});
	select_stock1();
}

//¾ÆÀÌÅÛ
function silsaitemchk() {
	$('#silsa_itemchk')[0].checked = true;
	select_stock1();
}




///Áý°èÁ¶È¸
ArrList = [];
function select_search1() {
    var sildt = "";
    var tag = "";
	var area_remark = "" ;

	productList = [];
	
	var chk = $(this).is(":checked");
	var cnt = $("input[name=radiogroup]:checkbox:checked").length;
	productList = [];  
	var tr = $(this).parent().parent();
     var td = tr.children();
	

	if (cnt > 0)
	{
			
			var checkbox = $("input[name=radiogroup]:checked");
			
			// Ã¼Å©µÈ Ã¼Å©¹Ú½º °ªÀ» °¡Á®¿Â´Ù
			checkbox.each(function(i) {
	
				// checkbox.parent() : checkboxÀÇ ºÎ¸ð´Â <td>ÀÌ´Ù.
				// checkbox.parent().parent() : <td>ÀÇ ºÎ¸ðÀÌ¹Ç·Î <tr>ÀÌ´Ù.
				var tr = checkbox.parent().parent().eq(i);
				var td = tr.children();
				
				// td.eq(0)Àº Ã¼Å©¹Ú½º ÀÌ¹Ç·Î  td.eq(1)ÀÇ °ªºÎÅÍ °¡Á®¿Â´Ù.
			
				var sildt = td.eq(1).text();
				var area_remark = td.eq(2).text();
				var tag = td.eq(5).text();
				sildt = sildt.replace(/-/g,"");	
				console.log("sildt : " + sildt + ", tag : " + tag +",area_remark : " +area_remark);
				// °¡Á®¿Â °ªÀ» ¹è¿­¿¡ ´ã´Â´Ù.
				var item = {
							sildt	: sildt,
							area_remark: escape(area_remark)
				};
				productList.push(item);				
				ArrList.push(item);
			
				//var i = productList.length-1;
				$('#silsadt_from').val(productList[0].sildt);
				//$('#silsadt_to').val(productList[0].sildt);
				
			});
			
    if (productList.length == 0) {
        alert("Á¶È¸ ÇÒ ½Ç»çÀÏÀÚ¸¦ ¼±ÅÃÇØÁÖ¼¼¿ä .");
        return;
    } else if (productList.length > 0) {
			
			select_stock1();
       
    }

	}



}
function select_stock1(){
	
	itemsStr = JSON.stringify(ArrList);
	console.log(itemsStr);
	var $el = $("#layer100");		//·¹ÀÌ¾îÀÇ id¸¦ $el º¯¼ö¿¡ ÀúÀå
	var isDim = $el.prev().hasClass('dimBg100');	//dimmed ·¹ÀÌ¾î¸¦ °¨ÁöÇÏ±â À§ÇÑ boolean º¯¼ö
	
	 $('.dim-layer100').fadeIn() ;
	 //$("#layer100").load("./sokbo_pop.asp");
	//$('#input_no').focus();

	var $elWidth = ~~($el.outerWidth()),
		$elHeight = ~~($el.outerHeight()),
		docWidth = $(document).width(),
		docHeight = $(document).height();

	// È­¸éÀÇ Áß¾Ó¿¡ ·¹ÀÌ¾î¸¦ ¶ç¿î´Ù.
	if ($elHeight < docHeight || $elWidth < docWidth) {
		$el.css({
			marginTop: -$elHeight /2,
			marginLeft: -$elWidth/2
		})
	} else {
		$el.css({top: 0, left: 0});
	}
	


	
	//------ºê·£µå-------//
	if ($('#silsa_brcdchk')[0].checked == true){

		chk = "brand";
		var select_brcd = $("#silsa_brcd").val();
	}
	else
	{	var select_brcd = "";
		chk = "ALL";
	}
	//------³âµµ--------//
	if ($('#silsa_yearchk')[0].checked == true){

		chk1 = "year";
		var select_year = $("#silsa_year").val();
	}
	else
	{	var select_year = "";
		chk1 = "ALL";
	}
	//------½ÃÁð--------//
	if ($('#silsa_seasonchk')[0].checked == true){

		chk2 = "season";
		var select_season = $("#silsa_season").val();
	}
	else
	{	var select_season = "";
		chk2 = "ALL";
	}
	//------¼ºº°--------//
	if ($('#silsa_sexchk')[0].checked == true){

		chk3 = "sex";
		var select_sex = $("#silsa_sex").val();
	}
	else
	{	var select_sex = "";
		chk3 = "ALL";
	}
	//------ÇüÅÂ--------//
	if ($('#silsa_itypechk')[0].checked == true){

		chk4 = "itype";
		var select_itype = $("#silsa_itype").val();
	}
	else
	{	var select_itype = "";
		chk4 = "ALL";
	}
	//------¾ÆÀÌÅÛ--------//
	if ($('#silsa_itemchk')[0].checked == true){

		chk5 = "item";
		var select_item = $("#silsa_item").val();
	}
	else
	{	var select_item = "";
		chk5 = "ALL";
	}



	
	var barcode = $('#silsa_barcode').val();
	var radiochk = $(":input:radio[name=silsa_radio]:checked").val();
	$('#tb_stocksearch1 > tbody').empty();
	$('#brcd_sum > tbody').empty();
	//$('#sildt_sum > tbody').empty();
	searching_open();
	var promise = $.ajax({   
			url: "./stock_select_search1.asp",
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
				
                console.log("Á¶È¸ ¼º°ø");	
                var t_data = "";
				var t_data1 = "";
				var t_data2 = "";
                for(var i = 0; i < jObject.data.length; i++) {
					
					var COST1 = parseInt(jObject.data[i].SILQTY) * parseInt(jObject.data[i].COST);
					var COST2 = parseInt(jObject.data[i].JEGO) * parseInt(jObject.data[i].COST);
					var COST3 = parseInt(COST1)-parseInt(COST2);
					var M_JEGO = parseInt(jObject.data[i].SILQTY) - parseInt(jObject.data[i].JEGO);
                    t_data += "<tr bgcolor='grey'><td align='center' bgcolor='white'>" + jObject.data[i].STYCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].COLCD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SIZECD + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].SILQTY + "</td>"
							+ "<td align='center' bgcolor='white'>" + jObject.data[i].JEGO + "</td>"
							+ "<td align='center' bgcolor='white'>" + M_JEGO + "</td>"
							+ "<td align='right' bgcolor='white'>"+ numberWithCommas(COST1) + "</td>"
							+ "<td align='right' bgcolor='white'>"+ numberWithCommas(COST2) + "</td>"
							+ "<td align='right' bgcolor='white'>"+ numberWithCommas(COST3) + "</td>"
							+ "<td align='center' bgcolor='white'>"+ jObject.data[i].NMIQTY + "</td>"
							+ "<td align='center' bgcolor='white'>"+ jObject.data[i].NMOQTY + "</td>"
							+ "</tr>";
                }
                $('#tb_stocksearch1').find('tbody').append(t_data);
				
				 for(var i = 0; i < jObject.data1.length; i++) {
					
					
                    t_data1 += "<tr ><td>" + jObject.data1[i].BRSNM + "</td>"
							+ "<td class ='layer100_label'>" + jObject.data1[i].T_SILQTY + " / " + jObject.data1[i].T_JEGO +  "</td>"
							+ "</tr>";
                }
				$('#brcd_sum').find('tbody').append(t_data1);
				
				 /*for(var i = 0; i < jObject.data2.length; i++) {
					
					
                    t_data2 += "<tr ><td>" + jObject.data2[i].SILDT + "</td>"
							+ "<td class ='layer100_label'>" + jObject.data2[i].DT_SILQTY + "</td>"
							+ "</tr>";
                }
				$('#sildt_sum').find('tbody').append(t_data2);*/

				$('#J_SILQTY').text(jObject.J_SILQTY);
				$('#O_SILQTY').text(jObject.O_SILQTY);
				var silsa_tot = parseInt(jObject.J_SILQTY) + parseInt(jObject.O_SILQTY);
				$('#silsa_tot').text(silsa_tot);
				total_count  = jObject.data.length + 1;
				searching_close();
            }
			
        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();
			
        }
    });
		promise.fail(function(data) {
			alert("stock_select fail : " + data);
			searching_close();
		});
	dt_sum();
}

function stocksearch_close1() {
	ArrList = [];
	$('.dim-layer100').fadeOut() ; // ´Ý±â ¹öÆ°À» Å¬¸¯ÇÏ¸é ·¹ÀÌ¾î°¡ ´ÝÈù´Ù.		
		total_count = 0 ;
		$('#tb_stocksearch > tbody').empty();
		$('#sel_barcode').val('');
stock_search();

	
}


function dt_sum(){
	
	itemsStr = JSON.stringify(ArrList);
	console.log(itemsStr);	
	$('#sildt_sum > tbody').empty();
	searching_open();
	var promise = $.ajax({   
			url: "./stock_select_dt.asp",
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
				
                console.log("Á¶È¸ ¼º°ø");	
                
				var t_data2 = "";
				
				 for(var i = 0; i < jObject.data2.length; i++) {
					
					var sildt = jObject.data2[i].SILDT;
                    t_data2 += "<tr ><td>" + sildt.substring(0,4)+"³â "+sildt.substring(4,6) +"¿ù "+sildt.substring(6,8) + "ÀÏ </td>"
							+ "<td class ='layer100_label'>" + jObject.data2[i].DT_SILQTY + "</td>"
							+ "</tr>";
                }
				$('#sildt_sum').find('tbody').append(t_data2);

				
				searching_close();
            }
			
        } catch (e) {
            console.log("error 1001 : " + e.toString());
			searching_close();
			
        }
    });
		promise.fail(function(data) {
			alert("stock_select fail : " + data);
			searching_close();
		});
}




$(document).on('click', 'input[id="silsa_brcdchk"]', function(){ //Ã¼Å©ÇØÁ¦½Ã ÀüÃ¼°ª ¼±ÅÃ
	var chk = $(this).is(":checked");          
                    if(chk){						


                    }else{
						//alert("Ã¼Å©ÇØÁ¦");
							$('#silsa_brcd').val("%").prop("selected", true);
                        
                    }
	
});

$(document).on('click', 'input[id="silsa_yearchk"]', function(){ //Ã¼Å©ÇØÁ¦½Ã ÀüÃ¼°ª ¼±ÅÃ
	var chk = $(this).is(":checked");          
                    if(chk){						


                    }else{
						//alert("Ã¼Å©ÇØÁ¦");
							$('#silsa_year').val("%").prop("selected", true);
                        
                    }
	
});

$(document).on('click', 'input[id="silsa_seasonchk"]', function(){ //Ã¼Å©ÇØÁ¦½Ã ÀüÃ¼°ª ¼±ÅÃ
	var chk = $(this).is(":checked");          
                    if(chk){						


                    }else{
						//alert("Ã¼Å©ÇØÁ¦");
							$('#silsa_season').val("%").prop("selected", true);
                        
                    }
	
});

$(document).on('click', 'input[id="silsa_sexchk"]', function(){ //Ã¼Å©ÇØÁ¦½Ã ÀüÃ¼°ª ¼±ÅÃ
	var chk = $(this).is(":checked");          
                    if(chk){						


                    }else{
						//alert("Ã¼Å©ÇØÁ¦");
							$('#silsa_sex').val("%").prop("selected", true);
                        
                    }
	
});

$(document).on('click', 'input[id="silsa_itypechk"]', function(){ //Ã¼Å©ÇØÁ¦½Ã ÀüÃ¼°ª ¼±ÅÃ
	var chk = $(this).is(":checked");          
                    if(chk){						


                    }else{
						//alert("Ã¼Å©ÇØÁ¦");
							$('#silsa_itype').val("%").prop("selected", true);
                        
                    }
	
});



$(document).on('click', 'input[name="all_silchk"]', function(){ //µ¿Àû »ý¼ºµÈ HTML¿¡¼­µµ ÀÛµ¿µÊ
    //var totLength = $(this).length; //ÀÌ°Ç Ç×»ó 1ÀÌ ³ª¿ÔÀ½
   /* var totLength = $('input[name="tpiSeqs"]').length; //ÀÌ°Ç ¿¹»óÇß´ø °³¼ö°¡ ³ª¿È
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
					
                      $('input[name*="sil_chk"]').prop('checked', true);
                    }else{
						//alert("Ã¼Å©ÇØÁ¦");
                      $('input[name*="sil_chk"]').prop('checked', false);
                    }
	
});


$(document).on('click', 'input[name="radiogroup"]', function(){ //µ¿Àû »ý¼ºµÈ HTML¿¡¼­µµ ÀÛµ¿µÊ
   
	
	var gubun  = $('#gubun').val();	
	var chk = $(this).is(":checked");
	var cnt = $("input[name=radiogroup]:checkbox:checked").length;
	productList = [];  
	var tr = $(this).parent().parent();
     var td = tr.children();
	//Ã¼Å©¹Ú½º Å¬¸¯½Ã »ö»ó º¯°æ
	

	if (cnt > 0)
	{
			var checkbox = $("input[name=radiogroup]:checked");
			
			// Ã¼Å©µÈ Ã¼Å©¹Ú½º °ªÀ» °¡Á®¿Â´Ù
			checkbox.each(function(i) {
	
				// checkbox.parent() : checkboxÀÇ ºÎ¸ð´Â <td>ÀÌ´Ù.
				// checkbox.parent().parent() : <td>ÀÇ ºÎ¸ðÀÌ¹Ç·Î <tr>ÀÌ´Ù.
				var tr = checkbox.parent().parent().eq(i);
				var td = tr.children();
				
				// td.eq(0)Àº Ã¼Å©¹Ú½º ÀÌ¹Ç·Î  td.eq(1)ÀÇ °ªºÎÅÍ °¡Á®¿Â´Ù.
			
				var sildt = td.eq(1).text();
				sildt = sildt.replace(/-/g,"");		
			
				// °¡Á®¿Â °ªÀ» ¹è¿­¿¡ ´ã´Â´Ù.
				var item = {
							sildt	: sildt
				};
				productList.push(item);
				
				
			});
			console.log(productList);
			


	}else
	{
		//$('#table_area1').find('tbody').empty();
	}
		
	if (productList.length > 1)
	{
		alert("½Ç»çÁý°è½Ã ÀÏÀÚ´Â ÇÏ³ª¸¸ ¼±ÅÃ °¡´ÉÇÕ´Ï´Ù.");
		$('input[name*="radiogroup"]').prop('checked', false);
	}



                  
	
});


