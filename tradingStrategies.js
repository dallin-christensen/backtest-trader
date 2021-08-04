const number = require('./utils/number').number
const candleUtil = require('./utils/candle').candle


const compareOpenAndCloseBetweenNumberOfDays = (candleData, numberOfDays) => {
  const wins = [];
  const losses = [];
  let totalTrades = 0

  candleData.forEach((candle, i) => {
    if (candleData[i + numberOfDays]) {
      const openStart = candleUtil.getMedian(candle)
      const closeEnd = candleUtil.getClose(candleData[i + numberOfDays])
      candle.tradeClose = closeEnd
      candle.tradeCloseDate = candleData[i + numberOfDays].date
      if (number.isGreaterThan(closeEnd, openStart)) {
        wins.push(candle)
        totalTrades++
      } else {
        losses.push(candle)
        totalTrades++
      }
    }
  })

  return {
    wins,
    losses,
    totalTrades,
  }
}

const compareOpenAndCloseBuyingCandleType = (candleData, numberOfDays, bull = true, minPercentageChange = 0, maxPercentage = 1) => {
  const wins = [];
  const losses = [];
  let totalTrades = 0

  candleData.forEach((candle, i) => {
    if (bull && !candle.bullish) return
    if (!bull && candle.bullish) return

    if (candle.percentageChange._value <= minPercentageChange) return
    if (candle.percentageChange._value >= maxPercentage) return

    if (candleData[i + numberOfDays]) {
      const openStart = candleUtil.getMedian(candle)
      const closeEnd = candleUtil.getClose(candleData[i + numberOfDays])
      candle.tradeClose = closeEnd
      candle.tradeCloseDate = candleData[i + numberOfDays].date
      if (number.isGreaterThan(closeEnd, openStart)) {
        wins.push(candle)
        totalTrades++
      } else {
        losses.push(candle)
        totalTrades++
      }
    }
  })

  return {
    wins,
    losses,
    totalTrades,
  }
}


exports.compareOpenAndCloseBetweenNumberOfDays = compareOpenAndCloseBetweenNumberOfDays
exports.compareOpenAndCloseBuyingCandleType = compareOpenAndCloseBuyingCandleType



// compare between time lengths
// compare between time lengths combined with days of week
// compare between time lengths using open bearish candles
// compare between time lengths using open bearish candle with percent change > x
