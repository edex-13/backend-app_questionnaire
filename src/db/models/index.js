const { Questionnaires, questionnairesSchema } = require('./questionnaires.model')

const setupModels = (sequelize) => {
  console.log('setupModels')
  Questionnaires.init(questionnairesSchema, Questionnaires.config(sequelize))
}

module.exports = setupModels
