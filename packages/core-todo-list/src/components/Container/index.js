import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TodoList from '../TodoList'
import styles from './index.styles'
import testSelectors from '../../../test/lib/selector/container'
import { APP_TITLE } from '../../constants/container'
import ThemeProvider, { Context } from '../ThemeProvider'
import CheckBox from 'expo-checkbox'
import { THEMES } from '../../constants/theme'

export default function Container () {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets()
  const [isChecked, setIsChecked] = useState(false)

  const handleThemeChange = toggleTheme => {
    return () => {
      setIsChecked(!isChecked)
      toggleTheme()
    }
  }
  const getThemeText = theme => theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK

  return (
    <ThemeProvider>
      <Context.Consumer>
        {
          ({ toggleTheme, theme }) => (
            <View style={{ paddingTop, paddingBottom, ...styles.container, ...styles[theme].container }} testID={testSelectors.root}>
              <View style={styles.headerRow}>
                <Text style={[styles.title, styles[theme].title]} testID={testSelectors.title}>{APP_TITLE}</Text>
                <View style={styles.checkboxContainer}>
                  <Text style={[styles.themeText, styles[theme].themeText]}>
                    {getThemeText(theme)}
                  </Text>
                  <CheckBox
                    value={isChecked}
                    onValueChange={handleThemeChange(toggleTheme)}
                  />
                </View>
              </View>
              <TodoList testID={testSelectors.todoList} theme={theme} />
            </View>
          )
        }
      </Context.Consumer>
    </ThemeProvider>
  )
}
