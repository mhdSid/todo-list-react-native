import { StyleSheet } from 'react-native'

const backgroundColor = 'rgba(1,1,1,1)'
const addButtonTextColor = '#fff'
export const underlayColor = 'grey'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor,
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
    color: addButtonTextColor,
    fontSize: 50,
    marginBottom: 5
  }
})

export default styles
