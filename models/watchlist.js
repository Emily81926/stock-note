const mongoose = require('mongoose')
const Schema = mongoose.Schema
const watchlistSchema = new Schema({
  symbol: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Watchlist', watchlistSchema)

