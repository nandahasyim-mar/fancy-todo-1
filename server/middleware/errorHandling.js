module.exports = function errorHandling (err, req, res, next) {
  let status = 500 
  let msg = 'Internal Server Error'

  if(err.name == "SequelizeValidationError") {
    status = 400
    msg = err.errors.map(el => {
      return el.message
    })
    res.status(status).json({
      msg
    })
  } else {
    res.status(status).json(msg)
  }
}