const express = require('express')
const router = express.Router()

const stock = require('./modules/stock')
const user = require('./modules/user')
const auth = require('../middleware/auth')

router.use('/api/user', user)
router.use('/api/stocks', auth, stock)



module.exports = router