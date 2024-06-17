module.exports = {
  projects: ['<rootDir>/packages/*/eslint.jest.config.js'],
  verbose: false,
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        filename: 'eslint_result.html',
        pageTitle: 'eslint result report'
      }
    ]
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix']
}
