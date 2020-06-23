const { init, errorCodes } = window.anylinejs;


const entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}

function replaceVerticalBar(string) {
  return String(string).replace(/[|]/g, function (s) {
    return '\n';
  });
}

const viewConfig = {
  // captureResolution: '1080p',
  outerColor: '000000',
  outerAlpha: 0.5,
  cutouts: [
    {
      cutoutConfig: {
        // style: 'rect',
        maxWidthPercent: '80%',
        alignment: 'top_half',
        ratioFromSize: {
          width: 300,
          height: 250,
        },
        width: 720,
        strokeWidth: 2,
        cornerRadius: 4,
        strokeColor: 'FFFFFFFF',
        feedbackStrokeColor: '0099FF',
      },
      // flash: {
      //   mode: 'manual',
      //   alignment: 'top_left',
      // },
      // cancelOnResult: false,
      // "delayStartScanTime": 2000,
      scanFeedback: {
        style: 'contour_point',
        strokeColor: '0099FF',
        fillColor: '300099FF',
        strokeWidth: 2,
        cornerRadius: 4,
        animationDuration: 150,
        animation: 'NONE',
        // beepOnResult: true,
        // vibrateOnResult: true,
        // blinkAnimationOnResult: true,
      },
    },
  ],
};

const anylicense_prod = 
  'eyJzY29wZSI6WyJBTEwiXSwicGxhdGZvcm0iOlsiaU9TIiwiQW5kcm9pZCIsIldpbmRvd3MiLCJKUyIsIldlYiJdLCJ2YWxpZCI6IjIwMjAtMDctMTQiLCJtYWpvclZlcnNpb24iOjMsIm1heERheXNOb3RSZXBvcnRlZCI6NSwic2hvd1dhdGVybWFyayI6dHJ1ZSwicGluZ1JlcG9ydGluZyI6dHJ1ZSwiZGVidWdSZXBvcnRpbmciOiJvcHQtb3V0IiwidG9sZXJhbmNlRGF5cyI6NSwic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOnRydWUsImlvc0lkZW50aWZpZXIiOlsibXZwcm9tYW5pYS5ybyJdLCJhbmRyb2lkSWRlbnRpZmllciI6WyJtdnByb21hbmlhLnJvIl0sIndpbmRvd3NJZGVudGlmaWVyIjpbIm12cHJvbWFuaWEucm8iXSwid2ViSWRlbnRpZmllciI6WyJtdnByb21hbmlhLnJvIl0sImpzSWRlbnRpZmllciI6WyJtdnByb21hbmlhLnJvIl0sImltYWdlUmVwb3J0Q2FjaGluZyI6dHJ1ZX0KMXFlZG1kTlU2M29aTnVjcTlkTDUzbEt5U2dDQmpOcnlNSnM2SUZpYmF4OXhHZ0JwVUE2TmtHbXZXcDgvM2Q5WDVUZUZWbVpqTVZMZ0NhYkZlQjlVZ1FZL1Q2RTMyWkdLZEpQQ09SdStoeHQvTHY2Rm1xcGVWRGNPQ1FDOXZnQ2d4OXpKSlpsc3lUUDhHVGp1R2ZWWVpINnRxeXo4MTlNQW1GSXFlTkFRZ1lUTEdXY0VWYjNvS1dkSUYxQmRvbGVGSThMRlpBZVU0TFRYd2NPN2pGcTJYTnBWa0o1ODhjNnlkMUlvVExxc2cwakZSZXFhckg2cXJUQUlQZlI4Vjc3czJ6dHUzcVdCMEZJQXBYaWxySjJaMU5yWkRGK0tLYUJ6ejg2eHVFU3ZGY25oLzJXemNGaEt4OWxZQXJSeENTTHl2WGRLWExOQ1QxQVJvTit0bXhldnJBPT0=';

const anylicense =
  'eyAiZGVidWdSZXBvcnRpbmciOiAib24iLCAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsICJqc0lkZW50aWZpZXIiOiBbICIxMjcuMC4wLjEiLCAibG9jYWxob3N0IiBdLCAibGljZW5zZUtleVZlcnNpb24iOiAyLCAibWFqb3JWZXJzaW9uIjogIjIwIiwgIm1heERheXNOb3RSZXBvcnRlZCI6IDAsICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwgInBsYXRmb3JtIjogWyAiSlMiIF0sICJzY29wZSI6IFsgIkFMTCIgXSwgInNob3dQb3BVcEFmdGVyRXhwaXJ5IjogZmFsc2UsICJzaG93V2F0ZXJtYXJrIjogZmFsc2UsICJ0b2xlcmFuY2VEYXlzIjogMCwgInZhbGlkIjogIjIwMjAtMDctMzAiIH0KdGVqMGVGYW1MWUlHM1VPa1FyM3A3andsYVliUWdGTXlxdDZjUHU2WU1NbTJtTWdoSXQyVmM5ZVRiS2JsMVVrTwpMN0JqVEVGTFNZQVNYV3AwL2RBdWV0dWpYeGtOOW9GMXRvYXRuRFB0MnkvY1p4emlmZnBZbTlocy94VXB3dzVRCml6SHZ4ZGhDb0ZyUW1xdnNxUThWRHNxNExveE00c0dIdCtQb1FIMkdLWnRaUDc4NmJRN3AwdzUyZkRmYkpOd1QKOXVpTXRHQ0s3ais3ZkE4TGo0OTllMUtZZDdKbENSZS9XQndvY2k3MnVFZ1VkWXl3bW1HRHJIVFFWcHZFQzMydAp3UnRDU0F6ZlJwRU9mMThRb0VqK29pbUxyZEQ5d1k1VDlBQ2EwZmZ1b0ZIbUJLZ0RrRVdDRytnaEhxd2NwZmNoCkx5b3N2bkJWYml1QTBKQ2F6a0d4VGc9PQo=';

const root = document.getElementById('container');

const api_base_url = $.cookie('api_base_url');
const token = $.cookie('token');

const Anyline = init({
  preset: 'barcode',
  viewConfig,
  license: anylicense,
  element: root,
  anylinePath: '../dealers/anyline/anylinejs'
});

let modalOpen = false;

Anyline.onResult = result => {
  barcode = result.result[1].text
  $.ajax({
    url: api_base_url + "/api/shop/products/barcode/" + barcode + "/",
    dataType: 'json',
    type: "GET",
    "headers": {
      "Authorization": "Token " + token
    },
    error: function (err) {
    },
    success: function (product) {
      Anyline.startScanning();
      if (modalOpen) return;
      // Anyline.stopScanning();
      window.Swal.fire({
        showCancelButton: true,
        confirmButtonText: 'Add to cart',
        showLoaderOnConfirm: true,
        html: `<div class="result">
                  <div class="resultRow">
                  <input type="hidden" name="name" value="${product.name}" id="name">
                  <input type="hidden" name="price" value="${product.price}" id="price">                  
                  <div class="resultLabel">${product.name}</div>   
                  <img style="with:200px;height:200px;" src="${api_base_url + product.image}" />               
                  <input type="number" name="quantity" id="quantity" class="form-control" placeholder="Quantity"></input>
                </div>
          </div>`,
        showCloseButton: true,
        onBeforeOpen: () => {
          modalOpen = true;
        },
        onAfterClose: () => {
          modalOpen = false;
        },
        preConfirm: (login) => {
          name = $('#name').val();
          price = $('#price').val();
          quantity = $('#quantity').val();
          body = {
            'name': name,
            'price': price,
            'quantity': quantity
          }
          $.ajax({
            url: $.cookie('api_base_url') + "/api/order/cart-items/",
            dataType: 'json',
            data: body,
            type: "POST",
            "headers": {
              "Authorization": "Token " + token
            },
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            error: function (err) {
            },
            success: function (data) {
              $('.number').html(parseInt($('.number').html(), 10) + data.quantity)
              $('.number').html()
            }
          });
        },
      });
    }
  });
};

Anyline.onReport = msg => {
  console.log('Report: ', msg);
};

Anyline.onDebug = msg => {
  alert(JSON.stringify(msg));
};

Anyline.onError = ({ code, message }) => {
  if (code === errorCodes.WEBCAM_ERROR) {
    console.error('webcam error: ', message);
  }
};

Anyline.onLoad = () => {
  console.log('ANYLINE LOADED on main thread');
};

Anyline.startScanning();

window.Anyline = Anyline;