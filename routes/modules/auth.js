const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
  return jwt.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' })
}

router.get('/login/success', (req, res) => {
  if (req.user) {
    const accessToken = generateAccessToken(req.user)
    const user = Object.assign(req.user, {accessToken})
    res.status(200).json({ user })
  }

})
router.get('/login/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure"
  })
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('https://sprightly-melba-edee81.netlify.app')
})

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))


router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: 'https://sprightly-melba-edee81.netlify.app',
    failureRedirect: '/login/failure'
  })
);



module.exports = router