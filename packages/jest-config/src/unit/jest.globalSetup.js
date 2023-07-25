global.__DEV__ = true

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({})
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

const mockDispatch = jest.fn(action => action)

jest.mock('react-redux', () => {
  return {
    connect: (mapStateToProps, mapDispatchToProps) => (reactComponent) => ({
      mapStateToProps,
      mapDispatchToProps: (dispatch = mockDispatch, ownProps) => mapDispatchToProps(dispatch, ownProps),
      reactComponent,
      mockDispatch
    }),
    Provider: ({children}) => children
  }
})
