const express = require('express')
const router = express.Router()

const stock = require('./modules/stock')
const user = require('./modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/api/user', authenticator, user)
router.use('/api/stocks', authenticator, stock)


module.exports = router