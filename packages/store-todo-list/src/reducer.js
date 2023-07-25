import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import todoListReducer from './todo-list/reducer'
import authReducer from './auth/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  todoList: persistReducer(
    {
      key: 'root:todoList:reducer',
      storage: AsyncStorage
    },
    todoListReducer
  )
})

export default rootReducer
