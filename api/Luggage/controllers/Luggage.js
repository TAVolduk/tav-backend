const axios = require("axios"),
  moment = require("moment"),
  _ = require("lodash");
moment.locale("tr");
const tavApi = axios.create({
  baseURL: "http://35.159.15.121:8080/",
  timeout: 1000000
});

const formatDate = d => d.format("DD/MM/YYYY HH:mm");

const findFlights = flightNumber => {
  startDate = formatDate(moment());
  endDate = formatDate(moment().add(1, "days"));
  return tavApi
    .request({
      url: "/aodbFlights/afmsFlights",
      method: "get",
      params: { startDate, endDate, flightNumber }
    })
    .then(res => res.data)
    .catch(e => console.log(e)); 
};

const getLuggageData = ({
  flightNumber,
  seatNumber,
  flightDate,
  airlineCode,
  airportCode
}) =>  tavApi
      .request({
        url: "/baggageOperation/getFlightBagList",
        method: "get",
        params: { flightDate, airlineCode, flightNumber, airportCode }
      })
      .then(res => res.data)
      .catch(e => console.log(e));


module.exports = {
  getStatus: async ctx => {
    const { flightNumber, seatNumber } = ctx.query;

    if (
      !flightNumber ||
      !seatNumber ||
      typeof flightNumber !== "string" ||
      typeof seatNumber !== "string"
    ) {
      ctx.response.status = 403;
      return ctx.send("invalid flight or seat number");
    }
    
    const flight = await findFlights(flightNumber).then(d => d[0]);
    const { airlineIATACode, originIATACode, stad } = flight;
    console.log(stad, moment(stad));
    const luggages = await getLuggageData({
      airlineCode: "KK",
      airportCode: "IST",
      flightDate: formatDate(moment(Number(stad)).subtract(1, 'days')) + ":00",
      flightNumber
    });

    const luggageList = luggages && luggages.bagViewList && luggages.bagViewList.bagView;
    
    if (!luggageList || luggageList.length === 0) {
      ctx.response.status = 404;
      return ctx.send(`no luggage data for ${flightNumber} numbered flight`)
    }

    const luggage = _.find(luggageList, { seatNumber });

    if (!luggage) {
      ctx.response.status = 404;
      return ctx.send(`no louggage found for seat ${seatNumber}`);
    }

    ctx.send({ luggageStatus: luggage.bagStatus });
  }
};
