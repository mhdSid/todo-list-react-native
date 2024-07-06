import { StyleSheet } from 'react-native'
import { addTodoButtonTheme } from './theme'

export const underlayColor = 'grey'

const styles = StyleSheet.create({
  ...addTodoButtonTheme,
  container: {
    alignItems: 'center',
    borderRadius: 75,
    bottom: 30,
    height: 75,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    textAlign: 'center',
    width: 75,
    zIndex: 100
  },
  text: {
    fontSize: 50,
    marginBottom: 5
  }
})

export default styles
