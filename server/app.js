require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const router = require('./routes/index.js')
const errorHandling = require('./middleware/errorHandling')
const cors = require('cors')


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)
app.use(errorHandling)

app.listen(port, () => {
  console.log(`App berada di local host ${port}`);
})