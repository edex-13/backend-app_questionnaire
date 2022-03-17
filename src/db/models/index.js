const { Questionnaires, questionnairesSchema } = require('./questionnaires.model')
const { BasicQuestions, basicQuestionsSchema } = require('./basicQuestions.model')
const { BasicAnswer, basicAnswerSchema } = require('./basicAnswer.model')
const { Users, usersSchema } = require('./user.model')
const setupModels = (sequelize) => {
  console.log('setupModels')
  BasicAnswer.init(basicAnswerSchema, BasicAnswer.config(sequelize))
  BasicQuestions.init(basicQuestionsSchema, BasicQuestions.config(sequelize))
  Questionnaires.init(questionnairesSchema, Questionnaires.config(sequelize))
  Users.init(usersSchema, Users.config(sequelize))

  Questionnaires.associate(sequelize.models)
  BasicQuestions.associate(sequelize.models)
  BasicAnswer.associated(sequelize.models)
  Users.associate(sequelize.models)
}

module.exports = setupModels
