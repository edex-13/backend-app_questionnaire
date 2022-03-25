const url = process.env.DATABASE_URL || 'postgres://username:password@127.0.0.1:5432/myapp'

module.exports = {
  development: {
    url,
    dialect: 'postgres'
  },
  production: {
    url,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}
