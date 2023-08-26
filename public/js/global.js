var id_sign = "#",
    class_sign = ".",
    csrf_token = $('meta[name="csrf-token"]').attr('content'),
    update_recaptcha_field = function(field, response){
        $(id_sign+field).val(response);
    },
    reset_recaptcha_field = function(field){
        $(id_sign+field).val("");
    },
    get_counties = function(){
        $.ajax({
            url: COUNTRY_URL,
            type: "POST",
            headers: {
                'X-CSRF-TOKEN': csrf_token
            },
            data: {},
            dataType: "json",
            processData : false,
            contentType : false,
            success: function (response) {
                if( response.code == 1 ){
                    var return_data = '<option value="">Select Country</option>';

                    if( response.data.length > 0 ){
                        for (var i = 0; i < response.data.length; i++) {
                            return_data += '<option value="'+response.data[i].id+'">'+response.data[i].country_name+'</option>';
                        }
                    }
                    $("#countries_id").html(return_data).selectpicker('refresh');
                    $("#countries_id").val(countires_id).selectpicker('refresh');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {}
        });
    },

    get_states = function(c_id){
        $.ajax({
            url: STATE_URL,
            type: "POST",
            headers: {
                'X-CSRF-TOKEN': csrf_token
            },
            data: {
                countries_id: c_id
            },
            dataType: "json",
            success: function (response) {
                if( response.code == 1 ){
                    var return_data = '<option value="">Select State</option>';

                    if( response.data.length > 0 ){
                        for (var i = 0; i < response.data.length; i++) {
                            return_data += '<option value="'+response.data[i].id+'">'+response.data[i].state_name+'</option>';
                        }
                    }
                    $("#states_id").html(return_data).selectpicker('refresh');
                    $("#states_id").val(states_id).selectpicker('refresh');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {}
        });
    },

    get_cities = function(s_id){
        $.ajax({
            url: CITY_URL,
            type: "POST",
            headers: {
                'X-CSRF-TOKEN': csrf_token
            },
            data: {
                states_id: s_id
            },
            dataType: "json",
            success: function (response) {
                if( response.code == 1 ){
                    var return_data = '<option value="">Select City</option>';

                    if( response.data.length > 0 ){
                        for (var i = 0; i < response.data.length; i++) {
                            return_data += '<option value="'+response.data[i].id+'">'+response.data[i].city_name+'</option>';
                        }
                    }
                    $("#cities_id").html(return_data).selectpicker('refresh');
                    $("#cities_id").val(cities_id).selectpicker('refresh');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {}
        });
    };
    
$(function() {

    $.validator.setDefaults({ 
        errorPlacement: function(error, element) {
            //if (element.attr("name") == "category_id" ) {
            if(element[0].className.indexOf("select2") != -1){
                error.insertAfter("#" + element.attr("name") + " + .select2-container");
            } else if(element[0].className.indexOf("selectpicker") != -1){
                error.insertAfter("#" + element.attr("name") + " + .bootstrap-select");
            } else if(element[0].className.indexOf("checkbox") != -1){
                error.insertAfter("#" + element.attr("name") + " + .label");
            } else {
                error.insertAfter(element);
            }
        },
        success: function(label) {
            label.remove();
        }
    });

    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    };

    $(class_sign + 'form-control').on('focus', function(e) {
        e.preventDefault();
        $(this).attr("autocomplete", "off");  
    });

    $.validator.addMethod(
        "pan",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check enter valid PAN Number."
    );

    $.validator.addMethod(
        "gst",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check enter valid GSTIN Number."
    );

    $(".select2").select2({
        dropdownAutoWidth: true,
        width: '100%'
    });

    var maxBirthdayDate = new Date();
    maxBirthdayDate.setFullYear( maxBirthdayDate.getFullYear() - 18 );

    $(".dob").datetimepicker({
        format:'DD/MM/YYYY',
        ignoreReadonly: true,
    }).on('dp.show', function(){
        $(".dob").data("DateTimePicker").maxDate( moment( maxBirthdayDate.getFullYear() + '-12-31') );
    });

    if( typeof tbl_url !== "undefined" ){
        var bfilter = true;
        if( typeof tbl_search !== "undefined" ){
            bfilter = tbl_search;
        }
        tbl_obj = $(tbl_id).DataTable({
           processing: true,
           serverSide: true,
           ajax: tbl_url,
           columns:tbl_cols,
           'order': [[0, 'desc']],
           "bFilter": bfilter
        });    
    }

    

    if( is_country == true ){
        get_counties();    
    }

    $(document).on("change", "#countries_id", function(e){
        get_states($(this).val());
    });

    $(document).on("change", "#states_id", function(e){
        get_cities($(this).val());
    });
});
