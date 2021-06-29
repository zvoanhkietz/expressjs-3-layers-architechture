module.exports = {
  checkToken: async (req, res, next) => {
    // check authentication here
    console.log('Authentication Middleware===> check authentication here')
    next()

    // next() --> if success
    // throw error --> if failed
  }
}
