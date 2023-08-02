import React from 'react'
import { Provider } from 'react-redux'
import ThemeProvider from '../../../src/components/ThemeProvider'

export default function MockThemeProvider (Component, store) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    </Provider>
  )
}
