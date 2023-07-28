import { render } from '@testing-library/react-native'
import Component from '../../../../src/components/TodoListItem'
import selectors from '../../../lib/selector/todoListItem'
import MockThemeProvider from '../../../lib/mocks/MockThemeProvider'

describe('TodoListItem', () => {
  test('root exists', async () => {
    const element = render(MockThemeProvider(Component))
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('checkbox exists', async () => {
    const element = render(MockThemeProvider(Component))
    const checkbox = await element.findByTestId(selectors.checkbox)
    expect(checkbox).toBeDefined()
  })
  test('task exists', async () => {
    const element = render(MockThemeProvider(Component))
    const task = await element.findByTestId(selectors.task)
    expect(task).toBeDefined()
  })
  test('snapshot', () => {
    const data = render(MockThemeProvider(Component)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
