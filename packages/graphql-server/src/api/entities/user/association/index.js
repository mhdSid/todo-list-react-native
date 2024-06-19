const { todo_items: TodoItem } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

async function todoItems (user, args, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  return await TodoItem.findAll({ where: { userId: user.id } })
}

module.exports = {
  User: {
    todoItems
  }
}
