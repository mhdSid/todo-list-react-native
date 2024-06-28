const { todo_items: TodoItem, users: User } = require('../../../../models')
const { AUTH_ERROR, GET_FAILED_QUERY_ERROR } = require('../../../error')

async function todoItemWithRecommendation (_, { id }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  try {
    const todoItem = await TodoItem.findByPk(id, {
      include: {
        model: User,
        as: 'users'
      }
    })
    const recommendations = await todoItem.getRecommendations(User, context.user.id)

    return {
      todoItem,
      recommendations
    }
  } catch (error) {
    throw GET_FAILED_QUERY_ERROR('todoItem')
  }
}

module.exports = { todoItemWithRecommendation }
