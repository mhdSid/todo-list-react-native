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
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.CHAR(50)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.CHAR(50)
    },
    email: {
      allowNull: true,
      type: DataTypes.CHAR(150)
    },
    gender: {
      allowNull: false,
      type: DataTypes.CHAR(20)
    },
    dateOfBirth: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'users'
  })
  return User
}
