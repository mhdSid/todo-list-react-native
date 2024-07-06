import { gql } from '@apollo/client/core'
import { TODO_ITEM_UPDATED } from '../../actionTypes'
import { graphQlClient } from '../../../store'
import { START_SUBSCRIPTION } from '../../../actions'

const TODO_ITEM_UPDATED_QUERY = gql`
  subscription OnTodoItemUpdated {
    todoItemUpdated {
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
      query: TODO_ITEM_UPDATED_QUERY
    }).subscribe({
      next ({ data }) {
        store.dispatch({
          type: TODO_ITEM_UPDATED,
          payload: data.todoItemUpdated
        })
      },
      error (err) {
        console.error('Subscription error:', err)
      }
    })
  }

  return result
}
