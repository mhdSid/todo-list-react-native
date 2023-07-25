import React from 'react'
import { render } from '@testing-library/react-native'
import Component from '../../../../../src/components/Button/AddTodoButton'
import selectors from '../../../../lib/selector/button/addTodoButton'

describe('AddTodoButton', () => {
  test('root exists', async () => {
    const element = render(<Component />)
    const root = await element.findByTestId(selectors.root)
    expect(root).toBeDefined()
  })
  test('title exists', async () => {
    const element = render(<Component />)
    const title = await element.findByTestId(selectors.title)
    expect(title).toBeDefined()
  })
  test('title text', async () => {
    const element = render(<Component />)
    const { children: text } = await element.findByTestId(selectors.title)
    expect(text).toStrictEqual(['+'])
  })
  test('snapshot', () => {
    const data = render(<Component />).toJSON()
    expect(data).toMatchSnapshot()
  })
})
