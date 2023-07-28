import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import Component from '../../../../../../src/components/TodoList'
import configureStore from 'redux-mock-store'
import { Alert } from 'react-native'
import thunk from 'redux-thunk'
import todoListItemSelectors from '../../../../../lib/selector/todoListItem'
import WrapThemeProvider from '../../../../../lib/wrapThemeProvider'

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
  test('Delete alert is visible with login success', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert')
    render(<Provider store={store}>{WrapThemeProvider(Component)}</Provider>)
    const checkboxList = await screen.findAllByTestId(todoListItemSelectors.checkbox)
    const checkbox = checkboxList[0]
    await act(() => {
      fireEvent.press(checkbox)
    })
    expect(alertSpy).toHaveBeenCalledWith(
      'Delete task',
      'Task: tttttttttt',
      [
        { onPress: expect.any(Function), style: 'destructive', text: 'Delete' },
        { onPress: expect.any(Function), style: 'cancel', text: 'Cancel' }
      ],
      { cancelable: true, onDismiss: expect.any(Function) })
  })
})
