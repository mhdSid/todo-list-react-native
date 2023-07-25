import { render } from '@testing-library/react-native'
import Component from '../../../../src/components/Container'

jest.mock('../../../../src/components/TodoList', () => {
  const  { View } = require('react-native')
  return () => (<View></View>)
})

test('snapshot', () => {
  const data = render(<Component />).toJSON()
  expect(data).toMatchSnapshot()
})
