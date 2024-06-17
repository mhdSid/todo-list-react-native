module.exports = {
  preset: 'react-native',
  projects: [
    '<rootDir>/packages/*/jest.config.js'
  ],
  verbose: false,
  reporters: [
    'default',
    [
      'jest-html-reporters', {
        filename: 'unit_test_result.html',
        pageTitle: 'unit test result report'
      }
    ]
  ],
  collectCoverageFrom: [
    '**/src/**/*.{js}',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ],
  workerIdleMemoryLimit: '500MB'
}
