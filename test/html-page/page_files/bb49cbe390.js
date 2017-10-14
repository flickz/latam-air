function error(msg) {
  var version = "3.0.2";
  var now = new Date();
  var dUrl = '';
  if (top === self) dUrl = window.location.href;
  else dUrl = document.referrer;
  if (dUrl === "") dUrl = parent.document.location.href;
  var content = [now, version, msg, dUrl].join('|');
  content += '|' + navigator.userAgent;
  var errorUrl = "//its.tradelab.fr/?type=debug&content=" + encodeURIComponent(content);
  var img = new Image();
  img.src = errorUrl;
  if ( typeof console != "undefined" ) console.log(content);
}

try {

(function(){

  if ( typeof tldc === 'undefined' ) window.tldc = {};
  
  tldc.advid = '1405984';
  tldc.domain = '';

  if ( typeof tldc.dbmcm === 'undefined' ) tldc.dbmcm = 'tradelab_dmp';

  tldc.keyStr = "ABCDEFGHIJKLMNOP" +
    "QRSTUVWXYZabcdef" +
    "ghijklmnopqrstuv" +
    "wxyz0123456789+/" +
    "=";
  
  tldc.wSc=window.document.getElementsByTagName('script'); 
  tldc.lSc=tldc.wSc[tldc.wSc.length-1];

  tldc.decode64=function(a){var b="",c,d,f,g,h,e=0;/[^A-Za-z0-9\+\/\=]/g.exec(a);a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do c=tldc.keyStr.indexOf(a.charAt(e++)),d=tldc.keyStr.indexOf(a.charAt(e++)),g=tldc.keyStr.indexOf(a.charAt(e++)),h=tldc.keyStr.indexOf(a.charAt(e++)),c=c<<2|d>>4,d=(d&15)<<4|g>>2,f=(g&3)<<6|h,b+=String.fromCharCode(c),64!=g&&(b+=String.fromCharCode(d)),64!=h&&(b+=String.fromCharCode(f));while(e<a.length);return unescape(b)};
tldc.tl_urlencode=function(a){a=(a+"").toString();return encodeURIComponent(a).replace(/!/g,"%21").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\*/g,"%2A").replace(/%20/g,"+")};
tldc.tl_stringify=function(a){var b=typeof a;if("object"!=b||null===a)return"string"==b&&(a='"'+a+'"'),String(a);var c,d,f=[],g=a&&a.constructor==Array;for(c in a)a.hasOwnProperty(c)&&(d=a[c],b=typeof d,"string"==b?d='"'+d+'"':"object"==b&&null!==d&&(d=tldc.tl_stringify(d)),f.push((g?"":'"'+c+'":')+String(d)));return(g?"[":"{")+String(f)+(g?"]":"}")};tldc.tl_getDomain=function(a){var b=/^(?:(?:https?|ftp):)?\/*(?:[^@]+@)?([^:/#]+)/.exec(a);return b?b[1].split(".").slice(-2).join("."):a};
tldc.tl_getReferrer=function(){var a="";if(top===self)a=document.referrer;else try{a=parent.document.referrer}catch(b){a=""}a=a.substr(a.indexOf("://")+3);return a=a.substr(0,255)};tldc.tl_getLocation=function(){var a;a=top===self?window.location.href:document.referrer;""===a&&(a=parent.document.location.href);a=a.substr(a.indexOf("://")+3);return a=a.substr(0,255)};
tldc.tl_setCookie=function(a,b,c,d,f,g){var h;c&&(h=new Date,h.setTime(h.getTime()+c));document.cookie=a+"="+b+(c?";expires="+h.toGMTString():"")+";path="+(d||"/")+(f?";domain="+f:"")+(g?";secure":"")};tldc.tl_getCookie=function(a){return(a=(new RegExp("(^|;)[ ]*"+a+"=([^;]*)")).exec(document.cookie))?a[2]:0};tldc.tl_insertInDom=function(a){var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)};
tldc.injectScript=function(a,b){var c=a.id,d=a.code,f=a.src,g=a.async,h=a.defer,e=document.createElement("script");e.type="text/javascript";c&&(e.id=c);g&&e.setAttribute("async","async");h&&e.setAttribute("defer","defer");e.readyState?e.onreadystatechange=function(){if("loaded"==e.readyState||"complete"==e.readyState)e.onreadystatechange=null,b()}:e.onload=function(){b()};f?e.src=f:e.text=tldc.decode64(d);tldc.lSc.parentNode.insertBefore(e,tldc.lSc)};
tldc.rLoad=function(a){for(var b=0;b<a.length;b++)tldc.injectScript(a[b],function(){})};tldc.tl_check4xconv=function(a){for(var b=0;b<tldc.ses.xconv.length;b++)if(parseInt(tldc.ses.xconv[b])===a)return!0;return!1};tldc.tl_addXconv=function(a){tldc.ses.xconv.push(a);tldc.tl_setSessionCookie(tldc.ses)};tldc.tl_addSeg=function(a){tldc.ses.seg.push(a);tldc.tl_setSessionCookie(tldc.ses)};tldc.tl_isSiteDomain=function(a){var b;b=tldc.domain.toLowerCase();return a===b?!0:!1};
tldc.tl_updateAnalyticsData=function(){if(!tldc.analytics_loaded){var a=Math.round((new Date).getTime()/1E3),b=tldc.tl_getDomain(tldc.referrer_url),c=tldc.vis||tldc.tl_loadVisitorCookie(),d=tldc.ses||tldc.tl_loadSessionCookie(),f=tldc.ref||tldc.tl_loadCampaignCookie(),g=!d.session;tldc.analytics_loaded=!0;c.total_page_cnt++;g?(d.session=!0,c.vis_cnt++,c.prev_vis_ts=c.curr_vis_ts,c.prev_page_cnt=c.curr_page_cnt,c.curr_page_cnt=1):c.curr_page_cnt++;c.curr_vis_ts=a;if(g||b!==tldc.domain&&tldc.referrer_url!==
f.ref_url)f.ref_url=tldc.referrer_url.slice(0,512),f.ref_ts=a,f.page_url=tldc.locationHref.slice(0,512),f.dm=tldc.domain,tldc.tl_setCampaignCookie(f),a=document.createElement("img"),a.style.position="absolute",a.style.height=0,a.style.width=0,a.setAttribute("id","imgTP"),a.src="object"==typeof tldc.ses&&"string"==typeof tldc.ses.uuid2&&""!=tldc.ses.uuid2?"//its.tradelab.fr/?type=tp&advid="+tldc.advid+"&uuid="+tldc.uuid+"&adata="+tldc.tl_getAnalyticsData():"//ib.adnxs.com/getuid?//its.tradelab.fr/?type=tp&uuid2=$UID&&advid="+
tldc.advid+"&uuid="+tldc.uuid+"&adata="+tldc.tl_getAnalyticsData(),tldc.tl_insertInDom(a);tldc.tl_setVisitorCookie(c);tldc.tl_setSessionCookie(d)}};tldc.firePixel=function(a,b){var c=document.createElement("img"),d;c.style.position="absolute";c.style.height=0;c.style.width=0;d="http:"===document.location.protocol?"http://ib.adnxs.com/":"https://secure.adnxs.com/";d+="seg?add="+[].concat(a).join(",");null!==b&&(d+=":"+b);c.src=d+"&t=2";tldc.tl_insertInDom(c)};
tldc.tl_sync=function(a,b){tldc.ses.uuid2=a;tldc.tl_setSessionCookie(tldc.ses);"undefined"!=typeof b&&("0"===tldc.uuid&&(tldc.uuid=b),tldc.tl_setUUIDCookie(tldc.uuid));var c=a.slice(-2);tldc.firePixel("2491894",c)};
tldc.tl_loadVisitorCookie=function(){var a=tldc.tl_getCookie("_tlv"),b=Math.round((new Date).getTime()/1E3);return a.length?(a=a.split("."),{vis_cnt:a[0],frst_vis_ts:a[1],prev_vis_ts:a[2],curr_vis_ts:a[3],total_page_cnt:a[4],prev_page_cnt:a[5],curr_page_cnt:a[6]}):{vis_cnt:0,frst_vis_ts:b,prev_vis_ts:0,curr_vis_ts:b,total_page_cnt:0,prev_page_cnt:0,curr_page_cnt:1}};
tldc.tl_loadCampaignCookie=function(){var a=tldc.tl_getCookie("_tlc"),b={ref_url:"",ref_ts:0,page_url:"",dm:""};return a.length?(a=-1<a.indexOf("|")?a.split("|"):a.split(":"),4!==a.length?b:{ref_url:a[0],ref_ts:a[1],page_url:a[2],dm:a[3]}):b};
tldc.tl_loadSessionCookie=function(){var a=tldc.tl_getCookie("_tls");return a?(a=a.split("."),"undefined"===typeof a[1]&&(a[1]=""),"undefined"===typeof a[2]&&(a[2]=""),"undefined"===typeof a[3]&&(a[3]=""),-1<a[1].indexOf(",")&&(a[1]=a[1].replace(/,/g,":")),-1<a[2].indexOf(",")&&(a[2]=a[2].replace(/,/g,":")),{session:!0,xconv:""===a[1]?[]:a[1].split(":"),seg:""===a[2]?[]:a[2].split(":"),uuid2:""===a[3]?"":a[3]}):{session:!1,xconv:[],seg:[],uuid2:""}};
tldc.tl_loadUUIDCookie=function(){var a=tldc.tl_getCookie("_tli");return a?a:"0"};tldc.tl_loadParamsCookie=function(){var a=tldc.tl_getCookie("_tlp"),b={};if(a.length){a=a.split("#");-1<a[0].indexOf(",")&&(a[0]=a[0].replace(/,/g,"."));for(var a=a[0].split("."),c=0;c<a.length;c++){var d;d=a[c].split(":");b[d[0]]=d[1]}return{fsegs:b}}return{fsegs:{}}};
tldc.tl_loadAnalyticsCookies=function(){tldc.ref=tldc.tl_loadCampaignCookie();tldc.vis=tldc.tl_loadVisitorCookie();tldc.ses=tldc.tl_loadSessionCookie();tldc.uuid=tldc.tl_loadUUIDCookie()};tldc.tl_getAnalyticsData=function(){var a=tldc.ref||tldc.tl_loadCampaignCookie(),b=tldc.vis||tldc.tl_loadVisitorCookie();return tldc.tl_urlencode(tldc.tl_stringify({c:a,v:b}))};tldc.tl_getParamsData=function(){var a=tldc.params||tldc.tl_loadParamsCookie();return tldc.tl_urlencode(tldc.tl_stringify(a))};
tldc.tl_setVisitorCookie=function(a){tldc.tl_setCookie("_tlv",a.vis_cnt+"."+a.frst_vis_ts+"."+(a.prev_vis_ts||"")+"."+a.curr_vis_ts+"."+a.total_page_cnt+"."+a.prev_page_cnt+"."+a.curr_page_cnt,tldc.config_visitor_cookie_timeout,tldc.config_cookie_path,tldc.config_cookie_domain)};tldc.tl_setSessionCookie=function(a){a="*."+a.xconv.join(":")+"."+a.seg.join(":")+"."+a.uuid2;tldc.tl_setCookie("_tls",a,tldc.config_session_cookie_timeout,tldc.config_cookie_path,tldc.config_cookie_domain)};
tldc.tl_setUUIDCookie=function(a){tldc.tl_setCookie("_tli",a,tldc.config_uuid_cookie_timeout,tldc.config_cookie_path,tldc.config_cookie_domain)};tldc.tl_setCampaignCookie=function(a){var b=[];b.push(encodeURIComponent(a.ref_url));b.push(a.ref_ts);b.push(encodeURIComponent(a.page_url));b.push(a.dm);tldc.tl_setCookie("_tlc",b.join(":"),tldc.config_referrer_cookie_timeout,tldc.config_cookie_path,tldc.config_cookie_domain)};
tldc.tl_setParamsCookie=function(a){var b="";a=a.fsegs;var c=[],d;for(d in a)a.hasOwnProperty(d)&&c.push(d+":"+a[d]);b+=c.join(".");tldc.tl_setCookie("_tlp",b,tldc.config_params_cookie_timeout,tldc.config_cookie_path,tldc.config_cookie_domain)};tldc.tl_DBMCookieMatch=function(){document.createElement("img").src="//cm.g.doubleclick.net/pixel?google_nid="+tldc.dbmcm+"&google_cm"};
tldc.tl_initTagman=function(){if(""===tldc.domain||"undefined"===tldc.domain||"null"===tldc.domain)tldc.domain=tldc.tl_getDomain(location.hostname);tldc.analytics_loaded=!1;tldc.locationHref=tldc.tl_getLocation();tldc.referrer_url=tldc.tl_getReferrer();tldc.config_visitor_cookie_timeout=31536E6;tldc.config_params_cookie_timeout=31536E6;tldc.config_uuid_cookie_timeout=7776E6;tldc.config_session_cookie_timeout=18E5;tldc.config_referrer_cookie_timeout=31536E6;tldc.config_cookie_path="/";tldc.config_cookie_domain=
"."+tldc.domain;tldc.tl_loadAnalyticsCookies();if(""===tldc.ses.uuid2){tldc.injectScript({src:"//ib.adnxs.com/getuid?//its.tradelab.fr/?type=tlsync&uuid2=$UID&callback=tl_sync"},function(){});var a=0,b=setInterval(function(){a++;if(""!==tldc.ses.uuid2||100==a)clearInterval(b),tldc.params=tldc.tl_loadParamsCookie(),tldc.tl_updateAnalyticsData(),tldc.initVisTracking(),tldc.rLoad(tldc.scriptArray)},50)}else tldc.params=tldc.tl_loadParamsCookie(),tldc.tl_updateAnalyticsData(),tldc.initVisTracking(),tldc.rLoad(tldc.scriptArray)};

   var dUrl = tldc.tl_getLocation(),
    scriptArray = [],
    n = 0;

  window.tl_sync = tldc.tl_sync;
  window.injectScript = tldc.injectScript;
  window.lSc = tldc.lSc;

  tldc.initVisTracking = function () {
    tldc.injectScript({"src":"//cdn.tradelab.fr/fseg/1289.js?add=7142923"}, function(){});
	if ( tldc.vis.vis_cnt > 1 ) tldc.injectScript({"src":"//cdn.tradelab.fr/fseg/1289.js?add=7142929"}, function(){});
	if ( tldc.vis.curr_page_cnt > 1 ) tldc.injectScript({"src":"//cdn.tradelab.fr/fseg/1289.js?add=7142924"}, function(){});
	else {
		setTimeout(function(){
			tldc.injectScript({"src":"//cdn.tradelab.fr/fseg/1289.js?add=7142924"}, function(){});
		}, 5000);
	}
	    
  }

  if ( dUrl.match(/booking\/upslDispatcher/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/1289.js?add=7209201"};
}
if ( dUrl.match(/booking\/alpi/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/1289.js?add=7209220"};
}
if ( dUrl.match(/booking\/flowManager/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/1289.js?add=7209238"};
}
if ( dUrl.match(/booking\/purf/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/1289.js?add=7209256"};
}
if ( dUrl.match(/LOCATION\_1\=MIL/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/1343.js?add=7378744"};
}
if ( dUrl.match(/LOCATION\_1\=SCL/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/1343.js?add=7378745"};
}
if ( dUrl.match(/LOCATION\_1\=BUE/i) ) {
	scriptArray[n++] = {"src":"//cdn.tradelab.fr/fseg/1343.js?add=7394545"};
}
    
  
  tldc.scriptArray = scriptArray;
  tldc.tl_initTagman();  


})();

} catch(err) {
  error('tagmanv3|'+err.message);
}