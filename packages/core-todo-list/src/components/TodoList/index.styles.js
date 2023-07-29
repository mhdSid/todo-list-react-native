import { StyleSheet } from 'react-native'
import { THEMES } from '@todo-list/store-todo-list/src/theme/constants'
import { THEME } from '../../assets/styles/theme'

const styles = StyleSheet.create({
  [THEMES.DARK]: {
    ...THEME[THEMES.DARK].emptyTodoList
  },
  [THEMES.LIGHT]: {
    ...THEME[THEMES.LIGHT].emptyTodoList
  },
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
    height: '92%',
    width: '100%'
  }
})

export default styles
