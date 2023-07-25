export const ALERT_TYPES = {
  EDIT_DELETE: 'edit_delete',
  DELETE: 'delete',
  ADD: 'add'
}

export const ALERT = {
  [ALERT_TYPES.EDIT_DELETE]: ({ task, onEdit, onDelete, onCancel }) => ({
    title: 'Edit / Delete Todo',
    message: `Task: ${task}`,
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
  [ALERT_TYPES.DELETE]: ({ task, onDelete, onCancel }) => ({
    title: 'Delete Todo',
    message: `Task: ${task}`,
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
  })
}
