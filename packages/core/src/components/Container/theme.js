import { THEMES } from '@todo-list/store/src/theme/constants'

export const containerTheme = {
  [THEMES.DARK]: {
    title: {
      color: 'white'
    },
    container: {
      backgroundColor: 'black'
    }
  },
  [THEMES.LIGHT]: {
    title: {
      color: 'black'
    },
    container: {
      backgroundColor: 'white'
    }
  }
}
