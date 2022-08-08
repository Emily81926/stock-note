const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authenticator = require('../../middleware/auth')



router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/refreshToken', userController.refreshToken)
router.post('/logout', authenticator, userController.logOut)

module.exports = router

