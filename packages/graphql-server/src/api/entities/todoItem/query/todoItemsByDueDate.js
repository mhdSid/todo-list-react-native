const { todo_items: TodoItem, users: User } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

async function todoItemsByDueDate (_, { dueDate }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
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
