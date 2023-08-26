$(function() {
    $("#send-sms-form").validate({
        ignore: ".ignore",
        rules: {
            home_get_app_number: {
                required: function () {
                    if ( $("#home_get_app_number").val() == '' ) {
                        return true;
                    } else if ( $("#buy_amount_in_gm").val() == "0" ) {
                        return true;
                    } else {
                        return false;
                    }
                },
                number : true,
                minlength : 10,
                maxlength : 10
            },
        },
    });

    $("#send_sms_form").on("click", function(e){

        if( $('#send-sms-form').validate().form() ) {

            $("#send_sms_form").attr("disabled", true);

            $.ajax({
                url: app_get_sms_request,
                type: "POST",
                headers: {
                    'X-CSRF-TOKEN': csrf_token
                },
                data: new FormData($("#send-sms-form")[0]),
                dataType: "json",
                processData : false,
                contentType : false,
                success: function (response) {
                    if( response.code == 1 ){
                        Swal.fire("Success!", response.alert, "success");
                        $('#send-sms-form')[0].reset();
                    } else {
                        Swal.fire("Error!", response.alert, "error");
                        return false;
                    }
                },
                // error: function (xhr, ajaxOptions, thrownError) {
                //     if( typeof xhr.responseJSON.alert !== "undefined" ){
                //         Swal.fire("Error!", xhr.responseJSON.alert, "error");
                //     } else {
                //         Swal.fire("Error!", "Error occurs while perform operation.", "error");
                //     }
                //     return false;
                // }
                error : function(data) {
                    var errors = data.responseJSON;
                    Swal.fire("Error!", errors, "error");
                }
            });

            $("#send_sms_form").attr("disabled", false);

            return false;
        }
        return false;
    });
});
