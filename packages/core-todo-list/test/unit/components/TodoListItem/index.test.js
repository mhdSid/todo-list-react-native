import { render } from '@testing-library/react-native'
import Component from '../../../../src/components/TodoListItem'

test('snapshot', () => {
  const data = render(<Component />).toJSON()
  expect(data).toMatchSnapshot()
})
