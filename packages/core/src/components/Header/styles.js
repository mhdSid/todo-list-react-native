import { StyleSheet, Dimensions } from 'react-native'
import { headerTheme } from './theme'

export const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  ...headerTheme,
  headerRow: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightIcons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  themeImage: {
    height: 24,
    width: 24
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10
  },
  userImage: {
    height: 24,
    width: 24
  }
})

export default styles
