$.cookie('api_base_url', 'http://127.0.0.1:8000');
$(document).ready(function () {        
    (function ($) {
        "use strict";
        
        $(function () {
            $('#checkoutForm').validate({
                rules: {
                    items: {
                        required: true,
                    },
                    total: {
                        required: true,
                    }
                },
                messages: {
                    items: {
                        required: "Please add the cart items."
                    },
                    total: {
                        required: "Pleas add your total.",
                    }
                },
                submitHandler: function (form) {
                    $(form).ajaxSubmit({
                        type: "POST",
                        data: $(form).serialize(),
                        dataType: 'json',
                        url: "http://127.0.0.1:8000/api/order/cart/",
                        "headers": {
                            "Authorization": "Token " + $.cookie('token'),
                        },
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        success: function (data) {
                            window.location = "thankyou.html";
                        },
                        error: function (data) {
                        }
                    })
                }
            })
        })

        //checkout list
        $.ajax({
            url: "http://127.0.0.1:8000/api/order/cart-items/",
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
                var cartTotal = 0
                for (i=0;i<data.results.length;i++) {
                    var total_price = 0
                    total_price = (parseInt(data.results[i].quantity) * parseFloat(data.results[i].price))
                    cartTotal += total_price
                    
                    var html = '<tr>'
                    html += '<input type="hidden" name="items" value="'+data.results[i].id+'"/>'
                    html += '<td>'+data.results[i].name+'<strong class="mx-2">x</strong> '+data.results[i].quantity+'</td>'                    
                    html += '<td>'+total_price+'</td>'
                    html += '</tr>'
                    
                    $('#checkoutTable tbody').prepend(html)
                }
                $('#checkout_total').val(cartTotal)
                $('#checkoutTotal').html("$" + cartTotal)
            }
        });
    })(jQuery)    
})