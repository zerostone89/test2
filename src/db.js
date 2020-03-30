(function() {

    var db = {
		/*
        loadData: function(filter) {
            //return $.grep(this.clients, function(client) {
            //    return 1;
            //});
        },
		*/
        insertItem: function(insertingClient) {
			this.clients.push(insertingClient);	
        },

        updateItem: function(updatingClient) { 
			//currentItem = null; 
			//$('#input_barcode').focus();
		},

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.clients);
            this.clients.splice(clientIndex, 1);
        }

    };

    window.db = db;

    db.countries = [
        { Name: "", Id: 0 },
        { Name: "United States", Id: 1 },
        { Name: "Canada", Id: 2 },
        { Name: "United Kingdom", Id: 3 },
        { Name: "France", Id: 4 },
        { Name: "Brazil", Id: 5 },
        { Name: "China", Id: 6 },
        { Name: "Russia", Id: 7 }
    ];

    /*
    db.clients = [
        {
            "Name": "Otto Clay",
            "Age": 61,
            "Country": 6,
            "Address": "Ap #897-1459 Quam Avenue",
            "Married": false
        },
        {
            "Name": "Connor Johnston",
            "Age": 73,
            "Country": 7,
            "Address": "Ap #370-4647 Dis Av.",
            "Married": false
        }
    ];
    */


    db.clients = [];

	// async false : 동기
	var promise = $.ajax({   
			url: "./search_gift_list.asp",
			type: "POST",  															
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			datatype: 'json',
			cache: true,
			async: false, 
	});
	promise.done(function(data) {
		//alert("done : " + data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {				
			alert(jObject.msg);
			//$('#input_gift_no').select();
		} else if (jObject.error == "0") {
			//var items = $("#jsGrid5-2").jsGrid("option", "data");
			//alert("영수증 결과 있음(" + jObject.count + "개)");
			//alert(jObject.msg);
			gift_list = jObject.data;												
		}		
	});
	promise.fail(function(data) {
		alert("할인금액권 loadData fail : " + data);
		//$('#input_gift_no').val("");
	});	

	// async false : 동기
	var promise = $.ajax({   
			url: "./search_coupon_list.asp",
			type: "POST",  															
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",			
			datatype: 'json',
			cache: true,
			async: false, 
	});
	promise.done(function(data) {
		//alert("done : " + data);
		var jObject = JSON.parse(data);
		if (jObject.error == "1") {				
			alert(jObject.msg);
			//$('#input_gift_no').select();
		} else if (jObject.error == "0") {
			//var items = $("#jsGrid5-2").jsGrid("option", "data");
			//alert("영수증 결과 있음(" + jObject.count + "개)");
			//alert(jObject.msg);
			coupon_list = jObject.data;												
		}		
	});
	promise.fail(function(data) {
		alert("할인금액권 loadData fail : " + data);
		//$('#input_gift_no').val("");
	});	

	
	
	//할인권/쿠폰 List
	db.gift_list = gift_list;
	// 할인금액권 List
	db.coupon_list = coupon_list;


}());
