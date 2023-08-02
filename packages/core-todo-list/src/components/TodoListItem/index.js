import React, { useContext, useState } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import CheckBox from 'expo-checkbox'
import styles, { underlayColor } from './index.styles'
import testSelectors from '../../../test/lib/selector/todoListItem'
import { ThemeContext } from '../ThemeProvider'

const TodoListItem = React.memo(props => {
  const { task, id, index, onPress, onChecked } = props
  const { theme } = useContext(ThemeContext)
  const handlePress = () => onPress({ task, id, index })
  const [isChecked, setIsChecked] = useState(false)
  const handleValueChange = value => {
    setIsChecked(value)
    onChecked({
      task,
      id,
      index,
      checked: value
    })
  }
  return (
    <TouchableHighlight
      style={[styles.container, styles[theme].container]}
      onPress={handlePress}
      underlayColor={underlayColor}
      testID={testSelectors.root}
    >
      <View style={styles.innerContainer}>
        <CheckBox
          value={isChecked}
          onValueChange={handleValueChange}
          style={styles.checkbox}
          testID={testSelectors.checkbox}
        />
        <Text style={styles[theme].text} testID={testSelectors.task}>{task}</Text>
      </View>
    </TouchableHighlight>
  )
})

TodoListItem.propTypes = {
  task: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  onPress: PropTypes.func,
  onChecked: PropTypes.func
}

export default TodoListItem
