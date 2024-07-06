import React, { forwardRef, useCallback } from 'react'
import { VirtualizedList } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'
import TodoListItem from '../TodoListItem'
import EmptyTodoList from './EmptyTodoList'
import testSelectors from '../../../test/lib/selector/todoList/virtualizedTodoList'

const VirtualizedTodoList = React.memo(forwardRef((props, ref) => {
  const { todoList, handleListItemPress, handleListItemChecked, refreshing, handleOnRefresh } = props

  const renderListItemRow = useCallback(({ item: { task, id } }) => (
    <TodoListItem
      task={task}
      id={id}
      onPress={handleListItemPress}
      onChecked={handleListItemChecked}
    />
  ), [])
  const getItem = (data, index) => data[index]
  const getItemCount = () => todoList.length || 0
  const getItemKey = ({ id, task }) => `${id}-${task}`

  return (
    <VirtualizedList
      refreshing={refreshing}
      onRefresh={handleOnRefresh}
      initialNumToRender={10}
      windowSize={5}
      maxToRenderPerBatch={10}
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
      ref={ref}
      ListEmptyComponent={<EmptyTodoList />}
      onEndReachedThreshold={0.2}
      horizontal={false}
      data={todoList}
      getItem={getItem}
      getItemCount={getItemCount}
      keyExtractor={getItemKey}
      renderItem={renderListItemRow}
      testID={testSelectors.root}
      contentContainerStyle={styles.virtualizedListContentContainer}
    />
  )
}))

VirtualizedTodoList.propTypes = {
  todoList: PropTypes.array,
  refreshing: PropTypes.bool,
  handleListItemPress: PropTypes.func,
  handleOnRefresh: PropTypes.func,
  handleListItemChecked: PropTypes.func
}

export default VirtualizedTodoList
