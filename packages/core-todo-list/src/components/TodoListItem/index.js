import React, { useState } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import styles, { underlayColor } from './index.styles'
import PropTypes from 'prop-types'
import CheckBox from 'expo-checkbox'

const TodoListItem = React.memo(props => {
  const { task, id, index, onPress } = props
  const handlePress = () => onPress({ task, id, index })
  const [isChecked, setIsChecked] = useState(false)
  const handleValueChange = value => {
    setIsChecked(value)
  }
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={handlePress}
      underlayColor={underlayColor}
    >
      <View style={styles.innerContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={handleValueChange}
          style={styles.checkbox}
        />
        <Text>{task}</Text>
      </View>
    </TouchableHighlight>
  )
})

TodoListItem.propTypes = {
  task: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func
}

export default TodoListItem
