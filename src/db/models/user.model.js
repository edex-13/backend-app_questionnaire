const { Model, DataTypes, Sequelize } = require('sequelize')

const TABLE_USERS = 'users'

const usersSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at'
  }
}

class Users extends Model {
  static associate (models) {
    this.hasMany(models.BasicQuestions, {
      as: 'basicQuestions',
      foreignKey: 'idUser'
    })
    this.hasMany(models.BasicAnswers, {
      as: 'basicAnswers',
      foreignKey: 'idUser'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TABLE_USERS,
      modelName: 'users',
      timestamps: false
    }
  }
}

module.exports = { TABLE_USERS, usersSchema, Users }
