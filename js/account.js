$(document).ready(function () {

    (function ($) {
        "use strict";


        jQuery.validator.addMethod('answercheck', function (value, element) {
            return this.optional(element) || /^\bcat\b$/.test(value)
        }, "type the correct answer -_-");

        // validate Create Account form
        $(function () {
            $('#createAccountForm').validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    name: {
                        required: true,
                    },
                    password: {
                        required: true,
                        minlength : 5,
                    },
                    confirm_password: {
                        required: true,
                        minlength : 5,
                        equalTo : "#password"
                    }
                },
                messages: {
                    email: {
                        required: "Please add your email."
                    },
                    name: {
                        required: "Please add your name.",
                    },                    
                    password: {
                        required: "Please add your password.",
                        minlength : "Password should be at least 5 characters.",
                    },
                    confirm_password: {
                        required: "Please repeat your password.",
                        minlength : "Password should be at least 5 characters.",
                        equalTo : "Confirm password should match password."
                    },
                },
                submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        dataType: 'json',
                        url: "http://127.0.0.1:8000/api/user/create/",
                        success: function (data) {
                            console.log(data)
                            $('#createAccountForm :input').attr('disabled', 'disabled');
                            $('#createAccountForm').fadeTo("slow", 1, function () {
                                $(this).find(':input').attr('disabled', 'disabled');
                                $(this).find('label').css('cursor', 'default');
                                $('#successCreateAccount').fadeIn()
                                $('.modal').modal('hide');
                                $('#successCreateAccount').modal('show');
                            })
                        },
                        error: function (data) {
                            $('#createAccountError').empty();
                            $('#createAccountError').removeClass("d-none");

                            $.each(data.responseJSON, function(key,valueObj){
                                $('#createAccountError').append("<p>" + key + " : " + valueObj + "</p>");
                            });
                        }
                    })
                }
            })
        })

    })(jQuery)
})