import { StyleSheet } from 'react-native'
import { THEMES } from '@todo-list/store/src/theme/constants'
import { THEME } from '../../assets/styles/theme'

const styles = StyleSheet.create({
  [THEMES.DARK]: {
    ...THEME[THEMES.DARK].root
  },
  [THEMES.LIGHT]: {
    ...THEME[THEMES.LIGHT].root
  },
  container: {
    display: 'flex',
    flex: 1
  }
})

export default styles
