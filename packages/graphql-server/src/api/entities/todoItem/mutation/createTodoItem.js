const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

async function createTodoItem (_, { task, userId, dueDate }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  return await TodoItem.create({ task, userId, dueDate })
}

module.exports = { createTodoItem }
