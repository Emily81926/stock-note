require('dotenv').config()

const axios = require('axios')

//首頁的前幾名stock
const getTopStock = async () => {
  const allBasicApi = `https://financialmodelingprep.com/api/v3/stock-screener?marketCapLowerThan=10000000000000&betaMoreThan=1&volumeMoreThan=100&exchange=NYSE,NASDAQ&apikey=${process.env.STOCK_API}`
  const rawBasicDatas = await axios.get(allBasicApi)
  const allBasicDatas = rawBasicDatas.data
  return allBasicDatas
}

//取得照片的api
const getImage = async (symbol) => {
  const picApi = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.STOCK_API}`
  const rawPicData = await axios.get(picApi)
  const picData = rawPicData.data
  const { image } = picData[0]
  return image
}


//取得所有股票的資訊
exports.getStocks = async (req, res) => {
  try {
    //基本資訊的api
    const basicData = await getTopStock()

    const finalData = []
    for (let i = 0; i < 10; i++) {
      const { symbol, companyName, price, sector, industry, exchangeShortName } = basicData[i]
      const image = await getImage(symbol)
      finalData.push({ symbol, companyName, price, sector, industry, exchangeShortName, image })
    }
    await res.send(finalData)
  } catch (error) {
    console.log(error)
  }
}

