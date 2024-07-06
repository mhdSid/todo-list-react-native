import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from './reducer'
import { createGraphQlClient } from './gql.client'
import { subscriptionMiddleware as todoItemCreatedMiddleware } from './todo-list/graphql/subscription/todoItemCreated'
import { subscriptionMiddleware as todoItemUpdatedMiddleware } from './todo-list/graphql/subscription/todoItemUpdated'
import { subscriptionMiddleware as todoItemDeletedMiddleware } from './todo-list/graphql/subscription/todoItemDeleted'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['todoList', 'theme', 'auth']
  // blackList: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const graphQlClient = createGraphQlClient()

export const store = createStore(persistedReducer, applyMiddleware(
  thunk.withExtraArgument({ client: graphQlClient }),
  todoItemCreatedMiddleware,
  todoItemUpdatedMiddleware,
  todoItemDeletedMiddleware
))

export const persistor = persistStore(store)
