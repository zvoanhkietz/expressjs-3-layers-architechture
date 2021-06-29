const catchWrap = require('../middlewares/catch-wrap')
const AuthMiddleware = require('../middlewares/auth')
const UserController = require('../controllers/user')

module.exports = function (router) {
  router.get(
    '/user',
    catchWrap(AuthMiddleware.checkToken),
    catchWrap(UserController.getUsers)
  )
  return router
}
