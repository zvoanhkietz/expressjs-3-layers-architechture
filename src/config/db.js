export default {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || null,
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: console.log,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  },
  staging: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || null,
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || null,
    database: process.env.DB_NAME || null,
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  }
}
