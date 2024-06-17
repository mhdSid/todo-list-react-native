import { render } from '@testing-library/react-native'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Component from '../../../../../src/components/Button/AddTodoButton'
import selectors from '../../../../lib/selector/button/addTodoButton'
import MockThemeProvider from '../../../../lib/mocks/MockThemeProvider'

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
  theme: {
    theme: 'light'
  }
})

describe('AddTodoButton', () => {
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
  test('title text', async () => {
    const element = render(MockThemeProvider(Component, store))
    const { children: text } = await element.findByTestId(selectors.title)
    expect(text).toStrictEqual(['+'])
  })
  test('snapshot', () => {
    const data = render(MockThemeProvider(Component, store)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
