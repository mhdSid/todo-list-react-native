import React, { useContext } from 'react'
import { Text, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import styles, { underlayColor } from './AddTodoButton.styles'
import testSelectors from '../../../test/lib/selector/button/addTodoButton'
import { ThemeContext } from '../ThemeProvider'

const AddTodoButton = React.memo(props => {
  const { onPress } = props
  const { theme } = useContext(ThemeContext)

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
})

AddTodoButton.propTypes = {
  onPress: PropTypes.func
}

export default AddTodoButton
