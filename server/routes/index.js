const router = require('express').Router()
const toDoController = require('../controllers/toDoController')
const WeatherController = require('../controllers/weatherController')
// const authentication = require('../middleware/authentication')
// const authorization = require('../middleware/authorization')

// Router use authentication
// router.use(authentication)

// Router dari To Do
router.post('/todos', toDoController.createToDo)
router.get('/todos', toDoController.allToDo)
router.get('/todos/:id', toDoController.spesificToDo)
router.put('/todos/:id', toDoController.updateAllTodo)
router.patch('/todos/:id', toDoController.updateStatus)
// router.delete('/todos/:id', authorization, toDoController.deleteToDo)


// Router dari Login dan register
router.post('/register', toDoController.userRegister)
router.post('/login', toDoController.userLogin)

// Routher Weather APIs
router.get('/weather/countries', WeatherController.allCountries)
router.get('/weather/state', WeatherController.stateinCountries)








module.exports = router