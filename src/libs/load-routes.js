import { Router } from 'express'
import { readdirSync, statSync } from 'fs'
import { basename, extname, resolve } from 'path'

/**
 * Autoload routes
 *
 * @param {string} loadPath
 * @param {boolean} recursive
 * @returns {Express.Router}
 */
export default (loadPath, recursive) => {
  let router = Router()
  if (!loadPath) loadPath = './routes'

  let walk = (dir) => {
    let results = []
    let list = readdirSync(dir)
    list.forEach((file) => {
      file = dir + '/' + file
      let stat = statSync(file)
      if (stat && stat.isDirectory()) results = results.concat(walk(file))
      else results.push(file)
    })
    return results
  }

  let files = recursive ? walk(loadPath) : readdirSync(loadPath)
  Object.keys(files).forEach(async function (i) {
    let file = recursive ? resolve(files[i]) : resolve(loadPath, files[i])

    if (
      statSync(file).isFile() &&
      extname(file).toLowerCase() === '.js' &&
      basename(file).substr(0, 1) !== '.'
    ) {
      router = require(file).default(router)
    }
  })

  return router
}
