'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.todo_items, { foreignKey: 'userId', as: 'todo_items' })
    }
  }
  User.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.BIGINT
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING(150)
    },
    gender: {
      allowNull: false,
      type: DataTypes.STRING(20)
    },
    dateOfBirth: {
      allowNull: false,
      type: DataTypes.DATE
    },
    password: {
      type: DataTypes.STRING(20)
    },
    verificationCode: {
      type: DataTypes.STRING(6)
    }
  }, {
    sequelize,
    modelName: 'users'
  })
  return User
}
