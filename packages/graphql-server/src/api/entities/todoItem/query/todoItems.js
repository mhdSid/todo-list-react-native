const { todo_items: TodoItem } = require('../../../../models')

function todoItems () {
  return TodoItem.findAll()
}

module.exports = { todoItems }
