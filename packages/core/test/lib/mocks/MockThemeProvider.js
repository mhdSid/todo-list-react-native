import React from 'react'
import { Provider } from 'react-redux'
import ThemeProvider from '../../../src/components/ThemeProvider'

export default function MockThemeProvider (Component, store, props = {}) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...props} />
      </ThemeProvider>
    </Provider>
  )
}
