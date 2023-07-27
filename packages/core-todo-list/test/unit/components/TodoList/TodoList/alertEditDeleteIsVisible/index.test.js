import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import Component from '../../../../../../src/components/TodoList'
import configureStore from 'redux-mock-store'
import { Alert } from 'react-native'
import thunk from 'redux-thunk'
import todoListItemSelectors from '../../../../../lib/selector/todoListItem'

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
  test('Edit-Delete alert is visible with login success', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert')
    render(<Provider store={store}><Component /></Provider>)
    const todoListItems = await screen.findAllByTestId(todoListItemSelectors.root)
    const todoListItem = todoListItems[0]
    await act(() => {
      fireEvent.press(todoListItem)
    })
    expect(alertSpy).toHaveBeenCalledWith(
      'Edit / Delete task',
      'Task: tttttttttt',
      [
        { onPress: expect.any(Function), style: 'cancel', text: 'Edit' },
        { onPress: expect.any(Function), style: 'destructive', text: 'Delete' },
        { onPress: expect.any(Function), style: 'cancel', text: 'Cancel' }
      ],
      { cancelable: true, onDismiss: expect.any(Function) })
  })
})
