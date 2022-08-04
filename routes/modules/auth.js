const express = require('express')
const router = express.Router()
const passport = require('passport')


router.get('/login/success', (req, res) => {
  console.log('into success')
  console.log(req.isAuthenticated())
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    })
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
  req.redirect('http://localhost:3000')
})

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

//original google callback auth
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: "/login/failure"
}
))





module.exports = router