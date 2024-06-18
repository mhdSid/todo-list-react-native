const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

async function deleteTodoItem (_, { id }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  const todoItem = await TodoItem.findByPk(id)
  if (!todoItem) throw new Error('TodoItem not found')
  await todoItem.destroy()
  return true
}

module.exports = { deleteTodoItem }
