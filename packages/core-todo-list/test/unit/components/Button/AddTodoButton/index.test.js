import { render } from '@testing-library/react-native'
import Component from '../../../../../src/components/Button/AddTodoButton'
import selectors from '../../../../lib/selector/button/addTodoButton'
import WrapThemeProvider from '../../../../lib/wrapThemeProvider'

describe('AddTodoButton', () => {
  test('root exists', async () => {
    const element = render(WrapThemeProvider(Component))
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('title exists', async () => {
    const element = render(WrapThemeProvider(Component))
    const title = await element.findByTestId(selectors.title)
    expect(title).toBeDefined()
  })
  test('title text', async () => {
    const element = render(WrapThemeProvider(Component))
    const { children: text } = await element.findByTestId(selectors.title)
    expect(text).toStrictEqual(['+'])
  })
  test('snapshot', () => {
    const data = render(WrapThemeProvider(Component)).toJSON()
    expect(data).toMatchSnapshot()
  })
})
