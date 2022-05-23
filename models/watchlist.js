const mongoose = require('mongoose')
const Schema = mongoose.Schema
const watchlistSchema = new Schema({
  symbol: {
    type: String,
    required: true
  },
  calendarYear: {
    type: String,
    required: true
  },
  stockPrice: {
    type: String,
    required: true
  },
  earningsPerShare: {
    type: String
  },
  freeCashFlow: {
    type: String
  },
  returnOnEquity: {
    type: String
  },
  interestCoverage: {
    type: String
  },
  netMargin: {
    type: String
  },
  dividendsPayingCompany: {
    type: String
  }
})

module.exports = mongoose.model('Watchlist', watchlistSchema)

