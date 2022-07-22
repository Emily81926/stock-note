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
    companyName: "Apple Inc.",
    price: 141.7614,
    sector: "Technology",
    industry: "Consumer Electronics",
    exchangeShortName: "NASDAQ",
    image: "https://financialmodelingprep.com/image-stock/AAPL.png"
  })
  console.log('done')
})
