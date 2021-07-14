import { getUsers } from '@controllers/user'
import { checkToken } from '@middlewares/auth'
import catchWrap from '@middlewares/catch-wrap'

/**
 * Init a express router
 *
 * @param {Express.Router} router
 * @returns {Express.Router}
 */
export default function (router) {
  router.get(
    '/user',
    catchWrap(checkToken),
    catchWrap(getUsers)
  )
  return router
}
