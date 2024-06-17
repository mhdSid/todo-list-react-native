const { todo_items: TodoItem } = require('../../../../models')

function createTodoItem (_, { task, userId, dueDate }) {
  return TodoItem.create({ task, userId, dueDate })
}

module.exports = { createTodoItem }
