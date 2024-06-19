const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR, GET_ENTITY_NOT_FOUND_ERROR } = require('../../../error')

async function updateTodoItem (_, { id, task, status, dueDate }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  const todoItem = await TodoItem.findByPk(id)
  if (!todoItem) throw GET_ENTITY_NOT_FOUND_ERROR('todoItem')
  if (task !== undefined) todoItem.task = task
  if (status !== undefined) todoItem.status = status
  if (dueDate !== undefined) todoItem.dueDate = dueDate
  await todoItem.save()
  return todoItem
}

module.exports = { updateTodoItem }
