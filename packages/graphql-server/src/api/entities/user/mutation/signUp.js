const bcrypt = require('bcrypt')
const { users: User } = require('../../../../models')
const { sendVerificationEmail } = require('../../../utils/sendVerificationEmail')
const { generateVerificationCode } = require('../../../utils/generateVerificationCode')
const { USER_ALREADY_EXISTS_ERROR } = require('../../../error')

async function signUp (_, { firstName, lastName, email, gender, dateOfBirth, password }) {
  let user = await User.findOne({ where: { email } })

  if (user) {
    throw USER_ALREADY_EXISTS_ERROR
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const verificationCode = generateVerificationCode()

  user = await User.create({
    firstName,
    lastName,
    email,
    gender,
    dateOfBirth,
    password: hashedPassword,
    verificationCode
  })

  await sendVerificationEmail(email, verificationCode)

  return user
}

module.exports = { signUp }
