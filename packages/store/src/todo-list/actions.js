import { ADD_TODO_LIST_ITEM, DELETE_TODO_LIST_ITEM, EDIT_TODO_LIST_ITEM } from './actionTypes'

export const addTodoListItem = ({ task, id }) => {
  return dispatch => {
    return dispatch({
      type: ADD_TODO_LIST_ITEM,
      payload: { id, task }
    })
  }
}

export const deleteTodoListItem = ({ id }) => {
  return dispatch => {
    return dispatch({
      type: DELETE_TODO_LIST_ITEM,
      payload: { id }
    })
  }
}

export const editTodoListItem = ({ task, id }) => {
  return dispatch => {
    return dispatch({
      type: EDIT_TODO_LIST_ITEM,
      payload: { task, id }
    })
  }
}
