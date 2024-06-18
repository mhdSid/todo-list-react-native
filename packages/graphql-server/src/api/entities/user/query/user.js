const { users: User } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

function user (_, { id }, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  return User.findByPk(id)
}

module.exports = { user }
