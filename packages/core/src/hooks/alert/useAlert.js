import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { ALERT_TYPES } from '../../constants/alert'

export default function useAlert ({
  getDefaultMessage = () => {},
  isLoggedIn,
  onCancel,
  onDismiss,
  onDelete,
  onAdd,
  onEdit
} = {}) {
  const [alertType, setAlertType] = useState(null)
  useEffect(() => {
    if ((isLoggedIn && alertType) || alertType?.type === ALERT_TYPES.ERROR || (!isLoggedIn && alertType)) {
      const { type } = alertType
      const defaultMessage = alertType?.error?.message || getDefaultMessage()
      const { alertTitle, alertMessage, alertButtons } = ALERT[type]({
        message: defaultMessage,
        onCancel,
        onDelete,
        onEdit: () => Alert.prompt(ALERT_PROMPT_EDIT.title, ALERT_PROMPT_EDIT.message(defaultMessage), text => onEdit({ text })),
        onAdd: () => Alert.prompt(ALERT_PROMPT_ADD.title, ALERT_PROMPT_ADD.message, text => onAdd({ text }))
      })
      Alert.alert(alertTitle, alertMessage, alertButtons, {
        cancelable: true,
        onDismiss
      })
    }
  }, [isLoggedIn, alertType])

  return {
    alertType,
    setAlertType
  }
}

const ALERT_PROMPT_EDIT = {
  title: 'Edit Todo',
  message: task => `Task: ${task}`
}

const ALERT_PROMPT_ADD = {
  title: 'To-Do List',
  message: 'Add a new task'
}

export const ALERT_PROMPT_LOGIN_EMAIL = {
  title: 'Login',
  message: 'Please enter your e-mail'
}

export const GET_ALERT_PROMPT_VERIFY_EMAIL = email => ({
  title: 'Verify your email',
  message: `Please enter the verification code that was sent to ${email}`
})

const ALERT = {
  [ALERT_TYPES.EDIT_DELETE]: ({ message, onEdit, onDelete, onCancel }) => ({
    alertTitle: 'Edit / Delete task',
    alertMessage: `Task: ${message}`,
    alertButtons: [{
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
    alertTitle: 'Delete task',
    alertMessage: `Task: ${message}`,
    alertButtons: [{
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
    alertTitle: 'To-Do List',
    alertMessage: 'Would you like to add a new task?',
    alertButtons: [{
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
    alertTitle: 'Something went wrong!',
    alertMessage: message,
    alertButtons: [{
      text: 'Cancel',
      style: 'cancel',
      onPress: onCancel
    }]
  }),
  [ALERT_TYPES.LOGIN]: ({ onCancel, onLogin }) => ({
    alertTitle: 'Login',
    alertMessage: 'Enter your credentials',
    alertButtons: [{
      text: 'Submit',
      onPress: onLogin,
      style: 'cancel'
    }, {
      text: 'Cancel',
      style: 'cancel',
      onPress: onCancel
    }]
  })
}
