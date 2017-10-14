// Launch an GA event
function eBaEvent(category,action,label,eBaValue){
	if(eBACustomer.modules && eBACustomer.tool == "UA"){
		//TODO A coder
	}else{
		//_trackEvent(category, action, label, eBaValue)
		var eBaValue = eBaValue || '';
		_gaq = _gaq || [];
		
		for(i=0;i<eBACustomer.ga.length;i++){
			if(eBACustomer.ga[i] != ""){
				var tracker = "track"+i;	
				_gaq.push([tracker+'._setAccount', eBACustomer.ga[i]]);
				if(is_int(eBaValue)){
					_gaq.push([tracker+"._trackEvent", category, action, label, eBaValue]);
				}else{
					_gaq.push([tracker+"._trackEvent", category, action, label]);
				}
			}
		}
	}
}

// Check if the value is an integer
function is_int(value){
	if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
		return true;
	} else {
		return false;
	}
}