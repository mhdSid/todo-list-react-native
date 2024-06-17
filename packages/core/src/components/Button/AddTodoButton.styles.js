import { StyleSheet } from 'react-native'
import { THEMES } from '@todo-list/store/src/theme/constants'
import { THEME } from '../../assets/styles/theme'

export const underlayColor = 'grey'

const styles = StyleSheet.create({
  [THEMES.DARK]: {
    ...THEME[THEMES.DARK].addTodoButton
  },
  [THEMES.LIGHT]: {
    ...THEME[THEMES.LIGHT].addTodoButton
  },
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
