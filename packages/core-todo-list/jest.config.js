const packageJson = require('./package.json')
const jestUnitTestConfig = require('@todo-list/jest-config/src/unit')

module.exports = {
  displayName: packageJson.name,
  ...jestUnitTestConfig
}
