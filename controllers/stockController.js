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

//取得free cash flow資訊
const getFreeCashFlow = async (symbol, i) => {
  const cashFlowApi = `https://financialmodelingprep.com/api/v3/cash-flow-statement/${symbol}?limit=120&apikey=${process.env.STOCK_API}`
  const rawCashData = await axios.get(cashFlowApi)
  const cashData = rawCashData.data
  const { freeCashFlow } = cashData[i]
  return freeCashFlow
}

//取得dividends資訊 
const getDividends = async (symbol, i) => {
  const dividendsApi = `https://financialmodelingprep.com/api/v3/financial-statement-full-as-reported/${symbol}?apikey=${process.env.STOCK_API}`
  const rawDividendsData = await axios.get(dividendsApi)
  const dividendsData = rawDividendsData.data
  const { earningspersharediluted } = dividendsData[i]
  return earningspersharediluted
}
//取得earning per share 資訊
const getEPS = async (symbol, i) => {
  const epsApi = `https://financialmodelingprep.com/api/v3/income-statement-as-reported/${symbol}?limit=10&apikey=${process.env.STOCK_API}`
  const rawEPSData = await axios.get(epsApi)
  const epsData = rawEPSData.data
  const { earningspersharediluted } = epsData[i]
  return earningspersharediluted
}
//取得return on equity, interest coverage, netmargin資訊
const getROE = async (symbol, i) => {
  const roeApi = `https://financialmodelingprep.com/api/v3/ratios/${symbol}?limit=40&apikey=${process.env.STOCK_API}`
  const rawROEData = await axios.get(roeApi)
  const roeData = rawROEData.data
  return roeData[i]
}

//取得股票的indicator data（股票圖）
const getDailyIndicator = async (symbol) => {
  const indicatorApi = `https://financialmodelingprep.com/api/v3/technical_indicator/daily/${symbol}?period=10&type=ema&apikey=${process.env.STOCK_API}`
  const rawIndicatorData = await axios.get(indicatorApi)
  const indicatorData = rawIndicatorData.data
  return indicatorData
}

//取得股票基本資訊
const getProfile = async (symbol, i) => {
  const stockApi = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.STOCK_API}`
  const rawStockInfo = await axios.get(stockApi)
  const stockInfo = rawStockInfo.data
  return stockInfo[i]
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

//取得股票的金融資訊
exports.getFinancialData = async (req, res) => {
  try {
    const stockSymbol = req.params.stock
    const finalData = []
    for (let i = 0; i < 5; i++) {
      const { symbol, date, netProfitMargin, returnOnEquity, interestCoverage } = await getROE(stockSymbol, i)
      const freeCashFlow = await getFreeCashFlow(stockSymbol, i)
      const earningPerShares = await getEPS(stockSymbol, i)
      const dividends = await getDividends(stockSymbol, i)
      finalData.push({ symbol, date, netProfitMargin, returnOnEquity, interestCoverage, freeCashFlow, earningPerShares, dividends })
    }

    await res.send(finalData)
  } catch (error) {
    console.log(error)
  }
}

//取得股票圖
exports.getIndicator = async (req, res) => {
  try {
    const stockSymbol = req.params.stock
    const indicatorData = await getDailyIndicator(stockSymbol)
    await res.send(indicatorData)
  } catch (error) {
    console.log(error)
  }
}

//取得單一股票的基本資訊
exports.getStockProfile = async (req, res) => {
  try {
    const stockSymbol = req.params.stock
    const { symbol, companyName, price, exchangeShortName, sector, industry, website, description, image } = await getProfile(stockSymbol, 0)

    await res.send({ symbol, companyName, price, exchangeShortName, sector, industry, website, description, image })

  } catch (error) {
    console.log(error)
  }
}
