const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  confirmedPassword:{
    type: String,
  },
  refreshToken:{
    type: String,
  }
})

module.exports = mongoose.model('User', userSchema)

