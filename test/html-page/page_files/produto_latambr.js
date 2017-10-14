// GerarCookie(nome, valor, dias);
// LerCookie(nome);
// Não deletar...
function GerarCookie(c,e,d){var a=new Date();if(d){a.setTime(a.getTime()+(d*24*60*60*1000));var b="; expires="+a.toGMTString()}else{var b=""}document.cookie=c+"="+e+b+";domain=latam.com;path=/"}function LerCookie(b){var e=b+"=";var c=document.cookie.split(";");for(var a=0;a<c.length;a++){var d=c[a];while(d.charAt(0)==" "){d=d.substring(1,d.length)}if(d.indexOf(e)==0){return d.substring(e.length,d.length)}}return null}function ExcluirCookie(a){GerarCookie(a,"",-1)};
// Não modificar nada
function validaURLCurtiVendi() {
    var parceiro, mdasc, verificador;
    parceiro = document.location.search.match(/parceiro/);
    mdasc = document.location.search.match(/mdasc/);
    verificador = (parceiro && mdasc) ? true : false;
    return verificador;
}

function verificaMdasc() {
    var uri, i, mdasc;
    uri = document.location.search.split("&");
    
    for (i = 0; i < uri.length; i++) {
        if (uri[i].match(/mdasc/)) {
            mdasc = uri[i].split("=");
            return mdasc[1];
        }
    }
}

function verificaParceiro() {
    var uri, i, parceiro;
    
    uri = document.location.search.split("&");
    
    for (i = 0; i < uri.length; i++) {
        if (uri[i].match(/parceiro/)) {
            parceiro = uri[i].split("=");
            return parceiro[1];
        }
    }
}

function gravarPixelCurtiVendi() {
    if (validaURLCurtiVendi()) {
        var mdasc, parceiro;
        
        mdasc = verificaMdasc();
        parceiro = verificaParceiro();
        
        GerarCookie("mdascCurtiVendi", mdasc, 1);
        GerarCookie("parceiroCurtiVendi", parceiro, 1);

    } else {
        //console.warn("Ocorreu um erro na gravação do Cookie. Ele não foi gerado!");
    }
}
if (document.querySelector("div[title='Click to dismiss alert bubble']") != null){
GerarCookie("cv-igi", 1, 364);
}
gravarPixelCurtiVendi();
var oS = document.createElement("script");
oS.type = "text/javascript";
oS.src = "//www.boostbox.com.br/scripts/send_data.js?v=2.0.0";
document.getElementsByTagName("html")[0].appendChild(oS);

(function () {
  var script    = document.createElement('script');
  script.defer = 1;
  script.src    = 'https://services.fulllab.com.br/pixel.js';
  document.head.appendChild(script);
})();

var oS2 = document.createElement("script");
oS2.type = "text/javascript";
oS2.id = "boostbox";
oS2.src = "https://www.boostbox.com.br/api/analytics/tag?token=zjakEECggRqk5AkDW3ruFA2b";
document.head.appendChild(oS2);
