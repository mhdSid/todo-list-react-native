const { users: User } = require('../../../../models')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../../../middleware/auth')
const { INVALID_VERIFICATION_CODE_ERROR } = require('../../../error')

async function verifyEmail (_, { email, verificationCode }) {
  const user = await User.findOne({ where: { email } })

  if (!user || user.verificationCode !== verificationCode) {
    throw INVALID_VERIFICATION_CODE_ERROR
  }

  user.isVerified = true
  await user.save()

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '1d'
  })

  return { token, user }
}

module.exports = { verifyEmail }
