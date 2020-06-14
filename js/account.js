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
            url: "http://127.0.0.1:8000/api/order/cart/" + this.id + '/',
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

        console.log(this.id)

        $.ajax({
            url: "http://127.0.0.1:8000/api/order/cart/"+this.id+"/receipt/",
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