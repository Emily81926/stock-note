const express = require('express')
const router = express.Router()

const stock = require('./modules/stock')
const user = require('./modules/user')
const auth = require('./modules/auth')
const watchlist = require('./modules/watchlist')
const authenticator = require('../middleware/auth')

router.use('/auth', auth)
router.use('/api/user', user)
router.use('/api/stocks', authenticator, stock)
router.use('/api/watchlist', authenticator, watchlist)



module.exports = router