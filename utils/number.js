const numeral = require('numeral')

const number = {
  fullDecimal: (numString) => numeral(numString),
  isGreaterThan: (valA, valB) => valA._value > valB._value,
  isLessThan: (valA, valB) => valA._value < valB._value,
  isEqualTo: (valA, valB) => valA._value > valB._value,
  isGreaterThanOrEqualTo: (valA, valB) => valA._value >= valB._value,
  isLessThanOrEqualTo: (valA, valB) => valA._value <= valB._value,
}

exports.number = number