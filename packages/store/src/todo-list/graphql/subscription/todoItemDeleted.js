import { gql } from '@apollo/client/core'
import { TODO_ITEM_DELETED } from '../../actionTypes'
import { graphQlClient } from '../../../store'
import { START_SUBSCRIPTION } from '../../../actions'

const TODO_ITEM_DELETED_QUERY = gql`
  subscription OnTodoItemDeleted {
    todoItemDeleted {
      id
      task
      status
      dueDate
      createdAt
    }
  }
`

export const subscriptionMiddleware = store => next => action => {
  const result = next(action)

  if (action.type === START_SUBSCRIPTION) {
    graphQlClient.client.subscribe({
      query: TODO_ITEM_DELETED_QUERY
    }).subscribe({
      next ({ data }) {
        store.dispatch({
          type: TODO_ITEM_DELETED,
          payload: data.todoItemDeleted
        })
      },
      error (err) {
        console.error('Subscription error:', err)
      }
    })
  }

  return result
}
