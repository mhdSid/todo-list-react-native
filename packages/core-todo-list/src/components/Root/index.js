import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import styles from './index.styles'
import Container from '../Container'
import { Provider } from 'react-redux'
import store from '../../../../store-todo-list/src/store'

export default function App () {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container}>
        <Container />
      </SafeAreaProvider>
    </Provider>
  )
}
