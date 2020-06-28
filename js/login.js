$(document).ready(function () {    
    (function ($) {
        "use strict";


        jQuery.validator.addMethod('answercheck', function (value, element) {
            return this.optional(element) || /^\bcat\b$/.test(value)
        }, "type the correct answer -_-");

        // validate Login form
        $(function () {
            $('#loginForm').validate({
                rules: {
                    email: {
                        required: true,
                        email: true,
                    },
                    password: {
                        required: true,
                        minlength: 5
                    }
                },
                messages: {
                    email: {
                        required: "Please add your email."
                    },
                    password: {
                        required: "Pleas add your password.",
                        minlength: "Password should be at least 5 characters."
                    }
                },
                submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        dataType: 'json',
                        url: $.cookie('api_base_url') + "/api/user/token/",
                        success: function (data) {
                            $.cookie('token', data.token);
                            $('#loginForm :input').attr('disabled', 'disabled');
                            $('#loginForm').fadeTo("slow", 1, function () {
                                $(this).find(':input').attr('disabled', 'disabled');
                                $(this).find('label').css('cursor', 'default');
                                $('#successLogin').fadeIn()
                                $('.modal').modal('hide');
                                $('#successLogin').modal('show');
                            });

                            $.ajax({
                                url: $.cookie('api_base_url') + "/api/anyline/",
                                dataType: 'json',
                                type: "GET",
                                "headers": {
                                  "Authorization": "Token " + $.cookie('token'),
                                },
                                xhrFields: {
                                    withCredentials: true
                                },
                                crossDomain: true,
                                error: function (err) {
                                },
                                success: function (data) {
                                    $.cookie('anyline', data[0].licence_text)
                                }
                            });

                            $.get($.cookie('api_base_url') + "/api/shop/shops/", function(data, status){
                                $.cookie('shop', data[0].id);
                            });
                        },
                        error: function (data) {
                            $('#loginError').empty();
                            $('#loginError').removeClass("d-none");

                            $.each(data.responseJSON, function(key,valueObj){
                                $('#loginError').append("<p>" + key + " : " + valueObj + "</p>");
                            });
                            $('#loginForm').fadeTo("slow", 1, function () {
                                $('#error').fadeIn()
                                $('#error').html(data.responseJSON.non_field_errors)
                                $('.modal').modal('hide');
                                $('#error').modal('show');
                            })
                        }
                    })
                }
            })
        })

    })(jQuery)
})