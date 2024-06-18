const { todo_items: TodoItem } = require('../../../../models')

async function todoItems (user, args, context) {
  if (!context.user) {
    throw new Error('Unauthorized')
  }
  return await TodoItem.findAll({ where: { userId: user.id } })
}

module.exports = {
  User: {
    todoItems
  }
}
