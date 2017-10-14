var template_changePricesAndDatesMain=$('<script id="template_changePricesAndDatesMain" type="text/x-jquery-tmpl">'+"<div>"+'<header class="caption boxw br">'+'<p class="fr"><strong>${messages.initDate}</strong></p>'+'<h2 class="em3">${messages.inboundOutbound}</h2> <span> ${messages.from} '+"<strong>${template_changePricesAndDates.formatDestination(departureCity)}</strong> ${messages.to} <strong>"+"${template_changePricesAndDates.formatDestination(arrivalCity)}</strong></span>"+"</header>"+'<table class="cald br tc ${bound}">'+"<thead>"+"<tr>"+"{{each messages.daysOfTheWeek}}"+'<th class="${template_changePricesAndDates.writeDay($index, days)}">${$value}</th>'+"{{/each}}"+"</tr>"+"</thead>"+"<tbody>"+"{{each days}}"+"{{if $index % 7 == 0 && $index != 0 }}</tr>{{/if}}"+"{{if $index % 7 == 0 }}<tr>{{/if}}"+"{{if AVAILABLE && !OUT_OF_SCOPE}}"+"{{if REBOOKING_FEE_WAIVED}}"+'${__tmpl_variable_rebooking_fee_waived=true,""}'+"{{else}}"+'${__tmpl_variable_rebooking_fee_waived=false, ""}'+"{{/if}}"+"{{if CHEAPEST || IS_SELECTED}}"+"{{if IS_SELECTED}}"+"{{html template_changePricesAndDates.printSelectedCell(FORMATED_DATE, INPUT_FORMATED_DATE, bound, PRICE, CHEAPEST, true, __tmpl_variable_rebooking_fee_waived)}}"+"{{else}}"+"{{if CHEAPEST}}"+"{{html template_changePricesAndDates.printLowestCell(FORMATED_DATE, INPUT_FORMATED_DATE, bound, PRICE, __tmpl_variable_rebooking_fee_waived)}}"+"{{/if}}"+"{{/if}}"+"{{else}}"+"{{html template_changePricesAndDates.printNormalCell(FORMATED_DATE, INPUT_FORMATED_DATE, bound, PRICE, false, __tmpl_variable_rebooking_fee_waived)}}"+"{{/if}}"+"{{else}}"+"{{if OUT_OF_SCOPE}}"+"{{html template_changePricesAndDates.printOutOfRange(FORMATED_DATE, messages.outOfRange)}}"+"{{else}}"+"{{html template_changePricesAndDates.printNoAvailable(FORMATED_DATE, messages.notAvailable)}}"+"{{/if}}"+"{{/if}}"+"{{/each}}"+"</tbody>"+"</table>"+'<section class="tc none hideTableSection" style="margin:50px 0 50px";>'+'<img src="'+clientSideData["WDS_WEBAPP_URL_RELATIVE"]+"/tam_56.32_290917/air/skin/tam/"+clientSideData.SKIN+'/img/loading.gif" class="br" alt="loading">'+"</section>"+"</div>"+"<\/script>");var template_changePricesAndDates=$('<script id="template_changePricesAndDates" type="text/x-jquery-tmpl">'+'<div class="innerPopin" id="changePricesAndDatesModal">'+'<header class="caption4"><h3 class="h6">${messages.changePricesDates}</h3></header>'+'<section style="background:white;padding-top:5px;"><div style="display:none;" id="popinWarning" class="warning w4"></div><div class="warning em error" id="caldErrorPanel" style="display : none"></div></section>'+'<section style="background:white;padding:8px;">'+'<button class="fr changeDates">${messages.changeDates}</button>'+'<input type="text" class="changeDatesDP" style="display:none;" />'+'{{if calendar.length > 1}}<input type="text" class="changeDatesDP" style="display:none;" />{{/if}}'+'<p class="mr messageInfo">{{html messages.info}}</p>'+"{{each calendar}}"+"{{html $value}}"+"{{/each}}"+"</section>"+'<footer class="caption4 default tr">'+'<button id="reCald_next" class="main right nextBtn">${messages.nextBtn}</button>'+"</footer>"+"</div>"+"<\/script>");template_changePricesAndDates.printUncombinedCell=function(formatedDate,inFormatedDate,bound,price){return'<td class="uncombinable" data-cell-date="'+formatedDate+'"><small class="ico uncomb tooltip-link" oldtitle="#wdk-tooltip-info6" aria-describedby="qtip-0"></small>'+"<strong>"+formatedDate+'<span class="inDate'+bound+'" style="display:none">'+inFormatedDate+"</span></strong><br>"+template_changePricesAndDates.formatPrice(price)+"</td>";};template_changePricesAndDates.printNoAvailable=function(formatedDate,messageNotAvailablee){return'<td class="em1 disabled nA"  data-cell-date="'+formatedDate+'">'+messageNotAvailablee+"</td>";};template_changePricesAndDates.printOutOfRange=function(formatedDate,messageOutOfRange){return'<td class="em1 disabled"  data-cell-date="'+formatedDate+'">'+messageOutOfRange+"</td>";};template_changePricesAndDates.printSelectedCell=function(formatedDate,inFormatedDate,bound,price,isLowest,wasSelected,isRebookingFeeWaived){var extraClass="";var extraDom="";if(wasSelected){extraClass=" caption3 ";}if(isLowest){extraClass+=" lowest em3";extraDom='<small class="fr"><small class="ico cheap"></small></small>';}if(isRebookingFeeWaived){extraDom+='<small class="ico rbfee tooltip-link" oldtitle="#wdk-tooltip-info6" aria-describedby="qtip-0"></small>';}return'<td class="selected'+extraClass+'" data-cell-date="'+formatedDate+'">'+extraDom+"<strong>&nbsp;"+formatedDate+'<span class="inDate'+bound+'" style="display:none">'+inFormatedDate+"</span></strong><br>"+template_changePricesAndDates.formatPrice(price)+"</td>";};template_changePricesAndDates.printNormalCell=function(formatedDate,inFormatedDate,bound,price,wasSelected,isRebookingFeeWaived){var extraClass="";if(wasSelected){extraClass="caption3";}var extraDom="";if(isRebookingFeeWaived){extraDom='<small class="ico rbfee tooltip-link" oldtitle="#wdk-tooltip-info6" aria-describedby="qtip-0"></small>';}return'<td class="'+extraClass+'" data-cell-date="'+formatedDate+'">'+extraDom+"<strong>&nbsp;"+formatedDate+'<span class="inDate'+bound+'" style="display:none">'+inFormatedDate+"</span></strong><br>"+template_changePricesAndDates.formatPrice(price)+"</td>";};template_changePricesAndDates.printLowestCell=function(formatedDate,inFormatedDate,bound,price,isRebookingFeeWaived){var extraDom="";if(isRebookingFeeWaived){extraDom='<small class="ico rbfee tooltip-link" oldtitle="#wdk-tooltip-info6" aria-describedby="qtip-0"></small>';}return'<td class="lowest em3" data-cell-date="'+formatedDate+'">'+extraDom+'<small class="fr"><small class="ico cheap"></small></small><strong>&nbsp;'+formatedDate+'<span class="inDate'+bound+'" style="display:none">'+inFormatedDate+"</span></strong><br>"+template_changePricesAndDates.formatPrice(price)+"</td>";};template_changePricesAndDates.formatPrice=function(price){return theUtils.formatPrice(price);};template_changePricesAndDates.formatDestination=function(destinationOb){if(destinationOb.cityCode==destinationOb.cityName){return destinationOb.cityName;}return destinationOb.cityName+" ("+destinationOb.locationCode+") ";};template_changePricesAndDates.writeDay=function(dayIndex,daysPresented){if(typeof template_changePricesAndDates.SELECTED_DAY_OF_WEEK!=="undefined"){if(!daysPresented[template_changePricesAndDates.SELECTED_DAY_OF_WEEK].IS_SELECTED){template_changePricesAndDates.SELECTED_DAY_OF_WEEK=undefined;}}if(typeof template_changePricesAndDates.SELECTED_DAY_OF_WEEK==="undefined"){for(key in daysPresented){if(daysPresented.hasOwnProperty(key)){if(daysPresented[key].IS_SELECTED){template_changePricesAndDates.SELECTED_DAY_OF_WEEK=key%7;}}}}var aClass="caption";if(dayIndex==template_changePricesAndDates.SELECTED_DAY_OF_WEEK){aClass="caption2";}return aClass;};template_changePricesAndDates.removeSessionCookie=function(name){var c=document.cookie.split(";");var returnValue=undefined;$.each(c,function(index){if(typeof(c[index])==="string"&&$.trim(this.split("=")[0]).indexOf(name)==0){document.cookie=$.trim(this.split("=")[0])+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";}});};template_changePricesAndDates.listenForOneWayRebookingFee=function(popin){if(typeof clientSideData.CALENDAR.IS_WAIVER!="undefined"&&clientSideData.CALENDAR.IS_WAIVER){var bottomPanel='<div class="wrap">'+'<p class="hr"><strong>'+clientMessages["ATC_CALD.text.Legend"]+"</strong>"+'<small class="ico rbfee midst"></small>'+clientMessages["ATC_CALD.text.RebookinkFeeWaived"]+"</p></div>";popin.find(".hideTableSection:last").after(bottomPanel);}};template_changePricesAndDates.evaluateBoolean=function(myBoolean){if(typeof myBoolean=="undefined"||!myBoolean){return false;}return myBoolean;};template_changePricesAndDates.listenForInternationalRound=function(popin){var popinMatrix=clientSideData.CALENDAR.POPIN_MATRIX;var self=this;var pc="OD_CALD";if(clientSideData.PAGE_CODE=="ATC_UPSL"){pc="ATC_CALD";}var whyMyPrices='<p><a class="em whyMyPrices" href="#">'+clientMessages[pc+".text.WhyMyPriceAreChanging"]+"</a></p>";popin.find(".messageInfo").after(whyMyPrices);var bottomPanel='<div class="wrap"><p class="fr h5 em br">'+clientMessages[pc+".text.Total"]+'<em class="totalPrice fr h5 em"></em></p>'+'<p class="hr"><strong>'+clientMessages[pc+".text.Legend"]+'</strong> <small class="ico uncomb midst"></small>'+clientMessages[pc+".text.UncombinableFlight"]+"</p></div>";if(clientSideData.FLOW==="REBOOKING"){bottomPanel='<div class="wrap">'+'<p class="fr br"><strong>'+clientMessages[pc+".text.totalToBePaid"]+'</strong><em class="totalToBePayed fr"></em></p>'+'<p class="clearb fr br"><strong>'+clientMessages[pc+".text.totalRefunded"]+'</strong><em class="totalToBeRefunded fr"></em></p>'+'<p class="hr"><strong>'+clientMessages[pc+".text.Legend"]+"</strong>"+'<small class="ico uncomb midst"></small>'+clientMessages[pc+".text.UncombinableFlight"];if(clientSideData.CALENDAR.IS_WAIVER!="undefined"&&clientSideData.CALENDAR.IS_WAIVER){bottomPanel+='<small class="ico rbfee midst"></small>'+clientMessages[pc+".text.RebookinkFeeWaived"];}bottomPanel+="</p></div>";}popin.find(".hideTableSection:last").after(bottomPanel);popin.find(".whyMyPrices").qtip({content:{text:clientMessages[pc+".text.WhyMyPriceAreChangingDescription"]},position:{my:"bottom center",at:"top center"},style:"topQtip"}).click(function(){return false;});popin.on("click","td",function(){if($(this).hasClass("disabled")){return;}var table=$(this).closest("table");var tableToHide;var master,slave;if(table.hasClass("outbound")){master="outbound";slave="inbound";tableToHide=popin.find("table.inbound");}else{master="inbound";slave="outbound";tableToHide=popin.find("table.outbound");}if($(this).hasClass("uncombinable")){$("table."+slave+" td.selected").removeClass("selected");}tableToHide.addClass("none");tableToHide.next().removeClass("none");tableToHide.find("td").each(function(){var response="";var cell=$(this);if(cell.hasClass("disabled")){return;}if(typeof cell.data("cellDate")!=="undefined"){var dataCellDate=cell.data("cellDate");var record;var mapKey;if(master=="outbound"){mapKey="INBOUND";record=table.find("td.selected").data("cellDate")+"_"+cell.data("cellDate");}else{mapKey="OUTBOUND";record=cell.data("cellDate")+"_"+table.find("td.selected").data("cellDate");}if(typeof popinMatrix[record]!=="undefined"){if(cell.hasClass("caption3")&&!cell.hasClass("selected")){if(popinMatrix[record][mapKey].CHEAPEST){response+=self.printLowestCell(popinMatrix[record][mapKey].FORMATED_DATE,popinMatrix[record][mapKey].INPUT_FORMATED_DATE,slave,popinMatrix[record][mapKey].PRICE,true,self.evaluateBoolean(popinMatrix[record][mapKey].REBOOKING_FEE_WAIVED));}else{response+=self.printNormalCell(popinMatrix[record][mapKey].FORMATED_DATE,popinMatrix[record][mapKey].INPUT_FORMATED_DATE,slave,popinMatrix[record][mapKey].PRICE,true,self.evaluateBoolean(popinMatrix[record][mapKey].REBOOKING_FEE_WAIVED));}}else{if(cell.hasClass("selected")){var wasSelected=false;var isLowest=false;if(cell.hasClass("caption3")){wasSelected=true;}if(popinMatrix[record][mapKey].CHEAPEST){isLowest=true;}response+=self.printSelectedCell(popinMatrix[record][mapKey].FORMATED_DATE,popinMatrix[record][mapKey].INPUT_FORMATED_DATE,slave,popinMatrix[record][mapKey].PRICE,isLowest,wasSelected,self.evaluateBoolean(popinMatrix[record][mapKey].REBOOKING_FEE_WAIVED));}else{if(popinMatrix[record][mapKey].CHEAPEST){response+=self.printLowestCell(popinMatrix[record][mapKey].FORMATED_DATE,popinMatrix[record][mapKey].INPUT_FORMATED_DATE,slave,popinMatrix[record][mapKey].PRICE,self.evaluateBoolean(popinMatrix[record][mapKey].REBOOKING_FEE_WAIVED));}else{response+=self.printNormalCell(popinMatrix[record][mapKey].FORMATED_DATE,popinMatrix[record][mapKey].INPUT_FORMATED_DATE,slave,popinMatrix[record][mapKey].PRICE,false,self.evaluateBoolean(popinMatrix[record][mapKey].REBOOKING_FEE_WAIVED));}}}}else{var $td=$(this);var uncombinable=false;var uncombinableMap=undefined;$("table."+master+" td").each(function(){if(typeof cell.data("cellDate")!=="undefined"){var record;if(master=="outbound"){mapKey="INBOUND";record=cell.data("cellDate")+"_"+$td.data("cellDate");}else{mapKey="OUTBOUND";record=$td.data("cellDate")+"_"+cell.data("cellDate");}if(typeof popinMatrix[record]!=="undefined"){if(typeof uncombinableMap==="undefined"){uncombinable=true;uncombinableMap=popinMatrix[record][mapKey];}else{if(uncombinableMap.PRICE>popinMatrix[record][mapKey].PRICE){uncombinableMap=popinMatrix[record][mapKey];}}}}});if(uncombinable){response=self.printUncombinedCell(dataCellDate,uncombinableMap.INPUT_FORMATED_DATE,slave,uncombinableMap.PRICE);}else{if($td.hasClass("nA")){response+=self.printNoAvailable(dataCellDate,clientMessages[pc+".text.Legend.NoSeatReco"]);}else{response+=self.printOutOfRange(dataCellDate,clientMessages[pc+".text.Legend.OutOfRange"]);}}}$(this).replaceWith(response);}});self.updateTotalPrice(popin);setTimeout(function(){tableToHide.removeClass("none");tableToHide.next().addClass("none");},1000);});this.updateTotalPrice(popin);};template_changePricesAndDates.updateTotalPrice=function(popin){var outCost=parseFloat(theUtils.getLocalIndependetAmount(jQuery.trim(popin.find(".outbound td.selected").clone().children().remove().end().text())));var inCost=parseFloat(theUtils.getLocalIndependetAmount(jQuery.trim(popin.find(".inbound td.selected").clone().children().remove().end().text())));if(clientSideData.FLOW==="REBOOKING"){var refund=0;var toBePayed=0;$.each($("#changePricesAndDatesModal").find(".selected"),function(){var date=$(this).data("cellDate");if($(this).parents("table").hasClass("inbound")){recos=clientSideData.CALENDAR.LOWEST_PRICES_INBOUND;}else{recos=clientSideData.CALENDAR.LOWEST_PRICES_OUTBOUND;}$.each(recos,function(){if(this.FORMATED_DATE==date){refund+=this.REFUND;toBePayed+=this.TO_BE_PAYED;}});});var totalToBeRefunded=popin.find(".totalToBeRefunded");if(refund>0){totalToBeRefunded.removeClass("em");totalToBeRefunded.addClass("em3");}else{totalToBeRefunded.removeClass("em3");totalToBeRefunded.addClass("em");}var totalToBePayed=popin.find(".totalToBePayed");if(toBePayed>0){totalToBePayed.removeClass("em3");totalToBePayed.addClass("em");}else{totalToBePayed.removeClass("em");totalToBePayed.addClass("em3");}if((""+clientSideData.CURRENCIES_TO_SWITCH).indexOf(clientSideData.CURRENCY_CODE)!=-1){totalToBePayed.text(" "+clientSideData.CURRENCIES_MAP[clientSideData.CURRENCY_CODE]+" "+theUtils.formatPrice(toBePayed));}else{totalToBePayed.text(" "+theUtils.formatPrice(toBePayed)+" "+clientSideData.CURRENCIES_MAP[clientSideData.CURRENCY_CODE]);}if((""+clientSideData.CURRENCIES_TO_SWITCH).indexOf(clientSideData.CURRENCY_CODE)!=-1){totalToBeRefunded.text(" "+clientSideData.CURRENCIES_MAP[clientSideData.CURRENCY_CODE]+" "+theUtils.formatPrice(refund));}else{totalToBeRefunded.text(" "+theUtils.formatPrice(refund)+" "+clientSideData.CURRENCIES_MAP[clientSideData.CURRENCY_CODE]);}}else{sum=outCost+inCost;if(!(isNaN(outCost)||isNaN(inCost))){if((""+clientSideData.CURRENCIES_TO_SWITCH).indexOf(clientSideData.CURRENCY_CODE)!=-1){popin.find(".totalPrice").text(" "+clientSideData.CURRENCIES_MAP[clientSideData.CURRENCY_CODE]+" "+theUtils.formatPrice(sum));}else{popin.find(".totalPrice").text(" "+theUtils.formatPrice(sum)+" "+clientSideData.CURRENCIES_MAP[clientSideData.CURRENCY_CODE]);}}else{popin.find(".totalPrice").text(" -");}}};template_changePricesAndDates.listen=function(popin){popin.on("click","button.changeDates",function(){$(".changeDatesDP").eq(0).val(jQuery.trim(popin.find(".selected .inDateOutbound").text()));$(".changeDatesDP").eq(1).val(jQuery.trim(popin.find(".selected .inDateInbound").text()));theCoUpslPage.coCaldDatepicker($(".changeDatesDP"),popin);});popin.on("click","td",function(){if($(this).hasClass("disabled")){return;}$(this).closest("table").find(".selected").removeClass("selected");$(this).addClass("selected");});popin.on("click","button.nextBtn",function(){var request=clientSideData.CALLEE;$.blockUI();if(clientSideData.PAGE_CODE=="ATC_UPSL"){if(jQuery.trim($(".selected .inDateoutbound").text())==""){request.B_DATE_1=clientSideData.ORGINAL_B_DATE_1;}else{request.B_DATE_1=jQuery.trim(popin.find(".selected .inDateoutbound").text())+"0000";}if(jQuery.trim($(".selected .inDateinbound").text())==""){request.B_DATE_2=clientSideData.ORGINAL_B_DATE_2;}else{request.B_DATE_2=jQuery.trim(popin.find(".selected .inDateinbound").text())+"0000";}}else{if(clientSideData["TRIP_TYPE"]=="R"){if((jQuery.trim(popin.find(".selected .inDateoutbound").text())>jQuery.trim(popin.find(".selected .inDateinbound").text()))||(jQuery.trim(popin.find(".selected .inDateoutbound").text())==""||jQuery.trim(popin.find(".selected .inDateinbound").text())=="")){$("#caldErrorPanel").errorPanel();$("#caldErrorPanel").errorPanel("addError",null,null,clientMessages["ALLP.error.InvalidCombinationDates"]);$.unblockUI();return;}else{$("#caldErrorPanel").errorPanel("removeError",null,null,clientMessages["ALLP.error.InvalidCombinationDates"]);}}request.B_DATE_1=jQuery.trim(popin.find(".selected .inDateoutbound").text())+"0000";if(typeof popin.find(".selected .inDateinbound")!=="undefined"&&jQuery.trim(popin.find(".selected .inDateinbound").text())!==""){request.B_DATE_2=jQuery.trim(popin.find(".selected .inDateinbound").text())+"0000";}}var pageCode;if(clientSideData.PAGE_CODE!="ATC_UPSL"){pageCode="upslDispatcher";}else{pageCode="availability";}var fullLocation=""+window.location;var controller;if(clientSideData.IS_ATC){controller="rebooking/";if(fullLocation.indexOf("rebooking")>0){controller="";}}else{controller="booking/";if(fullLocation.indexOf("booking")>0){controller="";}}template_changePricesAndDates.removeSessionCookie("inboundPreselectedFlightNumber_");template_changePricesAndDates.removeSessionCookie("inboundPreselectedFareFamily_");template_changePricesAndDates.removeSessionCookie("outboundPreselectedFlightNumber_");template_changePricesAndDates.removeSessionCookie("outboundPreselectedFareFamily_");$.jStorage.deleteKey("inboundPreselected");$.jStorage.deleteKey("outboundPreselected");clientSideData["outboundPreselected"]=undefined;clientSideData["outboundPreselectedFlightNumber"]=null;clientSideData["inboundPreselected"]=undefined;clientSideData["inboundPreselectedFlightNumber"]=null;theCoUpslPage.removeSessionCookie("clickedOutboundTab_");theCoUpslPage.removeSessionCookie("clickedInboundTab_");theCoUpslPage.setSessionCookie("clickedOutboundTab_"+clientSideData.jSessionId,undefined);theCoUpslPage.setSessionCookie("clickedInboundTab_"+clientSideData.jSessionId,undefined);tamUtils.goPost(encodeUrl(controller+pageCode),request);});};