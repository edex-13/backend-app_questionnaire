const { Model, DataTypes, Sequelize } = require('sequelize')

const TABLE_QUESTIONNAIRES = 'questionnaires'

const questionnairesSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
    this.belongsTo(models.users, {
      as: 'users',
      foreignKey: 'user'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TABLE_QUESTIONNAIRES,
      modelName: 'Questionnaires',
      timestamps: false
    }
  }
}

module.exports = { TABLE_QUESTIONNAIRES, questionnairesSchema, Questionnaires }
