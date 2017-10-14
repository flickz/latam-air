function GAAction(){

	var search = (ArVal[76] != undefined) ? ArVal[76] : '';
	var indicSeat = (ArVal[166] != undefined) ? ArVal[166] : '';
	var indicLuggage = (ArVal[167] != undefined) ? ArVal[167] : '';

	if(search != "HOME_SEARCH"){ // Don't track the HOME SEARCH as TAM is tracking it in their way
		/* Google Account Information */
		gaAccounts = ["UA-4052024-4","UA-4052024-8","UA-4052024-9"];
		/*TAM eBA,TAM upsell profile,TAM insurance profile*/

		gd1 = "";
		dpnme = "";
		tripType = "";
		ctmpln = "";
		citypairs = "";
		udefv2 = "";
		udefv3 = "";
		bflown = 0;
		value = "";
		wt_gtld = ".com";
		wt_tstatus = "";
		wt_sitecode ="";

		ArTnme ={"ADVS":"1-AirSearch",
				"CO_UPSL":"2-AirAvailability-FPC-OWC-RT",
				"CP_UPSL":"2-AirAvailability-Multicity",
				"ALPI":"3-Passenger-Info",
				"PURF":"4-Purchase",
				"VERI":"4-Purchase-Verification",
				"CONF":"5-Confirmation",
				"OD_UPSL":"2b-AirAvailability-FPC-OWD",
				"APIS":"3b-Additional-Passenger-Info",
				"FSR":"3c-Additionnal Services",
				"BKGD":"Review Booking",
				"FSRS":"Additionnal Services",
				"ATCI":"Refund",
				"RDUPSL":"2-AirAvailability",
				"ATCSEARCH":"ATC-Search",
				"ATCUPSL":"ATC-AirAvailability",
				"ATCPURF":"ATC-Purchase",
				"ATCCONF":"ATC-Confirmation",
				"CARL":"CAR List",
				"CARD":"CAR Review",
				"CARC":"CAR Confirmation",
				"HOTL":"Hotel List",
				"HOTD":"Hotel Detail",
				"HOTC":"Hotel Confirmation",
				"ACI":"Automated Check In",
				"RD_ATC_SRCH":"1-ATC-AW-Search",
				"RD_ATC_AVAI":"2-ATC-AW-Availability",
				"RD_ATC_APIS":"3-ATC-AW-APIS",
				"RD_ATC_PURF":"4-ATC-AW-Purchase",
				"RD_ATC_CONF":"5-ATC-AW-Confirmation"};

		if (ga_pageCode == "UPSL" || ga_pageCode =="CO_UPSL" || ga_pageCode =="OD_UPSL"){//case of UPSEL pages
			ga_pageCode = ga_msgPageCode;
		}

		wt_sitecode =ArVal[107];
		wt_market = ArVal[108];
		wt_pax = (ArVal[60] != undefined) ? ''+ArVal[60] : '';
		var customETicketDocNumber = document.getElementById('customETicketDocNumber');

		wt_flow = "revenue";
		if(wt_sitecode == "JJBKJJBK") {
			wt_flow = "revenue";
		}else if(wt_sitecode == "JJRDJJRD") {
			wt_flow = "redemption";
		}
		if (ArVal[75].toUpperCase()=="ATC"){
			wt_flow ="ATC";
		}else if (ArVal[75].toUpperCase()=="SERVICING"){
			wt_flow ="SERVICING";
		}else if (ArVal[75].toUpperCase()=="ATC_AW"){
			wt_flow ="ATC_AW";
		}else if (ArVal[75].toUpperCase()=="CAR"){
			wt_flow ="CAR";
		}else if (ArVal[75].toUpperCase()=="HOTEL"){
			wt_flow ="HOTEL";
		}

		if(ArVal[106] != undefined) {wt_tstatus = ArVal[106];}

		if(wt_flow.toUpperCase() != "CAR" && wt_flow.toUpperCase() != "HOTEL"){
			//Trip Type definition
			if (ga_pageCode =='CP_UPSL'||ArVal[138]!=undefined){
				tripType = "CP";
				rtowinnss = ",CP,Outbound,";
			}else if (ArVal[2] == undefined || ArVal[2] == '') {
				tripType = "OW";
				rtowinnss = ",OW,Outbound,";
			}else{
				tripType = "RT";
				rtowinnss = ",RT,Outbound,";
			}
		}

		/* Read the page HTML page URL*/
		curl = document.location.toString();
		rurl = document.referrer.toString();
		/* identify action*/
		urlf = curl.lastIndexOf("/");
		urlt = curl.lastIndexOf(".action");
		urlt = curl.lastIndexOf(".jsp");
		urltfla = curl.slice(urlf + 1, urlt);
		/* if error in page*/
		if (ga_pageCode == "GENERR") {
			urltfla = "Error";
			gaAccounts=[''];
		}

		/*Page of Booking Engine*/
		if (ArTnme[ga_pageCode]!=undefined){
			var flowSufix = "";
			if (wt_flow.toUpperCase()=="REDEMPTION"){flowSufix="-RD";}
			urltfla = ArTnme[ga_pageCode]+flowSufix;
		}

		/* current url*/
		urlf = curl.lastIndexOf(wt_gtld);
		urlt = curl.lastIndexOf(".");
		url = curl.slice(urlf + 4, urlt);
		urlt = url.indexOf(".");
		url = url.slice(0, urlt);

		/*search variables*/
		citypairs = ArVal[0] + "-" + ArVal[1];
		//case of MULTICITY:
		if (tripType =='CP'){
			trip1 = ArVal[138];//mandatory
			trip2 = '-'+ArVal[139];//mandatory
			trip3 ='';
			trip4='';
			if (ArVal[140]!=undefined && ArVal[140]!=''){
				trip3 = '-'+ArVal[140];
			}
			if (ArVal[141]!=undefined && ArVal[141]!=''){
				trip4 = '-'+ArVal[141];
			}
			citypairs = trip1+trip2+trip3+trip4;
		}
		udefv2 = urltfla;
		udefv3 = ArVal[60];

		cmsite = ArVal[75].toUpperCase() + '-' + ArVal[62].toLowerCase();

		var currdomain = document.domain;

		lenvrment = 0;//test
		if (currdomain.indexOf("tam.com.br") > 0) {
			lenvrment = 1;//prod
		}else{
			//test accounts
			gaAccounts = ["UA-4052024-5","UA-4052024-8","UA-4052024-9"];
		}
		//Dates Calculations
		var ddate = gaStringDate((ArVal[8] != undefined) ? ''+ArVal[8] : '');
		var rdate = gaStringDate((ArVal[36] != undefined) ? ''+ArVal[36] : '');
		if(wt_flow == "CAR" || wt_flow == "HOTEL"){
			rdate = gaStringDate((ArVal[9] != undefined) ? ''+ArVal[9] : '');
		}
		var ddateumt=gaDate(ArVal[8]);
		var advanceSearch = advanceString(ddateumt);
		var datesSearch = ddate;
		if (rdate!=""){
			datesSearch = ddate+"-"+rdate;
		}

		gd1 = url +
				'?wt_company=' + eBACustomer.company +
				'&wt_country=' + '' +
				'&wt_market='+ wt_market +
				'&wt_language=' + ArVal[62] +
				'&wt_env=' + ''+
				'&wt_domain=' + currdomain +
				'&wt_office=' + ArVal[63]+
				'&wt_flow=' + wt_flow +
				'&wt_page=' + urltfla +
				'&wt_pagecode='+ ArVal[76] +
				'&wt_sitecode=' + wt_sitecode +
				'&wt_error=';

		//Site Search data
		if (ga_pageCode =="CO_UPSL"|| ga_pageCode =="OD_UPSL"|| ga_pageCode =="RD_UPSL" || ga_pageCode=="CP_UPSL" || ga_pageCode=="RD_ATC_SRCH") {
				gd1 = gd1+
						'&wt_search=' + citypairs + "_" + tripType+
						'&wt_spax=' + udefv3+
						'&wt_sflow=' + urltfla +
						'&wt_sadvance=' + advanceSearch+
						'&wt_soffice=' + ArVal[63] +
						'&wt_ssitecode='+ wt_sitecode +
						'&wt_sdate='+datesSearch;
		}
		if (ga_pageCode == "NotBookingEngine") {
			gd1 = url + "?CMPANY=" + eBACustomer.company + "&URL=" + url;
		}

		//Site Search data CAR and HOTEL
		if (wt_flow == "CAR") {
			if(ga_pageCode =="CARL"){
				gd1 = gd1+
				'&wt_search=' + citypairs +
				'&wt_sadvance=' + advanceSearch;
			}
			gd1 = gd1+
					'&wt_pickupdate=' + ddate +
					'&wt_droppdate=' + rdate +
					'&wt_nbdaysrent=' + ArVal[69];
		}
		if (wt_flow == "HOTEL") {
			if(ga_pageCode =="HOTL"){
				gd1 = gd1+
				'&wt_search=' + ArVal[0] +
				'&wt_sadvance=' + advanceSearch;
			}
			gd1 = gd1+
					'&wt_hotelname=' + ArVal[1] +
					'&wt_arrivaldate=' + ddate +
					'&wt_departuredate=' + rdate +
					'&wt_nbnights=' + ArVal[69];
		}

		/* Affinity checker*/
		var directAffinityUser =ArVal[126]==undefined||ArVal[126]==''?'false':ArVal[126];
		directAffinityUser = directAffinityUser+"_"+wt_flow;

		/*Corporate Sales & special ff*/
		var specialFareTracking = false;
		if (ArVal[152]!=undefined && ArVal[152]!="" ){
			specialFareTracking = true;
		}
		/* Send data to Google*/
		 _gaq = _gaq || [];
		for(var i=0;i<gaAccounts.length;i++){
			var tracker = "tracker"+i;
			var gaDomain = ".tam.com.br";
			if (lenvrment != 1){
				gaDomain='none';
			}
			_gaq.push([tracker+'._setAccount', gaAccounts[i]]);
			_gaq.push([tracker+'._setDomainName', gaDomain]);
			_gaq.push([tracker+'._setAllowLinker', true]);
			_gaq.push([tracker+'._setCampaignCookieTimeout', 2592000000]);
			/*Custom variable for affinity direct user */
			if (ga_pageCode =="CO_UPSL"||ga_pageCode =="OD_UPSL"||ga_pageCode =="RD_UPSL") {
				_gaq.push([tracker+'._setCustomVar',4, 'Direct Affinity User',directAffinityUser , 2]);
			}
			/*Custom variable for corporate sales && SpecialFareFamilly*/
			if (specialFareTracking) {
				_gaq.push([tracker+'._setCustomVar',1, ArVal[152],ArVal[151] , 2]);
			}

			_gaq.push([tracker+'._set', 'page', gd1]);
			_gaq.push([tracker+'._trackPageview']);
		}

		if (ga_pageCode == "CONF"){ // Same page for revenue or redemption flow
			// Affinity custom var on conf page
			// Get the cookie affinityRevenue, the value will be the creation date of this cookie
			var valueAff = null;
			if(wt_flow == "revenue"){
				valueAff = Get_Cookie('affinityRevenue');
			}else if(wt_flow == "redemption"){
				valueAff = Get_Cookie('affinityAward');
			}
			if(valueAff != null){
				// Calculate day elapsed
				var today = new Date();
				var dateDiff = today.getTime() - parseInt(valueAff);
				var nbDaysElapsed = (Math.ceil(dateDiff/(1000*60*60*24))-1);

				// Send the custom var
				if(wt_flow == "revenue"){
					for(var i=0;i<gaAccounts.length;i++){
						var tracker = "tracker"+i;
						_gaq.push([tracker+'._setCustomVar',2, 'Affinity Revenue - days elapsed',''+nbDaysElapsed , 2]);
					}
				}else if(wt_flow == "redemption"){
					for(var i=0;i<gaAccounts.length;i++){
						var tracker = "tracker"+i;
						_gaq.push([tracker+'._setCustomVar',2, 'Affinity Award - days elapsed',''+nbDaysElapsed , 2]);
					}
				}
			}
		}

		if(wt_flow.toUpperCase() != "CAR" && wt_flow.toUpperCase() != "HOTEL"){
			/*code for the confirmation page*/
			//CONF and REFUND and Servicing and ATC
			 if (ga_pageCode == "CONF" || //revenue or redemption
					 ga_pageCode=="ATCI" || //refund
					 ga_pageCode=="ATCCONF" || //ATC
					 (ga_pageCode=="BKGD"&&ArVal[127].toUpperCase()=="TRUE") || //servicing
					 ga_pageCode=="RD_ATC_CONF"){ // ATC award

				 //advance purchase
				wt_apurchcat = advanceString(ddateumt);

				currency = (ArVal[64] != undefined) ? ArVal[64] : '';

				var taxtmp;
				var tax;

				tax = ArVal[94];//ArVal[81]*conv;
				wt_tax = CurrencyFormatted(tax);
				wt_taxlocal = ArVal[81];

				fee = ArVal[95];//ArVal[82]*conv;
				wt_fee = CurrencyFormatted(fee);
			    wt_feelocal = ArVal[82];


				NbPax = ArVal[60];
				nssret = 0;
				if (tripType == "RT") {
					nss = NbPax * 2;
					nssret = NbPax;
				} else {
					nss = NbPax;
				}
				pricettc = CurrencyFormatted(ArVal[67]);//CurrencyFormatted(ArVal[65] * conv);/*reporting currency*/

				wt_ttclocal = CurrencyFormatted(ArVal[65]);

				var wt_insurance = CurrencyFormatted(ArVal[110]) ;/*reporting currency*/
				var wt_insurancelocal = CurrencyFormatted(ArVal[109]);

				/*Ancillary code*/
				/*Seats*/
				var wt_seatQuantity = ArVal[114];
				var wt_seatPriceLocal = CurrencyFormatted(ArVal[115]);
				var wt_seatPriceReporting = CurrencyFormatted(ArVal[116]);
				var wt_seatPriceReportingPax = CurrencyFormatted(ArVal[116]/ArVal[114]);

				/*luggages*/
				var wt_luggQuantity = ArVal[117];
				var wt_luggPriceLocal = CurrencyFormatted(ArVal[118]);
				var wt_luggPriceReporting = CurrencyFormatted(ArVal[119]);
				var wt_luggPriceReportingPax = CurrencyFormatted(ArVal[119]/ArVal[117]);
				/*End Ancillary code*/


				tmppricewotax = pricettc - tax - fee- wt_seatPriceReporting-wt_luggPriceReporting;
				pricepax = CurrencyFormatted(tmppricewotax / NbPax);
				wt_insurancepax = CurrencyFormatted(wt_insurance / NbPax);
				tmplocalpricewotax = wt_ttclocal - wt_taxlocal - wt_feelocal-wt_seatPriceLocal-wt_luggPriceLocal;
				wt_netlocalpax = CurrencyFormatted(tmplocalpricewotax/NbPax);

				pricenss = CurrencyFormatted(tmppricewotax / nss);
				wt_miles = "0.00";
				wt_milespax = "0.00";
				wt_pricepax = pricepax;
				if (wt_flow == "redemption") {
					wt_miles = CurrencyFormatted(ArVal[92]);
					if (NbPax != "" && NbPax != "0")
					{
						wt_milespax = ArVal[92]/NbPax;
						wt_pricepax = CurrencyFormatted(pricettc/NbPax);
					}
				}

				wt_city = ArVal[79];
				wt_country = ArVal[80];

				/* code to determine if payment is made or ticket is on hold*/
				deferred = "TRUE";



				var deferred_index2 = -1;

				if (deferred_index2 >= 0) {
					deferred = "FALSE";
				} deferred = ArVal[111];
				var ticketed = "NO";
				try {
					var customETicketDocNumber = document.getElementById('customETicketDocNumber');
				} catch(err) {}
				if (customETicketDocNumber != null) { ticketed = "YES"; }

				if (tax == 0) {
					tax = '0' + '.' + '00';
				}

				if (pricettc == 0) {
					pricettc = '0' + '.' + '00';
				}

				/*check of price: can't be > 50000 BRL*/
				var checkPriceOK = true;
				if (pricettc > 50000){
					checkPriceOK = false;
				}
				if (fee == 0) {
					fee = '0' + '.' + '00';
				}

				if (pricepax == 0) {
					pricepax = '0' + '.' + '00';
				}

				/* Calculate the upsell*/
				var upsellOutboundString = "OUP NONE";
				var upsellInboundString = "IUP NONE";
				var lowestOutboundFF = ArVal[87];
				var lowestInboundFF = ArVal[88];
				var selectedOutboundFF = ArVal[89];
				var selectedInboundFF = ArVal[90];

				/* Special Enhanced Upsell Tracking for TAM-WDS */

				var valueUpsellTeaserO = 0;
				var valueUpsellTeaserR = 0;
				var valueUpsellCalendarO = 0;
				var valueUpsellCalendarR = 0;
				var valueUpsellFareFamilyO = 0;
				var valueUpsellFareFamilyR = 0;

				var valueUpsellTeaserOpax ="0.00";
				var valueUpsellTeaserRpax ="0.00";
				var valueUpsellCalendarOpax ="0.00";
				var valueUpsellCalendarRpax ="0.00";
				var valueUpsellFareFamilyOpax ="0.00";
				var valueUpsellFareFamilyRpax ="0.00";

				var selectedFareBeforeUpsellO = ArVal[96]!="NaN"?ArVal[96]:0;
				var selectedFareBeforeUpsellR = ArVal[97]!="NaN"?ArVal[97]:0;
				var selectedFareBeforeTeaserUpsellO = ArVal[98]!="NaN"?ArVal[98]:0;
				var selectedFareBeforeTeaserUpsellR = ArVal[99]!="NaN"?ArVal[99]:0;
				var selectedFareAfterTeaserUpsellO = ArVal[100]!="NaN"?ArVal[100]:0;
				var selectedFareAfterTeaserUpsellR = ArVal[101]!="NaN"?ArVal[101]:0;
				var selectedFareAfterCalendarUpsellO = ArVal[102]!="NaN"?ArVal[102]:0;
				var selectedFareAfterCalendarUpsellR = ArVal[103]!="NaN"?ArVal[103]:0;
				var selectedFareAfterFareFamilyUpsellO = ArVal[104]!="NaN"?ArVal[104]:0;;
				var selectedFareAfterFareFamilyUpsellR = ArVal[105]!="NaN"?ArVal[105]:0;;

				var upsellTeaserO = ""; /*insert "oTeaserUp", otherwise empty string*/
				var upsellTeaserR = ""; /*insert "rTeaserUp", otherwise empty string*/
				var upsellCalChangeO = ""; /*insert "oCalUp", otherwise empty string*/
				var upsellCalChangeR = ""; /*insert "rCalUp", otherwise empty string*/
				var upsellFFChangeO = ""; /*insert "oFFUp", otherwise empty string*/
				var upsellFFChangeR = ""; /*insert "rFFUp", otherwise empty string*/



				/*Value of Teaser Upsell outbound*/
				if (selectedFareAfterTeaserUpsellO != "") {
					if (selectedFareBeforeTeaserUpsellO != selectedFareAfterTeaserUpsellO) {
						upsellTeaserO = "oTeaserUp";
						valueUpsellTeaserO = selectedFareAfterTeaserUpsellO
								- selectedFareBeforeTeaserUpsellO;
			valueUpsellTeaserOpax = valueUpsellTeaserO / NbPax;
			valueUpsellTeaserOpax = CurrencyFormatted(valueUpsellTeaserOpax);

					}
				}

				/* Value of Teaser upsell inbound (return)*/
				if (selectedFareAfterTeaserUpsellR != "") {
					if (selectedFareBeforeTeaserUpsellR != selectedFareAfterTeaserUpsellR) {
						upsellTeaserR = "rTeaserUp";
						valueUpsellTeaserR = selectedFareAfterTeaserUpsellR
								- selectedFareBeforeTeaserUpsellR;
			valueUpsellTeaserRpax = valueUpsellTeaserR / NbPax;
			valueUpsellTeaserRpax = CurrencyFormatted(valueUpsellTeaserRpax);

					}
				}

				/* Value of Calendar upsell outbound*/
				if (selectedFareAfterCalendarUpsellO != "") {
					if (selectedFareBeforeUpsellO != selectedFareAfterCalendarUpsellO) {
						upsellCalChangeO = "oCalUp";
						valueUpsellCalendarO = selectedFareAfterCalendarUpsellO
								- selectedFareBeforeUpsellO;
			valueUpsellCalendarOpax = valueUpsellCalendarO / NbPax;
			valueUpsellCalendarOpax = CurrencyFormatted(valueUpsellCalendarOpax);

					}
				}

				/* Value of Calendar upsell inbound (return)*/
				if (selectedFareAfterCalendarUpsellR != "") {
					if (selectedFareBeforeUpsellR != selectedFareAfterCalendarUpsellR) {
						upsellCalChangeR = "rCalUp";
						valueUpsellCalendarR = selectedFareAfterCalendarUpsellR
								- selectedFareBeforeUpsellR;
			valueUpsellCalendarRpax = valueUpsellCalendarR / NbPax;
			valueUpsellCalendarRpax = CurrencyFormatted(valueUpsellCalendarRpax);

					}
				}

				/* Value of Fare Family Upsell outbound*/
				if (selectedFareAfterFareFamilyUpsellO != "") {
					if (selectedFareBeforeUpsellO != selectedFareAfterFareFamilyUpsellO) {
						upsellFFChangeO = "oFFUp";
						valueUpsellFareFamilyO = selectedFareAfterFareFamilyUpsellO
								- selectedFareBeforeUpsellO;
			valueUpsellFareFamilyOpax = valueUpsellFareFamilyO / NbPax;
			valueUpsellFareFamilyOpax = CurrencyFormatted(valueUpsellFareFamilyOpax);

					}
				}

				/* Value of Fare Family Upsell inbound (return) */
				if (selectedFareAfterFareFamilyUpsellR != "") {
					if (selectedFareBeforeUpsellR != selectedFareAfterFareFamilyUpsellR) {
						upsellFFChangeR = "rFFUp";
						valueUpsellFareFamilyR = selectedFareAfterFareFamilyUpsellR
								- selectedFareBeforeUpsellR;
			valueUpsellFareFamilyRpax = valueUpsellFareFamilyR / NbPax;
			valueUpsellFareFamilyRpax = CurrencyFormatted(valueUpsellFareFamilyRpax);
					}
				}

				/* End of Special Enhanced Upsell Tracking for TAM-WDS */

				var upsellTypeO = upsellTeaserO + " " + upsellCalChangeO + " "
						+ upsellFFChangeO;
				var upsellTypeR = upsellTeaserR + " " + upsellCalChangeR + " "
						+ upsellFFChangeR;

				upsellTypeO = upsellTypeO.replace(/^\s+|\s+$/g, '')
						.replace(/\s+/g, ' '); /*remove extra spaces*/
				upsellTypeR = upsellTypeR.replace(/^\s+|\s+$/g, '')
						.replace(/\s+/g, ' '); /*remove extra spaces*/

				if (lowestOutboundFF != selectedOutboundFF)
					upsellOutboundString = 'OUP,' + upsellTypeO + ","
							+ lowestOutboundFF + ' - ' + selectedOutboundFF;
				if (lowestInboundFF != selectedInboundFF)
					upsellInboundString = 'IUP,' + upsellTypeR + "," + lowestInboundFF
							+ ' - ' + selectedInboundFF;

				//FF ArVal 142->148 for CP
				var lowFFOut = ArVal[83]==undefined ||ArVal[83]==''?ArVal[142]+'-'+ArVal[143]:ArVal[83];
				var selFFOut = ArVal[85]==undefined ||ArVal[85]==''?ArVal[146]+'-'+ArVal[147]:ArVal[85];
				if (tripType!="OW"){
					var lowFFIn = ArVal[84]==undefined ||ArVal[84]==''?ArVal[144]+'-'+ArVal[145]:ArVal[84];
					var selFFIn = ArVal[86]==undefined ||ArVal[86]==''?ArVal[148]+'-'+ArVal[149]:ArVal[86];
				}
				//routes ArVal 153 for CP
				var airRouteOut = ArVal[153]!=undefined&&ArVal[153]!=''?ArVal[153]:ArVal[4] + '-' + ArVal[6] + '-'+ ArVal[15] + '-' + ArVal[24] ;
				var airRouteIn = ArVal[153]!=undefined&&ArVal[153]!=''?'':ArVal[32]+ '-' + ArVal[34] + '-' + ArVal[41] + '-' + ArVal[50];

				//flights ArVal 154 CP
				var flightsOut =  ArVal[154]!=undefined&&ArVal[154]!=''?ArVal[154]:ArVal[12] + ArVal[10] + ' ' + ArVal[21]+ ArVal[19] + ' ' + ArVal[30] + ArVal[28];
				var flightsIn =  ArVal[154]!=undefined&&ArVal[154]!=''?'':ArVal[40] + ArVal[38] + ' ' + ArVal[49] + ArVal[47] + ' '+ ArVal[58] + ArVal[56];
				/*Other informations*/

				transstring= 	'wt_company=' + eBACustomer.company +
								'&wt_country=' + ArVal[80] +
								'&wt_language=' + ArVal[62] +
								'&wt_domain=' + currdomain +
								'&wt_office=' + ArVal[63] +
								'&wt_flow=' + wt_flow +
								'&wt_cpair=' + citypairs +
								'&wt_rtowin=' + tripType +
								'&wt_pnrloc=' + ArVal[68] +
								'&wt_dateob=' + ddate +
								'&wt_dateret=' + rdate +
								'&wt_countryob=' + ArVal[5] +
								'&wt_countryret=' + ArVal[33] +
								'&wt_mop=' + ArVal[77] +
								'&wt_cctype=' + ArVal[78] +
								'&wt_cabin=' + ArVal[70] +
								'&wt_apurchcat=' + wt_apurchcat +
								'&wt_defpay=' + wt_tstatus + deferred + ticketed +
								'&wt_revenue=' + 'CASH'+
								'&wt_curren=' + eBACustomer.compcur +
								'&wt_market=' + wt_market+
			                    '&wt_paymentmode=' +  ArVal[112] +
								'&wt_paymenttype=' + ArVal[113]+
								'&wt_daffinity='+directAffinityUser+
								'&wt_specialFF='+specialFareTracking ;
				var regUndefined =new RegExp("(undefined)", "g");
				transstring = transstring.replace(regUndefined,"");
				transstringpoints = transstring.replace("wt_revenue=CASH","wt_revenue=POINTS");
				transstringlocal = transstring.replace("wt_revenue=CASH","wt_revenue=LOCAL");


				itemstring1 = 	'wt_company=' + eBACustomer.company +
								'&wt_country=' + ArVal[80]+
								'&wt_market=' + wt_market +
								'&wt_language=' + ArVal[62]+
								'&wt_domain=' + currdomain +
								'&wt_office='+ ArVal[63] +
								'&wt_flow=' + wt_flow +
								'&wt_page=' + urltfla +
								'&wt_pagecode=' +  ArVal[76] +
								'&wt_sitecode=' + wt_sitecode +
								'&wt_error=' + value +
								'&wt_curren=' + eBACustomer.compcur+
								'&wt_itemtype=aircomppax'+
								'&wt_sFFid='+ArVal[151];


				itemstring2 = 	'&wt_cpair=' + citypairs +
								'&wt_rtowin='+ tripType +
								'&wt_airrouteob=' + airRouteOut+
								'&wt_airrouteret=' +airRouteIn+
								'&wt_cityrouteob=' + value +
								'&wt_cityrouteret=' + value+
								'&wt_flightob=' +flightsOut+
								'&wt_flightret='+ flightsIn+
								'&wt_sFFName='+ArVal[152];


				itemstring3 = 	'&wt_pax=' + NbPax +
								'&wt_dateob=' + ddate+
								'&wt_dateret=' + rdate +
								'&wt_countryob=' + ArVal[5]+
								'&wt_countryret=' + ArVal[33] +
								'&wt_mop=' + ArVal[77]+
								'&wt_cctype=' + ArVal[78] +
								'&wt_lwfarefamob=' + lowFFOut+
								'&wt_lowfarefamret=' + lowFFIn +
								'&wt_selfarefamob='+ selFFOut +
								'&wt_selfarefamret=' + selFFIn +
								'&wt_cabin='+ ArVal[70] +
								'&wt_nssob=' + NbPax +
								'&wt_nssret=' + nssret+
								'&wt_nss=' + nss +
								'&wt_upsellob=' + upsellOutboundString+
								'&wt_upsellret=' + upsellInboundString+
								'&wt_upsellteaservalueob=' + valueUpsellTeaserO+
								'&wt_upsellteaservalueret=' + valueUpsellTeaserR+
								'&wt_upsellcalendArValueob=' + valueUpsellCalendarO+
								'&wt_upsellcalendArValueret=' + valueUpsellCalendarR+
								'&wt_upsellffvalueob=' + valueUpsellFareFamilyO+
								'&wt_upsellffvalueret=' + valueUpsellFareFamilyR+
								'&wt_sFFinfo='+ArVal[150];

				itemstring1 = itemstring1.replace(regUndefined,"");
				itemstring2 = itemstring2.replace(regUndefined,"");
				itemstring3 = itemstring3.replace(regUndefined,"");

				var itemstringAncillary = itemstring1.replace("wt_itemtype=aircomppax", "wt_itemtype=ancillary");

				var wt_rbdob = "First bound RBD";
				var wt_rbdret = "Last bound RBD";
				itemstring1 += '&wt_rbdob=' + wt_rbdob + '&wt_rbdret=' + wt_rbdret;


				if ((gaAccounts[0] != null && gaAccounts[0] !='') && checkPriceOK && ga_pageCode!="ATCI") {
					if (ga_pageCode =="ATCCONF"){//ATC transaction
						//prices calculation
						pricettc =CurrencyFormatted(ArVal[137]);//Price really paid (balance) can be a negative value
						wt_tax=CurrencyFormatted(ArVal[132]);//taxes of new flight
						wt_fee=CurrencyFormatted(ArVal[134]);//rebooking fees
						wt_pricepax=CurrencyFormatted(ArVal[133]/wt_pax);//price without taxes per passenger

						_gaq.push(['tracker0._addTrans',transstring, ArVal[63], pricettc, wt_tax, wt_fee, "paymentCCCity", "NA", "paymentCCCountry"]);
						_gaq.push(['tracker0._addItem',transstring, itemstring1, itemstring2, itemstring3+"wt_pCategory=AIR", wt_pricepax, wt_pax]);
						_gaq.push(['tracker0._trackTrans']);

					}else if (ga_pageCode =="BKGD"){//just add item services to transactions
						priceSeats = 0;
						priceBags = 0;
						if (ArVal[114]>0){priceSeats=ArVal[116];};
						if (ArVal[117]>0){priceBags=ArVal[119];};
						pricettc = CurrencyFormatted(parseFloat(priceSeats)+parseFloat(priceBags));
						wt_ttclocal=CurrencyFormatted(parseFloat(ArVal[115])+parseFloat(ArVal[118]));
						wt_tax ='0.00';
						wt_fee = '0.00';
						wt_taxlocal ='0.00';
						wt_feelocal ='0.00';
						wt_pax = 0;

						_gaq.push(['tracker0._addTrans',transstring, ArVal[63], pricettc, wt_tax, wt_fee, "paymentCCCity", "NA", "paymentCCCountry"]);
						/*Item Seat*/
						if(indicSeat == 5 && wt_seatQuantity>0){
						//if (wt_seatQuantity>0){
							_gaq.push(['tracker0._addItem',transstring, itemstringAncillary+"wt_pName=PAID SEAT Ancillaries", itemstring2+"wt_pName=PAID SEAT Ancillaries", itemstring3+"wt_pCategory=ANCILLARY", wt_seatPriceReportingPax, wt_seatQuantity]);
							// For local tracking
							_gaq.push(['tracker0._addItem',transstringlocal, itemstringAncillary+"wt_pName=PAID SEAT Ancillaries", itemstring2+"wt_pName=PAID SEAT Ancillaries", itemstring3+"wt_pCategory=ANCILLARY", wt_seatPriceReportingPax, wt_seatQuantity]);
						}
						/*Item Luggage*/
						if(indicLuggage == 5 && wt_luggQuantity>0){
						//if (wt_luggQuantity>0){
							_gaq.push(['tracker0._addItem',transstring, itemstringAncillary+"wt_pName=EXCESS BAGGAGES Ancillaries", itemstring2+"wt_pName=EXCESS BAGGAGES Ancillaries",itemstring3+"wt_pCategory=ANCILLARY", wt_luggPriceReportingPax, wt_luggQuantity]);
							// For local tracking
							_gaq.push(['tracker0._addItem',transstringlocal, itemstringAncillary+"wt_pName=EXCESS BAGGAGES Ancillaries", itemstring2+"wt_pName=EXCESS BAGGAGES Ancillaries",itemstring3+"wt_pCategory=ANCILLARY", wt_luggPriceReportingPax, wt_luggQuantity]);
						}
						_gaq.push(['tracker0._trackTrans']);

					}else if (ga_pageCode =="RD_ATC_CONF"){//ATC award flow
						pricettc =CurrencyFormatted(parseFloat(ArVal[135])-parseFloat(ArVal[136]));//Price to be paid - price refunded if there is (can be a negative value)
						wt_originalpricettc =CurrencyFormatted(ArVal[94]);//Original price
						wt_pricepax=CurrencyFormatted(parseFloat(ArVal[133])/wt_pax);//price without taxes per passenger
						// ArVal[132] : taxes of new flight
						// ArVal[134] : rebooking fees
						wt_totaltaxes = CurrencyFormatted(parseFloat(ArVal[132]) + parseFloat(ArVal[134]));
						
						wt_miles = CurrencyFormatted(ArVal[170]);
						wt_originalmiles = CurrencyFormatted(ArVal[92]);
						if(ArVal[171] != undefined && ArVal[171] != "" && ArVal[171] != 0){
							wt_miles = -CurrencyFormatted(ArVal[171]);
						}
						
						wt_milespax = wt_miles;
						wt_pricepax = pricettc;
						wt_totaltaxespax = wt_totaltaxes;
						if (NbPax != "" && NbPax != "0")
						{
							wt_milespax = CurrencyFormatted(ArVal[133]/NbPax);
							wt_pricepax = CurrencyFormatted(pricettc/NbPax);
							wt_totaltaxespax = CurrencyFormatted(wt_totaltaxes/NbPax);
						}
						//Track the point values
						_gaq.push(['tracker0._addTrans',transstringpoints, ArVal[63], wt_miles, '0.00', wt_originalmiles, "paymentCCCity", "NA", "paymentCCCountry"]);
						_gaq.push(['tracker0._addItem',transstringpoints, itemstring1, itemstring2, itemstring3+"wt_pCategory=AIR", wt_milespax, wt_pax]);

						//Track the cash values
						_gaq.push(['tracker0._addTrans',transstring, ArVal[63], pricettc, wt_totaltaxes, wt_originalpricettc, "paymentCCCity", "NA", "paymentCCCountry"]);
						_gaq.push(['tracker0._addItem',transstring, itemstring1, itemstring2, itemstring3+"wt_pCategory=AIR", wt_totaltaxespax, wt_pax]);

						_gaq.push(['tracker0._trackTrans']);

					}else{//prime booking flow revenue or redemption
						if (launchTracking(ArVal[75].toUpperCase()+ArVal[68])){ //test to avoid multiple track for one pnr
							_gaq.push(['tracker0._addTrans',transstring, ArVal[63], pricettc, wt_tax, wt_fee, "paymentCCCity", "NA", "paymentCCCountry"]);
							_gaq.push(['tracker0._addItem',transstring, itemstring1, itemstring2, itemstring3+"wt_pCategory=AIR", wt_pricepax, wt_pax]);

							/*Item Seat*/
							if (wt_seatQuantity>0){
								_gaq.push(['tracker0._addItem',transstring, itemstringAncillary+"wt_pName=PAID SEAT", itemstring2+"wt_pName=PAID SEAT", itemstring3+"wt_pCategory=ANCILLARY", wt_seatPriceReportingPax, wt_seatQuantity]);
								// For local tracking
								_gaq.push(['tracker0._addItem',transstringlocal, itemstringAncillary+"wt_pName=PAID SEAT", itemstring2+"wt_pName=PAID SEAT", itemstring3+"wt_pCategory=ANCILLARY", wt_seatPriceReportingPax, wt_seatQuantity]);
							}

							/*Item Luggage*/
							if (wt_luggQuantity>0){
								_gaq.push(['tracker0._addItem',transstring, itemstringAncillary+"wt_pName=EXCESS BAGGAGES", itemstring2+"wt_pName=EXCESS BAGGAGES",itemstring3+"wt_pCategory=ANCILLARY", wt_luggPriceReportingPax, wt_luggQuantity]);
								// For local tracking
								_gaq.push(['tracker0._addItem',transstringlocal, itemstringAncillary+"wt_pName=EXCESS BAGGAGES", itemstring2+"wt_pName=EXCESS BAGGAGES",itemstring3+"wt_pCategory=ANCILLARY", wt_luggPriceReportingPax, wt_luggQuantity]);
							}

							_gaq.push(['tracker0._addTrans',transstringlocal, ArVal[63], wt_ttclocal, wt_taxlocal, wt_feelocal, "paymentCCCity", "NA", "paymentCCCountry"]);
							_gaq.push(['tracker0._addItem',transstringlocal, itemstring1, itemstring2, itemstring3+"wt_pCategory=AIR", wt_netlocalpax, wt_pax]);

							if (wt_flow == "redemption") {
								_gaq.push(['tracker0._addTrans',transstringpoints, ArVal[63], wt_miles, wt_tax, wt_fee, "paymentCCCity", "NA", "paymentCCCountry"]);
								_gaq.push(['tracker0._addItem',transstringpoints, itemstring1, itemstring2, itemstring3+"wt_pCategory=AIR", wt_milespax, wt_pax]);
							}

							_gaq.push(['tracker0._trackTrans']);

							/* upsell transaction and items - booking flow */
							if (gaAccounts[1] != null && gaAccounts[1] !='') {
								//case of Upsell
								var priceBeforeUpsell = (parseFloat(selectedFareBeforeUpsellO)+parseFloat(selectedFareBeforeUpsellR))*wt_pax;
								var priceAfterUpsell = parseFloat (ArVal[123]);

								if (priceBeforeUpsell<priceAfterUpsell){
									var upsellValue = CurrencyFormatted(priceAfterUpsell-priceBeforeUpsell);
									var uspellValuePax = CurrencyFormatted((priceAfterUpsell-priceBeforeUpsell)/wt_pax);
									_gaq.push(['tracker1._addTrans',transstring, ArVal[63], pricettc, "0", "0", "paymentCCCity", "NA", "paymentCCCountry"]);
									var attribution = "UpsellPage";
									if (parseFloat(selectedFareAfterTeaserUpsellO)>0 && ((ArVal[83]!=ArVal[85])||(ArVal[84]!=ArVal[86]))){
										//if there was a click on upsell teaser and a real upsell on FF
										attribution = "UpsellTeaser";
									}
									_gaq.push(['tracker1._addItem',transstring, itemstring1 +"&upType="+attribution, itemstring2, itemstring3, ""+uspellValuePax, ""+wt_pax]);
									_gaq.push(['tracker1._trackTrans']);
								}
							}

							/* insurance transaction and items - booking flow */
							if (gaAccounts[2] != null && gaAccounts[2] !='') {
								_gaq.push(['tracker2._addTrans',transstring, ArVal[63], wt_insurance, "0.00","0.00", "paymentCCCity", "NA", "paymentCCCountry"]);
								_gaq.push(['tracker2._addItem',transstring, itemstring1, itemstring2, itemstring3+"wt_pCategory=INSURANCE", ""+wt_insurancepax, ""+wt_pax]);
								_gaq.push(['tracker2._trackTrans']);
							}
						}
					}
				}
			}
		}else{
			// CAR or HOTEL flow
			// It is possible to rent a car or an hotel room just after booked a flight. In this case, 
			// the confirmation page will be BKGD and we will add a value in the transaction id to differentiate cross sell and stand alone.
			var isServicing = false;
			if(ga_pageCode == 'BKGD' && ArVal[127] && ArVal[127].toUpperCase() == 'TRUE'){
				isServicing = true;
			}

			if (ga_pageCode == "CARC" || ga_pageCode == "HOTC" || isServicing){
				var wt_itemType = (wt_flow.toUpperCase() == "CAR") ? 'car' : 'hotel';

				var advpurch = advanceString(ddate);
				var wt_timeStmp = new Date().getTime();
				if(ArVal[72] != undefined && ArVal[72] != ""){
					wt_timeStmp = new Date(ArVal[72]).getTime();
				}

				transstring= 	'wt_company=' + eBACustomer.company +
				'&wt_language=' + ArVal[62] +
				'&wt_env=' + '' +
				'&wt_domain=' + currdomain +
				'&wt_office=' + ArVal[63] +
				'&wt_flow=' + wt_flow +
				((wt_flow == 'CAR') ? '&wt_cpair=' + citypairs : '&wt_location=' + ArVal[0] + '&wt_hotelname=' + ArVal[1]) +
				((wt_flow == 'CAR') ? '&wt_rental=' + ArVal[70] : '&wt_hotelchainname=' + ArVal[2] ) +
				((wt_flow == 'CAR') ? '&wt_confnb=' + ArVal[168] : '') +
				'&wt_pnrloc=' + ArVal[68] +
				((wt_flow == 'CAR') ? '&wt_pickupdate=' : '&wt_arrivaldate=') + ddate +
				((wt_flow == 'CAR') ? '&wt_droppdate=' : '&wt_departuredate=') + rdate +
				'&wt_apurchcat=' + advpurch +
				'&wt_curren=' + ArVal[64] +
				'&wt_market=' + ArVal[108] +
		        '&wt_defpay=' +  ArVal[111] +
		        '&wt_paymentmode=' +  ArVal[112] +
				'&wt_paymenttype=' + ArVal[113]+
				'&wt_daffinity='+ directAffinityUser +
				'&wt_timestamp=' + wt_timeStmp +
				// To know if we are in stand alone or cross sell
				((isServicing) ? '&wt_selltype=crosssell' : '&wt_selltype=standalone');
				var regUndefined =new RegExp("(undefined)", "g");
				transstring = transstring.replace(regUndefined,"");

				itemstring1 = 	'wt_company=' + eBACustomer.company +
							((wt_flow == 'CAR') ? '&wt_rental=' + ArVal[70] : '&wt_hotelchainname=' + ArVal[2] ) +
							((wt_flow == 'CAR') ? '&wt_nbdaysrent=' : '&wt_nbnights=') + ArVal[69] +
							'&wt_page=' + urltfla +
							'&wt_pagecode=' +  ArVal[76] +
							'&wt_sitecode=' + ArVal[107] +
							'&wt_curren=' + ArVal[64];

				if((wt_flow == 'CAR')){
					itemstring2 = 	'wt_cpair=' + citypairs +
									'&wt_rental=' + ArVal[70] +
									'&wt_nbdaysrent=' + ArVal[69] +
									'&wt_itemType='+ wt_itemType;
				}else{
					itemstring2 = 	'wt_location=' + ArVal[0] +
									'&wt_hotelchainname=' + ArVal[2] +
									'&wt_hotelname=' + ArVal[1] +
									'&wt_nbstars=' + ArVal[74] +
									'&wt_nbroombooked=' + ArVal[60] +
									'&wt_itemType='+ wt_itemType;
				}

				if((wt_flow == 'CAR')){
					itemstring3 = 'wt_rental=' + ArVal[70] +
						'&wt_carcategory=' + ArVal[74] +
		 				'&wt_apurchcat=' + advpurch +
		 				'&wt_itemType='+ wt_itemType;
				}else{
					var bookedRoom = 0;
					var tmp = ArVal[70];
					for(var i=0; i < tmp.length(); i++){
						if(i != 0){bookedRoom += '+';}
						bookedRoom += tmp[i][0] + 'x' + tmp[i][1];
					}

					itemstring3 = 'wt_hotelname=' + ArVal[1] +
						'&wt_nbroombooked=' + ArVal[60] +
						'&wt_bookedroom=' + bookedRoom +
						'&wt_nbnights=' + ArVal[69] +
		 				'&wt_apurchcat=' + advpurch +
		 				'&wt_itemType='+ wt_itemType;
				}

				itemstring1 = itemstring1.replace(regUndefined,"");
				itemstring2 = itemstring2.replace(regUndefined,"");
				itemstring3 = itemstring3.replace(regUndefined,"");

				var wt_ttc = (ArVal[65] != undefined) ? CurrencyFormatted(ArVal[65]) : 0;
				var wt_tax = (ArVal[81] != undefined) ? CurrencyFormatted(ArVal[81]) : 0;
				var wt_fee = (ArVal[82] != undefined) ? CurrencyFormatted(ArVal[82]) : 0;
				var wt_net = CurrencyFormatted(wt_ttc - wt_tax - wt_fee);

				_gaq.push(['tracker0._addTrans',transstring, ArVal[63], wt_ttc, wt_tax, wt_fee, "paymentCCCity", "NA", "paymentCCCity"]);
				_gaq.push(['tracker0._addItem',transstring, itemstring1, itemstring2, itemstring3, wt_net, '1']);
				_gaq.push(['tracker0._set', 'currencyCode', ArVal[64]]);
				_gaq.push(['tracker0._trackTrans']);
			}
		}
		(function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    if ($.browser.msie && ($.browser.version == '10.0' || $.browser.version == "9.0")) {
		    	ga.src = ('https:'==document.location.protocol?hostCDNssl: hostCDN)+dirCDN+'/GA/ga.js';
		    } else {
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			}
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	}
}

function CurrencyFormatted(amount) {
	var i = parseFloat(amount);
	if (isNaN(i)) {
		i = 0.00;
	}
	var minus = '';
	if (i < 0) {
		minus = '-';
	}
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if (s.indexOf('.') < 0) {
		s += '.00';
	}
	if (s.indexOf('.') == (s.length - 2)) {
		s += '0';
	}
	s = minus + s;
	return s;
}

function round(number, X) {
	/* rounds number to X decimal places, defaults to 2*/
	X = (!X ? 2 : X);
	return Math.round(number * Math.pow(10, X)) / Math.pow(10, X);
}
function days_between(date1_ms, date2_ms) {
	var ONE_DAY = 1000 * 60 * 60 * 24;
	var difference_ms = Math.abs(date1_ms - date2_ms);
	return Math.round(difference_ms / ONE_DAY);
}

function minutes_between(date1_ms, date2_ms) {
	var ONE_MINUTE = 1000 * 60;
	var difference_ms = Math.abs(date1_ms - date2_ms);
	return Math.round(difference_ms / ONE_MINUTE);
}

function gaStringDate(arvalDate){
	var dateString ="";
	if (arvalDate){
		var ddateumt = gaDate(arvalDate);
		if (ddateumt != 'Invalid Date') {
			var day = ddateumt.getDate();
			var month = ddateumt.getMonth() + 1;
			var year = ddateumt.getFullYear();
			dateString = year + '/' + month + '/' + day;
		}
	}
	return dateString;
}

function gaDate(arvalDate){
	var dateDate="";
	if (arvalDate){
		if (arvalDate.length==12){
			arvalDate=arvalDate.substring(0,4)+"/"+arvalDate.substring(4,6)+"/"+arvalDate.substring(6,8);
		}
		dateDate = new Date(arvalDate);
		if (dateDate == 'Invalid Date' || isNaN(dateDate.getDate())) {
			//case of IE9 or IE8
			var dateFix = arvalDate.replace('+','UTC+');
			dateFix = dateFix.replace('-','UTC-');
			dateDate= new Date(dateFix);
		}
	}
	return dateDate;
}
function advanceString(advanceDate){
	adv = "";
	if (advanceDate!=""){
		var curdate = new Date();
		curdate = curdate.getTime();
		days = days_between(curdate, advanceDate);
		days = (!days ? "" : days);

		if (days<=7){adv="7 days or less";}
		if (days>7&&days<=14){adv="8 to 14 days";}
		if (days>14&&days<=28){adv="15 to 28 days";}
		if (days>28&&days<=60){adv="29 to 60 days";}
		if (days>60&&days<=180){adv="61 to 180 days";}
		if (days>180){adv="over 181 days";}
	}
	return adv;
}

function trackRefund(){
	if (typeof(_gat) == 'object') {
		try{
			if (parseFloat(ArVal[131])<50000||parseFloat(ArVal[131])>(-50000)){//check values

				wt_refundTotal = CurrencyFormatted(ArVal[131])*-1;//negative value
				wt_penalty =  CurrencyFormatted(ArVal[130]);//penalty
				wt_taxRefund = CurrencyFormatted(parseFloat(ArVal[67]-parseFloat(ArVal[128])));//TAX = previousTotalPaid - farePaid
				wt_refundPaid =  CurrencyFormatted(ArVal[67]);//previous TotalPaid

				wt_moneyWin = CurrencyFormatted(parseFloat(ArVal[130])+parseFloat(ArVal[129]));//win = penalty+used
				var itemstringRefund = itemstring1.replace("wt_itemtype=aircomppax", "wt_itemtype=refund");
				var itemstringRefundOriginal = itemstring1.replace("wt_itemtype=aircomppax", "wt_itemtype=refund-OriginalFlight");

				_gaq.push(['_setAccount', gaAccounts[0]]);

				_gaq.push(['_addTrans',transstring+"wt_transType=REFUND", ArVal[63], wt_moneyWin, wt_taxRefund,wt_penalty, "paymentCCCity", "NA", "paymentCCCountry"]);
				_gaq.push(['_addItem',transstring+"wt_transType=REFUND", itemstringRefundOriginal, itemstring2+"wt_pName=REFUND-ORIGINALFLIGHT", itemstring3+"wt_pCategory=REFUND", wt_refundPaid, 1]);
				_gaq.push(['_addItem',transstring+"wt_transType=REFUND", itemstringRefund, itemstring2+"wt_pName=REFUND", itemstring3+"wt_pCategory=REFUND",wt_refundTotal , 1]);
				_gaq.push(['_trackTrans']);
			}
		}catch(err){}
	}
}

function Set_Cookie( name, value, expires, path, domain, secure ){

	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ){
		expires = expires * 1000 * 60;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" +escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
		( ( path ) ? ";path=" + path : "" ) +
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
}

function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ ){
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		// if the extracted name matches passed check_name
		if ( cookie_name == check_name ){
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )	{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found ){
		return null;
	}
}

function Delete_Cookie( name, path, domain ) {
	if ( Get_Cookie( name ) ) document.cookie = name + "=" +
	( ( path ) ? ";path=" + path : "") +
	( ( domain ) ? ";domain=" + domain : "" ) +
	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

function launchTracking(flowAndPnrValue){
	var ckExpiration = 60*24*365;//cookies expiration time set to one year.
	if ( Get_Cookie(flowAndPnrValue) ) {
		return false;//PNR already tracked
	}
	//if all is ok we store pnr in a cookie:
	Set_Cookie(flowAndPnrValue, '1', ckExpiration, '/', '', '');
	return true;
}

if(gaEnabled){
	try {
		GAAction();
	}
	catch(e){
		//alert('erreur : '+e);
	}
}
