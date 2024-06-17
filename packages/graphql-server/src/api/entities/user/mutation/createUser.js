const { users: User } = require('../../../../models')

function createUser (_, { firstName, lastName, email, gender, dateOfBirth }) {
  return User.create({ firstName, lastName, email, gender, dateOfBirth })
}

module.exports = { createUser }
