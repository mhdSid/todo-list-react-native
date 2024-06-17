const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./api/schema')
const resolvers = require('./api/resolvers')
const { sequelize } = require('./models')

const app = express()
const server = new ApolloServer({ typeDefs, resolvers })

async function startServer () {
  await server.start()
  server.applyMiddleware({ app })

  app.use((req, res) => {
    res.status(200).send('Hello!')
  })

  await sequelize.sync()

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

startServer()
