import React from 'react'
import { Provider } from 'react-redux'
import ThemeProvider, { Context } from '../../../src/components/ThemeProvider'

export default function MockThemeProvider (Component, store) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Context.Consumer>
          {
            ({ theme }) => <Component theme={theme} />
          }
        </Context.Consumer>
      </ThemeProvider>
    </Provider>
  )
}
