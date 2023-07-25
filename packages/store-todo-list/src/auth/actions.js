import { AUTH_LOGIN, AUTH_LOGOUT } from './actionTypes'
import * as expoLocalAuthentication from 'expo-local-authentication'

export const login = () => {
  return async dispatch => {
    const { success } = await expoLocalAuthentication.authenticateAsync()
    if (success) {
      dispatch({ type: AUTH_LOGIN })
      return true
    } else {
      dispatch({ type: AUTH_LOGOUT })
      return false
    }
  }
}

export const logout = () => {
  return async dispatch => {
    return dispatch({ type: AUTH_LOGOUT })
  }
}
