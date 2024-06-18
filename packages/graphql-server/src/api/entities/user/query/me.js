const { users: User } = require('../../../../models')

async function me (_, __, { user }) {
  if (!user) {
    throw new Error('You are not authenticated')
  }
  return await User.findByPk(user.id)
}

module.exports = { me }
