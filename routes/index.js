const express = require('express')
const router = express.Router()

const stock = require('./modules/stock')

router.use('/api/stocks', stock)

module.exports = router