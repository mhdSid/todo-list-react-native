const { todo_items: TodoItem, users: User } = require('../../../../models')
const { Op } = require('sequelize')
const { AUTH_ERROR, GET_FAILED_QUERY_ERROR } = require('../../../error')

async function todoItemsByTask (_, { task }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  try {
    const todoItems = await TodoItem.findAll({
      where: {
        task: {
          [Op.like]: `%${task}%`
        }
      },
      include: {
        model: User,
        as: 'users'
      }
    })
    return todoItems
  } catch (error) {
    throw GET_FAILED_QUERY_ERROR('todoItem')
  }
}

module.exports = { todoItemsByTask }
