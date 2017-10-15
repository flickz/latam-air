const chai = require('chai');
const {readFileSync} = require('fs');
const cheerio = require('cheerio');
const {join} = require('path')
const chaiAsPromised = require('chai-as-promised');
const getAvaliableFlights = require('../lib/latamAir');

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
  it("Should return an array of out bound flights", ()=>{
    let availableFlights = getAvaliableFlights($, 'out'); 
    assert.isArray(availableFlights);
    expect(availableFlights).length.to.be.greaterThan(1);
  });
  it("Should return an array of in bound flights", ()=>{
    let availableFlights = getAvaliableFlights($, 'in'); 
    assert.isArray(availableFlights);
    expect(availableFlights).length.to.be.greaterThan(1);
  });
});