const express = require('express')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const cors = require('cors')
const session = require('express-session')
const userPassport = require('./config/passport')
app.use(cors())
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true,
}))


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
userPassport(app)
app.use(routes)


app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})