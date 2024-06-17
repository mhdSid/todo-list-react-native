import { render } from '@testing-library/react-native'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import Component from '../../../../../../src/components/TodoList/TodoListContainer'
import selectors from '../../../../../lib/selector/todoList/todoListContainer'
import addTodoButtonSelectors from '../../../../../lib/selector/button/addTodoButton'
import virtualizedTodoListSelectors from '../../../../../lib/selector/todoList/virtualizedTodoList'
import MockThemeProvider from '../../../../../lib/mocks/MockThemeProvider'

jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn(() => ({}))
}))

const mockStore = configureStore([thunk])

const store = mockStore({
  todoList: {
    list: []
  },
  auth: {
    user: {
      isLoggedIn: false
    }
  },
  loading: {
    loaders: {}
  },
  theme: {
    theme: 'light'
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
