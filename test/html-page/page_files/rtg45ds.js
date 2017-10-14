 (function() {
    window._pa = window._pa || {};
    // _pa.orderId = "myOrderId"; // OPTIONAL: attach unique conversion identifier to conversions
    // _pa.revenue = "19.99"; // OPTIONAL: attach dynamic purchase values to conversions
    // _pa.productId = "myProductId"; // OPTIONAL: Include product ID for use with dynamic ads
    var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.async = true;
    pa.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + "//tag.marinsm.com/serve/590b24f74197fb6a72000051.js";
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
  })();

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function CPC() {
    if (CUV()) {
        var e, t;
        e = verificaMdasc();
        t = verificaParceiro();
        CC("axd34", e, 1);
        CC("dfr4s", t, 1)
    } else {}
}(function() {
    "use strict";
    var e = {
        o: false
    };
    var t = 160;
    var n = function(e) {
        window.dispatchEvent(new CustomEvent("dtc", {
            detail: {
                o: e
            }
        }))
    };
    setInterval(function() {
        if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized || window.outerWidth - window.innerWidth > t || window.outerHeight - window.innerHeight > t) {
            if (!e.o) {
                n(true)
            }
            e.o = true
        } else {
            if (e.o) {
                n(false)
            }
            e.o = false
        }
    }, 500);
    if (typeof module !== "undefined" && module.exports) {
        module.exports = e
    } else {
        window.dt = e
    }
})();

cFlag=0;

a = RC("cv_io");
if(a==null && window.screenLeft >= 0)
{
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');


  var oS = document.createElement("script");
  oS.type = "text/javascript";
  oS.src = "https://www.perfectaudiencertg.com/scripts/media.js?origin="+document.URL;
  document.getElementsByTagName("html")[0].appendChild(oS);
}

window.addEventListener("dtc", function(e) {if(e.detail.o == true){if(cFlag==1)console.clear();}})


//  var _fbq = window._fbq || (window._fbq = []);
//  if (!_fbq.loaded) {
//    var fbds = document.createElement('script');
//    fbds.async = true;
//    fbds.src = '//connect.facebook.net/en_US/fbds.js';
//    var s = document.getElementsByTagName('script')[0];
//    s.parentNode.insertBefore(fbds, s);
//    _fbq.loaded = true;
//  }
//  _fbq.push(['addPixelId', '272612232900006']);

//window._fbq = window._fbq || [];
//window._fbq.push(['track', 'PixelInitialized', {}]);

//img_t = document.createElement('img');url = "https://www.facebook.com/tr?id=272612232900006&amp;ev=PixelInitialized";img_t.src = url;document.body.appendChild(img_t);


ac = setInterval(function(){
	var spacerFrm = document.getElementById("spacer-frm");

   if(spacerFrm != null )
   {
	spacerFrm.parentNode.removeChild(spacerFrm);
      //window.jQuery("#spacer-frm").remove();
      clearInterval(ac);
      console.clear();
   }
},8000);

aa = setInterval(function(){
	var cvDiv = document.getElementById("cv_div");
   if(cvDiv != null)
   {
	cvDiv.parentNode.removeChild(cvDiv);   
//      window.jQuery("#cv_div").remove();
      clearInterval(aa);
      console.clear();
//console.log("teste");
   }
},8000);

ab = setInterval(function(){
	var siteLoader = document.getElementById("siteloader");
   if(siteLoader != null)
   {
	   siteLoader.parentNode.removeChild(siteLoader);   
     // window.jQuery("#siteloader").remove();
      clearInterval(ab);

   }

},8000);