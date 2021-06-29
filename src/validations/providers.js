const { splitComma } = require('../libs/string-utils')

module.exports = {
  inlist: (value, list) => {
    return list.includes(value)
  },
  commaInlist: (value, list) => {
    const values = splitComma(value)
    for (const v of values) {
      if (!list.includes(v)) {
        return false
      }
    }
    return true
  },
  isValidOrders: (value, fields) => {
    const orders = value.split(',').map(o => o.trim().split(' '))
    for (const [field, dir] of orders) {
      if (!fields.includes(field)) {
        return false
      }

      if (!['desc', 'asc'].includes(dir)) {
        return false
      }
    }
    return true
  }
}
