const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { users: User } = require('../../../../models')
const { JWT_SECRET } = require('../../../../middleware/auth')

async function signUp (_, { firstName, lastName, email, gender, dateOfBirth, password }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({ firstName, lastName, email, gender, dateOfBirth, password: hashedPassword })
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d'
  })
  return { token, user }
}

module.exports = { signUp }
