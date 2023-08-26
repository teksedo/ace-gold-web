$(function() {
    $("#buy-silver-form").validate({
        ignore: ".ignore",
        rules: {
            amountRs: {
                required: function () {
                    if ( $("#buy_silver_amount_in_gm").val() == '' ) {
                        return true;
                    } else if ( $("#buy_silver_amount_in_gm").val() == "0" ) {
                        return true;
                    } else {
                        return false;
                    }
                },
                number : true,
                //minlength : 1,
                maxlength : 12
            },
            amountGm: {
                required: function () {
                    if ( $("#buy_silver_amount_in_rs").val() == '' ) {
                        return true;
                    } else if ( $("#buy_silver_amount_in_rs").val() == "0" ) {
                        return true;
                    } else {
                        return false;
                    }
                },
                number : true,
                maxlength: 12
            },
        },
    });

    var update_gold_fields = function(response){
        $("#buy_silver_amount_in_rs").val(response.exl_gst_amount);
        $("#buy_silver_amount_in_gm").val(response.weight);
    };

    $("#buy_silver_amount_in_rs").inputFilter(function(value) {
        return /^\d*$/.test(value); 
    });

    $("#buy_silver_amount_in_rs").on("keyup", function(){

        var amount_rs = $(this).val();
        var amount_rs_new = amount_rs.replace(/^0+/, "");
        $(this).val(amount_rs_new);

        $("#buy_silver_amount_in_gm").val("");
        $("#buy_submit_form").attr("disabled", true);
        //$("#buy_silver_amount_in_gm").attr("readonly", true);

        $.ajax({
            url: buy_silver_ajax_request,
            type: "POST",
            headers: {
                'X-CSRF-TOKEN': csrf_token
            },
            data: new FormData($("#buy-silver-form")[0]),
            dataType: "json",
            processData : false,
            contentType : false,
            success: function (response) {
                if( response.code == 1 ){
                    $("#buy_silver_amount_in_gm").val(response.data.weight);
                } else {
                    Swal.fire("Error!", response.alert, "error");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if( typeof xhr.responseJSON.alert !== "undefined" ){
                    Swal.fire("Error!", xhr.responseJSON.alert, "error");
                } else {
                    Swal.fire("Error!", "Error occurs while perform operation.", "error");
                }
            }
        });

        $("#buy_submit_form").attr("disabled", false);
    });

    $("#buy_silver_amount_in_gm").on("keyup", function(){
        var el = document.getElementById("buy_silver_amount_in_gm");
        if(el.value > 0 && el.value < 1){
            el.value = el.value*1;
        }
        $("#buy_silver_amount_in_rs").val("");
        $("#buy_submit_form").attr("disabled", true);
        //$("#buy_silver_amount_in_rs").attr("readonly", true);
        $.ajax({
            url: buy_silver_ajax_request,
            type: "POST",
            headers: {
                'X-CSRF-TOKEN': csrf_token
            },
            data: new FormData($("#buy-silver-form")[0]),
            dataType: "json",
            processData : false,
            contentType : false,
            success: function (response) {
                if( response.code == 1 ){
                    $("#buy_silver_amount_in_rs").val(response.data.exl_gst_amount);
                } else {
                    Swal.fire("Error!", response.alert, "error");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if( typeof xhr.responseJSON.alert !== "undefined" ){
                    Swal.fire("Error!", xhr.responseJSON.alert, "error");
                } else {
                    Swal.fire("Error!", "Error occurs while perform operation.", "error");
                }
            }
        });

        $("#buy_submit_form").attr("disabled", false);
    });

    $("#buy_submit_form,#buy_silver_submit_form").on("click", function(e){

        if( $('#buy-silver-form').validate().form() ) {

            $(this).attr("disabled", true);

            $.ajax({
                url: buy_gold_availability_ajax_request,
                type: "POST",
                headers: {
                    'X-CSRF-TOKEN': csrf_token
                },
                data: new FormData($("#buy-silver-form")[0]),
                dataType: "json",
                processData : false,
                contentType : false,
                success: function (response) {
                    if( response.code == 1 ){
                        $("#buy-silver-form").submit();
                    } else {
                        Swal.fire("Error!", response.alert, "error");

                        if(response.route && response.route.length > 0) {
                            setTimeout(function(){ 
                                window.location.href = response.route;
                            }, 3000);
                        }
                        return false;
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if( typeof xhr.responseJSON.alert !== "undefined" ){
                        Swal.fire("Error!", xhr.responseJSON.alert, "error");
                    } else {
                        Swal.fire("Error!", "Error occurs while perform operation.", "error");
                    }
                    return false;
                }
            });

            $(this).attr("disabled", false);

            return false;
        }

        return false;
        
    });
});
