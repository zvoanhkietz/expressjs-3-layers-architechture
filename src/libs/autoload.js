import { readdirSync } from 'fs'
import { basename as _basename, join } from 'path'

/**
 * Autoload module
 *
 * @param {string} dirname
 * @param {string} filename
 * @param {Array<any>} args
 * @returns {Object[key: string]<any>}
 */
export default (dirname, filename, args = []) => {
  const basename = _basename(filename)
  const objReuslt = {}
  readdirSync(dirname)
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    })
    .forEach((file) => {
      let instance = require(join(dirname, file)).default
      if (typeof instance === 'function') {
        instance = instance(...args)
      }
      objReuslt[instance.name] = instance
    })
  return objReuslt
}
