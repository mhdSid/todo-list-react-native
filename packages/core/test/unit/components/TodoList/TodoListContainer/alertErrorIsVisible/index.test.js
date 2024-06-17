import { render, screen, fireEvent, act } from '@testing-library/react-native'
import configureStore from 'redux-mock-store'
import { Alert } from 'react-native'
import thunk from 'redux-thunk'
import Component from '../../../../../../src/components/TodoList/TodoListContainer'
import todoListItemSelectors from '../../../../../lib/selector/todoListItem'
import MockThemeProvider from '../../../../../lib/mocks/MockThemeProvider'

const mockStore = configureStore([thunk])

const store = mockStore({
  todoList: {
    list: new Array(10).fill({}).map((_, index) => ({ task: 't'.repeat(10), id: `${index}` }))
  },
  auth: {
    user: {
      isLoggedIn: true
    }
  },
  loading: {
    loaders: {}
  },
  theme: {
    theme: 'dark'
  }
})

jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn(() => ({ error: '__error__' }))
}))

describe('TodoList', () => {
  test('Error alert is visible with login success', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert')
    render(MockThemeProvider(Component, store))
    const todoListItems = await screen.findAllByTestId(todoListItemSelectors.root)
    const todoListItem = todoListItems[0]
    await act(() => {
      fireEvent.press(todoListItem)
    })
    expect(alertSpy).toHaveBeenCalledWith(
      'Something went wrong!',
      '__error__',
      [
        { onPress: expect.any(Function), style: 'cancel', text: 'Cancel' }
      ],
      { cancelable: true, onDismiss: expect.any(Function) })
  })
})
