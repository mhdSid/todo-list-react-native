import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { THEMES } from '../../constants/theme'
import { setTheme } from '@todo-list/store-todo-list/src/theme/actions'
import themeSelector from '@todo-list/store-todo-list/src/theme/selector'

export const Context = createContext()

const ThemeProvider = props => {
  const { theme, handleSetTheme } = props
  const toggleTheme = () => handleSetTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)
  return (
    <Context.Provider value={{ toggleTheme, theme: theme || THEMES.LIGHT }}>
      {props.children}
    </Context.Provider>
  )
}

ThemeProvider.propTypes = {
  theme: PropTypes.oneOf([THEMES.DARK, THEMES.LIGHT]),
  handleSetTheme: PropTypes.func,
  children: PropTypes.any
}

const mapStateToProps = state => ({
  theme: themeSelector(state)
})

const mapDispatchToProps = dispatch => ({
  handleSetTheme: payload => dispatch(setTheme(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemeProvider)
