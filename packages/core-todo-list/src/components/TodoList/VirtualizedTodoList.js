import React, { forwardRef, useCallback } from 'react'
import { VirtualizedList } from 'react-native'
import PropTypes from 'prop-types'
import styles from './index.styles'
import TodoListItem from '../TodoListItem'
import EmptyTodoList from './EmptyTodoList'
import testSelectors from '../../../test/lib/selector/todoList/virtualizedTodoList'

const VirtualizedTodoList = forwardRef((props, ref) => {
  const { todoList, handleListItemPress, handleListItemChecked } = props
  const renderListItemRow = useCallback(({ item: { task, id }, index }) => (
    <TodoListItem
      task={task}
      id={id}
      index={index}
      onPress={handleListItemPress}
      onChecked={handleListItemChecked}
    />
  ), [])
  const getItem = (data, index) => data[index]
  const getItemCount = () => todoList.length || 0
  const getItemKey = ({ id, task }) => `${id}-${task}`

  return (
    <VirtualizedList
      initialNumToRender={10}
      windowSize={5}
      maxToRenderPerBatch={10}
      contentInsetAdjustmentBehavior='automatic'
      removeClippedSubviews
      ref={ref}
      ListEmptyComponent={<EmptyTodoList />}
      onEndReachedThreshold={0.2}
      horizontal={false}
      showsVerticalScrollIndicator
      data={todoList}
      getItem={getItem}
      getItemCount={getItemCount}
      keyExtractor={getItemKey}
      renderItem={renderListItemRow}
      testID={testSelectors.root}
      contentContainerStyle={styles.virtualizedListContentContainer}
    />
  )
})

VirtualizedTodoList.propTypes = {
  todoList: PropTypes.array,
  handleListItemPress: PropTypes.func,
  handleListItemChecked: PropTypes.func
}

export default VirtualizedTodoList
