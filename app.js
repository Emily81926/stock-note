const express = require('express')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const cors = require('cors')
app.use(cors())



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyParser.json()) //要在route上面
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)


app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})