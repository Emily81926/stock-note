const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// const generateAccessToken = (user) => {
//   return jwt.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' })
// }

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
  console.log('google strategy')
  console.log(profile._json)
  //看是否信箱已註冊過，有註冊過就註冊access token跟 refresh token，並回傳原本的資料
  const { email, name } = profile._json
  const oldUser = await User.findOne({ email })
  console.log("oldUser: ", oldUser)
  if (oldUser) {
    console.log("find old user!!")
    //找到user後，分發access token跟 refresh token
    //const accessToken = generateAccessToken(oldUser)

    const refreshToken = generateRefreshToken(oldUser)
    //將refresh token存進db
    oldUser.refreshToken = refreshToken
    await oldUser.save()

    //加這個看會不會req.user變成我要的檔案
    //const data = Object.assign(oldUser, accessToken) //合併oldUser 跟access token這兩個object
    //req.user = data

    return callback(null, oldUser)
  }

  //沒有的話，就新註冊
  const newAccessToken = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '5m' })

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
  console.log('passport serializeUser', user)
  done(null, user)
  
})

passport.deserializeUser((user, done) => {
  console.log('passport deserializeUser', user)
  done(null, user)
})


module.exports = passport