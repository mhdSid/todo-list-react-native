const { todo_items: TodoItem } = require('../../../../models')

async function deleteTodoItem (_, { id }) {
  const todoItem = await TodoItem.findByPk(id)
  if (!todoItem) throw new Error('TodoItem not found')
  await todoItem.destroy()
  return true
}

module.exports = { deleteTodoItem }
