import { THEMES } from '@todo-list/store/src/theme/constants'

export const THEME = {
  [THEMES.DARK]: {
    root: {
      container: {
        backgroundColor: 'black'
      }
    },
    container: {
      title: {
        color: 'white'
      },
      container: {
        backgroundColor: 'black'
      },
      themeText: {
        color: 'white'
      }
    },
    todoListItem: {
      text: {
        color: '#333'
      },
      container: {
        backgroundColor: 'white'
      }
    },
    addTodoButton: {
      text: {
        color: 'black'
      },
      container: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 4
      }
    },
    emptyTodoList: {
      emptyListItem: {
        color: 'white'
      }
    }
  },
  [THEMES.LIGHT]: {
    root: {
      container: {
        backgroundColor: 'white'
      }
    },
    container: {
      title: {
        color: 'black'
      },
      container: {
        backgroundColor: 'white'
      },
      themeText: {
        color: '#333'
      }
    },
    todoListItem: {
      text: {
        color: '#333'
      },
      container: {
        backgroundColor: 'rgba(1,1,1,0.1)'
      }
    },
    addTodoButton: {
      text: {
        color: 'white'
      },
      container: {
        backgroundColor: 'black'
      }
    },
    emptyTodoList: {
      emptyListItem: {
        color: '#333'
      }
    }
  }
}
