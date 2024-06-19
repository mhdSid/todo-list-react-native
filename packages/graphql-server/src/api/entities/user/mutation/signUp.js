const bcrypt = require('bcrypt')
const { users: User } = require('../../../../models')
const { sendVerificationEmail } = require('../../../utils/sendVerificationEmail')
const { generateVerificationCode } = require('../../../utils/generateVerificationCode')
const { USER_ALREADY_EXISTS_ERROR } = require('../../../error')

async function signUp (_, { firstName, lastName, email, gender, dateOfBirth, password }) {
  let user = await User.findOne({ where: { email } })

  if (user) {
    if (user.isVerified) {
      throw USER_ALREADY_EXISTS_ERROR
    } else {
      // Resend verification code if user is not verified
      user.verificationCode = generateVerificationCode()
      await user.save()
      await sendVerificationEmail(email, user.verificationCode)
      return user
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  // Generate a verification code
  const verificationCode = generateVerificationCode()

  // Create the user with the verification code
  user = await User.create({
    firstName,
    lastName,
    email,
    gender,
    dateOfBirth,
    password: hashedPassword,
    verificationCode,
    isVerified: false
  })

  // Send the verification email
  await sendVerificationEmail(email, verificationCode)

  return user
}

module.exports = { signUp }
