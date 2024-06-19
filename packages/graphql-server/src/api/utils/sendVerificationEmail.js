const nodemailer = require('nodemailer')
const { EMAIL_TRANSPORTATION_ERROR } = require('../error')
const { getEmailTemplate } = require('./getEmailTemplate')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'swid.kapo@gmail.com',
    pass: 'tbji yrmh jkje idkg'
  }
})

async function sendVerificationEmail (email, verificationCode) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'TodoList Email Verification',
      html: getEmailTemplate(verificationCode)
    }

    await transporter.sendMail(mailOptions)
  } catch (e) {
    throw EMAIL_TRANSPORTATION_ERROR
  }
}

module.exports = { sendVerificationEmail }
