import { StyleSheet } from 'react-native'
import { THEMES } from '@todo-list/store/src/theme/constants'
import { THEME } from '../../assets/styles/theme'

export const underlayColor = 'grey'

const styles = StyleSheet.create({
  [THEMES.DARK]: {
    ...THEME[THEMES.DARK].todoListItem
  },
  [THEMES.LIGHT]: {
    ...THEME[THEMES.LIGHT].todoListItem
  },
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
  }
})

export default styles
