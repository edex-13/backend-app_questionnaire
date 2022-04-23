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
console.log(process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL, options)

setupModels(sequelize)
sequelize.sync()

module.exports = sequelize
