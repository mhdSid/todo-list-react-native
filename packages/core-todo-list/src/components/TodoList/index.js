import React, { useEffect, useState } from 'react'
import { VirtualizedList, Alert, View } from 'react-native'
import { connect } from 'react-redux'
import TodoListItem from '../TodoListItem'
import todoListSelector from '@todo-list/store-todo-list/src/todo-list/selector'
import { addTodoListItem, deleteTodoListItem, editTodoListItem } from '@todo-list/store-todo-list/src/todo-list/actions'
import isLoggedInSelector from '@todo-list/store-todo-list/src/auth/selector'
import { login, logout } from '@todo-list/store-todo-list/src/auth/actions'
import PropTypes from 'prop-types'
import EmptyTodoList from './EmptyTodoList'
import AddTodoButton from '../Button/AddTodoButton'
import styles from './index.styles'
import { ALERT, ALERT_PROMPT_ADD, ALERT_PROMPT_EDIT, ALERT_TYPES } from '../../constants/alert'
import getRandomId from '../../util/randomId'
import testSelectors from '../../../test/lib/selector/todoList'

const TodoList = React.memo(props => {
  const {
    todoList,
    isLoggedIn,
    handleEditTodoListItem,
    handleDeleteTodoListItem,
    handleAddTodoListItem,
    handleLogin,
    handleLogout
  } = props

  const [alertType, setAlertType] = useState(null)
  const [selectedTodoListItem, setSelectedTodoListItem] = useState(null)

  const handleResetState = () => {
    setSelectedTodoListItem(null)
    setAlertType(null)
    handleLogout()
  }

  const handleAlertEditPress = () => {
    const { task, index } = selectedTodoListItem
    Alert.prompt(ALERT_PROMPT_EDIT.title, ALERT_PROMPT_EDIT.message(task), text => {
      if (text) {
        handleEditTodoListItem({ task: text, index })
      }
      handleResetState()
    })
  }

  const handleAlertDeletePress = () => {
    const { index } = selectedTodoListItem
    handleDeleteTodoListItem({ index })
    handleResetState()
  }

  const handleAlertAddPress = () => {
    Alert.prompt(ALERT_PROMPT_ADD.title, ALERT_PROMPT_ADD.message, text => {
      if (text) {
        handleAddTodoListItem({ task: text, id: getRandomId() })
      }
      handleResetState()
    })
  }

  const handleShowAlert = () => {
    const { task = null } = selectedTodoListItem || {}
    const { type, error: { message: errorMessage } = {} } = alertType
    const { title, message, buttons } = ALERT[type]({
      message: errorMessage || task,
      onCancel: handleResetState,
      onEdit: handleAlertEditPress,
      onDelete: handleAlertDeletePress,
      onAdd: handleAlertAddPress
    })
    Alert.alert(
      title,
      message,
      buttons,
      {
        cancelable: true,
        onDismiss: handleResetState
      }
    )
  }

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
      setAlertType({type: ALERT_TYPES.ERROR, error })
    }
  }

  const renderListItemRow = ({ item: { task, id }, index }) => (
    <TodoListItem
      task={task}
      id={id}
      index={index}
      onPress={handleListItemPress}
      onChecked={handleListItemChecked}
    />
  )

  const getItem = (data, index) => data[index]
  const getItemCount = () => todoList.length || 0
  const getItemKey = ({ id, task }) => `${id}-${task}`

  useEffect(() => {
    if ((isLoggedIn && alertType) || alertType?.type === ALERT_TYPES.ERROR) {
      handleShowAlert()
    }
  }, [isLoggedIn, alertType])

  return (
    <View style={styles.todoListContainer} testID={testSelectors.root}>
      <VirtualizedList
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={10}
        contentInsetAdjustmentBehavior='automatic'
        removeClippedSubviews
        ListEmptyComponent={<EmptyTodoList />}
        onEndReachedThreshold={0.4}
        horizontal={false}
        showsVerticalScrollIndicator
        data={todoList}
        getItem={getItem}
        getItemCount={getItemCount}
        keyExtractor={getItemKey}
        renderItem={renderListItemRow}
        testID={testSelectors.virtualizedList}
      />
      <AddTodoButton onPress={handleAddTodoButtonPress} testID={testSelectors.addTodoButton} />
    </View>
  )
})

TodoList.propTypes = {
  todoList: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  handleEditTodoListItem: PropTypes.func,
  handleDeleteTodoListItem: PropTypes.func,
  handleAddTodoListItem: PropTypes.func,
  handleLogin: PropTypes.func,
  handleLogout: PropTypes.func
}

const mapStateToProps = state => {
  return {
    todoList: todoListSelector(state),
    isLoggedIn: isLoggedInSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleEditTodoListItem: payload => dispatch(editTodoListItem(payload)),
    handleDeleteTodoListItem: payload => dispatch(deleteTodoListItem(payload)),
    handleAddTodoListItem: payload => dispatch(addTodoListItem(payload)),
    handleLogin: payload => dispatch(login(payload)),
    handleLogout: payload => dispatch(logout(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
