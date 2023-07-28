import { render } from '@testing-library/react-native'
import Component from '../../../../../src/components/TodoList/EmptyTodoList'
import selectors from '../../../../lib/selector/todoList/emptyTodoList'
import MockThemeProvider from '../../../../lib/mocks/MockThemeProvider'

describe('EmptyTodoList', () => {
  test('root exists', async () => {
    const element = render(MockThemeProvider(Component))
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('title exists', async () => {
    const element = render(MockThemeProvider(Component))
    const title = await element.findByTestId(selectors.title)
    expect(title).toBeDefined()
  })
  test('subtitle exists', async () => {
    const element = render(MockThemeProvider(Component))
    const subtitle = await element.findByTestId(selectors.subtitle)
    expect(subtitle).toBeDefined()
  })
  test('title text', async () => {
    const element = render(MockThemeProvider(Component))
    const { children: text } = await element.findByTestId(selectors.title)
    expect(text).toStrictEqual(['Looks like your TODO list is empty!'])
  })
  test('subtitle text', async () => {
    const element = render(MockThemeProvider(Component))
    const { children: text } = await element.findByTestId(selectors.subtitle)
    expect(text).toStrictEqual(['Add a new task to the list :)'])
  })
  test('snapshot', () => {
    const data = render(MockThemeProvider(Component)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
