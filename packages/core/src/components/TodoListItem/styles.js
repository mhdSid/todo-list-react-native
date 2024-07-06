import { StyleSheet } from 'react-native'
import { todoListItemTheme } from './theme'

export const underlayColor = 'grey'

const styles = StyleSheet.create({
  ...todoListItemTheme,
  checkbox: {
    marginRight: 20
  },
  container: {
    borderRadius: 8,
    marginBottom: 5,
    padding: 20
  },
  innerContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    flex: 1
  }
})

export default styles
