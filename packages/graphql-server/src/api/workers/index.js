const { startConsumerWorker } = require('./recommendation/consumer-worker')

async function startWorkers () {
  await startConsumerWorker()
}

startWorkers()
