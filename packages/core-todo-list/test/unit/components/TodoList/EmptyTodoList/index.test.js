import React from 'react'
import { render } from '@testing-library/react-native'
import Component from '../../../../../src/components/TodoList/EmptyTodoList'
import selectors from '../../../../lib/selector/todoList/emptyTodoList'

describe('EmptyTodoList', () => {
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
  test('subtitle exists', async () => {
    const element = render(<Component />)
    const subtitle = await element.findByTestId(selectors.subtitle)
    expect(subtitle).toBeDefined()
  })
  test('title text', async () => {
    const element = render(<Component />)
    const { children: text } = await element.findByTestId(selectors.title)
    expect(text).toStrictEqual(['Looks like your TODO list is empty!'])
  })
  test('subtitle text', async () => {
    const element = render(<Component />)
    const { children: text } = await element.findByTestId(selectors.subtitle)
    expect(text).toStrictEqual(['Add a new task to the list :)'])
  })
  test('snapshot', () => {
    const data = render(<Component />).toJSON()
    expect(data).toMatchSnapshot()
  })
})
