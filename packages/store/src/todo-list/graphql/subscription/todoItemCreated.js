import { gql } from '@apollo/client/core'
import { TODO_ITEM_CREATED } from '../../actionTypes'
import { graphQlClient } from '../../../store'
import { START_SUBSCRIPTION } from '../../../actions'

const TODO_ITEM_CREATED_QUERY = gql`
  subscription OnTodoItemCreated {
    todoItemCreated {
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
      query: TODO_ITEM_CREATED_QUERY
    }).subscribe({
      next ({ data }) {
        store.dispatch({
          type: TODO_ITEM_CREATED,
          payload: data.todoItemCreated
        })
      },
      error (err) {
        console.error('Subscription error:', err)
      }
    })
  }

  return result
}
