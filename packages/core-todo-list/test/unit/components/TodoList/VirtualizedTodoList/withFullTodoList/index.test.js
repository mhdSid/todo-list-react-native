import { render } from '@testing-library/react-native'
import Component from '../../../../../../src/components/TodoList/VirtualizedTodoList'
import selectors from '../../../../../lib/selector/todoList/virtualizedTodoList'
import MockThemeProvider from '../../../../../lib/mocks/MockThemeProvider'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureStore([thunk])

const store = mockStore({
  theme: {
    theme: 'dark'
  }
})

describe('VirtualizedTodoList', () => {
  test('root exists', async () => {
    const element = render(MockThemeProvider(Component, store, { todoList: new Array(10).fill({}).map((_, index) => ({ task: 't'.repeat(10), id: `${index}` })) }))
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('snapshot', () => {
    const data = render(MockThemeProvider(Component, store, { todoList: new Array(10).fill({}).map((_, index) => ({ task: 't'.repeat(10), id: `${index}` })) })).toJSON()
    expect(data).toMatchSnapshot()
  })
})
