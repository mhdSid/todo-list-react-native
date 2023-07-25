import { ADD_TODO_LIST_ITEM, DELETE_TODO_LIST_ITEM, EDIT_TODO_LIST_ITEM } from './actionTypes'

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
    case ADD_TODO_LIST_ITEM: {
      const { id, task } = action.payload
      const { list } = state
      return {
        ...state,
        list: [{ id, task }, ...list]
      }
    }
    case DELETE_TODO_LIST_ITEM: {
      const { index } = action.payload
      const { list } = state
      list.splice(index, 1)
      return {
        ...state,
        list: [...list]
      }
    }
    case EDIT_TODO_LIST_ITEM: {
      const { task, index } = action.payload
      const { list } = state
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
