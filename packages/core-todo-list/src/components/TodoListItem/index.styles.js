import { StyleSheet } from 'react-native'

const backgroundColor = 'rgba(1,1,1,0.1)'
export const underlayColor = 'rgba(1,1,1,0.5)'

const styles = StyleSheet.create({
  checkbox: {
    marginRight: 20
  },
  container: {
    backgroundColor,
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
