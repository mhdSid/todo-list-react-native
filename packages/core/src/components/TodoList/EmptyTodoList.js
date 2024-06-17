import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import styles from './index.styles'
import testSelectors from '../../../test/lib/selector/todoList/emptyTodoList'
import { EMPTY_TODO_LIST } from '../../constants/emptyTodoList'
import { ThemeContext } from '../ThemeProvider'

export default function EmptyTodoList () {
  const { theme } = useContext(ThemeContext)

  return (
    <View style={styles.emptyListContainer} testID={testSelectors.root}>
      <Text style={[styles.emptyListItem, styles[theme].emptyListItem]} testID={testSelectors.title}>{EMPTY_TODO_LIST.title}</Text>
      <Text style={[styles.emptyListItem, styles[theme].emptyListItem]} testID={testSelectors.subtitle}>{EMPTY_TODO_LIST.subtitle}</Text>
    </View>
  )
}
