$(document).ready(function () {
    (function ($) {
        "use strict";

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
                        url: $.cookie('api_base_url') + "/api/user/create/",
                        success: function (data) {
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

        //orders list
        $.ajax({
            url: $.cookie('api_base_url') + "/api/order/cart/",
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
                var i = 0;
                for (i = 0; i < data.length; i++) {
                    var html = '<tr>'
                    html += '<td>' + data[i].items.length + '</td>'
                    html += '<td>$' + data[i].total + '</td>'
                    html += '<td>' + data[i].created_at + '</td>'
                    html += '<td><a class="pdf_download" id="'+data[i].id+'" href="#">Download as PDF</a></td>'
                    html += '<td><a href="#" class="btn btn-primary height-auto btn-sm remove-item"  id="' + data[i].id + '">X</a></td>'
                    html += '</tr>'

                    $('#checkoutTable tbody').prepend(html)
                }
            }
        });
    })(jQuery)

    $(document).on('click', '.remove-item', function () {
        alert('Are you sure you want to remove this item?');
        $(this).closest('tr').remove();

        $.ajax({
            url: $.cookie('api_base_url') + "/api/order/cart/" + this.id + '/',
            type: "DELETE",
            "headers": {
                "Authorization": "Token " + $.cookie('token'),
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            error: function (err) {
            }
        });
    });

    $(document).on('click', '.pdf_download', function (e) {
        e.preventDefault();

        $.ajax({
            url: $.cookie('api_base_url') + "/api/order/cart/"+this.id+"/receipt/",
            type: "GET",
            "headers": {
                "Authorization": "Token " + $.cookie('token'),
            },
            xhrFields: {
                withCredentials: true,
                responseType: 'blob'
            },
            crossDomain: true,
            success: function(blob){
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(blob);
                link.download="Receipt-" + new Date() + ".pdf";
                link.click();
            }
        });
    });
})