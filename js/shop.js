$(document).ready(function () {
    (function ($) {
        "use strict";

        $.ajax({
            url: $.cookie('api_base_url') + "/api/shop/shops/",
            dataType: 'json',
            type: "GET",
            crossDomain: true,
            error: function (err) {

            },
            success: function (data) {
                console.log(data);
                var i = 0;
                for (i = 0; i < data.length; i++) {
                    var html = '<a class="dropdown-item" href="#">'+data[i].name+'</a>';
                    $('#dropdown_shop_items').append(html)
                }
            }
        });

        $(window).scroll(function() {
            if($(window).scrollTop() == $(document).height() - $(window).height()) {
                $.ajax({
                    url: $('#next_page').val(),
                    dataType: 'json',
                    type: "GET",
                    crossDomain: true,
                    error: function (err) {
    
                    },
                    success: function (data) {
                        var i = 0;
                        for (i = 0; i < data.results.length; i++) {
                            var html = '<div class="col-6 col-md-6 col-lg-4 border-top">';
                            html += '<a href="shop-single.html" class="item">';
                            html += '<img src="' + data.results[i].image + '" alt="Image" class="img-fluid">';
                            html += '<div class="item-info">';
                            html += '<h3>' + data.results[i].name + '</h3>';
                            html += '<span class="collection d-block">' + data.results[i].description + '</span>';
                            html += '<strong class="price">$' + data.results[i].price + '</strong>';
                            html += '<p><a href="cart.html" class="buy-now btn btn-sm height-auto px-4 py-3 btn-primary">Add To Cart</a></p>';
                            html += '</div></a></div>';
    
                            $('#shop_products').append(html)
                        }
                        $('#next_page').val(data.next);
                    }
                });
            }
        });

        $.ajax({
            url: $.cookie('api_base_url') + "/api/shop/products/",
            dataType: 'json',
            type: "GET",
            crossDomain: true,
            error: function (err) {

            },
            success: function (data) {
                var i = 0;
                for (i = 0; i < data.results.length; i++) {
                    var html = '<div class="col-6 col-md-6 col-lg-4 border-top add-product">';                    
                    html += '<a href="shop-single.html" class="item">';                    
                    html += '<img src="' + data.results[i].image + '" alt="Image" class="img-fluid">';
                    html += '<div class="item-info" style="bottom: 60px;">';
                    html += '<h3>' + data.results[i].name + '</h3>';                    
                    html += '<span class="collection d-block">' + data.results[i].description + '</span>';
                    html += '<strong class="price">$' + data.results[i].price + '</strong>';                    
                    html += '</div>'
                    html += '<button class="btn btn-primary add-to-cart" >Add to cart</button>';
                    html += '</a></div>';

                    $('#shop_products').append(html)
                }
                $('#next_page').val(data.next);
            }
        });
    })(jQuery)
})