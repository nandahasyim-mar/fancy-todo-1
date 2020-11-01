const router = require('express').Router()
const toDoController = require('../controllers/toDoController')
const todoRouter = require('./todos')

// Router dari Login dan register
router.post('/register', toDoController.userRegister)
router.post('/login', toDoController.userLogin)
router.post('/googlelogin', toDoController.googlelogin)

router.use('/todos', todoRouter)









module.exports = router