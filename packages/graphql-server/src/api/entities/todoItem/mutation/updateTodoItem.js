const { todo_items: TodoItem } = require('../../../../models')

async function updateTodoItem (_, { id, task, status, dueDate }) {
  const todoItem = await TodoItem.findByPk(id)
  if (!todoItem) throw new Error('TodoItem not found')
  if (task !== undefined) todoItem.task = task
  if (status !== undefined) todoItem.status = status
  if (dueDate !== undefined) todoItem.dueDate = dueDate
  await todoItem.save()
  return todoItem
}

module.exports = { updateTodoItem }
