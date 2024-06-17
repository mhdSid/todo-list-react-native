import { render } from '@testing-library/react-native'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Component from '../../../../../src/components/TodoList/EmptyTodoList'
import selectors from '../../../../lib/selector/todoList/emptyTodoList'
import MockThemeProvider from '../../../../lib/mocks/MockThemeProvider'

const mockStore = configureStore([thunk])

const store = mockStore({
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

describe('EmptyTodoList', () => {
  test('root exists', async () => {
    const element = render(MockThemeProvider(Component, store))
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('title exists', async () => {
    const element = render(MockThemeProvider(Component, store))
    const title = await element.findByTestId(selectors.title)
    expect(title).toBeDefined()
  })
  test('subtitle exists', async () => {
    const element = render(MockThemeProvider(Component, store))
    const subtitle = await element.findByTestId(selectors.subtitle)
    expect(subtitle).toBeDefined()
  })
  test('title text', async () => {
    const element = render(MockThemeProvider(Component, store))
    const { children: text } = await element.findByTestId(selectors.title)
    expect(text).toStrictEqual(['Looks like your TODO list is empty!'])
  })
  test('subtitle text', async () => {
    const element = render(MockThemeProvider(Component, store))
    const { children: text } = await element.findByTestId(selectors.subtitle)
    expect(text).toStrictEqual(['Add a new task to the list :)'])
  })
  test('snapshot', () => {
    const data = render(MockThemeProvider(Component, store)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
