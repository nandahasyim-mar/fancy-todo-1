const router = require('express').Router()
const toDoController = require('../controllers/toDoController')
const authentication = require('../middleware/authentication')

// Router dari To Do
router.post('/todos', authentication, toDoController.createToDo)
router.get('/todos', authentication, toDoController.allToDo)
router.get('/todos/:id', toDoController.spesificToDo)
router.put('/todos/:id', toDoController.updateAllTodo)
router.patch('/todos/:id', toDoController.updateStatus)
router.delete('/todos/:id', toDoController.deleteToDo)


// Router dari Login dan register
router.post('/register', toDoController.userRegister)
router.post('/login', toDoController.userLogin)







module.exports = router