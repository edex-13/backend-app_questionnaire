const { Sequelize } = require('sequelize')
const setupModels = require('./models')

const sequelize = new Sequelize('postgres://username:password@127.0.0.1:5432/myapp', {
  dialect: 'postgres'
})

setupModels(sequelize)

module.exports = sequelize
