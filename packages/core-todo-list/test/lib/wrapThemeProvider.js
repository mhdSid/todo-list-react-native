import React from 'react'
import ThemeProvider, { Context } from '../../src/components/ThemeProvider'

export default function WrapThemeProvider (Component) {
  return (
    <ThemeProvider>
      <Context.Consumer>
        {
          ({ toggleTheme, theme }) => (
            <Component theme={theme} />
          )
        }
      </Context.Consumer>
    </ThemeProvider>
  )
}
