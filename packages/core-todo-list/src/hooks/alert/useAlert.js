import { useEffect } from 'react'
import { Alert } from 'react-native'
import { ALERT, ALERT_PROMPT_ADD, ALERT_PROMPT_EDIT, ALERT_TYPES } from '../../constants/alert'

export default function useAlert ({
  alertType,
  defaultMessage,
  isLoggedIn,
  onCancel,
  onDismiss,
  onDelete,
  onAdd,
  onEdit
}) {
  useEffect(() => {
    if ((isLoggedIn && alertType) || alertType?.type === ALERT_TYPES.ERROR) {
      const { type, error: { message: errorMessage } = {} } = alertType
      const { alertTitle, alertMessage, alertButtons } = ALERT[type]({
        message: errorMessage || defaultMessage,
        onCancel,
        onDelete,
        onEdit: () => Alert.prompt(ALERT_PROMPT_EDIT.title, defaultMessage, text => onEdit({ text })),
        onAdd: () => Alert.prompt(ALERT_PROMPT_ADD.title, ALERT_PROMPT_ADD.message, text => onAdd({ text }))
      })
      Alert.alert(alertTitle, alertMessage, alertButtons, {
        cancelable: true,
        onDismiss
      })
    }
  }, [isLoggedIn, alertType])
}
