const { users: User } = require('../../../../models')

function users () {
  return User.findAll()
}

module.exports = { users }
