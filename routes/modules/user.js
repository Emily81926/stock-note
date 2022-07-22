const express = require('express')
const router = express.Router()
const passport = require('../../config/passport')

const userController = require('../../controllers/userController')


router.post('/signup', userController.signUp )
console.log(passport)
router.post('/signin', userController.signIn )

module.exports = router

//passport.authenticate('local', { session: false }),