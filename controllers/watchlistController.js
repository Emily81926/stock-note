const watchList = require('../models/watchlist')

exports.postWatchlist = async(req, res) => {
  try { 
    const { symbol, companyName, sector, price, userId} = req.body 
    watchList.create({
      symbol, companyName, sector, price, userId
    })
    return res.status(200).json('successfully added to watchlist!');
  }catch(error){
    console.log(error)
  } 
}

exports.getWatchlist = async(req, res) => {

}

exports.deleteWatchlist = async(req, res) => {

}