const express = require('express')
const router = express.Router()

const stock = require('./modules/stock')

router.use('/stocks', stock)

module.exports = router