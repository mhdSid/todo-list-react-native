const { GraphQLError } = require('graphql')

const AUTH_ERROR = new GraphQLError('User is not authenticated', {
  extensions: {
    code: 'unauthorized',
    http: { status: 401 }
  }
})

const INVALID_CREDENTIALS_ERROR = new GraphQLError('Invalid credentials', {
  extensions: {
    code: 'invalid_credentials',
    http: { status: 401 }
  }
})

module.exports = { AUTH_ERROR, INVALID_CREDENTIALS_ERROR }
