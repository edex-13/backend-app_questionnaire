const { Model, DataTypes, Sequelize } = require('sequelize')

const TABLE_NAME = 'questionnaires'

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
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'updated_at'
  }
}

class Questionnaires extends Model {
  static associate (/* models */) {
    // this.hasMany(models.Questions, { foreignKey: 'idQuestionnaire' })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { TABLE_NAME, questionnairesSchema, Questionnaires }
