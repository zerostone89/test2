(function(jsGrid, $, undefined) {

    var NumberField = jsGrid.NumberField;
    var numberValueType = "number";
    var stringValueType = "string";

    function SelectField(config) {
        this.items = [];
        this.selectedIndex = -1;
        this.valueField = "";
        this.textField = "";

        if(config.valueField && config.items.length) {
            var firstItemValue = config.items[0][config.valueField];
            this.valueType = (typeof firstItemValue) === numberValueType ? numberValueType : stringValueType;
        }

        this.sorter = this.valueType;

        NumberField.call(this, config);
    }

    SelectField.prototype = new NumberField({

        align: "center",
        valueType: numberValueType,

        itemTemplate: function(value) {
            var items = this.items,
                valueField = this.valueField,
                textField = this.textField,
                resultItem;

            if(valueField) {
                resultItem = $.grep(items, function(item, index) {
                    return item[valueField] === value;
                })[0] || {};
            }
            else {
                resultItem = items[value];
            }

            var result = (textField ? resultItem[textField] : resultItem);
			
            return (result === undefined || result === null) ? "" : result;
        },

        filterTemplate: function() {
            if(!this.filtering)
                return "";

            var grid = this._grid,
                $result = this.filterControl = this._createSelect();

            if(this.autosearch) {
                $result.on("change", function(e) {
                    grid.search();
                });
            }

            return $result;
        },

        insertTemplate: function() {
            if(!this.inserting)
                return "";

            return this.insertControl = this._createSelect();
        },

        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

            var $result = this.editControl = this._createSelect();
            (value !== undefined) && $result.val(value);


			$result.val(value);
			$result.on("mousedown", function(e) {
				$result.val("0");
				return true;
			});
			/*
			$result.on("keydown", function(e) {
					if(e.which === 13) {
						$("#jsGrid").jsGrid("updateItem");
						//setSIPRICE();
						updateItems();
						$('#input_barcode').focus();
						//return false;
					}
				});
			*/
			$result.on("click", function() {
				//this.select();
				//setInput(this);
				//currentRow(item);
			});
			$result.on("change", function() {
				/*
				if (custom_cd == "")
				{
					if (args[3].MGSEL != "1")
					{
						// 대상 고객을 등록하지 않았을 때 Edit 취소
						$("#jsGrid").jsGrid("cancelEdit");
						alert("고객정보를 먼저 검색하셔야 합니다.");
						$('#input_cus_nm').focus();
					}					
				} else {
					// 대상 고객이 있을 경우 마일리지 & 상품권 선택 가능
					$("#jsGrid").jsGrid("updateItem");
					updateItems();
				}*/

				$("#jsGrid").jsGrid("updateItem");
				selectMilCoupon();
				//setSIPRICE();
				//$('#input_barcode').focus();
				
			});
            return $result;
        },

        filterValue: function() {
            var val = this.filterControl.val();
            return this.valueType === numberValueType ? parseInt(val || 0, 10) : val;
        },

        insertValue: function() {
            var val = this.insertControl.val();
            return this.valueType === numberValueType ? parseInt(val || 0, 10) : val;
        },

        editValue: function() {
            var val = this.editControl.val();
            return this.valueType === numberValueType ? parseInt(val || 0, 10) : val;
        },

        _createSelect: function() {
            var $result = $("<select>"),
                valueField = this.valueField,
                textField = this.textField,
                selectedIndex = this.selectedIndex;

            $.each(this.items, function(index, item) {
                var value = valueField ? item[valueField] : index,
                    text = textField ? item[textField] : item;

                var $option = $("<option>")
                    .attr("value", value)
                    .text(text)
                    .appendTo($result);

                $option.prop("selected", (selectedIndex === index));
            });

            $result.prop("disabled", !!this.readOnly);

            return $result;
        }
    });

    jsGrid.fields.select = jsGrid.SelectField = SelectField;

}(jsGrid, jQuery));
