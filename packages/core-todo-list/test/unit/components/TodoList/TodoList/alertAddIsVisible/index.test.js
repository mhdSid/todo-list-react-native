import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import Component from '../../../../../../src/components/TodoList'
import configureStore from 'redux-mock-store'
import addTodoButtonSelectors from '../../../../../lib/selector/button/addTodoButton'
import { Alert } from 'react-native'
import thunk from 'redux-thunk'

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

jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn(() => ({ success: true }))
}))

describe('TodoList', () => {
  test('Add alert is visible with login success', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert')
    render(<Provider store={store}><Component /></Provider>).toJSON()
    const addTodoButton = await screen.findByTestId(addTodoButtonSelectors.root)
    await act(() => {
      fireEvent.press(addTodoButton)
    })
    expect(alertSpy).toHaveBeenCalledWith(
      'To-Do List',
      'Would you like to add a new task?',
      [
        { onPress: expect.any(Function), style: 'cancel', text: 'Add' },
        { onPress: expect.any(Function), style: 'cancel', text: 'Cancel' }
      ],
      { cancelable: true, onDismiss: expect.any(Function) })
  })
})
