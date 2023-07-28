import { render } from '@testing-library/react-native'
import Component from '../../../../../src/components/Button/AddTodoButton'
import selectors from '../../../../lib/selector/button/addTodoButton'
import MockThemeProvider from '../../../../lib/mocks/MockThemeProvider'

describe('AddTodoButton', () => {
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
  test('title text', async () => {
    const element = render(MockThemeProvider(Component))
    const { children: text } = await element.findByTestId(selectors.title)
    expect(text).toStrictEqual(['+'])
  })
  test('snapshot', () => {
    const data = render(MockThemeProvider(Component)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
