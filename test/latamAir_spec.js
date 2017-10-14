const chai = require('chai');
const {readFileSync} = require('fs');
const cheerio = require('cheerio');
const {join} = require('path')
const chaiAsPromised = require('chai-as-promised');
const latamAir = require('../lib/latamAir');

chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;

describe("Latam Airline Ticket data", ()=>{
  var ticketOpt, flightSelectionPage, $;
  before(()=>{
      ticketOpt = {
      origin: 'VIX',
      destination: 'GRU',
      leaveDateYmd: '20171013',
      returnDateYmd: '20171019',
    }
    flightSelectionPage = readFileSync(join(__dirname,'html-page/page2.html'));
    $ = cheerio.load(flightSelectionPage);
  });
  it.only("Should return an array of out bound flights", ()=>{
    assert.isArray(latamAir.getDirectFlight($));
  })
});

//`https://book.latam.com/TAM/dyn/air/entry?B_DATE_1=201710130000&B_LOCATION_1=VIX&E_LOCATION_1=GRU&LANGUAGE=BR&SITE=JJBKJJBK&TRIP_TYPE=R&WDS_MARKET=BR&adults=1&children=0&infants=0&COMMERCIAL_FARE_FAMILY_1=NEWBUNDLE&B_DATE_2=201710190000&utm_source=zanox&utm_medium=affiliate&utm_campaign=metabuscador`