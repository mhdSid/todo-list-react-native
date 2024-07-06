const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

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

function getWsServerContextToken (ctx, msg, args) {
  const token = ctx.connectionParams.authorizationToken || ''
  if (!token) return null
  let user = null
  try {
    user = jwt.verify(token, JWT_SECRET)
  } catch (err) {} finally {
    return {
      user
    }
  }
}

module.exports = {
  authenticateToken,
  JWT_SECRET,
  getWsServerContextToken
}
