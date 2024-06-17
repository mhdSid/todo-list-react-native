const { dateScalar } = require('./scalars/date')
const entities = require('./entities')

const resolvers = {
  Date: dateScalar,
  ...entities
}

module.exports = resolvers
