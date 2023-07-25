module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['workspaces', 'react', 'react-native', 'react-hooks'],
  env: {
    jest: true
  },
  extends: [
    'standard',
    'standard-jsx',
    'standard-react',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended'
  ]
}
