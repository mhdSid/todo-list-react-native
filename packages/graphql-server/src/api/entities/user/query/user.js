const { users: User } = require('../../../../models')

function user (_, { id }) {
  return User.findByPk(id)
}

module.exports = { user }
