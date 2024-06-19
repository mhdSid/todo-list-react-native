function getEmailTemplate (verificationCode) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Email Verification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding: 20px 0;
            background-color: #007bff;
            color: #ffffff;
          }
          .content {
            padding: 20px;
          }
          .code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            text-align: center;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 20px 0;
            color: #666666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Email Verification</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Thank you for signing up! Please use the verification code below to verify your email address.</p>
            <div class="code">${verificationCode}</div>
            <p>If you didn't sign up for this account, you can ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} TodoList. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
`
}

module.exports = { getEmailTemplate }
