import { gql } from '@apollo/client/core'
import { LOAD_TODO_LIST } from '../actionTypes'

const TODO_LIST_QUERY = gql`
  query todoList {
    chapters {
      id
      task: title
    }
  }
`

export const loadTodoList = () => {
  return (dispatch, _, { client }) => {
    return client
      .query(TODO_LIST_QUERY, 'chapters')
      .then(todoList => {
        return dispatch({
          type: LOAD_TODO_LIST,
          payload: todoList.map(({ id, task }) => ({ id: `${id}`, task }))
        })
      })
      // .catch((e) => dispatch(setOrganizationErrorAction(e.message)))
      // .finaly(() => dispatch(setOrganizationRequestInProgress(false)))
  }
}
