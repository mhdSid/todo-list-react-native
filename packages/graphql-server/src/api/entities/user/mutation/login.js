const { users: User } = require('../../../../models')
const { USER_NOT_EXISTS_ERROR } = require('../../../error')
const { generateVerificationCode } = require('../../../utils/generateVerificationCode')
const { sendVerificationEmail } = require('../../../utils/sendVerificationEmail')

async function login (_, { email }) {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw USER_NOT_EXISTS_ERROR
  }

  user.verificationCode = generateVerificationCode()
  await user.save()
  await sendVerificationEmail(email, user.verificationCode)

  return user
}

module.exports = { login }
