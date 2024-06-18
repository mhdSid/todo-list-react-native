const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')

const typeDefs = require('./api/schema')
const resolvers = require('./api/resolvers')
const { sequelize } = require('./models')
const { authenticateToken } = require('./middleware/auth')

const app = express()
const httpServer = http.createServer(app)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user }),
  formatError: ({ message, extensions }) => ({
    message,
    code: extensions.code,
    httpStatusCode: extensions.exception?.http?.status || 500
  }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

async function startServer () {
  await server.start()

  app.use(
    authenticateToken,
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ user: req.user })
    })
  )

  await sequelize.sync()

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
}

startServer()
