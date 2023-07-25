import React from 'react'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import Component from '../../../../../src/components/TodoList'
import configureStore from 'redux-mock-store'

describe('TodoList', () => {
  const mockStore = configureStore([])
  test('snapshot with empty store', () => {
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
    const data = render(<Provider store={emptyStore}><Component /></Provider>).toJSON()
    expect(data).toMatchSnapshot()
  })
  test('snapshot with full state', () => {
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
    const data = render(<Provider store={fullStore}><Component /></Provider>).toJSON()
    expect(data).toMatchSnapshot()
  })
})
