const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR, GET_ENTITY_NOT_FOUND_ERROR } = require('../../../error')
const { PUBSUB_TYPES, pubSub } = require('../../pubSub')

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
  pubSub.publish(PUBSUB_TYPES.TODO_ITEM_UPDATED, { todoItemUpdated: todoItem })
  return todoItem
}

module.exports = { updateTodoItem }
