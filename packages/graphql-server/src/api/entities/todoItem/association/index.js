const { users: User } = require('../../../../models')

function user (todoItem) {
  return User.findByPk(todoItem.userId)
}

module.exports = {
  TodoItem: {
    user
  }
}
