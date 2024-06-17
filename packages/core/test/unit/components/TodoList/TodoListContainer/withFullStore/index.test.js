import { render } from '@testing-library/react-native'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Component from '../../../../../../src/components/TodoList/TodoListContainer'
import selectors from '../../../../../lib/selector/todoList/todoListContainer'
import virtualizedTodoListSelectors from '../../../../../lib/selector/todoList/virtualizedTodoList'
import addTodoButtonSelectors from '../../../../../lib/selector/button/addTodoButton'
import MockThemeProvider from '../../../../../lib/mocks/MockThemeProvider'

jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn(() => ({}))
}))

const mockStore = configureStore([thunk])

const store = mockStore({
  todoList: {
    list: new Array(10).fill({}).map((_, index) => ({ task: 't'.repeat(10), id: `${index}` }))
  },
  auth: {
    user: {
      isLoggedIn: true
    }
  },
  loading: {
    loaders: {}
  },
  theme: {
    theme: 'dark'
  }
})

describe('TodoList', () => {
  test('root exists', async () => {
    const element = render(MockThemeProvider(Component, store))
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('virtualizedList exists', async () => {
    const element = render(MockThemeProvider(Component, store))
    const virtualizedList = await element.findByTestId(virtualizedTodoListSelectors.root)
    expect(virtualizedList).toBeDefined()
  })
  test('addTodoButton exists', async () => {
    const element = render(MockThemeProvider(Component, store))
    const addTodoButton = await element.findByTestId(addTodoButtonSelectors.root)
    expect(addTodoButton).toBeDefined()
  })
  test('snapshot', () => {
    const data = render(MockThemeProvider(Component, store)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
