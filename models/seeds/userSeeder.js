const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../user')

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
  const password = "12345678"
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({
      name: "test2",
      email: "test2@email.com",
      password: hash,
      token: ""

    }))
  console.log('done')
})
