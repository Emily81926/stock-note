const express = require('express')
const router = express.Router()

const stockController = require('../../controllers/stockController')

router.get('/search', stockController.searchStock)
router.get('/', stockController.getStocks)
router.get('/:stock', stockController.getStockProfile)
router.get('/finance/:stock', stockController.getFinancialData)
router.get('/indicator/:stock', stockController.getIndicator)

module.exports = router