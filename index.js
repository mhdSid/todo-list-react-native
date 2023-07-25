import { AppRegistry } from 'react-native'
import AppRoot from './packages/core-todo-list/src/components/Root'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => AppRoot)
