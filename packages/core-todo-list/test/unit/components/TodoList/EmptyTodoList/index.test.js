import { render } from '@testing-library/react-native'
import Component from '../../../../../src/components/TodoList/EmptyTodoList'

describe('EmptyTodoList', () => {
  test('snapshot', () => {
    const data = render(<Component />).toJSON()
    expect(data).toMatchSnapshot()
  })
})
