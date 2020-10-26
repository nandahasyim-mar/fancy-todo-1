const { todo } = require('../models/index')

class toDoController {
  static allToDo(req, res) {
    todo.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static spesificToDo(req, res) {
    todo.findByPk(+req.params.id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(404).json(err)
    })
  }

  static createToDo(req, res) {
    let obj = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    todo.create(obj)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      if(err.name == "SequelizeValidationError") {
        let errors = err.errors.map(el => {
          return el.message
        })
        res.status(400).json(errors)
      } else {
        res.status(500).json(err)
      }
    })
  }

  static updateAllTodo(req, res) {
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
      if(err.name == "SequelizeValidationError") {
        let error = err.errors.map(el => {
          return el.message
        })
        res.status(400).json(error)
      }
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
      if(err.name == "SequelizeValidationError") {
        let error = err.errors.map(el => {
          return el.message
        })
        res.status(400).json(error)
      }
    })
  }

  static deleteToDo(req, res) {
    let id = +req.params.id
    todo.destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      res.status(200).json({message: 'todo success to delete'})
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}

module.exports = toDoController