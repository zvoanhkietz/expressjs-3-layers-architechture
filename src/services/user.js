import moment from 'moment'
import { Op } from 'sequelize'

import { splitStrToArray } from '@libs/string-utils'

export default class UserService {
  /**
   * constructor
   *
   * @param {Object} models
   * @return void
   */
  constructor (models) {
    this.models = models
  }

  /**
   * get List user by query filter
   *
   * @param {Object} queries
   * @returns Promise<Model> | null
   */
  async getUsers (queries) {
    const usersFilter = []

    // filter in list of accounts
    if (queries.account) {
      usersFilter.push({
        account: { [Op.in]: splitStrToArray(queries.account) }
      })
    }

    // filter when full_name contain keyword
    if (queries.full_name) {
      usersFilter.push({
        full_name: { [Op.like]: `%${queries.full_name}%` }
      })
    }

    // filter by start <= birthday <= end
    if (queries.birthday) {
      const [startDate, endDate] = splitStrToArray(queries.birthday, '~')
      if (startDate !== '') {
        usersFilter.push({
          birthday: {
            [Op.gt]: moment(startDate).format('YYYYMMDD')
          }
        })
      }

      if (endDate !== '') {
        usersFilter.push({
          birthday: {
            [Op.lt]: moment(endDate).format('YYYYMMDD')
          }
        })
      }
    }

    // filter by gender
    if (queries.gender) {
      usersFilter.push({
        gender: queries.gender
      })
    }

    // get fields
    const attributes = queries.fields ? splitStrToArray(queries.fields) : null

    // get orders
    const orders = splitStrToArray(queries.orders).map(o => splitStrToArray(o, ' '))

    const filters = {
      limit: queries.limit,
      offset: queries.offset,
      orders,
      where: {
        [Op.and]: usersFilter
      },
      attributes
    }

    // return result
    const rows = await this.models.User.findAll(filters)
    const total = await this.models.User.count()
    const count = Math.min(rows.length, filters.limit)
    return { total, count, rows }
  }
}
