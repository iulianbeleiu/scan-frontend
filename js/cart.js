$(document).ready(function () {
    (function ($) {
        "use strict";


        //add to cart
        $.ajax({
            url: $.cookie('api_base_url') + "/api/order/cart-items/",
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
                for (i = 0; i < data.results.length; i++) {
                    var total_price = 0
                    total_price = (parseInt(data.results[i].quantity) * parseFloat(data.results[i].price))
                    cartTotal += total_price
                    var html = '<tr>'
                    html += '<td class="product-name">'
                    html += '<h2 class="h5 text-black">' + data.results[i].name + '</h2>'
                    html += '<td>' + data.results[i].price + '</td>'
                    html += '<td><div class="input-group mb-3" style="max-width: 120px;"><div class="input-group-prepend"><button class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button></div>'
                    html += '<input type="text" data-id="' + data.results[i].id + '" readonly class="form-control text-center" value="' + data.results[i].quantity + '" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">'
                    html += '<div class="input-group-append"><button class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button></div></div></td>'
                    html += '<td>$' + total_price + '</td>'
                    html += '<td><a href="#" class="btn btn-primary height-auto btn-sm remove-item" data-quantity=' + data.results[i].quantity + ' data-total=' + total_price + ' id="' + data.results[i].id + '">X</a></td>'
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

        var quantity = parseInt($(this).attr("data-quantity"));
        $('.number').html(parseInt($('.number').html(), 10) - quantity)
        $('.number').html()

        cart_total = parseFloat($('#cart_total').val());
        cart_total -= parseFloat($(this).attr("data-total"));
        $('#cart_total').val(cart_total)
        $('#cartTotal').html("$" + cart_total)
        $.ajax({
            url: $.cookie('api_base_url') + "/api/order/cart-items/" + this.id + '/',
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

    $(document).on('click', '.js-btn-minus', function (e) {
        e.preventDefault();
        var quantity = parseInt($(this).closest('.input-group').find('.form-control').val());
        if (quantity > 1) {
            if (quantity != 0) {
                cart_item_id = $(this).closest('.input-group').find('.form-control').attr("data-id");
                var body = {
                    "quantity": quantity - 1
                }
                $.ajax({
                    url: $.cookie('api_base_url') + "/api/order/cart-items/" + cart_item_id + "/",
                    dataType: 'json',
                    data: body,
                    type: "PATCH",
                    "headers": {
                        "Authorization": "Token " + $.cookie('token')
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function (data) {
                        $('.number').html(parseInt($('.number').html(), 10) - 1)
                        $('.number').html()
                    }
                });
                $(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
            }
        }
    });

    $(document).on('click', '.js-btn-plus', function (e) {
        e.preventDefault();

        var quantity = parseInt($(this).closest('.input-group').find('.form-control').val());
        cart_item_id = $(this).closest('.input-group').find('.form-control').attr("data-id");
        var body = {
            "quantity": quantity + 1
        }
        $.ajax({
            url: $.cookie('api_base_url') + "/api/order/cart-items/" + cart_item_id + "/",
            dataType: 'json',
            data: body,
            type: "PATCH",
            "headers": {
              "Authorization": "Token " + $.cookie('token')
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,        
            success: function (data) {
                $('.number').html(parseInt($('.number').html(), 10) + 1)
                $('.number').html()
            }
          });    
          $(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);     
    });
})