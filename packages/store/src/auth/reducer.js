import { AUTH_LOGIN, AUTH_LOGOUT } from './actionTypes'

const initialState = {
  user: { isLoggedIn: false }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN: {
      return {
        ...state,
        user: { isLoggedIn: true }
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
