const express = require('express')
const router = express.Router()

const stock = require('./modules/stock')
const user = require('./modules/user')
const auth = require('./modules/auth')
const authenticator = require('../middleware/auth')

router.use('/auth/google', auth)
router.use('/api/user', user)
router.use('/api/stocks', authenticator, stock)



module.exports = router