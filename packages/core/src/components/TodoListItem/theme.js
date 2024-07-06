import { THEMES } from '@todo-list/store/src/theme/constants'

export const todoListItemTheme = {
  [THEMES.DARK]: {
    text: {
      color: '#333'
    },
    container: {
      backgroundColor: 'white'
    }
  },
  [THEMES.LIGHT]: {
    text: {
      color: '#333'
    },
    container: {
      backgroundColor: 'rgba(1,1,1,0.1)'
    }
  }
}
