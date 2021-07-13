export default {
  /**
   * Check request  token
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   * @throws {Error}
   * @returns {void}
   */
  async checkToken (req, res, next) {
    // check authentication here
    console.log('Authentication Middleware===> check authentication here')
    next()

    // next() --> if success
    // throw error --> if failed
  }
}
