const tf = require('@tensorflow/tfjs-node')
const use = require('@tensorflow-models/universal-sentence-encoder')

const SIMILARITY_THRESHOLD = 0.5

let model = null

async function loadModel () {
  if (!model) {
    console.log('Loading model...')
    model = await use.load()
    console.log('Model loaded.')
  }
}

async function embed (tasks) {
  try {
    if (!model) {
      await loadModel()
    }
    const embeddings = await model.embed(tasks)
    return embeddings.arraySync()
  } catch (e) {
    console.error('embed error: ', e)
  }
}

function preprocess (text) {
  return text.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').trim()
}

function calculateCosineSimilarity (vecA, vecB) {
  const dotProduct = tf.sum(tf.mul(vecA, vecB))
  const magnitudeA = tf.norm(vecA)
  const magnitudeB = tf.norm(vecB)
  return dotProduct.div(tf.mul(magnitudeA, magnitudeB)).arraySync()
}

async function recommendTasks (tasks) {
  const preprocessedTasks = tasks.map(preprocess)

  const embeddings = await embed(preprocessedTasks)

  const recommendations = embeddings
    .map((embedding, index) => ({
      task: preprocessedTasks[index],
      similarity: calculateCosineSimilarity(tf.tensor1d(embeddings[0]), tf.tensor1d(embedding))
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .filter(({ similarity }) => similarity > SIMILARITY_THRESHOLD)
    .map(({ task }) => ({ task }))

  return recommendations
}

module.exports = {
  recommendTasks,
  loadModel
}
