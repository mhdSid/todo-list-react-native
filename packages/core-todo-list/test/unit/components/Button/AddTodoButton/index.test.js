import React from 'react'
import { render } from '@testing-library/react-native'
import Component from '../../../../../src/components/Button/AddTodoButton'

describe('AddTodoButton', () => {
  test('snapshot', () => {
    const data = render(<Component />).toJSON()
    expect(data).toMatchSnapshot()
  })
})
