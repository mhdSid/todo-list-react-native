const nodemailer = require('nodemailer')
const { EMAIL_TRANSPORTATION_ERROR } = require('../error')
const { getEmailTemplate } = require('./getEmailTemplate')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD
  }
})

async function sendVerificationEmail (email, verificationCode) {
  try {
    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: email,
      subject: `TodoList Email Verification Code is ${verificationCode}`,
      html: getEmailTemplate(verificationCode)
    }

    await transporter.sendMail(mailOptions)
  } catch (e) {
    throw EMAIL_TRANSPORTATION_ERROR
  }
}

module.exports = { sendVerificationEmail }
