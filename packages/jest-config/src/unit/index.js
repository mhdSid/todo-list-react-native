module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(jsx|js)?$': 'babel-jest'
  },
  moduleNameMapper: {
    '~(.*)$': 'src/$1'
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleDirectories: [
    '<rootDir>/../../node_modules'
  ],
  roots: [
    '<rootDir>/test/'
  ],
  transformIgnorePatterns: [
    // 'node_modules/(?!react-native|@babel|@react-native/)',
    'node_modules/(?!react-native|@babel|@react-native|@expo|expo|expo-checkbox/)'
  ],
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true
  },
  setupFiles: [
    '@todo-list/jest-config/src/unit/jest.globalSetup.js'
  ],
  testEnvironmentOptions: {
    url: 'http://localhost/',
    customExportConditions: ['node', 'node-addons']
  },
  moduleFileExtensions: [
    'js',
    'json',
    'mdx',
    'jsx',
    'node'
  ]
}
