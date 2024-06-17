import { render } from '@testing-library/react-native'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Component from '../../../../src/components/Container'
import selectors from '../../../lib/selector/container'
import todoListSelectors from '../../../lib/selector/todoList/todoListContainer'
import MockThemeProvider from '../../../lib/mocks/MockThemeProvider'

jest.mock('expo-local-authentication', () => ({}))

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({})
}))

describe('Container', () => {
  const mockStore = configureStore([thunk])
  const emptyStore = mockStore({
    todoList: {
      list: []
    },
    loading: {
      loaders: {}
    },
    auth: {
      user: {
        isLoggedIn: false
      }
    },
    theme: {
      theme: 'light'
    }
  })
  const fullStore = mockStore({
    todoList: {
      list: new Array(10).fill({}).map((_, index) => ({ task: 't'.repeat(10), id: `${index}` }))
    },
    loading: {
      loaders: {}
    },
    auth: {
      user: {
        isLoggedIn: true
      }
    },
    theme: {
      theme: 'dark'
    }
  })
  test('root exists', async () => {
    const element = render(MockThemeProvider(Component, emptyStore))
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('title exists', async () => {
    const element = render(MockThemeProvider(Component, emptyStore))
    const title = await element.findByTestId(selectors.title)
    expect(title).toBeDefined()
  })
  test('todoList exists', async () => {
    const element = render(MockThemeProvider(Component, emptyStore))
    const todoList = await element.findByTestId(todoListSelectors.root)
    expect(todoList).toBeDefined()
  })
  test('title text', async () => {
    const element = render(MockThemeProvider(Component, emptyStore))
    const { children: text } = await element.findByTestId(selectors.title)
    expect(text).toStrictEqual(['To-Do List'])
  })
  test('snapshot with empty store', () => {
    const data = render(MockThemeProvider(Component, emptyStore)).toJSON()
    expect(data).toMatchSnapshot()
  })
  test('snapshot with empty full store', () => {
    const data = render(MockThemeProvider(Component, fullStore)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
