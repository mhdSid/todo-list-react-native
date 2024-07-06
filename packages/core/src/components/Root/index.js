import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@todo-list/store/src/store'
import styles from './styles'
import Container from '../Container'
import ThemeProvider from '../ThemeProvider'
import { START_SUBSCRIPTION } from '@todo-list/store/src/actions'

export default function App () {
  const colorScheme = useColorScheme()

  useEffect(() => {
    store.dispatch({ type: START_SUBSCRIPTION })
  }, [])
  return (
    <SafeAreaProvider style={[styles.container, styles[colorScheme].container]}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider>
            <Container />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}
