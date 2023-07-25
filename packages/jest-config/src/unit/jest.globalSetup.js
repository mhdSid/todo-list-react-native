global.__DEV__ = true

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({})
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('expo-local-authentication', () => ({}))
