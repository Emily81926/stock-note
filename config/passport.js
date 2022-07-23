const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')


passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (email, password, callback) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return callback(null, false, { message: 'That email is not registered!' })
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return callback(null, false, { message: 'Email or Password incorrect!' })
            }
            
            return callback(null, user)
          })
      })
  }))



passport.serializeUser((user, callback) => {
  callback(null, user.id)
})
passport.deserializeUser((id, callback) => {
  User.findById(id)
    .lean()
    .then(user => callback(null, user))
    .then(error => callback(error, null))
})


module.exports = passport