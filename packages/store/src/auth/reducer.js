import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_VERIFY_EMAIL_MUTATION } from './actionTypes'

const initialState = {
  token: null,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    dateOfBirth: null
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN: {
      return {
        ...state,
        user: { isLoggedIn: true }
      }
    }
    case AUTH_VERIFY_EMAIL_MUTATION: {
      console.log('AUTH_VERIFY_EMAIL_MUTATION: ', action)
      const { token, user: { email } } = action.payload
      return {
        ...state,
        isLoggedIn: true,
        token,
        user: {
          email
        }
      }
    }
    case AUTH_LOGOUT: {
      return {
        ...state,
        user: { isLoggedIn: false }
      }
    }
    default:
      return state
  }
}
