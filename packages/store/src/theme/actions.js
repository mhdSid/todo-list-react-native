import { THEME_SET_THEME } from './actionTypes'

export const setTheme = payload => {
  return async dispatch => {
    return dispatch({ type: THEME_SET_THEME, payload })
  }
}
