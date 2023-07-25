import { render } from '@testing-library/react-native'
import Container from '../../../../src/components/Container'

jest.mock('../../../../src/components/TodoList', () => {
  const  { View } = require('react-native')
  return () => (<View></View>)
})

test('snapshot', () => {
  const data = render(<Container />).toJSON()
  expect(data).toMatchSnapshot()
})
