const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

async function todoItem (_, { id }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  return await TodoItem.findByPk(id)
}

module.exports = { todoItem }
