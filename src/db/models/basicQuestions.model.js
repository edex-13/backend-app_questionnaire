const { Model, DataTypes, Sequelize } = require('sequelize')

const { TABLE_QUESTIONNAIRES } = require('./questionnaires.model')

const TABLE_BASIC_QUESTIONS = 'basic_questions'

const basicQuestionsSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  idQuestionnaire: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: TABLE_QUESTIONNAIRES,
      key: 'id'
    },
    onUpdate: 'SET NULL',
    onDelete: 'SET NULL'
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false
  },

  type: {
    type: DataTypes.STRING,
    allowNull: false
  },

  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
    min: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  }
}
class BasicQuestions extends Model {
  static associate (models) {

  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TABLE_BASIC_QUESTIONS,
      modelName: 'BasicQuestions',
      timestamps: false
    }
  }
}
module.exports = {
  TABLE_BASIC_QUESTIONS,
  basicQuestionsSchema,
  BasicQuestions
}
