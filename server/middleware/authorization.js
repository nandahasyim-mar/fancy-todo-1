const { todo } = require('../models/index')


function authorization(req, res, next) {
  const { id } = req.params
  todo.findByPk(id)
  .then(data => {
    if (!data) {
      throw { msg: 'Post not found', status: 404 }
    } else if(data.userId == req.loggedInUser.id) {
      next()
    } else {
      throw { msg: 'Not authorized', status: 401 }
    }
  })
  .catch(err => {
    const status = err.status || 500
    const msg = err.msg || 'Internal server error'
    res.status(status).json({ err: msg })
  })
}

module.exports = authorization