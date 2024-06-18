const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

function authenticateToken (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    req.user = null
    return next()
  }

  try {
    const user = jwt.verify(token, JWT_SECRET)
    req.user = user
    next()
  } catch (err) {
    req.user = null
    next()
  }
}

module.exports = {
  authenticateToken,
  JWT_SECRET
}
