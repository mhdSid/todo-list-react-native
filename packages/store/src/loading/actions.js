import { ADD_LOADER, FULFILL_LOADER, RESET_LOADER_STATE } from './actionTypes'

export const addLoader = payload => {
  return async dispatch => {
    return dispatch({ type: ADD_LOADER, payload })
  }
}

export const fulfillLoader = payload => {
  return async dispatch => {
    return dispatch({ type: FULFILL_LOADER, payload })
  }
}

export const resetLoaderState = payload => {
  return async dispatch => {
    return dispatch({ type: RESET_LOADER_STATE, payload })
  }
}

export const hasLoader = payload => {
  return async (_, getState) => {
    const { loading: { loaders } } = getState()
    return payload ? loaders[payload] === true : Object.values(loaders).some(loader => loader === true)
  }
}
