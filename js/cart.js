$.cookie('api_base_url', 'http://127.0.0.1:8000');
$(document).ready(function () {        
    (function ($) {
        "use strict";
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
              console.log(err);
            },
            success: function (data) {
                var i = 0;
                var cartTotal = 0
                for (i=0;i<data.results.length;i++) {
                    var total_price = 0
                    total_price = (parseInt(data.results[i].quantity) * parseFloat(data.results[i].price))
                    cartTotal += total_price
                    var html = '<tr>'
                    html += '<td class="product-name">'
                    html += '<h2 class="h5 text-black">' + data.results[i].name + '</h2>'
                    html += '<td>' + data.results[i].price + '</td>'
                    html += '<td>' + data.results[i].quantity + '</td>'
                    html += '<td>$' + total_price + '</td>'
                    html += '<td><a href="#" class="btn btn-primary height-auto btn-sm remove-item" data-total='+total_price+' id="'+data.results[i].id+'">X</a></td>'
                    html += '</tr>'
                    
                    $('#cartTable tbody').append(html)
                }
                $('#cart_total').val(cartTotal)
                $('#cartTotal').html("$" + cartTotal)
            }
        });
    })(jQuery)

    $(document).on('click', '.remove-item', function () {
        alert('Are you sure you want to remove this item?');
        $(this).closest('tr').remove();
        $('.number').html(parseInt($('.number').html(), 10) - 1)
        $('.number').html()
        cart_total = parseFloat($('#cart_total').val());
        cart_total -= parseFloat($(this).attr("data-total"));
        $('#cart_total').val(cart_total)
        $('#cartTotal').html("$" + cart_total)
        $.ajax({            
            url: "http://127.0.0.1:8000/api/order/cart-items/" + this.id + '/',
            type: "DELETE",
            "headers": {
              "Authorization": "Token " + $.cookie('token'),
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            error: function (err) {
              console.log(err);
            }
        });        
    });
})