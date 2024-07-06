const { pubSub, PUBSUB_TYPES } = require('../../pubSub')
const { withFilter } = require('graphql-subscriptions')

module.exports = {
  todoItemCreated: {
    subscribe: withFilter(
      () => pubSub.asyncIterator([PUBSUB_TYPES.TODO_ITEM_CREATED]),
      (payload, variables, { user }) => {
        return payload.todoItemCreated.userId === user.id
      }
    )
  }
}
