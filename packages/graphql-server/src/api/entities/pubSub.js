const { PubSub } = require('graphql-subscriptions')

const pubSub = new PubSub()

const PUBSUB_TYPES = {
  TODO_ITEM_CREATED: 'TODO_ITEM_CREATED',
  TODO_ITEM_UPDATED: 'TODO_ITEM_UPDATED',
  TODO_ITEM_DELETED: 'TODO_ITEM_DELETED'
}

module.exports = {
  pubSub,
  PUBSUB_TYPES
}
