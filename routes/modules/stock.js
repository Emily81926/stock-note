const express = require('express')
const router = express.Router()

const stockController = require('../../controllers/stockController')

router.get('/', stockController.getStocks)
router.get('/finance/:stock', stockController.getFinancialData)

module.exports = router