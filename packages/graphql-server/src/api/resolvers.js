const scalars = require('./scalars')
const entities = require('./entities')

const resolvers = {
  ...scalars,
  ...entities
}

module.exports = resolvers
