import { splitStrToArray } from '@libs/string-utils'

export default {
  inlist (value, list) {
    return list.includes(value)
  },
  commaInlist (value, list) {
    const values = splitStrToArray(value)
    for (const v of values) {
      if (!list.includes(v)) {
        return false
      }
    }
    return true
  },
  isValidOrders (value, fields) {
    const orders = splitStrToArray(value).map(o => splitStrToArray(o, ' '))
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
