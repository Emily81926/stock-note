const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



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

  //origin google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
}, async function (req, accessToken, refreshToken, profile, callback) {
  console.log('google strategy')
  console.log(profile._json)
  //看是否信箱已註冊過，有註冊過就直接回傳原本的資料
  const { email, name } = profile._json
  const oldUser = await User.findOne({ email })
  if (oldUser) {
    console.log("find old user!!")
    return callback(null, oldUser)}
  //沒有的話，就新註冊
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '2h' })
  const randomPassword = Math.random().toString(36).slice(-8)
  const hash = await bcrypt.hash(randomPassword, 10);

  await User.create({
    name, email: email.toLowerCase(), password: hash, token
  })
  //req.user = profile._json
  req.user = {name, email, token}

  return callback(null, { name, email, token })
}
))



passport.serializeUser((user, done) => {
  done(null, user)
  console.log('passport serializeUser')
})

passport.deserializeUser((user, done) => {
  console.log('passport deserializeUser', user)
  done(null, user)
})


module.exports = passport