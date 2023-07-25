import React from 'react'
import { View, Text } from 'react-native'
import styles from './index.styles'
import testSelectors from '../../../test/lib/selector/todoList/emptyTodoList'

const EmptyList = () => (
  <View style={styles.emptyListContainer} testID={testSelectors.root}>
    <Text style={styles.emptyListItem} testID={testSelectors.title}>Looks like your TODO list is empty!</Text>
    <Text testID={testSelectors.subtitle}>Add a new task to the list :)</Text>
  </View>
)

export default EmptyList
