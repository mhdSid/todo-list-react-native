import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { THEMES } from '@todo-list/store-todo-list/src/theme/constants'
import TodoList from '../TodoList'
import styles, { windowHeight } from './index.styles'
import testSelectors from '../../../test/lib/selector/container'
import { APP_TITLE } from '../../constants/container'
import ThemeProvider, { Context } from '../ThemeProvider'
import dark from '../../assets/images/dark.png'
import light from '../../assets/images/light.png'

export default function Container () {
  const { top: paddingTop } = useSafeAreaInsets()
  const containerHeight = windowHeight - paddingTop
  const handleThemeChange = toggleTheme => () => toggleTheme()
  return (
    <ThemeProvider>
      <Context.Consumer>
        {
          ({ toggleTheme, theme }) => (
            <View
              style={[{ marginTop: paddingTop, height: containerHeight }, styles.container, styles[theme].container]}
              testID={testSelectors.root}
            >
              <View style={styles.headerRow}>
                <Text style={[styles.title, styles[theme].title]} testID={testSelectors.title}>{APP_TITLE}</Text>
                <TouchableOpacity onPress={handleThemeChange(toggleTheme)}>
                  <Image
                    source={theme === THEMES.DARK ? light : dark}
                    style={styles.themeImage}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.todoListContainer}>
                <TodoList testID={testSelectors.todoList} theme={theme} />
              </View>
            </View>
          )
        }
      </Context.Consumer>
    </ThemeProvider>
  )
}
