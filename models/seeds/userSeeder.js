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
  User.create({
    name: "test1", 
    email: "test1@gmail.com",
    password: "12345678" ,
},
    {
      name: "test2",
      email: "test2@gmail.com",
      password: "12345678"
})
  console.log('done')
})
