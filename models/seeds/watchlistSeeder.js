const mongoose = require('mongoose')
const Watchlist = require('../watchlist')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Watchlist.create({
    symbol: "AAPL",
    calendarYear: "2022",
    stockPrice: "160",
    earningsPerShare: "0.5",
    freeCashFlow: "3600000",
    returnOnEquity: "0.4",
    interestCoverage: "40",
    netMargin: "15",
    dividendsPayingCompany: "16"
  })
  console.log('done')
})
