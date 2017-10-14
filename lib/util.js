exports.isvalidticketOpts = (ticketOpts)=>{
  if(!ticketOpts || typeof ticketOpts !== 'object'){
    throw new Error("Ticket options must be provided and must be object");
  }else if(!ticketOpts['origin']){
    throw new Error("Ticket options requires origin");
  }else if(!ticketOpts['destination']){
    throw new Error("Ticket options requires destination");
  }else if(!ticketOpts['leaveDateYmd']){
    throw new Error("Ticket options requires leave date");
  }else if(!ticketOpts['returnDateYmd']){
    throw new Error("Ticket options requires return date");
  }
  return true;
}

exports.getLatamSearchURL = (ticketOpts)=>{
  return `https://book.latam.com/TAM/dyn/air/entry?B_DATE_1=${ticketOpts['leaveDateYmd']}0000&B_LOCATION_1=${ticketOpts['origin']}&E_LOCATION_1=${ticketOpts['destination']}&LANGUAGE=BR&SITE=JJBKJJBK&TRIP_TYPE=R&WDS_MARKET=BR&adults=1&children=0&infants=0&COMMERCIAL_FARE_FAMILY_1=NEWBUNDLE&B_DATE_2=${ticketOpts['returnDateYmd']}0000&utm_source=zanox&utm_medium=affiliate&utm_campaign=metabuscador`
}
/**
 * date -url format: day/year-month
 */