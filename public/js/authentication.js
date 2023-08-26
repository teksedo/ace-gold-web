var registraion_form_id = "popup-register-form",
    resend_otp_form_id = "popup-resend-otp-form",
    verify_otp_form_id = "popup-verify-otp-form",
    login_form_id = "popup-login-form",
    change_mn_form_id = "popup-change-mobile-number-form",
    change_mn_form_link = "change-mobile-number-link",
    form_btn = "-btn",
    form_loader = "-loader",
    form_popup = "-popup",
    _gaq = _gaq || [],
    envname_env = "production", 
    update_signup_form_fields = function(mn,uuid, std, email){
        $("#mobile_number_span").html(mn);
        $("#email_ID_span").html(email);
        $("#otp_mobile_number").val(mn);
        $("#old_mobile_number").val(mn);
        $("#old_std_code").val(std);
        $("#resend_mobile_number").val(mn);
        $("#otp_std_code").val(std);
        $("#otp_id").val(uuid);
        $("#mobile_id").val(uuid);
        $("#resend_id").val(uuid);
        $("#resend_std_code").val(std);
    },
    signup_recaptcha_callback = function(response){
        update_recaptcha_field("hiddenSignupRecaptcha", response);
    },
    signup_expired_recaptcha_callback = function(){
        reset_recaptcha_field("hiddenSignupRecaptcha");
    },
    signup_otp_recaptcha_callback = function(response){
        update_recaptcha_field("hiddenSignupOTPRecaptcha", response);
    },
    signup_otp_expired_recaptcha_callback = function(){
        reset_recaptcha_field("hiddenSignupOTPRecaptcha");
    },
    change_mn_recaptcha_callback = function(response){
        update_recaptcha_field("hiddenChangeMNRecaptcha", response);
    },
    change_mn_expired_recaptcha_callback = function(){
        reset_recaptcha_field("hiddenChangeMNRecaptcha");
    },
    login_recaptcha_callback = function(response){
        update_recaptcha_field("hiddenLoginRecaptcha", response);
    },
    login_expired_recaptcha_callback = function(){
        reset_recaptcha_field("hiddenLoginRecaptcha");
    };

$(function() {

    $(document).on('click', id_sign + "open-sign-up-form", function(e) {
        e.preventDefault();

        $(id_sign + registraion_form_id + form_popup).modal('show');
        $(id_sign + login_form_id + form_popup).modal('hide');
    });

    $(document).on('click', id_sign + "open-login-form", function(e) {
        e.preventDefault();

        $(id_sign + change_mn_form_id + form_popup).modal('hide');
        $(id_sign + registraion_form_id + form_popup).modal('hide');
        $(id_sign + login_form_id + form_popup).modal('show');
    });

    $(id_sign + registraion_form_id).validate({
        ignore: ".ignore",
        rules: {
            first_name: {
                required: true,
                maxlength : 50
            },
            middle_name: {
               // required: true,
                maxlength : 50
            },
            last_name: {
                required: true,
                maxlength : 50
            },
            mobile_number: {
                required: true,
                number : true,
                minlength : 10,
                maxlength : 10
            },
            email: {
                required: true,
                email: true,
                maxlength: 100
            },
            hiddenRecaptcha: {
                required: function () {
                    if (grecaptcha.getResponse() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },

        messages: {},

        submitHandler: function(form) {
            
            $(id_sign + registraion_form_id + form_btn).attr("disabled", true);
            $(id_sign + registraion_form_id + form_loader).css("display", "block");

            $.ajax({
                url: $(id_sign + registraion_form_id).attr("action"),
                type: "POST",
                headers: {
                    'X-CSRF-TOKEN': csrf_token
                },
                data: new FormData($(id_sign + registraion_form_id)[0]),
                dataType: "json",
                processData : false,
                contentType : false,
                success: function (response) {

                    if( response.code == 1 ){

                        /*Append values*/
                        update_signup_form_fields(response.data.mobile_number, response.data.otp_id, response.data.std_code, response.data.email);

                        /*Reset Form*/
                        $(id_sign + registraion_form_id)[0].reset();

                        $(id_sign + registraion_form_id + form_popup).modal('hide');
                        $(id_sign + verify_otp_form_id + form_popup).modal('show');
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

            $(id_sign + registraion_form_id + form_btn).attr("disabled", false);
            $(id_sign + registraion_form_id + form_loader).css("display", "none");
            return false;
        }
    });

    $(document).on('click', class_sign+'resend_otp', function(e) {
        e.preventDefault();
        $(id_sign + resend_otp_form_id).submit();
    });

    $(id_sign + resend_otp_form_id).validate({
        ignore: ".ignore",
        rules: {
            resend_mobile_number: {
                required: true,
                number : true,
                minlength : 10,
                maxlength : 10
            },
            resend_id: {
                required: true
            },
        },

        messages: {},

        submitHandler: function(form) {
            
            $(id_sign + verify_otp_form_id + form_btn).attr("disabled", true);
            $(id_sign + verify_otp_form_id + form_loader).css("display", "block");

            $.ajax({
                url: $(id_sign + resend_otp_form_id).attr("action"),
                type: "POST",
                headers: {
                    'X-CSRF-TOKEN': csrf_token
                },
                data: new FormData($(id_sign + resend_otp_form_id)[0]),
                dataType: "json",
                processData : false,
                contentType : false,
                success: function (response) {

                    if( response.code == 1 ){

                        /*Append values*/
                        update_signup_form_fields(response.data.mobile_number, response.data.otp_id, response.data.std_code);

                        Swal.fire("Success!", response.alert, "success");
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

            $(id_sign + verify_otp_form_id + form_btn).attr("disabled", false);
            $(id_sign + verify_otp_form_id + form_loader).css("display", "none");
            return false;
        }
    });

    $(id_sign + verify_otp_form_id).validate({
        ignore: ".ignore",
        rules: {
            otp_mobile_number: {
                required: true,
                number : true,
                minlength : 10,
                maxlength : 10
            },
            otp_id: {
                required: true
            },
            otp: {
                required: true,
                maxlength: 6
            },
            hiddenRecaptcha: {
                required: function () {
                    if (grecaptcha.getResponse() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },

        messages: {},

        submitHandler: function(form) {
            
            $(id_sign + verify_otp_form_id + form_btn).attr("disabled", true);
            $(id_sign + verify_otp_form_id + form_loader).css("display", "block");

            $.ajax({
                url: $(id_sign + verify_otp_form_id).attr("action"),
                type: "POST",
                headers: {
                    'X-CSRF-TOKEN': csrf_token
                },
                data: new FormData($(id_sign + verify_otp_form_id)[0]),
                dataType: "json",
                processData : false,
                contentType : false,
                success: function (response) {

                    if( response.code == 1 ){

                        /*Reset Form*/
                        $(id_sign + verify_otp_form_id)[0].reset();

                        $(id_sign + verify_otp_form_id + form_popup).modal('hide');

                        if(response.data.redirect){
                            if(response.data.is_register != undefined && response.data.is_register == '0'){
                                if( envname_env == 'production' ){
                                    _gaq.push(['_trackEvent', 'Register', 'clicked']);
                                    gtag('event', 'conversion', {'send_to': 'AW-10818945000/N0o_CMPU4IcDEOj_76Yo'});
                                    ! function(f, b, e, v, n, t, s) {
                                        if (f.fbq) return;
                                        n = f.fbq = function() {
                                            n.callMethod ?
                                                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                                        };
                                        if (!f._fbq) f._fbq = n;
                                        n.push = n;
                                        n.loaded = !0;
                                        n.version = '2.0';
                                        n.queue = [];
                                        t = b.createElement(e);
                                        t.async = !0;
                                        t.src = v;
                                        s = b.getElementsByTagName(e)[0];
                                        s.parentNode.insertBefore(t, s)
                                    }(window, document, 'script',
                                        'https://connect.facebook.net/en_US/fbevents.js');
                                    fbq('init', '469528951321099');                                  
                                    fbq('track', 'CompleteRegistration', {currency: "INR", value: 1.00});
                                }
                            }
                            window.location.href = response.data.href;
                        }
                        
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

            $(id_sign + verify_otp_form_id + form_btn).attr("disabled", false);
            $(id_sign + verify_otp_form_id + form_loader).css("display", "none");
            return false;
        }
    });

    $(document).on('click', class_sign + change_mn_form_link, function(e) {
        e.preventDefault();

        $(id_sign + verify_otp_form_id + form_popup).modal('hide');
        $(id_sign + change_mn_form_id + form_popup).modal('show');
    });

    $(id_sign + change_mn_form_id).validate({
        ignore: ".ignore",
        rules: {
            old_mobile_number: {
                required: true,
                number : true,
                minlength : 10,
                maxlength : 10
            },
            new_mobile_number: {
                required: true,
                number : true,
                minlength : 10,
                maxlength : 10
            },
            hiddenRecaptcha: {
                required: function () {
                    if (grecaptcha.getResponse() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },

        messages: {},

        submitHandler: function(form) {
            
            $(id_sign + change_mn_form_id + form_btn).attr("disabled", true);
            $(id_sign + change_mn_form_id + form_loader).css("display", "block");

            $.ajax({
                url: $(id_sign + change_mn_form_id).attr("action"),
                type: "POST",
                headers: {
                    'X-CSRF-TOKEN': csrf_token
                },
                data: new FormData($(id_sign + change_mn_form_id)[0]),
                dataType: "json",
                processData : false,
                contentType : false,
                success: function (response) {

                    if( response.code == 1 ){

                        /*Reset Form*/
                        $(id_sign + change_mn_form_id)[0].reset();

                        /*Append values*/
                        update_signup_form_fields(response.data.mobile_number, response.data.mobile_id, response.data.std_code);

                        $(id_sign + change_mn_form_id + form_popup).modal('hide');
                        $(id_sign + verify_otp_form_id + form_popup).modal('show');
                        
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

            $(id_sign + change_mn_form_id + form_btn).attr("disabled", false);
            $(id_sign + change_mn_form_id + form_loader).css("display", "none");
            return false;
        }
    });

    $(id_sign + login_form_id).validate({
        ignore: ".ignore",
        rules: {
            login_mobile_number: {
                required: true,
                number : true,
                minlength : 10,
                maxlength : 10
            },
            hiddenRecaptcha: {
                required: function () {
                    if (grecaptcha.getResponse() == '') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        },

        messages: {},

        submitHandler: function(form) {
            
            $(id_sign + login_form_id + form_btn).attr("disabled", true);
            $(id_sign + login_form_id + form_loader).css("display", "block");

            $.ajax({
                url: $(id_sign + login_form_id).attr("action"),
                type: "POST",
                headers: {
                    'X-CSRF-TOKEN': csrf_token
                },
                data: new FormData($(id_sign + login_form_id)[0]),
                dataType: "json",
                processData : false,
                contentType : false,
                success: function (response) {

                    if( response.code == 1 ){

                        /*Append values*/
                        update_signup_form_fields(response.data.mobile_number, response.data.login_id, response.data.std_code, response.data.email);

                        /*Reset Form*/
                        $(id_sign + login_form_id)[0].reset();

                        $(id_sign + login_form_id + form_popup).modal('hide');
                        $(id_sign + verify_otp_form_id + form_popup).modal('show');
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

            $(id_sign + login_form_id + form_btn).attr("disabled", false);
            $(id_sign + login_form_id + form_loader).css("display", "none");
            return false;
        }
    });
});