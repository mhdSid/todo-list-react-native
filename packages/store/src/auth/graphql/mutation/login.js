import { gql } from '@apollo/client/core'
import { AUTH_LOGIN_MUTATION } from '../../actionTypes'

const LOGIN_MUTATION = gql`
  mutation Login($email: String!) {
    login(email: $email) {
      id
      firstName
      lastName
      email
      gender
      dateOfBirth
    }
  }
`

export const login = ({ email }) => {
  return (dispatch, _, { client }) => {
    return client
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: { email },
        name: 'login'
      })
      .then(authData => {
        return dispatch({
          type: AUTH_LOGIN_MUTATION,
          payload: authData
        })
      })
      .catch(err => {
        if (err.graphQLErrors) {
          throw err.graphQLErrors[0]
        } else if (err.networkError) {
          throw err.networkError
        }
        throw err
      })
  }
}
