const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

async function createTodoItem (_, { task, userId, dueDate }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }

  const todoItem = await TodoItem.create({ task, userId, dueDate })

  return todoItem
}

module.exports = { createTodoItem }
