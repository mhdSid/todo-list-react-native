const bcrypt = require('bcrypt')
const { users: User } = require('../../../../models')
const { INVALID_CREDENTIALS_ERROR, USER_NOT_EXISTS_ERROR } = require('../../../error')
const { generateVerificationCode } = require('../../../utils/generateVerificationCode')
const { sendVerificationEmail } = require('../../../utils/sendVerificationEmail')

async function login (_, { email, password }) {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw USER_NOT_EXISTS_ERROR
  }
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw INVALID_CREDENTIALS_ERROR
  }

  user.verificationCode = generateVerificationCode()
  await user.save()
  await sendVerificationEmail(email, user.verificationCode)

  return user
}

module.exports = { login }
