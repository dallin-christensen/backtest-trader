const { number } = require("./number")

const candle = {
  getOpen: candle => candle.open,
  getClose: candle => candle.close,
  getHigh: candle => candle.high,
  getLow: candle => candle.low,
  getMedian: candle => {
    const diff = candle.high._value - candle.low._value

    const halfDiff = diff / 2

    const median = candle.low._value + halfDiff

    return number.fullDecimal(median)
  },
  getPercentageChange: candle => {
    const open = candle.open._value
    const close = candle.close._value
    const bullish = close > open

    const diff = bullish
      ? close - open
      : open - close

    return number.fullDecimal(diff/open)
  },
  getDayOfWeek: candle => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const date = new Date(candle.date)
    return daysOfWeek[date.getDay()]
  }
}

exports.candle = candle