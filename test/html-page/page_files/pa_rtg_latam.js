function CC(c,e,d){var a=new Date();if(d){a.setTime(a.getTime()+(d*24*60*60*1000));var b="; expires="+a.toGMTString()}else{var b=""}document.cookie=c+"="+e+b+";domain=.clubedosdados.com;path=/"}function RC(b){var e=b+"=";var c=document.cookie.split(";");for(var a=0;a<c.length;a++){var d=c[a];while(d.charAt(0)==" "){d=d.substring(1,d.length)}if(d.indexOf(e)==0){return d.substring(e.length,d.length)}}return null}function DC(a){CC(a,"",-1)};
function rtg_cookie_id() {
 if (document.querySelector("div[title='Click to dismiss alert bubble']") != null){
CC("rtg_cookie_id", 1, 364);
}}
rtg_cookie_id();
(function() { tmp = RC('cv_partner_parent'); tmp2 = RC('rtg_cookie_id'); if(tmp==null && tmp2==null) { var oS = document.createElement('script'); oS.type = 'text/javascript'; oS.src = "https://scripts.perfectaudiencertg.com/scripts/rtg45ds.js"; document.getElementsByTagName('head')[0].appendChild(oS); } })();