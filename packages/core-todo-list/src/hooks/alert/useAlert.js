import { useEffect } from 'react'
import { Alert } from 'react-native'
import { ALERT, ALERT_PROMPT_ADD, ALERT_PROMPT_EDIT, ALERT_TYPES } from '../../constants/alert'

export default function useAlert ({ isLoggedIn, defaultMessage, alertType, onDelete, onCancel, onAdd, onEdit, onDismiss }) {
  const handleAlertEditPress = () => {
    Alert.prompt(ALERT_PROMPT_EDIT.title, defaultMessage, text => {
      onEdit({ text })
    })
  }

  const handleAlertDeletePress = () => {
    onDelete()
  }

  const handleAlertAddPress = () => {
    Alert.prompt(ALERT_PROMPT_ADD.title, ALERT_PROMPT_ADD.message, text => {
      onAdd({ text })
    })
  }

  const handleShowAlert = () => {
    const { type, error: { message: errorMessage } = {} } = alertType
    const { title, message, buttons } = ALERT[type]({
      message: errorMessage || defaultMessage,
      onCancel,
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
        onDismiss
      }
    )
  }

  useEffect(() => {
    if ((isLoggedIn && alertType) || alertType?.type === ALERT_TYPES.ERROR) {
      handleShowAlert()
    }
  }, [isLoggedIn, alertType])
}
