const packageJson = require('./package.json')
const jestEslintConfig = require('@todo-list/jest-config/src/eslint/jest')

module.exports = {
  displayName: packageJson.name,
  ...jestEslintConfig
}
