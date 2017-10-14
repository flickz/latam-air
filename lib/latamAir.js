const util = require('util');
//TODO: The code is mess currently because I'm still experimenting
exports.getFlightConnection = function($){
    var stops = [];
    $('table[id=outbound_list_flight] > tbody').find('.flightType-Connection').each((i, elm)=>{
      var obj = {}, subObj1 = {}, subObj2 = {};
      if($(elm).hasClass('flightNextSegment')){
        subObj2['flightNumber'] = $(elm).attr('data-flightnumber');
        subObj2['origin'] = $(elm).attr('data-departureairportcode');
        subObj2['destination'] = $(elm).attr('data-arrivalairportcode');
        subObj2['depTime'] = $(elm).attr('data-departuretime');
        subObj2['arrTime'] = $(elm).attr('data-arrivaltime');
        subObj2['duration'] = $(elm).attr('data-rpduration');
        subObj2['connectionDuration'] = '';
        stops.push(subObj2);
      }
      if(!$(elm).hasClass('flightNextSegment')){
        $(elm).find('.ff-NOVOBASICO').each((j, innerEml)=>{
            obj['price'] =  $(innerEml).attr('data-cell-value');
            obj['tax'] = $(innerEml).attr('data-cell-tax-adt');
        });
        subObj1['flightNumber'] = $(elm).attr('data-flightnumber');
        subObj1['origin'] = $(elm).attr('data-departureairportcode');
        subObj1['destination'] = $(elm).attr('data-arrivalairportcode');
        subObj1['depTime'] = $(elm).attr('data-departuretime');
        subObj1['arrTime'] = $(elm).attr('data-arrivaltime');
        subObj1['duration'] = $(elm).attr('data-rpduration');
        subObj1['connectionDuration'] = '';
        stops.push(subObj1);
      } 
      console.log(stops);        
    });
}
//TODO: Needs more abstraction
exports.getDirectFlight = function($){
  const col = [];
  $('table[id=outbound_list_flight] > tbody').find('.flightType-Direct').each((i, elm)=>{
    var obj = {}, subObj={}, stops = [];        
    $(elm).find('.ff-NOVOBASICO').each((j, innerEml)=>{
        obj['price'] =  $(innerEml).attr('data-cell-value');
        obj['tax'] = $(innerEml).attr('data-cell-tax-adt');
    });
    obj['totalDuration'] = $(elm).attr('data-rpduration');                
    subObj['flightNumber'] = $(elm).attr('data-flightnumber');
    subObj['origin'] = $(elm).attr('data-departureairportcode');
    subObj['destination'] = $(elm).attr('data-arrivalairportcode');
    subObj['depTime'] = $(elm).attr('data-departuretime');
    subObj['arrTime'] = $(elm).attr('data-arrivaltime');
    subObj['duration'] = $(elm).attr('data-rpduration');
    stops.push(subObj);
    obj['stops'] = stops;        
    col.push(obj);
   });
   console.log(col);
   return col;
}
