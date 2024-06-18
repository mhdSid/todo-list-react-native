const { users: User } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

async function user (todoItem, args, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  const user = await User.findByPk(todoItem.userId)
  return user
}

module.exports = {
  TodoItem: {
    user
  }
}
