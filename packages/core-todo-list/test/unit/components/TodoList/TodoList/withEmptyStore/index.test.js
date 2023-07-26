import React from 'react'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import Component from '../../../../../../src/components/TodoList'
import configureStore from 'redux-mock-store'
import selectors from '../../../../../lib/selector/todoList'
import addTodoButtonSelectors from '../../../../../lib/selector/button/addTodoButton'
import thunk from 'redux-thunk'

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
  }
})

describe('TodoList', () => {
  test('root exists', async () => {
    const element = render(<Provider store={store}><Component /></Provider>)
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('virtualizedList exists', async () => {
    const element = render(<Provider store={store}><Component /></Provider>)
    const virtualizedList = await element.findByTestId(selectors.virtualizedList)
    expect(virtualizedList).toBeDefined()
  })
  test('addTodoButton exists', async () => {
    const element = render(<Provider store={store}><Component /></Provider>)
    const addTodoButton = await element.findByTestId(addTodoButtonSelectors.root)
    expect(addTodoButton).toBeDefined()
  })
  test('snapshot', () => {
    const data = render(<Provider store={store}><Component /></Provider>).toJSON()
    expect(data).toMatchSnapshot()
  })
})
