export const ALERT_TYPES = {
  EDIT_DELETE: 'edit_delete',
  DELETE: 'delete',
  ADD: 'add',
  ERROR: 'error'
}

export const ALERT_PROMPT_EDIT = {
  title: 'Edit Todo',
  message: task => `Task: ${task}`
}

export const ALERT_PROMPT_ADD = {
  title: 'To-Do List',
  message: 'Add a new task'
}

export const ALERT = {
  [ALERT_TYPES.EDIT_DELETE]: ({ message, onEdit, onDelete, onCancel }) => ({
    title: 'Edit / Delete task',
    message: `Task: ${message}`,
    buttons: [{
      text: 'Edit',
      onPress: onEdit,
      style: 'cancel'
    },
    {
      text: 'Delete',
      onPress: onDelete,
      style: 'destructive'
    }, {
      text: 'Cancel',
      style: 'cancel',
      onPress: onCancel
    }]
  }),
  [ALERT_TYPES.DELETE]: ({ message, onDelete, onCancel }) => ({
    title: 'Delete task',
    message: `Task: ${message}`,
    buttons: [{
      text: 'Delete',
      onPress: onDelete,
      style: 'destructive'
    }, {
      text: 'Cancel',
      style: 'cancel',
      onPress: onCancel
    }]
  }),
  [ALERT_TYPES.ADD]: ({ onAdd, onCancel }) => ({
    title: 'To-Do List',
    message: 'Would you like to add a new task?',
    buttons: [{
      text: 'Add',
      onPress: onAdd,
      style: 'cancel'
    }, {
      text: 'Cancel',
      style: 'cancel',
      onPress: onCancel
    }]
  }),
  [ALERT_TYPES.ERROR]: ({ onCancel, message }) => ({
    title: 'Something went wrong!',
    message,
    buttons: [{
      text: 'Cancel',
      style: 'cancel',
      onPress: onCancel
    }]
  })
}
