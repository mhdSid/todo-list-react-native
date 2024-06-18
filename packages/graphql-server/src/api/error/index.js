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

const GENERIC_ERROR = new GraphQLError('An error has occured', {
  extensions: {
    code: 'generic_error',
    http: { status: 401 }
  }
})

const GET_FAILED_QUERY_ERROR = prop =>
  new GraphQLError(`Failed to query ${prop}`, {
    extensions: {
      code: 'failed_query',
      http: { status: 401 }
    }
  })

const GET_FAILED_MUTATATION_ERROR = prop =>
  new GraphQLError(`Failed to fetch ${prop}`, {
    extensions: {
      code: 'failed_mutation',
      http: { status: 401 }
    }
  })

module.exports = {
  AUTH_ERROR,
  INVALID_CREDENTIALS_ERROR,
  GENERIC_ERROR,
  GET_FAILED_QUERY_ERROR,
  GET_FAILED_MUTATATION_ERROR
}
