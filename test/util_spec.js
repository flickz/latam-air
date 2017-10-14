const {expect, assert} = require('chai');
const util = require('../lib/util');

describe("Latam Air Util methods", ()=>{
  var ticketOpt;
  before(()=>{
      ticketOpt = {
      origin: 'dfd',
      destination: 'jafjld',
      leaveDateYmd: 'jajldf',
      returnDateYmd: 'kalfd',
    }
  });
  it("should return true", ()=>{
    expect(util.isvalidticketOpts(ticketOpt)).to.equal(true);
  });
  it("should return valid latam air booking url", ()=>{
     var expected = `https://book.latam.com/TAM/dyn/air/entry?B_DATE_1=${ticketOpt['leaveDateYmd']}0000&B_LOCATION_1=${ticketOpt['origin']}&E_LOCATION_1=${ticketOpt['destination']}&LANGUAGE=BR&SITE=JJBKJJBK&TRIP_TYPE=R&WDS_MARKET=BR&adults=1&children=0&infants=0&COMMERCIAL_FARE_FAMILY_1=NEWBUNDLE&B_DATE_2=${ticketOpt['returnDateYmd']}0000&utm_source=zanox&utm_medium=affiliate&utm_campaign=metabuscador`
     assert.equal(util.getLatamSearchURL(ticketOpt), expected);
  });
});
