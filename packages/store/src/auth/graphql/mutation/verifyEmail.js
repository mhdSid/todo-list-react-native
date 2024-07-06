import { gql } from '@apollo/client/core'
import { AUTH_VERIFY_EMAIL_MUTATION } from '../../actionTypes'

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmail($email: String!, $verificationCode: String!) {
    verifyEmail(email: $email, verificationCode: $verificationCode) {
      token
      user {
        email
      }
    }
  }
`

export const verifyEmail = ({ email, verificationCode }) => {
  return (dispatch, _, { client }) => {
    return client
      .mutate({
        mutation: VERIFY_EMAIL_MUTATION,
        variables: { email, verificationCode },
        name: 'verifyEmail'
      })
      .then(authData => {
        return dispatch({
          type: AUTH_VERIFY_EMAIL_MUTATION,
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
