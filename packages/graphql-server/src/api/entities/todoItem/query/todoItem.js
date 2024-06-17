const { todo_items: TodoItem } = require('../../../../models')

function todoItem (_, { id }) {
  return TodoItem.findByPk(id)
}

module.exports = { todoItem }
