const { Model, DataTypes, Sequelize } = require('sequelize')

const { TABLE_QUESTIONNAIRES } = require('./questionnaires.model')

const TABLE_RESPONSE_QUESTIONS = 'response_questionaires'

const responseQuestionsSchema = {
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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  name_user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correct_answers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    min: 0
  },
  wrong_answers: {
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

class ResponseQuestions extends Model {
  static associate (models) {
    this.belongsTo(models.Questionnaires, {
      foreignKey: 'idQuestionnaire',
      onDelete: 'CASCADE'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TABLE_RESPONSE_QUESTIONS,
      modelName: 'ResponseQuestions',
      timestamps: false
    }
  }
}
module.exports = {
  TABLE_RESPONSE_QUESTIONS,
  responseQuestionsSchema,
  ResponseQuestions
}
