const { GraphQLScalarType, Kind } = require('graphql')

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom scalar type for Date, handles timestamps in milliseconds',
  parseValue (value) {
    return new Date(value) // Convert incoming integer to Date
  },
  serialize (value) {
    return value.toISOString().split('T')[0] // Format as YYYY-MM-DD
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }
    return null
  }
})

module.exports = { dateScalar }
