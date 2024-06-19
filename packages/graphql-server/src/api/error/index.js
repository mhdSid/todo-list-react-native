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

const INVALID_VERIFICATION_CODE_ERROR = new GraphQLError('Invalid verification code', {
  extensions: {
    code: 'invalid_verification_code',
    http: { status: 401 }
  }
})

const UNVERIFIED_USER_ERROR = new GraphQLError('User is not verified', {
  extensions: {
    code: 'unverified_user',
    http: { status: 401 }
  }
})

const EMAIL_TRANSPORTATION_ERROR = new GraphQLError('Email transporation error', {
  extensions: {
    code: 'email_transport',
    http: { status: 401 }
  }
})

const USER_ALREADY_EXISTS_ERROR = new GraphQLError('User already exists and is verfied', {
  extensions: {
    code: 'user_already_exists',
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

const GET_ENTITY_NOT_FOUND_ERROR = entity =>
  new GraphQLError(`${entity} not found`, {
    extensions: {
      code: 'entity_not_found',
      http: { status: 401 }
    }
  })

module.exports = {
  AUTH_ERROR,
  INVALID_CREDENTIALS_ERROR,
  GENERIC_ERROR,
  GET_FAILED_QUERY_ERROR,
  GET_FAILED_MUTATATION_ERROR,
  GET_ENTITY_NOT_FOUND_ERROR,
  INVALID_VERIFICATION_CODE_ERROR,
  USER_ALREADY_EXISTS_ERROR,
  UNVERIFIED_USER_ERROR,
  EMAIL_TRANSPORTATION_ERROR
}
