import React, { useState, createContext } from 'react'
import { THEMES } from '../../constants/theme'
import PropTypes from 'prop-types'

export const Context = createContext()

export default function ThemeProvider (props) {
  const [theme, updateTheme] = useState(THEMES.LIGHT)
  const toggleTheme = () => updateTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)
  return (
    <Context.Provider value={{ toggleTheme, theme }} theme={theme}>
      {props.children}
    </Context.Provider>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.any
}
