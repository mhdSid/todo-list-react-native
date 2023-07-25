import React from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TodoList from '../TodoList'
import styles from './index.styles'

export default function Container () {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets()

  return (
    <View style={{ paddingTop, paddingBottom, ...styles.container }}>
      <Text style={styles.title}>Welcome to TODO List</Text>
      <TodoList />
    </View>
  )
}
