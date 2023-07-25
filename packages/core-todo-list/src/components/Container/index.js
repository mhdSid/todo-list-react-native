import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TodoList from '../TodoList'
import styles from './index.styles'
import testSelectors from '../../../test/lib/selector/container'

export default function Container () {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets()

  return (
    <View style={{ paddingTop, paddingBottom, ...styles.container }} testID={testSelectors.root}>
      <Text style={styles.title} testID={testSelectors.title}>Welcome to TODO List</Text>
      <TodoList testID={testSelectors.todoList}/>
    </View>
  )
}
