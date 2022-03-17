'use strict'
const { TABLE_QUESTIONNAIRES, questionnairesSchema } = require('../models/questionnaires.model')
const { TABLE_BASIC_QUESTIONS, basicQuestionsSchema } = require('../models/basicQuestions.model')
const { TABLE_BASIC_ANSWER, basicAnswerSchema } = require('../models/basicAnswer.model')
const { TABLE_USERS, usersSchema } = require('../models/user.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(TABLE_USERS, usersSchema)
    queryInterface.createTable(TABLE_QUESTIONNAIRES, questionnairesSchema)
    queryInterface.createTable(TABLE_BASIC_QUESTIONS, basicQuestionsSchema)
    queryInterface.createTable(TABLE_BASIC_ANSWER, basicAnswerSchema)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
}
