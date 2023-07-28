import { StyleSheet } from 'react-native'
import { THEMES } from '../../constants/theme'
import { THEME } from '../../assets/styles/theme'

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
    height: '100%',
    paddingHorizontal: 10
  },
  headerRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  themeText: {
    marginRight: 5
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10
  }
})

export default styles
