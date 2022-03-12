const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('postgres://username:password@127.0.0.1:5432/myapp', {
  dialect: 'postgres'
})

sequelize.sync()

module.exports = sequelize
