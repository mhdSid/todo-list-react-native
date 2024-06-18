const { users: User } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

function users (_, __, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  return User.findAll()
}

module.exports = { users }
