import React, { useContext, useMemo } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { THEMES } from '@todo-list/store/src/theme/constants'
import TodoListContainer from '../TodoList/TodoListContainer'
import styles, { windowHeight } from './index.styles'
import testSelectors from '../../../test/lib/selector/container'
import { APP_TITLE } from '../../constants/container'
import { ThemeContext } from '../ThemeProvider'
import dark from '../../assets/images/dark.png'
import light from '../../assets/images/light.png'

export default function Container () {
  const { top: paddingTop } = useSafeAreaInsets()
  const { theme, toggleTheme } = useContext(ThemeContext)
  const containerHeight = useMemo(() => windowHeight - paddingTop, [])

  return (
    <View
      style={[{ marginTop: paddingTop, height: containerHeight }, styles.container, styles[theme].container]}
      testID={testSelectors.root}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.title, styles[theme].title]} testID={testSelectors.title}>{APP_TITLE}</Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Image
            source={theme === THEMES.DARK ? light : dark}
            style={styles.themeImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.todoListContainer}>
        <TodoListContainer testID={testSelectors.todoList} />
      </View>
    </View>
  )
}
