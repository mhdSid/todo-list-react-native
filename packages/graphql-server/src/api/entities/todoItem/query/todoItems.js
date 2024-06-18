const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

async function todoItems (parent, args, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  return await TodoItem.findAll()
}

module.exports = { todoItems }
