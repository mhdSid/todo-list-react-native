import React, { useCallback, useState } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import CheckBox from 'expo-checkbox'
import styles, { underlayColor } from './styles'
import testSelectors from '../../../test/lib/selector/todoListItem'
import { useTheme } from '../ThemeProvider'

const TodoListItem = React.memo(props => {
  const { task, id, onPress, onChecked } = props
  const { theme } = useTheme()
  const [isChecked, setIsChecked] = useState(false)

  const handleValueChange = useCallback(value => {
    setIsChecked(value)
    onChecked({ task, id, checked: value })
  }, [])
  const handlePress = useCallback(() => onPress({ task, id }))

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
        <Text
          style={[styles.text, styles[theme].text]}
          numberOfLines={2}
          ellipsizeMode='tail'
          testID={testSelectors.task}
        >{task}
        </Text>
      </View>
    </TouchableHighlight>
  )
})

TodoListItem.propTypes = {
  task: PropTypes.string,
  id: PropTypes.string,
  onPress: PropTypes.func,
  onChecked: PropTypes.func
}

export default TodoListItem
