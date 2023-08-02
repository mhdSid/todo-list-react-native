import React, { useRef, useState } from 'react'
import { VirtualizedList, View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addTodoListItem, editTodoListItem, deleteTodoListItem } from '@todo-list/store-todo-list/src/todo-list/actions'
import { login, logout } from '@todo-list/store-todo-list/src/auth/actions'
import todoListSelector from '@todo-list/store-todo-list/src/todo-list/selector'
import isLoggedInSelector from '@todo-list/store-todo-list/src/auth/selector'
import { THEMES } from '@todo-list/store-todo-list/src/theme/constants'
import styles from './index.styles'
import TodoListItem from '../TodoListItem'
import EmptyTodoList from './EmptyTodoList'
import AddTodoButton from '../Button/AddTodoButton'
import { ALERT_TYPES } from '../../constants/alert'
import getRandomId from '../../util/randomId'
import testSelectors from '../../../test/lib/selector/todoList'
import useAlert from '../../hooks/alert/useAlert'

const TodoList = React.memo(props => {
  const {
    todoList,
    isLoggedIn,
    theme,
    handleEditTodoListItem,
    handleDeleteTodoListItem,
    handleAddTodoListItem,
    handleLogin,
    handleLogout
  } = props

  const [alertType, setAlertType] = useState(null)
  const [selectedTodoListItem, setSelectedTodoListItem] = useState(null)
  const virtualizedListRef = useRef()

  /* Reset State */
  // This method is called to ask user to enter their credentials before any action.
  // The invokation of this method can be updated to match the specs and the expected behavior of the app.
  // Currently, there is enforced authentication mode, so login state is reset after CRUDing the todo-list-store/src/todo-list store
  const handleResetState = () => {
    setSelectedTodoListItem(null)
    setAlertType(null)
    handleLogout()
  }

  /* Alert Hook */
  const handleDelete = () => {
    handleDeleteTodoListItem({ index: selectedTodoListItem.index })
    handleResetState()
  }
  const handleAdd = ({ text }) => {
    if (text) {
      handleAddTodoListItem({ task: text, id: getRandomId() })
    }
    handleResetState()
    virtualizedListRef.current.scrollToIndex({ index: 0, animated: true })
  }
  const handleEdit = ({ text }) => {
    if (text) {
      handleEditTodoListItem({ task: text, index: selectedTodoListItem.index })
    }
    handleResetState()
  }
  useAlert({
    defaultMessage: alertType?.error?.message || selectedTodoListItem?.task || '',
    isLoggedIn,
    alertType,
    onCancel: handleResetState,
    onDismiss: handleResetState,
    onDelete: handleDelete,
    onAdd: handleAdd,
    onEdit: handleEdit
  })

  /* Interaction Event Handlers */
  const handleAddTodoButtonPress = async () => {
    try {
      await handleLogin()
      setAlertType({ type: ALERT_TYPES.ADD })
    } catch (error) {
      setAlertType({ type: ALERT_TYPES.ERROR, error })
    }
  }
  const handleListItemPress = async ({ task, index }) => {
    try {
      await handleLogin()
      setSelectedTodoListItem({ task, index })
      setAlertType({ type: ALERT_TYPES.EDIT_DELETE })
    } catch (error) {
      setAlertType({ type: ALERT_TYPES.ERROR, error })
    }
  }
  const handleListItemChecked = async ({ task, id, index, checked }) => {
    if (!checked) return
    try {
      await handleLogin()
      setSelectedTodoListItem({ task, id, index })
      setAlertType({ type: ALERT_TYPES.DELETE })
    } catch (error) {
      setAlertType({ type: ALERT_TYPES.ERROR, error })
    }
  }

  /* Virtualized List Props */
  const renderListItemRow = ({ item: { task, id }, index }) => (
    <TodoListItem
      task={task}
      id={id}
      index={index}
      theme={theme}
      onPress={handleListItemPress}
      onChecked={handleListItemChecked}
    />
  )
  const getItem = (data, index) => data[index]
  const getItemCount = () => todoList.length || 0
  const getItemKey = ({ id, task }) => `${id}-${task}`

  return (
    <View style={styles.todoListContainer} testID={testSelectors.root}>
      <VirtualizedList
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={10}
        contentInsetAdjustmentBehavior='automatic'
        removeClippedSubviews
        ListEmptyComponent={<EmptyTodoList theme={theme} />}
        onEndReachedThreshold={0.2}
        ref={virtualizedListRef}
        horizontal={false}
        showsVerticalScrollIndicator
        data={todoList}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={getItemKey}
        renderItem={renderListItemRow}
        testID={testSelectors.virtualizedList}
      />
      <AddTodoButton onPress={handleAddTodoButtonPress} theme={theme} testID={testSelectors.addTodoButton} />
    </View>
  )
})

TodoList.propTypes = {
  todoList: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  theme: PropTypes.oneOf([THEMES.DARK, THEMES.LIGHT]),
  handleEditTodoListItem: PropTypes.func,
  handleDeleteTodoListItem: PropTypes.func,
  handleAddTodoListItem: PropTypes.func,
  handleLogin: PropTypes.func,
  handleLogout: PropTypes.func
}

const mapStateToProps = state => ({
  todoList: todoListSelector(state),
  isLoggedIn: isLoggedInSelector(state)
})

const mapDispatchToProps = dispatch => ({
  handleEditTodoListItem: payload => dispatch(editTodoListItem(payload)),
  handleDeleteTodoListItem: payload => dispatch(deleteTodoListItem(payload)),
  handleAddTodoListItem: payload => dispatch(addTodoListItem(payload)),
  handleLogin: payload => dispatch(login(payload)),
  handleLogout: payload => dispatch(logout(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
