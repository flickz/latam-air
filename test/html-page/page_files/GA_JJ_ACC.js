/*********
Configuration File for:

TAM


*********/
//Customer parameters
try{	
var  eBACustomer = {
	version : "googleAnalytics_D19",
	ga : ["UA-4052024-4","UA-4052024-8","UA-4052024-9"],
	company : "TAM",
	compcur: "BRL",
	gaDomain :".tam.com.br",
	setAllowLinker : true,
	trackURL : "",
	env:'production',
	tool:'GA'
};

//CDN configuration
var hostCDN = 'http://eba.amadeus.netdna-cdn.com';
var hostCDNssl = 'https://eba-amadeus.netdna-ssl.com'
var dirCDN = '/fastTrack/WDS/JJ/PRD';
var dirCDNEvent = '/fastTrack/WDS/analytics_WDS/event';

//call to event code
(function() {
	var gaCM = document.createElement('script'); gaCM.type = 'text/javascript';
	gaCM.src =('https:'==document.location.protocol?hostCDNssl: hostCDN)+dirCDNEvent+'/eBaEvent.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gaCM, s);
  })();

//call to TAM code
(function() {
	var gaCM = document.createElement('script'); gaCM.type = 'text/javascript';
	gaCM.src =('https:'==document.location.protocol?hostCDNssl: hostCDN)+dirCDN+'/'+eBACustomer.version+'.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gaCM, s);
  })();
}catch(err){
//avoid any break of BE
}