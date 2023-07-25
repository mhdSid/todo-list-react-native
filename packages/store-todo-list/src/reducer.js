import { combineReducers } from 'redux'
import todoList from './todo-list/reducer'
import auth from './auth/reducer'

export default combineReducers({ todoList, auth })
