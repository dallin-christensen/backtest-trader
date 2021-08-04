const csv = require('csv-parser')
const fs = require('fs')
const csvUtil = require('./utils/csv').csv
const {
  compareOpenAndCloseBetweenNumberOfDays,
  compareOpenAndCloseBuyingCandleType,
} = require('./tradingStrategies')

const candleData = []


const dataReader = (results) => {
  console.log('wins', results.wins.length)
  console.log('losses', results.losses.length)
  console.log('total', results.totalTrades)
  console.log('win percentage', (results.wins.length/results.totalTrades))

  const years = {}

  results.wins.forEach((win) => {
    const year = new Date(win.date).getUTCFullYear()
    if (!years[year]) {
      years[year] = []
    }

    years[year].push(win)
  })

  const yearsLosses = {}
  results.losses.forEach((loss) => {
    const year = new Date(loss.date).getUTCFullYear()
    if (!yearsLosses[year]) {
      yearsLosses[year] = []
    }

    yearsLosses[year].push(loss)
  })



  Object.keys(years).forEach(year => {
    console.log(`\t ${year} win percentage`, (years[year].length/(years[year].length + (yearsLosses?.[year]?.length || 0))))
  })

}

const start = () => {
  const results = compareOpenAndCloseBuyingCandleType(candleData, 15, true, 0.002, 0.007)
  dataReader(results)
}


fs.createReadStream('SPY.csv')
  .pipe(csv())
  .on('data', (csvData) => {
    const candle = csvUtil.csvRowToCandleFormatter(csvData)
    candleData.push(candle)
  })
  .on('end', () => {
    start()
  })
