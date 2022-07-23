const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20')
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

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
  done(null, profile)
}
))


passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, callback) => {
  User.findById(id)
    .lean()
    .then(user => callback(null, user))
    .then(error => callback(error, null))
})


module.exports = passport