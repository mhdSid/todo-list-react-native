import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import styles from './index.styles'
import Container from '../Container'
import { Provider } from 'react-redux'
import { store, persistor } from '@todo-list/store-todo-list/src/store'
import { PersistGate } from 'redux-persist/integration/react'

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
