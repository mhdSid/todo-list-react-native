const { pubSub, PUBSUB_TYPES } = require('../../pubSub')
const { withFilter } = require('graphql-subscriptions')

module.exports = {
  todoItemUpdated: {
    subscribe: withFilter(
      () => pubSub.asyncIterator([PUBSUB_TYPES.TODO_ITEM_UPDATED]),
      (payload, variables, { user }) => {
        return payload.todoItemUpdated.userId === user.id
      }
    )
  }
}
