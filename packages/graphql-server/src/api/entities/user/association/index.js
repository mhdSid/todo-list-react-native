const { todo_items: TodoItem } = require('../../../../models')

function todoItems (user) {
  return TodoItem.findAll({ where: { userId: user.id } })
}

module.exports = {
  User: {
    todoItems
  }
}
