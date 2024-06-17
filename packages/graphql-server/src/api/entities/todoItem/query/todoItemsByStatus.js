const { todo_items: TodoItem, users: User } = require('../../../../models')

async function todoItemsByStatus (_, { status }) {
  try {
    const todoItems = await TodoItem.findAll({
      where: { status },
      include: {
        model: User,
        as: 'users'
      }
    })
    return todoItems
  } catch (error) {
    throw new Error('Failed to fetch todo items by status')
  }
}

module.exports = { todoItemsByStatus }
