export default (originalFunc) => {
  /**
   * Middleware for catch all error
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   * @throws {Error}
   * @returns {void}
   */
  return async (req, res, next) => {
    try {
      return await originalFunc.call(this, req, res, next)
    } catch (err) {
      console.log('Catch wrap error: ', err.stack)
      next(err)
    }
  }
}
