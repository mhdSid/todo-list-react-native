import React from 'react'
import { Text, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { THEMES } from '@todo-list/store-todo-list/src/theme/constants'
import styles, { underlayColor } from './AddTodoButton.styles'
import testSelectors from '../../../test/lib/selector/button/addTodoButton'

const AddTodoButton = props => {
  const { onPress, theme } = props
  return (
    <TouchableHighlight
      style={[styles.container, styles[theme].container]}
      onPress={onPress}
      underlayColor={underlayColor}
      testID={testSelectors.root}
    >
      <Text style={[styles.text, styles[theme].text]} testID={testSelectors.title}>+</Text>
    </TouchableHighlight>
  )
}

AddTodoButton.propTypes = {
  theme: PropTypes.oneOf([THEMES.DARK, THEMES.LIGHT]),
  onPress: PropTypes.func
}

export default AddTodoButton
