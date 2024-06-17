import { createSelector } from 'reselect'

const getTodoList = state => state.todoList.list

const todoListSelector = createSelector(
  [getTodoList],
  todoList => todoList
)

export default todoListSelector
