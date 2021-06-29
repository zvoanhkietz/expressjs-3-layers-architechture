module.exports = (originalFunc) => {
  return async (req, res, next) => {
    try {
      return await originalFunc.call(this, req, res, next)
    } catch (err) {
      console.log('Catch wrap error: ', err.stack)
      next(err)
    }
  }
}
