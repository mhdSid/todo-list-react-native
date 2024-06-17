const { todo_items: TodoItem, users: User } = require('../../../../models')

async function todoItemsByDueDate (_, { dueDate }) {
  try {
    const todoItems = await TodoItem.findAll({
      where: {
        dueDate
      },
      include: {
        model: User,
        as: 'users'
      }
    })
    return todoItems
  } catch (error) {
    throw new Error('Failed to fetch todo items by due date')
  }
}

module.exports = { todoItemsByDueDate }
