import { render } from '@testing-library/react-native'
import Component from '../../../../src/components/TodoListItem'
import selectors from '../../../lib/selector/todoListItem'
import WrapThemeProvider from '../../../lib/wrapThemeProvider'

describe('TodoListItem', () => {
  test('root exists', async () => {
    const element = render(WrapThemeProvider(Component))
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('checkbox exists', async () => {
    const element = render(WrapThemeProvider(Component))
    const checkbox = await element.findByTestId(selectors.checkbox)
    expect(checkbox).toBeDefined()
  })
  test('task exists', async () => {
    const element = render(WrapThemeProvider(Component))
    const task = await element.findByTestId(selectors.task)
    expect(task).toBeDefined()
  })
  test('snapshot', () => {
    const data = render(WrapThemeProvider(Component)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
