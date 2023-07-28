import React from 'react'
import ThemeProvider, { Context } from '../../../src/components/ThemeProvider'

export default function MockThemeProvider (Component) {
  return (
    <ThemeProvider>
      <Context.Consumer>
        {
          ({ theme }) => <Component theme={theme} />
        }
      </Context.Consumer>
    </ThemeProvider>
  )
}
