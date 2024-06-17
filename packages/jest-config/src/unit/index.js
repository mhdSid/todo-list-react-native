module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(jsx|js)?$': 'babel-jest'
  },
  moduleNameMapper: {
    '~(.*)$': 'src/$1'
  },
  moduleDirectories: [
    '<rootDir>/../../node_modules'
  ],
  roots: [
    '<rootDir>/test/'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@babel|@react-native|@expo|expo|expo-checkbox|@apollo/)'
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
