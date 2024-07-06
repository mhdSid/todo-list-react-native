import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from 'redux-persist'
import todoListReducer from './todo-list/reducer'
import authReducer from './auth/reducer'
import themeReducer from './theme/reducer'
import loadingReducer from './loading/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  theme: persistReducer(
    {
      key: 'root:theme:reducer',
      storage: AsyncStorage
    },
    themeReducer
  ),
  todoList: todoListReducer
})

export default rootReducer
