import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@todo-list/store-todo-list/src/store'
import styles from './index.styles'
import Container from '../Container'

export default function App () {
  return (
    <SafeAreaProvider style={styles.container}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Container />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}
