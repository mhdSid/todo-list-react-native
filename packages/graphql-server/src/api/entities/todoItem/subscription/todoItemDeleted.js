const { pubSub, PUBSUB_TYPES } = require('../../pubSub')
const { withFilter } = require('graphql-subscriptions')

module.exports = {
  todoItemDeleted: {
    subscribe: withFilter(
      () => pubSub.asyncIterator([PUBSUB_TYPES.TODO_ITEM_DELETED]),
      (payload, variables, { user }) => {
        return payload.todoItemDeleted.userId === user.id
      }
    )
  }
}
