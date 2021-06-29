const UserService = require('../services/user')
const models = require('../models')
const GetUserValidator = require('../validations/get-user')
const createError = require('http-errors')

module.exports = {
  getUsers: async (req, res) => {
    // get request param
    const queries = {
      limit: parseInt(req.query.limit || 20),
      offset: parseInt(req.query.offset || 0),
      fields: req.query.fields || null,
      orders: req.query.orders || 'id asc',
      account: req.query.account || null,
      full_name: req.query.full_name || null,
      birthday: req.query.birthday || null,
      gender: req.query.gender || null
    }

    // validate request body
    const validator = new GetUserValidator()
    if (!validator.isValid(queries)) {
      const error = createError(400)
      error.message = {
        message: 'Bad Request parameter',
        detail: validator.getMessages()
      }
      throw error
    }

    const service = new UserService(models)
    const data = await service.getUsers(queries)
    res.send(data)
  }
}
