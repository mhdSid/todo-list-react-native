import { StyleSheet } from 'react-native'
import { emptyTodoListTheme } from './emptyTodoList.theme'

const styles = StyleSheet.create({
  ...emptyTodoListTheme,
  emptyListContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 50
  },
  emptyListItem: {
    marginBottom: 4
  },
  todoListContainer: {
    height: '100%',
    width: '100%'
  },
  virtualizedListContentContainer: {
    paddingBottom: 20
  }
})

export default styles
