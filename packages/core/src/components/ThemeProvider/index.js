import React, { createContext, useCallback, useContext, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { THEMES } from '@todo-list/store/src/theme/constants'
import { setTheme } from '@todo-list/store/src/theme/actions'
import themeSelector from '@todo-list/store/src/theme/selector'

export const ThemeContext = createContext()

function ThemeProvider (props) {
  const { theme, handleSetTheme } = props
  const colorScheme = useColorScheme()
  const toggleTheme = useCallback(() => handleSetTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK))

  useEffect(() => {
    handleSetTheme(colorScheme)
  }, [colorScheme])

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

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
