import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import styles, { underlayColor } from './AddTodoButton.styles'
import PropTypes from 'prop-types'

const AddTodoButton = props => {
  const { onPress } = props
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      underlayColor={underlayColor}
    >
      <View>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableHighlight>
  )
}

AddTodoButton.propTypes = {
  onPress: PropTypes.func
}

export default AddTodoButton
