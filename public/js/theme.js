$(function() {
    var buy_back_form = "buy-back-form";

    $(id_sign + buy_back_form).validate({
        ignore: ".ignore",
        rules: {
            first_name: {
                required: true,
                maxlength : 50
            },
            middle_name: {
                required: true,
                maxlength : 50
            },
            last_name: {
                required: true,
                maxlength : 50
            },
            invoice_id: {
                required: true,
            },
            contact_number: {
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
    });
    var contact_us_form = "contact-us-form";

    $(id_sign + contact_us_form).validate({
        ignore: ".ignore",
        rules: {
            name: {
                required: true,
                maxlength : 50
            },
            email: {
                required: true,
                email: true,
                maxlength: 100
            },
            mobile: {
                required: true,
                number : true,
                minlength : 10,
                maxlength : 10
            },
            message: {
                required: true,
                maxlength: 1000
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
    });

    var jewellers_program_form = "jewellers-program-form";

    $(id_sign + jewellers_program_form).validate({
        ignore: ".ignore",
        rules: {
            name: {
                required: true,
                maxlength : 50
            },
            email: {
                required: true,
                email: true,
                maxlength: 100
            },
            mobile: {
                required: true,
                number : true,
                minlength : 10,
                maxlength : 10
            },
            message: {
                required: true,
                maxlength: 1000
            },
        },
    });

    var vault_keeper_contact_us_form = "vault-keeper-contact-us-form";

    $(id_sign + vault_keeper_contact_us_form).validate({
        ignore: ".ignore",
        rules: {
            f_name: {
                required: true,
                maxlength : 50
            },
            email: {
                required: true,
                email: true,
                maxlength: 100
            },
            std_code: {
                required: true,
                number : true,
                minlength : 1,
                maxlength : 3
            },
            mobile: {
                required: true,
                number : true,
                minlength : 10,
                maxlength : 10
            },
            message: {
                required: true,
                maxlength: 1000
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
    });
});
$("#jewellerRegisterBtn").click(function() {
    $('html, body').animate({
        scrollTop: $("#jewellers-program-form").offset().top
    },100);
});