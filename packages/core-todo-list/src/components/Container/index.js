import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TodoList from '../TodoList'
import styles from './index.styles'
import testSelectors from '../../../test/lib/selector/container'
import { APP_TITLE } from '../../constants/container'

export default function Container () {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets()

  return (
    <View style={{ paddingTop, paddingBottom, ...styles.container }} testID={testSelectors.root}>
      <Text style={styles.title} testID={testSelectors.title}>{APP_TITLE}</Text>
      <TodoList testID={testSelectors.todoList} />
    </View>
  )
}
