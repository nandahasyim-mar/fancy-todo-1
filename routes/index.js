const router = require('express').Router()
const toDoController = require('../controllers/toDoController')

router.post('/todos', toDoController.createToDo)
router.get('/todos', toDoController.allToDo)
router.get('/todos/:id', toDoController.spesificToDo)
router.put('/todos/:id', toDoController.updateAllTodo)
router.patch('/todos/:id', toDoController.updateStatus)
router.delete('/todos/:id', toDoController.deleteToDo)








module.exports = router