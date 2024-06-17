module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js'],
  testMatch: [
    '<rootDir>/**/*.js'
  ],
  testPathIgnorePatterns: [
    '/dist/',
    '/node_modules/',
    '/coverage/',
    '/jest-html-reporters-attach'
  ],
  runner: 'jest-runner-eslint'
}
