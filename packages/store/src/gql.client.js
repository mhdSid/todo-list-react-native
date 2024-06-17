import { ApolloClient, InMemoryCache } from '@apollo/client'

export function createGraphQlClient () {
  const cache = new InMemoryCache({
    addTypename: false,
    resultCaching: false
  })

  const client = new ApolloClient({
    uri: 'https://api.graphql.guide/graphql',
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache'
      },
      mutate: {
        fetchPolicy: 'no-cache'
      }
    }
  })

  const query = (query, name) => {
    return client.query({ query, fetchPolicy: 'no-cache' }).then(({ data }) => data[name])
  }

  return { query }
}
