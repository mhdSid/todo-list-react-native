import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addTodoListItem, editTodoListItem, deleteTodoListItem } from '@todo-list/store/src/todo-list/actions'
import { loadTodoList } from '@todo-list/store/src/todo-list/graphql/query/loadTodoList'
import { login, logout } from '@todo-list/store/src/auth/actions'
import todoListSelector from '@todo-list/store/src/todo-list/selector'
import isLoggedInSelector from '@todo-list/store/src/auth/selector'
import styles from './styles'
import AddTodoButton from '../Button/AddTodoButton'
import { ALERT_TYPES } from '../../constants/alert'
import getRandomId from '../../util/randomId'
import testSelectors from '../../../test/lib/selector/todoList/todoListContainer'
import useAlert from '../../hooks/alert/useAlert'
import VirtualizedTodoList from './VirtualizedTodoList'
import useAsyncAction from '../../hooks/action/useAsyncAction'
import useLoadingEffect from '../../hooks/loading/useLoadingEffect'

const TODO_LIST_CONTAINER_LOADING_ID = 'TODO_LIST_CONTAINER'

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

  const [selectedTodoListItem, setSelectedTodoListItem] = useState(null)
  const virtualizedTodoListRef = useRef(null)
  const isLoading = useLoadingEffect(TODO_LIST_CONTAINER_LOADING_ID)
  const { dispatchAsyncAction } = useAsyncAction()
  const handleOnRefresh = useCallback(() => {
    return dispatchAsyncAction(loadTodoList(), TODO_LIST_CONTAINER_LOADING_ID)
  }, [dispatchAsyncAction])

  useEffect(() => {
    handleOnRefresh()
  }, [])

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
  const { setAlertType } = useAlert({
    getDefaultMessage: () => selectedTodoListItem?.task || '',
    isLoggedIn,
    onCancel: handleResetState,
    onDismiss: handleResetState,
    onDelete () {
      handleDeleteTodoListItem({ id: selectedTodoListItem.id })
      handleResetState()
    },
    onAdd ({ text }) {
      if (text) {
        handleAddTodoListItem({ task: text, id: getRandomId() })
      }
      handleResetState()
      virtualizedTodoListRef.current.scrollToIndex({ index: 0, animated: true })
    },
    onEdit ({ text }) {
      if (text) {
        handleEditTodoListItem({ task: text, id: selectedTodoListItem.id })
      }
      handleResetState()
    }
  })

  /* Interaction Event Handlers */
  const handleAddTodoButtonPress = useCallback(async () => {
    try {
      await handleLogin()
      setAlertType({ type: ALERT_TYPES.ADD })
    } catch (error) {
      setAlertType({ type: ALERT_TYPES.ERROR, error })
    }
  }, [])

  const handleListItemPress = useCallback(async ({ task, id }) => {
    try {
      await handleLogin()
      setSelectedTodoListItem({ task, id })
      setAlertType({ type: ALERT_TYPES.EDIT_DELETE })
    } catch (error) {
      setAlertType({ type: ALERT_TYPES.ERROR, error })
    }
  }, [])

  const handleListItemChecked = useCallback(async ({ task, id, checked }) => {
    if (!checked) return
    try {
      await handleLogin()
      setSelectedTodoListItem({ task, id })
      setAlertType({ type: ALERT_TYPES.DELETE })
    } catch (error) {
      setAlertType({ type: ALERT_TYPES.ERROR, error })
    }
  }, [])

  return (
    <View style={styles.todoListContainer} testID={testSelectors.root}>
      <VirtualizedTodoList
        ref={virtualizedTodoListRef}
        refreshing={isLoading}
        handleOnRefresh={handleOnRefresh}
        todoList={todoList}
        handleListItemChecked={handleListItemChecked}
        handleListItemPress={handleListItemPress}
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
