const router = require('express').Router()
const toDoController = require('../controllers/toDoController')
const WeatherController = require('../controllers/weatherController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

// Router use authentication
router.use(authentication)


// Router dari To Do
router.post('/', toDoController.createToDo)
router.get('/all', toDoController.allToDo)
router.get('/:id', authorization, toDoController.spesificToDo)
router.put('/:id', authorization, toDoController.updateAllTodo)
router.patch('/:id', authorization, toDoController.updateStatus)
router.get('/', toDoController.getToDoDone)
router.delete('/:id', authorization, toDoController.deleteToDo)




// Routher Weather APIs
router.get('/weather/countries', WeatherController.weatherCountry)
router.get('/weather/state', WeatherController.stateinCountries)
router.get('/weather/cities', WeatherController.citiesInState)
router.get('/weather/citi', WeatherController.cityData)

module.exports = router