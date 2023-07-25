export const ALERT_TYPES = {
  EDIT_DELETE: 'edit_delete',
  DELETE: 'delete',
  ADD: 'add',
  ERROR: 'error'
}

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again!'

export const ALERT = {
  [ALERT_TYPES.EDIT_DELETE]: ({ message, onEdit, onDelete, onCancel }) => ({
    title: 'Edit / Delete Todo',
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
    title: 'Delete Todo',
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
    title: 'Add new Todo',
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
    title: message || DEFAULT_ERROR_MESSAGE,
    buttons: [{
      text: 'Cancel',
      style: 'cancel',
      onPress: onCancel
    }]
  })
}
