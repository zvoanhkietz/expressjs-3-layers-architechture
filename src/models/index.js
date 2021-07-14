import Sequelize from 'sequelize'

import dbConfig from '@config/db'

const env = process.env.NODE_ENV || 'development'
const config = dbConfig[env]

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

const db = require('@libs/autoload').default(__dirname, __filename, [sequelize])

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }

  // get colums of tables
  db[modelName].getFields = () => Object
    .values(db[modelName].rawAttributes)
    .map(o => o.field)
})

if (env === 'development') {
  // automatically synchronize all models
  sequelize.sync()
}

db.sequelize = sequelize
export default db
