const { users: User } = require('../../../../models')
const { AUTH_ERROR } = require('../../../error')

async function me (_, __, context) {
  if (!context.user) {
    throw AUTH_ERROR
  }
  return await User.findByPk(user.id)
}

module.exports = { me }
