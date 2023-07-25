import React from 'react'
import { Text, TouchableHighlight } from 'react-native'
import styles, { underlayColor } from './AddTodoButton.styles'
import PropTypes from 'prop-types'
import testSelectors from '../../../test/lib/selector/button/addTodoButton'

const AddTodoButton = props => {
  const { onPress } = props
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      underlayColor={underlayColor}
      testID={testSelectors.root}
    >
      <Text style={styles.text} testID={testSelectors.title}>+</Text>
    </TouchableHighlight>
  )
}

AddTodoButton.propTypes = {
  onPress: PropTypes.func
}

export default AddTodoButton
