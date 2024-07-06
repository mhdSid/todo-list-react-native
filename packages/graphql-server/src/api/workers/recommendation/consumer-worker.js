const { todo_items: TodoItem, recommendations: Recommendation, users: User } = require('../../../models')
const { recommendTasks } = require('../../ml')
const amqp = require('amqplib')
const { Op } = require('sequelize')

const RECOMMENDATION_QUEUE_NAME = 'recommendation_queue'
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

async function startConsumerWorker () {
  if (!connection) {
    connection = await amqp.connect('amqp://localhost')
  }
  if (!channel) {
    channel = await connection.createChannel()
  }

  channel.assertQueue(RECOMMENDATION_QUEUE_NAME, { durable: true })
  channel.prefetch(1)

  channel.consume(RECOMMENDATION_QUEUE_NAME, async msg => {
    const { taskId, task, userId } = JSON.parse(msg.content.toString())
    try {
      const userTasks = await TodoItem.findAll({
        where: {
          userId,
          id: {
            [Op.ne]: taskId
          }
        },
        include: {
          model: User,
          as: 'users'
        }
      })

      if (!userTasks || !userTasks.length) {
        channel.ack(msg)
        return
      }

      const tasks = [task, ...userTasks.map(task => task.task)]
      let recommendations = await recommendTasks(tasks)

      if (!recommendations || !recommendations.length) {
        channel.ack(msg)
        return
      }

      recommendations = recommendations.slice(1)

      const todoItems = await TodoItem.findAll({
        where: {
          task: recommendations.map(r => r.task)
        }
      })

      await Recommendation.create({
        taskId,
        recommendedTaskIds: todoItems.map(({ id }) => id)
      })

      channel.ack(msg)
    } catch (error) {
      console.error('Error processing message:', error)
      channel.nack(msg)
    }
  }, {
    noAck: false
  })
}

module.exports = {
  startConsumerWorker,
  RECOMMENDATION_QUEUE_NAME
}
