const packageJson = require('./package.json')
const jestEslintConfig = require('@todo-list/eslint-config/src/jest')

module.exports = {
  displayName: packageJson.name,
  ...jestEslintConfig
}
