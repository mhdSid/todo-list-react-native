import { THEMES } from '@todo-list/store/src/theme/constants'

export const addTodoButtonTheme = {
  [THEMES.DARK]: {
    text: {
      color: 'black'
    },
    container: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 4
    }
  },
  [THEMES.LIGHT]: {
    text: {
      color: 'white'
    },
    container: {
      backgroundColor: 'black'
    }
  }
}
