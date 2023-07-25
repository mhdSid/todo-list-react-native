import React from 'react'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import Component from '../../../../../src/components/TodoList'
import configureStore from 'redux-mock-store'
import selectors from '../../../../lib/selector/todoList'
import addTodoButtonSelectors from '../../../../lib/selector/button/addTodoButton'

describe('TodoList', () => {
  const mockStore = configureStore([])
  const emptyStore = mockStore({
    todoList: {
      list: []
    },
    auth: {
      user: {
        isLoggedIn: false
      }
    }
  })
  const fullStore = mockStore({
    todoList: {
      list: new Array(10).fill({}).map((_, index) => ({ task: 't'.repeat(10), id: `${index}` }))
    },
    auth: {
      user: {
        isLoggedIn: true
      }
    }
  })
  test('root exists', async () => {
    const element = render(<Provider store={emptyStore}><Component /></Provider>)
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('virtualizedList exists', async () => {
    const element = render(<Provider store={emptyStore}><Component /></Provider>)
    const virtualizedList = await element.findByTestId(selectors.virtualizedList)
    expect(virtualizedList).toBeDefined()
  })
  test('addTodoButton exists', async () => {
    const element = render(<Provider store={emptyStore}><Component /></Provider>)
    const addTodoButton = await element.findByTestId(addTodoButtonSelectors.root)
    expect(addTodoButton).toBeDefined()
  })
  test('snapshot with empty store', () => {
    const data = render(<Provider store={emptyStore}><Component /></Provider>).toJSON()
    expect(data).toMatchSnapshot()
  })
  test('snapshot with full state', () => {
    const data = render(<Provider store={fullStore}><Component /></Provider>).toJSON()
    expect(data).toMatchSnapshot()
  })
})
