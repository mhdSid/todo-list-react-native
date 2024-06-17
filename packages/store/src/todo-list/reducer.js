import { ADD_TODO_LIST_ITEM, DELETE_TODO_LIST_ITEM, EDIT_TODO_LIST_ITEM, LOAD_TODO_LIST } from './actionTypes'

const initialState = {
  /*
    list: [{
      id: String,
      task: String
    }]
  */
  list: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TODO_LIST: {
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          list: [...action.payload]
        }
      }
      break
    }
    case ADD_TODO_LIST_ITEM: {
      const { id, task } = action.payload
      const { list } = state
      return {
        ...state,
        list: [{ id, task }, ...list]
      }
    }
    case DELETE_TODO_LIST_ITEM: {
      const { id } = action.payload
      const { list } = state
      const index = list.findIndex(({ id: itemId }) => itemId === id)
      list.splice(index, 1)
      return {
        ...state,
        list: [...list]
      }
    }
    case EDIT_TODO_LIST_ITEM: {
      const { task, id } = action.payload
      const { list } = state
      const index = list.findIndex(({ id: itemId }) => itemId === id)
      list[index] = { ...list[index], task }
      return {
        ...state,
        list: [...list]
      }
    }
    default:
      return state
  }
}
