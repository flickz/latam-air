const {load} = require('cheerio');
const {get} = require('request');
const {inspect} = require('util');
const {isvalidticketOpts, getLatamSearchURL} = require('./lib/util');
const getAvaliableFlight = require('./lib/latamAir');

function getRequestOptions(){
  return {
      timeOut: 599994,
      headers: {
          'User-Agent': 'LatamAir-scraper'
      },
      maxRedirects: 100,
      jar: true
  }
}
/**
 * Returns all Flight Tickets
 * @param {object} ticketOpts
 * @prop {string} ticketOpts.origin
 * @prop {string} ticketOpts.destination 
 * @prop {Date} ticketOpts.leaveDate 
 * @prop {Date} ticketOpts.returnDate    
 * @param {function} callback 
 */
function getTicketData(ticketOpts, callback){
  let requestOpts = getRequestOptions()
  if(ticketOpts && isvalidticketOpts(ticketOpts)){
    var url = getLatamSearchURL(ticketOpts);
    console.log(url);
    get(url, requestOpts, (error, response, body)=>{
      if(error) return callback(error, null, null);

      if(response && response.statusCode === 200){
        var $ = load(body);
        var inBoundFlights = getAvaliableFlight($, 'in');
        var outBoundFlights = getAvaliableFlight($, 'out');
        return callback(null, inBoundFlights, outBoundFlights);
      }
    });
  }
  return;
}

//Use Case
getTicketData({
  origin: 'VIX', 
  destination: 'GRU',
  leaveDateYmd: '20171018',
  returnDateYmd: '20171106'
}, (error, inBoundFlights, outBoundFlights)=>{
  if(error){throw error}
  console.log('Outbound...');
  console.log(inspect(outBoundFlights, false, null))
  console.log('Inbound...');
  console.log(inspect(inBoundFlights, false, null))
})

//module.exports = getTicketData;