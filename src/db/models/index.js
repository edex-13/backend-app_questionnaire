const { Questionnaires, questionnairesSchema } = require('./questionnaires.model')
const { BasicQuestions, basicQuestionsSchema } = require('./basicQuestions.model')
const { BasicAnswer, basicAnswerSchema } = require('./basicAnswer.model')
const { ResponseQuestions, responseQuestionsSchema } = require('./responseQuestions.model')
const { Users, usersSchema } = require('./user.model')
const setupModels = (sequelize) => {
  console.log('setupModels')
  BasicAnswer.init(basicAnswerSchema, BasicAnswer.config(sequelize))
  BasicQuestions.init(basicQuestionsSchema, BasicQuestions.config(sequelize))
  Questionnaires.init(questionnairesSchema, Questionnaires.config(sequelize))
  Users.init(usersSchema, Users.config(sequelize))
  ResponseQuestions.init(responseQuestionsSchema, ResponseQuestions.config(sequelize))

  Questionnaires.associate(sequelize.models)
  BasicQuestions.associate(sequelize.models)
  BasicAnswer.associate(sequelize.models)
  Users.associate(sequelize.models)
}

module.exports = setupModels
