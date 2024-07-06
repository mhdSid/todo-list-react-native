import { THEMES } from '@todo-list/store/src/theme/constants'

export const emptyTodoListTheme = {
  [THEMES.DARK]: {
    emptyListItem: {
      color: 'white'
    }
  },
  [THEMES.LIGHT]: {
    emptyListItem: {
      color: '#333'
    }
  }
}
