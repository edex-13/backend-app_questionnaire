const { Model, DataTypes, Sequelize } = require('sequelize')

const { TABLE_BASIC_QUESTIONS } = require('./basicQuestions.model.js')
const { TABLE_QUESTIONNAIRES } = require('./questionnaires.model')

const TABLE_BASIC_ANSWER = 'basic_answers'

const basicAnswerSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  idQuestionnaire: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: TABLE_QUESTIONNAIRES,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  idBasicQuestion: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: TABLE_BASIC_QUESTIONS,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  }
}

class BasicAnswer extends Model {
  static associate (models) {
    // this.belongsTo(models.Questionnaires, {
    //   as: 'questionnaire',
    //   foreignKey: 'idQuestionnaire'
    // })
    // this.belongsTo(models.BasicQuestions, {
    //   as: 'basicQuestion',
    //   foreignKey: 'idBasicQuestion'
    // })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TABLE_BASIC_ANSWER,
      modelName: 'BasicAnswers',
      timestamps: false
    }
  }
}
module.exports = {
  TABLE_BASIC_ANSWER,
  basicAnswerSchema,
  BasicAnswer
}
