const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateAccessToken = (user) => {
  return jwt.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' })
}

const generateRefreshToken = (user) => {
  return jwt.sign({ user_id: user._id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' })
}


//origin google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  passReqToCallback: true
}, async function (req, accessToken, refreshToken, profile, callback) {
  //看是否信箱已註冊過，有註冊過就註冊access token跟 refresh token，並回傳原本的資料
  const { email, name } = profile._json
  const oldUser = await User.findOne({ email })
  if (oldUser) {
    //找到user後，分發access token跟 refresh token
    const accessToken = generateAccessToken(oldUser)

    const refreshToken = generateRefreshToken(oldUser)
    //將refresh token存進db
    oldUser.refreshToken = refreshToken
    await oldUser.save()


    return callback(null, {
      name,
      email,
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  }

  //沒有的話，就新註冊
  const newAccessToken = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' })

  const newRefreshToken = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '2h' })

  const randomPassword = Math.random().toString(36).slice(-8)
  const hash = await bcrypt.hash(randomPassword, 10);

  await User.create({
    name, email: email.toLowerCase(), password: hash, refreshToken: newRefreshToken
  })
  //req.user = profile._json
  req.user = { name, email, accessToken: newAccessToken, refreshToken: newRefreshToken  }

  return callback(null, { name, email, accessToken: newAccessToken, refreshToken: newRefreshToken })
}
))



passport.serializeUser((user, done) => {
  done(null, user)
  
})

passport.deserializeUser((user, done) => {
  done(null, user)
})


module.exports = passport