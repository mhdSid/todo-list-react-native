import { StyleSheet, Dimensions } from 'react-native'
import { THEMES } from '@todo-list/store/src/theme/constants'
import { THEME } from '../../assets/styles/theme'

export const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  [THEMES.DARK]: {
    ...THEME[THEMES.DARK].container
  },
  [THEMES.LIGHT]: {
    ...THEME[THEMES.LIGHT].container
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10
  },
  headerRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  themeImage: {
    height: 24,
    width: 24
  },
  themeText: {
    marginRight: 5
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10
  },
  todoListContainer: {
    flex: 1
  }
})

export default styles
