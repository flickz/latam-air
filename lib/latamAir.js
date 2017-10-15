const NodeCache = require('node-cache');
const latamCache = new NodeCache({checkperiod: 0});
const allCacheTimeOut = 89238928392;

/**
 * Returns an Array of Availabe Flights
 * @param {function} $ - Parsed html using cheerio
 * @param {string} type - In or Out type of flight. Defaults Out
 * @todo The code needs more abstraction
 */
const getAvailableFlights = function($, type='out'){
  var tableRow;
  if(type==='in'){
    tableRow = $('table[id=inbound_list_flight] > tbody').children().toArray();
  }else{
    tableRow = $('table[id=outbound_list_flight] > tbody').children().toArray();
  }
    
  let availableFlights = [], stops=[];
  latamCache.set('connected', false, allCacheTimeOut);
  for(let i= 0; i<tableRow.length; i++){
    let row = tableRow[i];
    if($(row).hasClass('flightType-Direct')){
      let directFlightDetails = getDirectFlight($,row);
      availableFlights.push(directFlightDetails);
      continue;
    }else if($(row).hasClass('flight') && $(row).hasClass('flightType-Connection') && latamCache.get('connected') === false){
      latamCache.set('connected', true, allCacheTimeOut);
      //extract price, tax,
      let twoWayFlight = {};
      $(row).find('.ff-NOVOBASICO').each((j, innerElm)=>{
        twoWayFlight['price'] =  $(innerElm).attr('data-cell-value');
        twoWayFlight['tax'] = $(innerElm).attr('data-cell-tax-adt');
      });
      latamCache.set('twoWayFlight', twoWayFlight, allCacheTimeOut);
      //Trip info
      //extract flightNumber origin destination depTime arrTime duration connectionDuration
      let flight1 = getFlightDetails($, row);
      latamCache.set('flight1', flight1, allCacheTimeOut);
      continue;
    }else if($(row).hasClass('stopDuration') && $(row).hasClass('flightNextSegment') && latamCache.get('connected') === true){
      //extract stop duration
      let connectionDuration = $(row).find('.tc').text();
      let twoWayFlight = latamCache.get('twoWayFlight');
      twoWayFlight['connectionDuration'] = connectionDuration.trim();
      latamCache.set('twoWayFlight', twoWayFlight, allCacheTimeOut);
      continue;
    }else if($(row).hasClass('flightNextSegment') && $(row).hasClass('flightType-Connection') && latamCache.get('connected') === true){
      //extract flightNumber origin destination depTime arrTime duration connectionDuration
      let flight2 = getFlightDetails($, row)
      latamCache.set('flight2', flight2, allCacheTimeOut);
      continue;
    }else if($(row).hasClass('totalDurationRow') && $(row).hasClass('flightNextSegment')){
      let totalDuration = $(row).find('.durationTh').text();
      let stops = [];
      let twoWayFlight = latamCache.get('twoWayFlight');
      let flight1 = latamCache.get('flight1'), flight2 = latamCache.get('flight2');
      stops.push(flight1); stops.push(flight2);
      twoWayFlight['stops'] = stops; twoWayFlight['totalDuration'] = totalDuration;
      availableFlights.push(twoWayFlight);
      latamCache.flushAll();
      //extract totalDuration
      latamCache.set('connected', false, allCacheTimeOut);
      continue;
    }
    continue;
  }
  latamCache.flushAll();
  return availableFlights;
}

//TODO: Needs more abstraction
function getDirectFlight($, row){
  let directFlight = {}, stops = [];          
  $(row).find('.ff-NOVOBASICO').each((j, innerEml)=>{
      directFlight['price'] =  $(innerEml).attr('data-cell-value');
      directFlight['tax'] = $(innerEml).attr('data-cell-tax-adt');
  });
  directFlight['totalDuration'] = $(row).find('.tc').first().text().trim();                
  let flightDetails = getFlightDetails($, row);
  stops.push(flightDetails);
  directFlight['stops'] = stops;        
  return directFlight;
}

function getFlightDetails($, row){
  let details = {}; 
  details['flightNumber'] = $(row).attr('data-flightnumber');
  details['origin'] = $(row).attr('data-departureairportcode'); 
  details['destination'] = $(row).attr('data-arrivalairportcode'); 
  details['depTime'] = $(row).attr('data-departuretime');
  details['arrTime'] = $(row).attr('data-arrivaltime');
  let duration = $(row).find('.tc').first().text();
  details['duration'] = duration.trim();
  return details;
}

module.exports = getAvailableFlights;