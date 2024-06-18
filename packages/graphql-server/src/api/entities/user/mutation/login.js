const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { users: User } = require('../../../../models')
const { JWT_SECRET } = require('../../../../middleware/auth')
const { INVALID_CREDENTIALS_ERROR } = require('../../../error')

async function login (_, { email, password }) {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw INVALID_CREDENTIALS_ERROR
  }
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw INVALID_CREDENTIALS_ERROR
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d'
  })
  return { token, user }
}

module.exports = { login }
