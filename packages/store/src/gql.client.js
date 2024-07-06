import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getToken } from './auth/actions'
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'

export function createGraphQlClient () {
  const httpLink = new HttpLink({
    uri: 'http://192.168.100.183:4000/graphql'
  })

  const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://192.168.100.183:4000/graphql',
    connectionParams () {
      const token = getToken()
      return {
        authorizationToken: token || ''
      }
    }
  }))

  const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const httpAuthLink = authLink.concat(httpLink)

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpAuthLink
  )

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache({
      addTypename: false,
      resultCaching: false
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache'
      },
      mutate: {
        fetchPolicy: 'no-cache'
      }
    }
  })

  const query = ({ query, name }) => {
    return client.query({ query, fetchPolicy: 'no-cache' }).then(({ data }) => data[name])
  }

  const mutate = ({ mutation, variables, name }) => {
    return client.mutate({ mutation, variables, fetchPolicy: 'no-cache' }).then(({ data, errors }) => data[name])
  }

  return { query, client, mutate }
}
