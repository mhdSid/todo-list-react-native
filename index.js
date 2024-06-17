import { AppRegistry } from 'react-native'
import AppRoot from '@todo-list/core/src/components/Root'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => AppRoot)
