const express = require('express')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const session = require('express-session')
const passport = require('./config/passport')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
app.use(cors())
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true,
}))
app.use(bodyParser.json()) //要在route上面
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)


app.listen(port,() => {
  console.log(`App is running on localhost:${port}`)
})