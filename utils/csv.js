const number = require('./number').number
const candleUtil = require('./candle').candle

const csv = {
  csvRowToCandleFormatter: (csvRow) => {
 
    const candle = {
      open: number.fullDecimal(csvRow.Open),
      close: number.fullDecimal(csvRow.Close),
      high: number.fullDecimal(csvRow.High),
      low: number.fullDecimal(csvRow.Low),
      volume: number.fullDecimal(csvRow.Volume),
      date: csvRow.Date,
    }

    candle.bullish = number.isLessThanOrEqualTo(candle.open, candle.close)
    candle.median = candleUtil.getMedian(candle)
    candle.percentageChange = candleUtil.getPercentageChange(candle)
    candle.dayOfWeek = candleUtil.getDayOfWeek(candle)
  
    return candle
  },
}

exports.csv = csv