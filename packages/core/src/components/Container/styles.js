import { StyleSheet, Dimensions } from 'react-native'
import { containerTheme } from './theme'

export const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  ...containerTheme,
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
  todoListContainer: {
    flex: 1
  },
  userImage: {
    height: 24,
    width: 24
  }
})

export default styles
