import React from 'react'
import { View, Text } from 'react-native'
import styles from './index.styles'

const EmptyList = () => (
  <View style={styles.emptyListContainer}>
    <Text style={styles.emptyListItem}>Looks like your TODO list is empty!</Text>
    <Text>Add a new task to the list :)</Text>
  </View>
)

export default EmptyList
