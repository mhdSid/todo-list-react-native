import { ADD_TODO_LIST_ITEM, DELETE_TODO_LIST_ITEM, UPDATE_TODO_LIST_ITEM } from './actionTypes'

export const addTodoListItem = ({ task }) => {
  return dispatch => {
    return dispatch({
      type: ADD_TODO_LIST_ITEM,
      payload: { id: Math.random().toString(16).slice(2), task }
    })
  }
}

export const deleteTodoListItem = ({ index }) => {
  return dispatch => {
    return dispatch({
      type: DELETE_TODO_LIST_ITEM,
      payload: { index }
    })
  }
}

export const updateTodoListItem = ({ task, index }) => {
  return dispatch => {
    return dispatch({
      type: UPDATE_TODO_LIST_ITEM,
      payload: { task, index }
    })
  }
}
