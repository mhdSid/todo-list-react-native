import { render } from '@testing-library/react-native'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Component from '../../../../src/components/TodoListItem'
import selectors from '../../../lib/selector/todoListItem'
import MockThemeProvider from '../../../lib/mocks/MockThemeProvider'

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

describe('TodoListItem', () => {
  test('root exists', async () => {
    const element = render(MockThemeProvider(Component, store))
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('checkbox exists', async () => {
    const element = render(MockThemeProvider(Component, store))
    const checkbox = await element.findByTestId(selectors.checkbox)
    expect(checkbox).toBeDefined()
  })
  test('task exists', async () => {
    const element = render(MockThemeProvider(Component, store))
    const task = await element.findByTestId(selectors.task)
    expect(task).toBeDefined()
  })
  test('snapshot', () => {
    const data = render(MockThemeProvider(Component, store)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
