const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR, GET_ENTITY_NOT_FOUND_ERROR } = require('../../../error')

async function deleteTodoItem (_, { id }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  const todoItem = await TodoItem.findByPk(id)
  if (!todoItem) throw GET_ENTITY_NOT_FOUND_ERROR('todoItem')
  await todoItem.destroy()
  return true
}

module.exports = { deleteTodoItem }
