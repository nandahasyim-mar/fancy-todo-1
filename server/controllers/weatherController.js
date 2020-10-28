const axios = require('axios');

class WeatherController {
  static allCountries(req, res) {
    axios({
      url: "https://api.airvisual.com/v2/countries",
      method: "GET",
      params: {
        key: `${process.env.TOKEN_IQAIR}`
      }
    })
    .then(({ data }) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static stateinCountries(req, res) {
    axios({
      url: 'https://api.airvisual.com/v2/states',
      method: 'GET',
      params: {
        country: 'Indonesia',
        key: `${process.env.TOKEN_IQAIR}`
      }
    })
    .then(({ data }) => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = WeatherController