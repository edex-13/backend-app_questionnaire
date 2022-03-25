const { Sequelize } = require('sequelize')
const setupModels = require('./models')

const isProd = process.env.NODE_ENV === 'production'
const options = {
  dialect: 'postgres',
  logging: !isProd
}

if (isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}
const sequelize = new Sequelize(process.env.DATABASE_URL, options)

setupModels(sequelize)

module.exports = sequelize
