import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { THEMES } from '@todo-list/store-todo-list/src/theme/constants'
import styles from './index.styles'
import testSelectors from '../../../test/lib/selector/todoList/emptyTodoList'
import { EMPTY_TODO_LIST } from '../../constants/emptyTodoList'

export default function EmptyList (props) {
  const { theme } = props
  return (
    <View style={styles.emptyListContainer} testID={testSelectors.root}>
      <Text style={[styles.emptyListItem, styles[theme].emptyListItem]} testID={testSelectors.title}>{EMPTY_TODO_LIST.title}</Text>
      <Text style={[styles.emptyListItem, styles[theme].emptyListItem]} testID={testSelectors.subtitle}>{EMPTY_TODO_LIST.subtitle}</Text>
    </View>
  )
}

EmptyList.propTypes = {
  theme: PropTypes.oneOf([THEMES.DARK, THEMES.LIGHT])
}
