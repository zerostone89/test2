(function(jsGrid, $, undefined) {

    var Field = jsGrid.Field;

    function TextField(config) {
        Field.call(this, config);
    }

    TextField.prototype = new Field({

        autosearch: true,
		readOnly: false,

        filterTemplate: function() {
            if(!this.filtering)
                return "";

            var grid = this._grid,
                $result = this.filterControl = this._createTextBox();

			if(this.readOnly) {					
				return this.insertControl = this._createReadTextBox();
			} else {
				return this.insertControl = this._createTextBox();
			}

            if(this.autosearch) {
                $result.on("keypress", function(e) {
                    if(e.which === 13) {
                        grid.search();
                        e.preventDefault();
                    }
                });
            }

            return $result;
        },

        insertTemplate: function() {
            if(!this.inserting)
                return "";
			
			if(this.readOnly) {					
				return this.insertControl = this._createReadTextBox();
			} else {
				return this.insertControl = this._createTextBox();
			}

//            return this.insertControl = this._createTextBox();
        },
/*
			editTemplate: function(value) {
          var $result = jsGrid.fields.text.prototype.editTemplate.call(this, value);
          $result.on("keydown", function(e) {
            if(e.which === 13) {
                $("#jsGrid").jsGrid("updateItem");
                return false;
            }
          });
          return $result;
        },*/
		
        editTemplate: function(value) {
            if(!this.editing)
                return this.itemTemplate.apply(this, arguments);

			if(this.readOnly) {
				var $result = this.editControl = this._createLabel(value);
				//value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				$result.val(value);
				/*
				$result.on("keydown", function(e) {
					if(e.which === 13) {
						$("#jsGrid").jsGrid("updateItem");
						$('#input_barcode').focus();
						//return false;
					}
				});
				*/
				//$('#input_barcode').focus();
				return $result;
			} else {
				var $result = this.editControl = this._createTextBox();
				//value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				$result.val(value);
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
					setWorkType(2);
					this.select();
					setInput(this);
					if(value.length > 0) {
						clear_flag = true;
					}
					//currentRow(item);
				});
				
				return $result;
			}
        },

        filterValue: function() {
            return this.filterControl.val();
        },

        insertValue: function() {
            return this.insertControl.val();
        },

        editValue: function() {
            return this.editControl.val();
        },

        _createTextBox: function() {
            return $("<input>").attr("type", "text")
                .prop("readonly", !!this.readOnly);
        },
		_createReadTextBox: function() {
            return $("<input>").attr("type", "text")
                .prop("readonly", true)
				.prop("disabled", true);
        },

		_createLabel: function(value) {
			//value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return $("<label>").text(value);
		}
    });

    jsGrid.fields.text = jsGrid.TextField = TextField;

}(jsGrid, jQuery));
