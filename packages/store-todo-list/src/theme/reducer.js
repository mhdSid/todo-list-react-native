import { THEME_SET_THEME } from './actionTypes'
import { THEMES } from './constants'

const initialState = {
  theme: THEMES.LIGHT
}

export default function (state = initialState, action) {
  switch (action.type) {
    case THEME_SET_THEME: {
      return {
        ...state,
        theme: action.payload
      }
    }
    default:
      return state
  }
}
