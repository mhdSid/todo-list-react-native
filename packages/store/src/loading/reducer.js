import { ADD_LOADER, FULFILL_LOADER, RESET_LOADER_STATE } from './actionTypes'

const initialState = {
  loaders: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_LOADER: {
      const loaderId = action.payload
      return {
        ...state,
        loaders: {
          [loaderId]: true
        }
      }
    }
    case FULFILL_LOADER: {
      const loaderId = action.payload
      return {
        ...state,
        loaders: {
          [loaderId]: false
        }
      }
    }
    case RESET_LOADER_STATE: {
      return {
        ...state,
        loaders: {}
      }
    }
    default:
      return state
  }
}
