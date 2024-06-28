'use strict'

const { Op } = require('sequelize')
const { Model } = require('sequelize')
const { recommendTasks } = require('../api/ml')

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

    async getRecommendationsFromRedis () {}
    async getRecommendations (User, userId) {
      const userTasks = await TodoItem.findAll({
        where: {
          userId,
          id: {
            [Op.ne]: this.id
          }
        },
        include: {
          model: User,
          as: 'users'
        }
      })

      const tasks = [
        this.task,
        ...userTasks.map(task => task.task)
      ]

      let recommendations = await recommendTasks(tasks)

      if (!recommendations || !recommendations.length) return

      recommendations = recommendations.slice(1, recommendations.length)

      const todoItems = await TodoItem.findAll({
        where: {
          task: {
            [Op.in]: recommendations.map(item => item.task)
          }
        },
        include: {
          model: User,
          as: 'users'
        }
      })

      return todoItems
    }
  }
  TodoItem.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.BIGINT
    },
    task: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'pending'
    },
    dueDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    userId: {
      type: DataTypes.BIGINT,
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
