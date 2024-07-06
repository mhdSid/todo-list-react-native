const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')
const { pubSub, PUBSUB_TYPES } = require('../../pubSub')

async function createTodoItem (_, { task, dueDate }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }

  const todoItem = await TodoItem.create({ task, userId: context.user.id, dueDate })

  pubSub.publish(PUBSUB_TYPES.TODO_ITEM_CREATED, { todoItemCreated: todoItem })

  return todoItem
}

module.exports = { createTodoItem }
