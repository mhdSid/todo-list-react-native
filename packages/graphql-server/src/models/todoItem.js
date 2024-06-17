'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TodoItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.users, { foreignKey: 'userId', as: 'users' })
    }
  }
  TodoItem.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    task: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    status: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: 'pending'
    },
    dueDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'todo_items'
  })
  return TodoItem
}
