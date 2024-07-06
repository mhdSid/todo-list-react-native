import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import testSelectors from '../../../test/lib/selector/todoList/emptyTodoList'
import { EMPTY_TODO_LIST } from '../../constants/emptyTodoList'
import { useTheme } from '../ThemeProvider'

export default function EmptyTodoList () {
  const { theme } = useTheme()

  return (
    <View style={styles.emptyListContainer} testID={testSelectors.root}>
      <Text style={[styles.emptyListItem, styles[theme].emptyListItem]} testID={testSelectors.title}>{EMPTY_TODO_LIST.title}</Text>
      <Text style={[styles.emptyListItem, styles[theme].emptyListItem]} testID={testSelectors.subtitle}>{EMPTY_TODO_LIST.subtitle}</Text>
    </View>
  )
}
