import React, { useEffect, useState } from 'react'
import { VirtualizedList, Alert, View } from 'react-native'
import { connect } from 'react-redux'
import TodoListItem from '../TodoListItem'
import todoListSelector from '../../../../store-todo-list/src/todo-list/selector'
import { addTodoListItem, deleteTodoListItem, updateTodoListItem } from '../../../../store-todo-list/src/todo-list/actions'
import isLoggedInSelector from '../../../../store-todo-list/src/auth/selector'
import { login, logout } from '../../../../store-todo-list/src/auth/actions'
import PropTypes from 'prop-types'
import EmptyTodoList from './EmptyTodoList'
import AddTodoButton from '../Button/AddTodoButton'
import styles from './index.styles'

function TodoList (props) {
  const {
    todoList,
    isLoggedIn,
    handleUpdateTodoListItem,
    handleDeleteTodoListItem,
    handleAddTodoListItem,
    handleLogin,
    handleLogout
  } = props

  const [showAlert, setShowAlert] = useState(false)
  const [selectedTodoListItem, setSelectedTodoListItem] = useState(null)

  const getItem = (data, index) => data[index]
  const getItemCount = () => todoList.length || 0
  const getItemKey = ({ id, task }) => `${id}-${task}`
  const handleAlertDismiss = () => {
    setSelectedTodoListItem(null)
    setShowAlert(false)
    handleLogout()
  }
  const handleAlertUpdatePress = () => {
    const { task, index } = selectedTodoListItem
    Alert.prompt('Update TODO List', `Task: ${task}`, text => {
      if (text) {
        handleUpdateTodoListItem({ task: text, index })
      }
      handleAlertDismiss()
    })
  }
  const handleAlertDeletePress = () => {
    const { index } = selectedTodoListItem
    handleDeleteTodoListItem({ index })
    handleAlertDismiss()
  }
  const handleAlertAddPress = () => {
    Alert.prompt('TODO List', 'Add new item', text => {
      if (text) {
        handleAddTodoListItem({ task: text })
      }
      handleAlertDismiss()
    })
  }
  const handleShowAlert = () => {
    const { task = null } = selectedTodoListItem || {}
    const isEditOrDelete = !!task
    Alert.alert(
      'TODO List',
      isEditOrDelete ? `Task: ${task}` : 'Add new TODO',
      [
        ...isEditOrDelete
          ? [
              {
                text: 'Update',
                onPress: handleAlertUpdatePress,
                style: 'cancel'
              },
              {
                text: 'Delete',
                onPress: handleAlertDeletePress,
                style: 'destructive'
              }
            ]
          : [{
              text: 'Add',
              onPress: handleAlertAddPress,
              style: 'cancel'
            }],
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ].filter(Boolean),
      {
        cancelable: true,
        onDismiss: handleAlertDismiss
      }
    )
  }
  const handleAddTodoButtonPress = async () => {
    await handleLogin({
      onSuccess: () => {
        setShowAlert(true)
      }
    })
  }
  const onListItemPress = async ({ task, index }) => {
    await handleLogin({
      onSuccess: () => {
        setSelectedTodoListItem({ task, index })
        setShowAlert(true)
      }
    })
  }
  const renderListItemRow = ({ item: { task, id }, index }) => (
    <TodoListItem task={task} id={id} index={index} onPress={onListItemPress} />
  )
  useEffect(() => {
    if (isLoggedIn && showAlert) {
      handleShowAlert()
    }
  }, [isLoggedIn, showAlert])

  return (
    <View style={styles.todoListContainer}>
      <VirtualizedList
        initialNumToRender={10}
        windowSize={100}
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
      />
      <AddTodoButton onPress={handleAddTodoButtonPress} />
    </View>
  )
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  isLoggedIn: PropTypes.bool,
  handleUpdateTodoListItem: PropTypes.func,
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
    handleUpdateTodoListItem: payload => dispatch(updateTodoListItem(payload)),
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
