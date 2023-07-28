import React from 'react'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Component from '../../../../../../src/components/TodoList'
import selectors from '../../../../../lib/selector/todoList'
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
  }
})

describe('TodoList', () => {
  test('root exists', async () => {
    const element = render(<Provider store={store}>{MockThemeProvider(Component)}</Provider>)
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('virtualizedList exists', async () => {
    const element = render(<Provider store={store}>{MockThemeProvider(Component)}</Provider>)
    const virtualizedList = await element.findByTestId(selectors.virtualizedList)
    expect(virtualizedList).toBeDefined()
  })
  test('addTodoButton exists', async () => {
    const element = render(<Provider store={store}>{MockThemeProvider(Component)}</Provider>)
    const addTodoButton = await element.findByTestId(addTodoButtonSelectors.root)
    expect(addTodoButton).toBeDefined()
  })
  test('snapshot', () => {
    const data = render(<Provider store={store}>{MockThemeProvider(Component)}</Provider>).toJSON()
    expect(data).toMatchSnapshot()
  })
})
