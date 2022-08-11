const watchList = require('../models/watchlist')

exports.postWatchlist = async (req, res) => {
  try {
    const { symbol, companyName, sector, price, userId } = req.body
    const foundList = await watchList.findOne({ symbol })
    if (foundList) return res.status(400).json('already added to watchlist!');

    // await watchList.create({
    //   symbol, companyName, sector, price, userId
    // })
    const newList = await watchList.create({
      symbol, companyName, sector, price, userId
    })
    return res.status(200).json({ message: 'successfully added to watchlist!', list: newList });
  } catch (error) {
    console.log(error)
  }
}

exports.getWatchlist = async (req, res) => {
  //axios.get不能接收到req.body，因此沒辦法用const userId = req.body.userId
  const userId = req.user.user_id
  const list = await watchList.find({ userId })

  return res.status(200).json(list)
}


exports.deleteWatchlist = async (req, res) => {
  const { watchListId } = req.body
  await watchList.findByIdAndDelete(watchListId)

  return res.status(200).json('successfully deleted from watchlist!')
}