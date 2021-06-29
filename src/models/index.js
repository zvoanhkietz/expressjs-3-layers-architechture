const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/db.js'))[env]

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

const db = require('../libs/autoload')(__dirname, __filename, [sequelize])

Object.keys(db).forEach(async (modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }

  if (env === 'development') {
    // automatically synchronize all models
    await db[modelName].sync()
  }

  // get colums of tables
  db[modelName].getFields = () => Object
    .values(db[modelName].rawAttributes)
    .map(o => o.field)
})

db.sequelize = sequelize
module.exports = db
