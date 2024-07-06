const todoItem = require('./todoItem')
const user = require('./user')

module.exports = {
  Query: {
    ...todoItem.query,
    ...user.query
  },
  Mutation: {
    ...todoItem.mutation,
    ...user.mutation
  },
  Subscription: {
    ...todoItem.subscription
  },
  ...todoItem.association,
  ...user.association
}
