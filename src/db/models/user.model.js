const { Model, DataTypes, Sequelize } = require('sequelize')

const TABLE_USERS = 'users'

const usersSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
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
