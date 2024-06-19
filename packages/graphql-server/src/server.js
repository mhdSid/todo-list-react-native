const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
const { rateLimit } = require('express-rate-limit')

const typeDefs = require('./api/schema')
const resolvers = require('./api/resolvers')
const { sequelize } = require('./models')
const { authenticateToken } = require('./middleware/auth')

const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
  allowBatchedHttpRequests: true,
  csrfPrevention: true,
  typeDefs,
  resolvers,
  formatError: ({ message, extensions }) => ({
    message,
    code: extensions.code,
    httpStatusCode: extensions.exception?.http?.status || 500
  }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

// const limiter = rateLimit({
// 	windowMs: 1 * 60 * 1000, // 15 minutes
// 	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
// 	// store: ... , // Redis, Memcached, etc. See below.
// })

async function startServer () {
  await server.start()

  app.use(
    // limiter,
    authenticateToken,
    cors({
      origin: '*'
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ user: req.user })
    })
  )

  await sequelize.sync()

  await new Promise(resolve => httpServer.listen({ port: 4000, host: '0.0.0.0' }, resolve))
}

startServer()
