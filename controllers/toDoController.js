const { todo, User } = require('../models/index')

const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class toDoController {
  static allToDo(req, res, next) {
    const userId = req.loggedInUser.id
    todo.findAll({
      where: {
        userId
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static spesificToDo(req, res, next) {
    todo.findByPk(+req.params.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static createToDo(req, res, next) {
    const userId = req.loggedInUser.id
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      userId
    }
    console.log(obj);
    todo.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static updateAllTodo(req, res, next) {
    let id = +req.params.id
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    todo.update(obj, {
      where: {
        id: id
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  
  static updateStatus(req, res) {
    let id = +req.params.id
    let obj = {
      status: req.body.status
    }
    todo.update(obj, {
      where: {
        id: id
      }
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteToDo(req, res, next) {
    let id = +req.params.id
    todo.destroy({
      where: {
        id: id
      }
    })
    .then(data => {
      if (!data) {
        next(err)
      }
      res.status(200).json({message: 'todo success to delete'})
    })
    .catch(err => {
      next(err)
    })
  }



  // User static
  static userRegister(req, res, next) {
    let newAccount = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(newAccount)
    .then(data => {
      res.status(201).json({
        id: data.id,
        email: data.email
      })
    })
    .catch(err => {
      next(err)
    })

  }


  static userLogin(req, res, next) {
    let loginObj = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({
      where: {
        email: loginObj.email
      }
    })
    .then(data => {
      if (!data) {
        res.status(401).json({
          message: 'Wrong email/password'
        })
      } else if(!comparePassword(loginObj.password, data.password)) {
        res.status(401).json({
          message: 'Wrong email/password'
        })
      } else {
        const access_token = signToken({
          id: data.id,
          email: data.email
        })
        res.status(200).json({
          access_token
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }


}

module.exports = toDoController