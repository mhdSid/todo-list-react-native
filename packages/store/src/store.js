import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from './reducer'
import { createGraphQlClient } from './gql.client'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['todoList', 'theme'],
  blackList: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(
  thunk.withExtraArgument({ client: createGraphQlClient() })
))

export const persistor = persistStore(store)
