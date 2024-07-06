const { todo_items: TodoItem, users: User } = require('../../../../models')
const { AUTH_ERROR, GET_FAILED_QUERY_ERROR } = require('../../../error')

async function myTodoItems (_, __, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  try {
    const todoItems = await TodoItem.findAll({
      where: { userId: context.user.id },
      include: {
        model: User,
        as: 'users'
      }
    })
    return todoItems
  } catch (error) {
    throw GET_FAILED_QUERY_ERROR('todoItem')
  }
}

module.exports = { myTodoItems }
