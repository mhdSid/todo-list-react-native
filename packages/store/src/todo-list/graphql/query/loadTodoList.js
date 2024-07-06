import { gql } from '@apollo/client/core'
import { LOAD_TODO_LIST } from '../../actionTypes'

const LOAD_TODO_ITEMS = gql`
  query TodoItems {
    myTodoItems {
      id
      task
      status
      dueDate
      createdAt
    }
  }
`

export const loadTodoList = () => {
  return (dispatch, _, { client }) => {
    return client
      .query({ query: LOAD_TODO_ITEMS, name: 'myTodoItems' })
      .then(todoItems => {
        return dispatch({
          type: LOAD_TODO_LIST,
          payload: todoItems
        })
      })
      .catch((e, data, data1) => {
        console.log('errr: ', e, data, data1)
      })
  }
}
