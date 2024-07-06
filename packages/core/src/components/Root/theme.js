import { THEMES } from '@todo-list/store/src/theme/constants'

export const rootContainerTheme = {
  [THEMES.DARK]: {
    container: {
      backgroundColor: 'black'
    }
  },
  [THEMES.LIGHT]: {
    container: {
      backgroundColor: 'white'
    }
  }
}
