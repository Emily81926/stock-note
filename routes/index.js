const express = require('express')
const router = express.Router()

const stock = require('./modules/stock')
const user = require('./modules/user')

router.use('/api/user', user)
router.use('/api/stocks', stock)


module.exports = router