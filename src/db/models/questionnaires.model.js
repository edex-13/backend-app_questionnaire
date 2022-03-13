const { Model, DataTypes, Sequelize } = require('sequelize')

const TABLE_QUESTIONNAIRES = 'questionnaires'

const questionnairesSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  }
}

class Questionnaires extends Model {
  static associate (models) {
    this.hasMany(models.BasicQuestions, {
      as: 'basicQuestions',
      foreignKey: 'idQuestionnaire'
    })
    this.hasMany(models.BasicAnswers, {
      as: 'basicAnswers',
      foreignKey: 'idQuestionnaire'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TABLE_QUESTIONNAIRES,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { TABLE_QUESTIONNAIRES, questionnairesSchema, Questionnaires }
