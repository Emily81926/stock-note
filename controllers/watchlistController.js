const watchList = require('../models/watchlist')

exports.postWatchlist = async(req, res) => {
  try { 
    const { symbol, companyName, sector, price, userId} = req.body 
    await watchList.create({
      symbol, companyName, sector, price, userId
    })
    return res.status(200).json('successfully added to watchlist!');
  }catch(error){
    console.log(error)
  } 
}

exports.getWatchlist = async(req, res) => {
  const {userId} = req.body
  const list = await watchList.find({userId})

  return res.status(200).json({list})
}

exports.deleteWatchlist = async(req, res) => {

}