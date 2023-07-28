import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TodoList from '../TodoList'
import styles from './index.styles'
import testSelectors from '../../../test/lib/selector/container'
import { APP_TITLE } from '../../constants/container'
import ThemeProvider, { Context } from '../ThemeProvider'
import { THEMES } from '../../constants/theme'
import dark from '../../assets/images/dark.png'
import light from '../../assets/images/light.png'

export default function Container () {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets()

  const handleThemeChange = toggleTheme => {
    return () => {
      toggleTheme()
    }
  }
  return (
    <ThemeProvider>
      <Context.Consumer>
        {
          ({ toggleTheme, theme }) => (
            <View style={{ paddingTop, paddingBottom, ...styles.container, ...styles[theme].container }} testID={testSelectors.root}>
              <View style={styles.headerRow}>
                <Text style={[styles.title, styles[theme].title]} testID={testSelectors.title}>{APP_TITLE}</Text>
                <TouchableOpacity onPress={handleThemeChange(toggleTheme)}>
                  <Image
                    source={theme === THEMES.DARK ? light : dark}
                    style={styles.themeImage}/>
                </TouchableOpacity>
              </View>
              <TodoList testID={testSelectors.todoList} theme={theme} />
            </View>
          )
        }
      </Context.Consumer>
    </ThemeProvider>
  )
}
