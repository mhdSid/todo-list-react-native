import * as expoLocalAuthentication from 'expo-local-authentication'
import { AUTH_LOGIN, AUTH_LOGOUT } from './actionTypes'
import { store } from '../store'

export const login = () => {
  return async dispatch => {
    const { success, error } = await expoLocalAuthentication.authenticateAsync()
    if (success) {
      dispatch({ type: AUTH_LOGIN })
    } else {
      dispatch({ type: AUTH_LOGOUT })
      throw new Error(error)
    }
  }
}

export const getToken = () => {
  const { auth: { token } } = store.getState()
  return token
}

export const logout = () => {
  return async dispatch => {
    return dispatch({ type: AUTH_LOGOUT })
  }
}
