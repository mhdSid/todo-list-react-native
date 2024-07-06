import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TodoListContainer from '../TodoList/TodoListContainer'
import styles, { windowHeight } from './styles'
import testSelectors from '../../../test/lib/selector/container'
import Header from '../Header'
import useLoadingEffect from '../../hooks/loading/useLoadingEffect'
import Loader from '../Loader'
import { useTheme } from '../ThemeProvider'

export default function Container () {
  const { top: paddingTop } = useSafeAreaInsets()
  const { theme } = useTheme()
  const containerHeight = useMemo(() => windowHeight - paddingTop, [])
  const isLoading = useLoadingEffect()

  return (
    <View
      style={[{ marginTop: paddingTop, height: containerHeight }, styles.container, styles[theme].container]}
      testID={testSelectors.root}
    >
      <Header />

      <Loader visible={isLoading} />
      <View style={styles.todoListContainer}>
        <TodoListContainer testID={testSelectors.todoList} />
      </View>
    </View>
  )
}
