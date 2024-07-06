const { RECOMMENDATION_QUEUE_NAME } = require('./consumer-worker')
const amqp = require('amqplib')

let connection = null
let channel = null

process.once('SIGINT', async () => {
  if (channel) {
    await channel.close()
  }
  if (connection) {
    await connection.close()
  }
})

async function triggerSenderWorker (message) {
  if (!connection) {
    connection = await amqp.connect('amqp://localhost')
  }
  if (!channel) {
    channel = await connection.createChannel()
  }

  channel.assertQueue(RECOMMENDATION_QUEUE_NAME, { durable: true })
  channel.sendToQueue(RECOMMENDATION_QUEUE_NAME, Buffer.from(message), { persistent: true })
}

module.exports = { triggerSenderWorker }
