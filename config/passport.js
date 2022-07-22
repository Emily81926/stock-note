const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {

  app.use(passport.initialize()),
    app.use(passport.session()),

    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return callback(null, false, { message: 'That email is not registered!' })
          }
          if (user.password !== password) {
            return callback(null, false, { message: 'Email or Password incorrect!' })
          }
          return callback(null, user)
        })
        .catch(error => callback(error, false))
    }))
    
    
    
    passport.serializeUser((user, callback)=> {
      callback(null, user.id)
    })
    passport.deserializeUser((id, callback)=> {
      User.findById(id)
      .lean()
      .then(user => callback(null, user))
      .then(error => callback(error, null))
    })

}