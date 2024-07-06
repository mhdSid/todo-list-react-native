import { StyleSheet } from 'react-native'
import { rootContainerTheme } from './theme'

const styles = StyleSheet.create({
  ...rootContainerTheme,
  container: {
    display: 'flex',
    flex: 1
  }
})

export default styles
