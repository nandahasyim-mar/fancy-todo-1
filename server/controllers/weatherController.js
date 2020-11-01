const axios = require('axios');


class WeatherController {
  static weatherCountry(req, res) {
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
        country: `${req.query.country}`,
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

  static citiesInState(req, res) {
    axios({
      url: 'https://api.airvisual.com/v2/cities',
      method: 'GET',
      params: {
        state: `${req.query.state}`,
        country: `${req.query.country}`,
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

  static cityData(req, res) {
    axios({
      url: 'https://api.airvisual.com/v2/city',
      method: 'GET',
      params: {
        city: `${req.query.city}`,
        state: `${req.query.state}`,
        country: `${req.query.country}`,
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