$.cookie('api_base_url', 'http://127.0.0.1:8000');
$(document).ready(function () {        
    (function ($) {
        "use strict";
        
        //orders list
        $.ajax({
            url: "http://127.0.0.1:8000/api/order/cart/",
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
                for (i=0;i<data.length;i++) {
                    var html = '<tr>'
                    html += '<td>'+data[i].items.length+'</td>'                    
                    html += '<td>'+data[i].total+'</td>'
                    html += '<td>'+data[i].created_at+'</td>'
                    html += '<td><a href="http://127.0.0.1:8000/api/order/cart/'+data[i].id+'/receipt/">Download as PDF</a></td>'                    
                    html += '</tr>'
                    
                    $('#checkoutTable tbody').prepend(html)
                }
            }
        });
    })(jQuery)    
})