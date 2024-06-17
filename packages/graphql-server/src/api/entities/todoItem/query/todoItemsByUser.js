const { todo_items: TodoItem, users: User } = require('../../../../models')

async function todoItemsByUser (_, { userId }) {
  try {
    const todoItems = await TodoItem.findAll({
      where: { userId },
      include: {
        model: User,
        as: 'users'
      }
    })
    return todoItems
  } catch (error) {
    throw new Error('Failed to fetch todo items by user ID')
  }
}

module.exports = { todoItemsByUser }
