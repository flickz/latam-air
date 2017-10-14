var seatMap=(function(){var _readOnly=true;var _currentSegmentIndex;var _segments;var _parameters;var _passengers;var _initialPassengers;var _passengersTemplate;var _currentPassenger;var _exitSeatTooltip;var _closeCallback;var _saveAndCloseCallback;var _currency="";var _requiredParameters=["AIRLINE_CODE","BOOKING_CLASS","B_AIRPORT_CODE","B_DATE","B_TIME","DATE_LOCATION","DATE_LOCATION","EQUIPMENT_NAME","EQUIPMENT_TYPE","E_AIRPORT_CODE","E_TIME","FARE_BASIS","FROM","LANGUAGE","OUTPUT_TYPE","SITE","TO","WDS_MARKET","ONLY_CHARGEABLE_SEATS","ONLY_FREE_SEATS","LIST_MSG_W","LIST_MSG_E"];var _optionalParameters={"FARE_BASIS":true};var _passengersFields=["FIRST_NAME","LAST_NAME","TITLE","TRAVELLER_TYPE","HAS_INFANT","TRAVELLER_ID","RESERVATION","INFANT"];var _flightMsg="FLIGHT";var _template_ExistSeatTooltip=$('<script id="xlSeatTooltip" type="text/x-jquery-tmpl">'+"<div>"+"<h2>"+"{{html text}} - "+'<span class="price">'+'<span class="number">'+clientMessages["SEAT.text.from"]+"{{html price}}</span>"+"</span>"+"</h2>"+'<img width="225" height="110" src="'+clientSideData["WDS_WEBAPP_URL_RELATIVE"]+"/tam_56.32_290917/air/skin/tam/"+clientSideData.SKIN+'/img/ext/seatXL.jpg"><br />'+"</div>"+"<\/script>");var _chargeableSeatsTermsAndConditions=$('<script id="chargableSeatsTermsAndConditions" type="text/x-jquery-tmpl">'+'<div id="seat-terms" class="default">'+'<header class="caption4 wrap">'+'<small class="fl midst"></small>'+'<h3 class="h6">'+clientMessages["SEAT.text.SeatTandC"]+"</h3>"+"</header>"+"<section>"+'<div class="wrap st-container">'+'<span class="st-text-4">'+clientMessages["SEAT.text.LegalNoticeDescription"]+"</span>"+"</div>"+'<div class="wrap br mr45">'+'<label class="fr caption boxg grid7 tc midst center" for="SeatTermsAndConditionsAgreeCheckbox">'+'<input id="SeatTermsAndConditionsAgreeCheckbox" type="checkbox" class="responsive-checkbox">'+'<strong class="block responsive-checkbox-label">'+clientMessages["SEAT.text.IAgree"]+"</strong>"+"</label>"+"</div>"+"</section>"+'<footer class="wrap caption4 default">'+'<button id="cancelButton" class="fl main left">'+clientMessages["SEAT.text.CancelAndChangeYourSeat"]+"</button>"+'<button id="nextButton" class="fr main right">'+clientMessages["SEAT.text.nextConfirmedSeatSelection"]+"</button>"+"</footer>"+"</div>"+"<\/script>");var _template_seatmapNavBar=$('<script id="seatMapNav" type="text/x-jquery-tmpl">'+'<div class="ul-seat-nav">'+'<ul id="seat-navigation" class="seat-nav">'+'<li class="sn-label noselect sn-unselect"><a href="#">{{html bound}}</a></li>'+"{{each tabs}}"+"{{if available}}"+"{{if selected}}"+'<li data-flight-index="{{html flightIndex}}" class="selected sn-selected" ><a id="mg" class="seatnav" href="#">{{html from_iata}}-{{html to_iata}}</a></li>'+"{{else}}"+'<li data-flight-index="{{html flightIndex}}" class="unselect sn-unselect nav-tab-clickable" ><a id="gp" class="seatnav" href="#">{{html from_iata}}-{{html to_iata}}</a></li>'+"{{/if}}"+"{{else}}"+'<li class="sn-unselect greyed sn-greyed" ><a id="gg" class="seatnav" href="#">{{html from_iata}}-{{html to_iata}}</a></li>'+"{{/if}}"+"{{/each}}"+"</ul>"+"</div>"+"<\/script>");var _template_boundInfo=$('<script id="boundInfo" type="text/x-jquery-tmpl">'+'<div class="seatMapBound">'+'<table class="default">'+"{{each travelers}}"+"{{if $index == 0}}"+"<thead>"+"<tr>"+'<th class="h2 middle">'+clientMessages["SEAT.text.passengers"]+"</th>"+'<td class="h2">'+clientMessages["SEAT.text.Seat"]+"</td>"+'<td class="h2">'+clientMessages["SEAT.text.Price"]+"</td>"+"<td>&nbsp;</td>"+"</tr>"+"</thead>"+"<tbody>"+"{{/if}}"+"<tr>"+"<td>{{html title}} {{html first_name}} {{html last_name}}</td>"+'<td>{{if seat == ""}}{{else}}<strong>{{html seat}}</strong>{{/if}}'+'{{if seatType == ""}}'+'<em class="seatType none"></em>'+"{{else}}"+'<em class="seatType">'+'{{if seatType == "XL"}}'+clientMessages["SEAT.text.XLSeat"]+"{{/if}}"+'{{if seatType == "Exit"}}'+clientMessages["SEAT.text.ExitSeat"]+"{{/if}}"+"</em>"+"{{/if}}"+"</td>"+'<td>{{if price == ""}}{{else}}{{html price}}{{/if}}</td>'+"{{if $index == 0}}"+'<td rowspan="{{html travelers.length}}" class="tc">'+'<button class="h6 grid0 changeSeatButton" data-flight-index="{{html flightIndex}}">'+"{{if seatSelected != 0}}"+clientMessages["SEAT.text.ChangeSeats"]+"{{else}}"+clientMessages["SEAT.text.SelectSeats"]+"{{/if}}"+"</button>"+"</td>"+"{{/if}}"+"</tr>"+"{{if $index == travelers.length-1}}"+"</tbody>"+"{{/if}}"+"{{/each}}"+"</table>"+"</div>"+"<\/script>");var _template_traveler=$('<div><label class="block wrap seat seat-item traveler {{if !readonly}}travelerToSel{{/if}}" data-has-infant="{{html hasInfant}}" data-trav="{{html id}}">'+'{{if !readonly}}<input type="radio" class="fl" name="radio1">{{/if}}'+'{{if seatType == "XL" || seatType == "Exit"}}'+'<small class="fl h6 ico seat2x tc"><strong>{{html id}}</strong></small>'+"{{else}}"+'<small class="fl h6 ico seat2 tc"><strong>{{html id}}</strong></small>'+"{{/if}}"+'<div class="seat-item-wrapper">'+'<div class="seat-item-name" title="{{html title}} {{html first_name}} {{html last_name}}">'+"{{html title}} {{html first_name}} {{html last_name}}"+"</div>"+'<div class="seat-item-price" >'+"<strong>"+clientMessages["SEAT.text.Seat"]+": </strong>"+'<em class="seat">'+"{{html seat}}"+"</em>"+'{{if seatType == ""}}'+'<em class="seatType none">'+"</em>"+"{{else}}"+'<em class="seatType">'+'{{if seatType == "XL"}} '+clientMessages["SEAT.text.XLSeat"]+" {{/if}}"+'{{if seatType == "Exit"}} '+clientMessages["SEAT.text.ExitSeat"]+" {{/if}}"+"</em>"+"{{/if}}"+'<span class="m110">'+'{{if price == ""}}'+'<strong class="none">&nbsp;'+clientMessages["SEAT.text.Price"]+": </strong>"+"{{else}}"+"<strong>"+clientMessages["SEAT.text.Price"]+": </strong>"+"{{/if}}"+'<em class="price">{{html price}}</em>'+"</span>"+"</div>"+"{{if hasInfant}}"+'<div class="seat-item-infant" title="{{html inf_first_name}} {{html inf_last_name}}">'+'<strong class="em3">'+clientMessages["SEAT.text.WithInfant"]+"</strong>"+"&nbsp;{{html inf_first_name}} {{html inf_last_name}}"+"</div>"+"{{/if}}"+"</div>"+"</label></div>");var _getSeatsJSON=function(_passengers){var response=[];for(var key in _passengers){if(_passengers.hasOwnProperty(key)&&key!="indexOf"){response[response.length]={"TRAVELLER_ID":_passengers[key].TRAVELLER_ID,"RESERVATION":_passengers[key].RESERVATION};}}return response;};var _verifyParameters=function(config){var missingParameters=[];for(var key in _requiredParameters){if(_requiredParameters.hasOwnProperty(key)){if(_requiredParameters[key]=="ONLY_CHARGEABLE_SEATS"||_requiredParameters[key]=="ONLY_FREE_SEATS"||_requiredParameters[key]=="LIST_MSG_W"||_requiredParameters[key]=="LIST_MSG_E"){if(("undefined"===typeof config[_requiredParameters[key]])||config[_requiredParameters[key]]==""||config[_requiredParameters[key]]=="FALSE"){config[_requiredParameters[key]]="FALSE";}else{if(jQuery.type(config[_requiredParameters[key]])==="array"){config[_requiredParameters[key]]=config[_requiredParameters[key]][0];}}}if("undefined"===typeof config[_requiredParameters[key]]){missingParameters[missingParameters.length]=_requiredParameters[key];}}}_throwLackingParamsError(missingParameters,"No AJAX parameters : ");return config;};var _passengerHasAllRequiredInfo=function(passenger){var lackingParameters=[];for(var key in _passengersFields){if(_passengersFields.hasOwnProperty(key)){if("undefined"===typeof passenger[_passengersFields[key]]){lackingParameters[lackingParameters.length]=_passengersFields[key];}}}_throwLackingParamsError(lackingParameters,"No passenger parameters : ");};var _throwLackingParamsError=function(lackingParameters,msg){var allParamsOptional=true;for(var key in lackingParameters){if(lackingParameters.hasOwnProperty(key)){if(_optionalParameters[key]==false){allParamsOptional=false;break;}}}if(allParamsOptional){return;}if(lackingParameters.length>0){var err=msg;for(var key in lackingParameters){if(lackingParameters.hasOwnProperty(key)){var delimer=(key==lackingParameters.length-1)?".":", ";if(_optionalParameters[key]==false){err+=lackingParameters[key]+delimer;}}}throw new Error(err);}};var _filterParamsForAjax=function(config,flightNr){var ajaxParameters={};for(var key in _requiredParameters){if(_requiredParameters.hasOwnProperty(key)){if("undefined"!==typeof config[_requiredParameters[key]]){ajaxParameters[_requiredParameters[key]]=config[_requiredParameters[key]];}}}ajaxParameters[_flightMsg]=flightNr;return ajaxParameters;};var _showSeatMap=function(htmlString,isInit){if("undefined"!==typeof this.html){this.html.remove();}this.html=$(htmlString).eq(0);addNavBar(this.html);hideNextButtonIfLastSegmentOfLastBound(this.html);hidePrevButtonIfFirstSegment(this.html);if(!_readOnly){addTravelers(this.html);createXlSeatTooltipAndLowestPrices(this.html);}listen(this.html);var width=991;if(_readOnly){width=800;}this.html.dialog({autoOpen:true,draggable:false,modal:true,width:width,resizable:false,closeOnEscape:false,dialogClass:"seatMap innerPopin responsive-dialog responsive-dialog-"+width,open:function(event,ui){$(this).closest(".ui-dialog").find(".ui-dialog-titlebar-close").hide();}});if($.browser.msie&&$.browser.version=="7.0"){$("#seatMap aside").css("background","none").css("border","0");$("#seatMap aside H2, #seatMap aside UL").css("background","#EEEEEE").css("padding","5px");}if(!_readOnly){initTravelers(this.html);}};var createXlSeatTooltipAndLowestPrices=function(html){var exit_lowest=Number.POSITIVE_INFINITY;var xl_lowest=Number.POSITIVE_INFINITY;html.find("small.isChargeable").each(function(){for(var key in _passengers){if(_passengers.hasOwnProperty(key)){var currentCost=$(this).parent().data("cell-value-trav-"+(~~key+1));if($(this).hasClass("seatxl")){if(xl_lowest>currentCost){xl_lowest=currentCost;}}else{if($(this).hasClass("seatx")){if(exit_lowest>currentCost){exit_lowest=currentCost;}}}}}});var exit_seat_hidden=false;var xl_seat_hidden=false;if(isFinite(exit_lowest)){var config=[{"text":html.find("#xlseatMess").text(),"price":theUtils.formatPriceWithCurrency(exit_lowest,_currency)}];_exitSeatTooltip=$(tamUtils.getElementForTmpls(_template_ExistSeatTooltip.tmpl(config)));html.find("aside div em.lowestExitSeat").text(theUtils.formatPriceWithCurrency(exit_lowest,_currency));}else{html.find("aside div em.lowestExitSeat").parent().addClass("none");exit_seat_hidden=true;}if(isFinite(xl_lowest)){html.find("aside div em.lowestXlSeat").text(theUtils.formatPriceWithCurrency(xl_lowest,_currency));}else{html.find("aside div em.lowestXlSeat").parent().addClass("none");xl_seat_hidden=true;}if(exit_seat_hidden){if(xl_seat_hidden){html.find("aside div.seat-legend-item-reg-5").addClass("adj-spacer-5");html.find("aside div.seat-legend-item-reg-58").addClass("adj-spacer-58");html.find("aside div.seat-legend-item-reg-58 small.seate-sm").parent().next().remove();html.find("aside div.seat-legend-item-reg-9 small.seat0-sm").parent().next().remove();}else{html.find("aside div.seat-legend-item-reg-9").addClass("adj-spacer-9");html.find("aside div.seat-legend-item-reg-9-line-2").removeClass("grid3 p1").addClass("adj-spacer-9 grid-2 pr40");html.find("aside div.seat-legend-item-reg-9 small.seat0-sm").parent().next().remove();}}else{if(xl_seat_hidden){html.find("aside div.seat-legend-item-reg-9").addClass("adj-spacer-9");html.find("aside div.seat-legend-item-reg-9-line-2").removeClass("grid3 p1").addClass("adj-spacer-9 grid-2 pr40");html.find("aside div.seat-legend-item-reg-9 small.seat0-sm").parent().next().remove();}}};var getNrOfSelectedSeatsForFlightNr=function(flightNr){var nrOfSelectedPassengers=0;for(var pass in _passengers){if(_passengers.hasOwnProperty(pass)){if(("undefined"!==typeof _passengers[pass].RESERVATION)&&("undefined"!==typeof _passengers[pass].RESERVATION[flightNr])&&("undefined"!==typeof _passengers[pass].RESERVATION[flightNr].SEAT)&&_passengers[pass].RESERVATION[flightNr].SEAT!=""){nrOfSelectedPassengers++;}}}return nrOfSelectedPassengers;};var getTravelersWithSelectedSeatsForFlightNr=function(flightNr,flightIndex){var resp=[];for(var pass in _passengers){if(_passengers.hasOwnProperty(pass)){var ob={"title":_passengers[pass].TITLE,"first_name":_passengers[pass].FIRST_NAME,"last_name":_passengers[pass].LAST_NAME,"flightIndex":flightIndex};if("undefined"!==typeof _passengers[pass].RESERVATION){var currFlight=_passengers[pass].RESERVATION[flightNr];}if(("undefined"!==typeof currFlight)&&("undefined"!==typeof currFlight.SEAT)){seat=currFlight.SEAT;if("undefined"!==typeof currFlight.PRICE){price=theUtils.formatPrice(currFlight.PRICE);}else{price="";}seatType=("undefined"!==typeof currFlight.SEAT_TYPE)?currFlight.SEAT_TYPE:"";ob=jQuery.extend(ob,{"seat":seat,"price":price,"seatType":seatType});}else{ob=jQuery.extend(ob,{"seat":"","price":"","seatType":""});}resp[resp.length]=ob;}}return resp;};var addNavBar=function(html){var navBarHtml="";var navBarTag=html.find("#seat-navigation");var config={"bound":_parameters[_segments[_currentSegmentIndex]].BOUND,"tabs":[]};for(var key in _segments){if(_segments.hasOwnProperty(key)&&_parameters[_segments[key]].BOUND===config.bound){config.tabs.push({"from_iata":_parameters[_segments[key]].B_AIRPORT_CODE,"to_iata":_parameters[_segments[key]].E_AIRPORT_CODE,"selected":(~~key==_currentSegmentIndex?true:false),"flightIndex":key,"available":"JJ"===_parameters[_segments[key]].AIRLINE_CODE});}}navBarHtml=$(tamUtils.getElementForTmpls(_template_seatmapNavBar.tmpl(config)));navBarTag.html(navBarHtml);};var addInfoAboutOtherBounds=function(html,isInit){var currentBound=html.find(".seatMapBound");for(var key in _segments){if(_segments.hasOwnProperty(key)){var additionalHtml="";var config=[{"from":_parameters[_segments[key]].FROM+" ("+_parameters[_segments[key]].B_AIRPORT_CODE+")","to":_parameters[_segments[key]].TO+" ("+_parameters[_segments[key]].E_AIRPORT_CODE+")","bound":_parameters[_segments[key]].BOUND}];if(_readOnly){additionalHtml=$(tamUtils.getElementForTmpls(_template_boundInfoReadOnly.tmpl(config)));}else{config[0]["seatSelected"]=getNrOfSelectedSeatsForFlightNr(_segments[key]);config[0]["maxSeatSelected"]=_passengers.length;if(key!=_currenSegmentIndex){config[0]["travelers"]=getTravelersWithSelectedSeatsForFlightNr(_segments[key],key);}additionalHtml=$(tamUtils.getElementForTmpls(_template_boundInfo.tmpl(config)));}var tmp;if(typeof isInit!=="undefined"&&isInit===true){if((~~key<=_currentSegmentIndex)){additionalHtml.prependTo(currentBound);}else{if(~~key>_currentSegmentIndex){additionalHtml.appendTo(currentBound);}}}else{if((~~key<=_currentSegmentIndex)){currentBound.before(additionalHtml);}else{if(~~key>_currentSegmentIndex){currentBound.after(additionalHtml);}}}}}};var hideNextButtonIfLastSegmentOfLastBound=function(html){if(_segments.length<=1||_currentSegmentIndex+1==_segments.length){html.find("#seatMapNext").addClass("none");}};var hidePrevButtonIfFirstSegment=function(html){if(_segments.length<=1||_currentSegmentIndex==0){html.find("#seatMapPrev").addClass("none");}};var addTravelers=function(html){var config=[];for(var key in _passengers){if(_passengers.hasOwnProperty(key)&&key!="indexOf"&&key!="indexOf"){var seat=price=readonly=seatType="";var currFlight=_passengers[key].RESERVATION[_segments[_currentSegmentIndex]];if(undefined!==currFlight){seat=currFlight.SEAT;if(undefined!=currFlight.PRICE){price=theUtils.formatPrice(currFlight.PRICE);}else{price="";}readonly=currFlight.SEAT_READONLY;seatType=("undefined"!==typeof currFlight.SEAT_TYPE)?currFlight.SEAT_TYPE:"";}config[config.length]={"id":_passengers[key].TRAVELLER_ID,"title":_passengers[key].TITLE,"first_name":_passengers[key].FIRST_NAME,"last_name":_passengers[key].LAST_NAME,"seat":seat,"price":price,"seatType":seatType,"readonly":readonly,"hasInfant":_passengers[key].HAS_INFANT,"inf_first_name":_passengers[key].INFANT.FIRST_NAME,"inf_last_name":_passengers[key].INFANT.LAST_NAME};}}var additionalHtml=$(tamUtils.getElementForTmpls(_template_traveler.tmpl(config)));html.find(".seatMapTravFieldset").html(additionalHtml);};var initTravelers=function(html){for(var key in _passengers){if(_passengers.hasOwnProperty(key)&&key!="indexOf"){if(("undefined"!==typeof _passengers[key].RESERVATION[_segments[_currentSegmentIndex]])&&_passengers[key].RESERVATION[_segments[_currentSegmentIndex]]!=""){html.find("td[data-cell-nr='"+_passengers[key].RESERVATION[_segments[_currentSegmentIndex]].SEAT+"'] small").trigger("clickOnSeat",$.extend({force:true},_passengers[key]));}}}window.wdsHoldTheScrolling=true;html.find(".seatMapTravFieldset .traveler input").eq(0).trigger("click");};var updateTravellerInfo=function(html,traverllerIndex,seat,price,seatType,boundId){if("undefined"!==typeof _passengers[traverllerIndex]){var reservation={};if("undefined"!==typeof seat){reservation["SEAT"]=seat;html.find(".seatMapTravFieldset label[data-trav='"+_passengers[traverllerIndex].TRAVELLER_ID+"'] em.seat").text(seat);}var span=html.find(".seatMapTravFieldset label[data-trav='"+_passengers[traverllerIndex].TRAVELLER_ID+"'] em.price").parents("span");var emPrice=span.find("em.price");var strongPrice=span.find("strong");if("undefined"!==typeof price){reservation["PRICE"]=price;emPrice.text(price).removeClass("none");strongPrice.removeClass("none");}else{if(!emPrice.hasClass("none")){emPrice.addClass("none");}if(!strongPrice.hasClass("none")){strongPrice.addClass("none");}}var emSeatType=html.find(".seatMapTravFieldset label[data-trav='"+_passengers[traverllerIndex].TRAVELLER_ID+"'] em.seatType");var seatIcon=html.find(".seatMapTravFieldset label[data-trav='"+_passengers[traverllerIndex].TRAVELLER_ID+"'] small");if("undefined"!==typeof seatType){reservation["SEAT_TYPE"]=seatType;if(seatType=="XL"){seatType=clientMessages["SEAT.text.XLSeat"];}else{seatType=clientMessages["SEAT.text.ExitSeat"];}emSeatType.html("&nbsp;"+seatType).removeClass("none");seatIcon.removeClass("seat2").addClass("seat2x");}else{if(!emSeatType.hasClass("none")){emSeatType.addClass("none");}seatIcon.removeClass("seat2x").addClass("seat2");}reservation["BOUND_ID"]=boundId;_passengers[traverllerIndex].RESERVATION[_segments[_currentSegmentIndex]]=reservation;var seatSelected=getNrOfSelectedSeatsForFlightNr(_segments[_currentSegmentIndex]);html.find(".seatMapBound").eq(_currentSegmentIndex).find("output .seatSelected").text(seatSelected);if(seatSelected==_passengers.length){html.find(".seatMapBound").eq(_currentSegmentIndex).find("output .ok").removeClass("none");}else{html.find(".seatMapBound").eq(_currentSegmentIndex).find("output .ok").addClass("none");}}};var listen=(function(){var hideCurrentSection=function(html){html.find(".seatMapBound").eq(_currentSegmentIndex+1).remove();};var makeCurrentBoundWait=function(html){html.find("section#seatmap-content").remove();html.find("#seatwaiting").removeClass("none");};var correctCurrentShowingIndex=function(){if(_currentSegmentIndex>=_segments.length){_currentSegmentIndex=0;}if(_currentSegmentIndex<0){_currentSegmentIndex=_segments.length-1;}};var closeCallback=function(html){html.find("#resetSeats").trigger("click");if("undefined"!==typeof _closeCallback){_closeCallback();}_passengers=_passengersTemplate;html.dialog("destroy");return false;};return function(html){html.on("dialogopen",function(e,ui){$("body").addClass("open-seat-map");var holder=$(".seatmap-canvas .seat.br");if(holder&&holder[0]&&holder[0].scrollWidth){holder.scrollLeft((holder[0].scrollWidth-holder.width())/2);}});html.on("wdsdialogclose",function(e,ui){$("body").removeClass("open-seat-map");});html.on("click",".infobutton",function(){$(".seat-inst").slideToggle();});html.on("click","#seatMapNext",function(){hideCurrentSection(html);_currentSegmentIndex=_currentSegmentIndex+1;correctCurrentShowingIndex();makeCurrentBoundWait(html);seatMap.show(_currentSegmentIndex);return false;});html.on("click","#seatMapPrev",function(){hideCurrentSection(html);_currentSegmentIndex=_currentSegmentIndex-1;correctCurrentShowingIndex();makeCurrentBoundWait(html);seatMap.show(_currentSegmentIndex);return false;});html.on("click",".nav-tab-clickable",function(){hideCurrentSection(html);$(this).parent().find('li[data-flight-index="'+_currentSegmentIndex+'"]').removeClass("selected sn-selected").addClass("unselect sn-unselect");$(this).removeClass("unselect sn-unselect").addClass("selected sn-selected");_currentSegmentIndex=~~$(this).data("flightIndex");makeCurrentBoundWait(html);seatMap.show(_currentSegmentIndex);return false;});html.on("click","#seatMapSaveAndClose",function(){html.find(".seatMapTravFieldset .traveler").eq(0).trigger("click");if("undefined"!==typeof _saveAndCloseCallback){_saveAndCloseCallback();}html.trigger("wdsdialogclose");html.dialog("destroy");});html.on("click","#seatMapDiscardAndClose",function(){for(var key in _passengers){if(_passengers.hasOwnProperty(key)&&key!="indexOf"){for(var i=0;i<_segments.length;i++){var segment=_segments[i];if("undefined"!==typeof _passengers[key].RESERVATION[segment]&&("undefined"===typeof _passengers[key].RESERVATION[segment].SEAT_READONLY||!_passengers[key].RESERVATION[segment].SEAT_READONLY)){if("undefined"!==typeof _passengers[key].RESERVATION[segment].SEAT&&_passengers[key].RESERVATION[segment].SEAT!=""){var seatToUnselect=_passengers[key].RESERVATION[segment].SEAT;html.find("td[data-cell-nr='"+seatToUnselect+"'] small").removeClass("seat2x").removeClass("seat2").html("").removeAttr("data-traveller-owner");}_currentPassenger=key;if("undefined"!==typeof _passengersTemplate[key].RESERVATION[segment]){_passengers[key].RESERVATION[segment]=jQuery.extend(true,{},_passengersTemplate[key].RESERVATION[segment]);updateTravellerInfo(html,key,undefined,undefined,undefined,_passengersTemplate[key].RESERVATION[segment].BOUND_ID);}else{_passengers[key].RESERVATION[segment]={};updateTravellerInfo(html,key,"","","",_passengersTemplate[key].RESERVATION[segment].BOUND_ID);}}}}}_passengersTemplate=jQuery.extend(true,[],_passengers);html.trigger("wdsdialogclose");html.dialog("destroy");return false;});html.on("dialogclose",function(event,ui){closeCallback(html);});html.on("click","#seatMapClose",function(){closeCallback(html);});if(!_readOnly){html.on("click",".changeSeatButton",function(){hideCurrentSection(html);_currentSegmentIndex=~~$(this).data("flightIndex");makeCurrentBoundWait(html);seatMap.show(_currentSegmentIndex);return false;});html.on("click","td[data-cell-nr]",function(event){event.preventDefault();var small=$(this).find("small");if(small.hasClass("seat2x")||small.hasClass("seat2")||small.hasClass("seat0")||small.hasClass("infblocked")||small.hasClass("chblocked")){return false;}if(typeof _currentPassenger==="undefined"||("undefined"!==typeof _passengers[_currentPassenger].RESERVATION)&&("undefined"!==typeof _passengers[_currentPassenger].RESERVATION[_segments[_currentSegmentIndex]])&&_passengers[_currentPassenger].RESERVATION[_segments[_currentSegmentIndex]].SEAT_READONLY){return false;}$(this).find("small").trigger("clickOnSeat",_passengers[_currentPassenger]);var price=undefined;var seatType=undefined;var smallFirst=$(this).find("small:first");if(smallFirst.hasClass("isChargeable")){price=$(this).data("cell-value-trav-"+_passengers[_currentPassenger].TRAVELLER_ID);price=theUtils.formatPrice(price);if(smallFirst.hasClass("seatxl")){seatType="XL";}if(smallFirst.hasClass("seatx")){seatType="Exit";}}var boundId=_passengers[_currentPassenger].RESERVATION[_segments[_currentSegmentIndex]].BOUND_ID;updateTravellerInfo(html,_currentPassenger,$(this).data("cell-nr"),price,seatType,boundId);if(window.wdsResponsive&&window.wdsResponsive.isMobileScreen){var sTop=$(".responsive-seat-legend")[0].offsetHeight+$("#seatMap > header")[0].offsetHeight+$("#seatMap > header + section")[0].offsetHeight+8;$(".seatMap").animate({scrollTop:sTop},500);}return false;});html.on("clickOnSeat","small.seat1, small.seatx, small.seatxl, small.seat0",function(event,params){if(typeof params.force==="undefined"&&($(this).hasClass("seat2x")||$(this).hasClass("seat2")||$(this).hasClass("seat0"))){return false;}var oldSmall=html.find("td small[data-traveller-owner='"+params.TRAVELLER_ID+"']");oldSmall.removeClass("seat2x").removeClass("seat2").html("").removeAttr("data-traveller-owner");$(this).attr("data-traveller-owner",params.TRAVELLER_ID);if($(this).hasClass("seatx")||$(this).hasClass("seatxl")||typeof $(this).parent().data("cell-value-trav-"+params.TRAVELLER_ID)!=="undefined"){$(this).addClass("seat2x");}else{$(this).addClass("seat2");}var nr='<b class="h6">'+params.TRAVELLER_ID+"</b>";$(this).html(nr);return true;});html.on("click",".seatMapTravFieldset label.travelerToSel[data-trav]",function(){var id=$(this).data("trav");for(var key in _passengers){if(_passengers.hasOwnProperty(key)&&key!="indexOf"){if(id==_passengers[key].TRAVELLER_ID){_currentPassenger=key;}}}if(_passengers[_currentPassenger].TRAVELLER_TYPE=="CHD"){$(".notSuitableForChild").addClass("chblocked");}else{$(".notSuitableForChild").removeClass("chblocked");}if(_passengers[_currentPassenger].HAS_INFANT){$(".notSuitableForInfant").addClass("infblocked");}else{$(".notSuitableForInfant").removeClass("infblocked");}if(!_passengers[_currentPassenger].HAS_INFANT){$(".infblocked").removeClass("infblocked");}else{var selectedSeats=$("div.seat .seat2.ico, div.seat .seat2x.ico");$.each(selectedSeats,function(){var traveller=$(this).attr("data-traveller-owner");if(traveller!=id){$(this).addClass("infblocked");$(this).parent().prevUntil("td.em1, td.caption3").find("small").addClass("infblocked");$(this).parent().nextUntil("td.em1, td.caption3").find("small").addClass("infblocked");}else{$(this).removeClass("infblocked");$(this).parent().prevUntil("td.em1, td.caption3").find("small").removeClass("infblocked");$(this).parent().nextUntil("td.em1, td.caption3").find("small").removeClass("infblocked");}});}if(window.wdsResponsive&&window.wdsResponsive.isMobileScreen&&!window.wdsHoldTheScrolling){var sTop=$(".responsive-seat-legend")[0].offsetHeight+$("#seatMap > header")[0].offsetHeight+$("#seatMap > header + section")[0].offsetHeight+$("#seatMap .grid360")[0].offsetHeight+36;$(".seatMap").animate({scrollTop:sTop},500);}window.wdsHoldTheScrolling=false;});if($(html).find("aside ul li small.tooltip-link-seatx").length>0){$(html).find("aside ul li small.tooltip-link-seatx").qtip({content:{text:_exitSeatTooltip},position:{my:"bottom center",at:"top center"},style:"topQtip"});}}};})();return{setCloseCallback:function(closeCallback){_closeCallback=closeCallback;},setSaveAndCloseCallback:function(saveAndCloseCallback){_saveAndCloseCallback=saveAndCloseCallback;},setCurrency:function(currency){_currency=currency;},attachPassengers:function(passengers){if("undefined"!==typeof passengers){for(var passengerKey in passengers){_passengerHasAllRequiredInfo(passengers[passengerKey]);}_passengers=jQuery.extend(true,[],passengers);_initialPassengers=jQuery.extend(true,[],passengers);_passengersTemplate=jQuery.extend(true,[],passengers);_readOnly=false;}},getSeats:function(){if("undefined"!==typeof _passengers&&"undefined"!==typeof _currentPassenger){return _getSeatsJSON(_passengers);}else{return null;}},getInitialSeats:function(){if("undefined"!==typeof _initialPassengers&&"undefined"!==typeof _currentPassenger){return _getSeatsJSON(_initialPassengers);}else{return null;}},prepare:function(parameters){if("undefined"!==typeof parameters){_currentSegmentIndex=0;_segments=[];if(Object.prototype.toString.call(parameters)==="[object Array]"){var parsedParameters={};for(var i=0;i<parameters.length;i++){for(var segment in parameters[i]){if(parameters[i].hasOwnProperty(segment)){_segments[_segments.length]=segment;parsedParameters[segment]=parameters[i][segment];}}}_parameters=parsedParameters;}else{for(var segment in parameters){if(parameters.hasOwnProperty(segment)){_segments[_segments.length]=segment;}}_parameters=parameters;}}},show:function(){if("undefined"!==typeof _segments&&_segments.length>0){var finalSegmentIndex=0;var isInitialized=false;if("boolean"==typeof arguments[0]){isInitialized=arguments[0];}else{if(arguments.length==1){if(~~arguments[0]<_segments.length){finalSegmentIndex=~~arguments[0];}else{return false;}}else{if(arguments.length>1){return false;}}}_currentSegmentIndex=finalSegmentIndex;var config=_parameters[_segments[_currentSegmentIndex]];config=_verifyParameters(config);var ajaxParameters=_filterParamsForAjax(config,_segments[_currentSegmentIndex]);ajaxParameters["DEVICE_TYPE"]="desktop";if(_readOnly){ajaxParameters["READ_ONLY"]="TRUE";}var formattedUrl;if(clientSideData.FLOW==="SERVICING"){formattedUrl=clientSideData.WDS_WEBAPP_URL_RELATIVE+encodeUrl("/dyn/air/servicing/SeatMap");}else{formattedUrl=clientSideData.WDS_WEBAPP_URL_RELATIVE+encodeUrl("/dyn/air/booking/SeatMap");}$.ajax({type:"POST",url:formattedUrl,dataType:"html",data:ajaxParameters,success:function(html){if(_currentSegmentIndex==0){_showSeatMap(html,true);}else{_showSeatMap(html,isInitialized);}},error:function(XHR,textStatus,errorThrown){}});}else{return false;}},chargeableSeatsPopin:function(successCallback){var popin=$(tamUtils.getElementForTmpls(_chargeableSeatsTermsAndConditions.tmpl()));var checkedIAgree=false;popin.dialog({autoOpen:true,draggable:false,width:725,modal:true,resizable:false,dialogClass:"innerPopin responsive-dialog responsive-dialog-640",closeOnEscape:false,open:function(event,ui){$("body").addClass("open-modal-dialog");$(this).closest(".ui-dialog").scrollTop(0);$(this).closest(".ui-dialog").find(".ui-dialog-titlebar-close").hide();$(this).find("#SeatTermsAndConditionsAgreeCheckbox").change(function(){checkedIAgree=$(this).is(":checked");});$(this).find("#nextButton").on("click",function(){if(checkedIAgree){popin.dialog("close");$("body").removeClass("open-modal-dialog");popin.dialog("destroy").remove();successCallback();}});$(this).find("#cancelButton").on("click",function(){popin.dialog("close");$("body").removeClass("open-modal-dialog");popin.dialog("destroy").remove();});}});}};})();$(document).ready(function(){if(window.wdsResponsive&&window.wdsResponsive.isMobileScreen){var seatLegend=$(".responsive-seat-legend");if(seatLegend.length>0){var sTop=$(".responsive-seat-legend")[0].offsetHeight+$("#seatMap > header")[0].offsetHeight+$("#seatMap > header + section")[0].offsetHeight+$("#seatMap .grid360")[0].offsetHeight+36;$(".seatMap").animate({scrollTop:sTop},500);}}});