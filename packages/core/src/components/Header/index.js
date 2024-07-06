import React, { useCallback } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { THEMES } from '@todo-list/store/src/theme/constants'
import styles from './styles'
import testSelectors from '../../../test/lib/selector/container'
import { APP_TITLE } from '../../constants/container'
import { useTheme } from '../ThemeProvider'
import dark from '../../assets/images/dark.png'
import light from '../../assets/images/light.png'
import userLight from '../../assets/images/user-light.png'
import userDark from '../../assets/images/user-dark.png'
import useAsyncAction from '../../hooks/action/useAsyncAction'
import { AUTH_LOGIN_MUTATION, AUTH_VERIFY_EMAIL_MUTATION } from '@todo-list/store/src/auth/actionTypes'
import { ALERT_PROMPT_LOGIN_EMAIL, GET_ALERT_PROMPT_VERIFY_EMAIL } from '../../hooks/alert/useAlert'
import { EMAIL_REGEX } from '../../constants/auth'
import { verifyEmail } from '@todo-list/store/src/auth/graphql/mutation/verifyEmail'
import { login } from '@todo-list/store/src/auth/graphql/mutation/login'

export default function Header () {
  const { theme, toggleTheme } = useTheme()

  const { dispatchAsyncAction } = useAsyncAction()
  const handleLoginMutation = useCallback(email => {
    return dispatchAsyncAction(login({ email }), AUTH_LOGIN_MUTATION)
  }, [dispatchAsyncAction])
  const handleVerifyEmailMutation = useCallback((email, verificationCode) => {
    return dispatchAsyncAction(verifyEmail({ email, verificationCode }), AUTH_VERIFY_EMAIL_MUTATION)
  }, [dispatchAsyncAction])

  const toggleLogin = async () => {
    Alert.prompt(ALERT_PROMPT_LOGIN_EMAIL.title, ALERT_PROMPT_LOGIN_EMAIL.message, async email => {
      if (email.match(EMAIL_REGEX)) {
        const success = await handleLoginMutation(email)
        if (success) {
          const alertPromptVerifyEmail = GET_ALERT_PROMPT_VERIFY_EMAIL(email)
          Alert.prompt(alertPromptVerifyEmail.title, alertPromptVerifyEmail.message, async verificationCode => {
            if (verificationCode) {
              console.log('verificationCode: ', verificationCode, email)
              await handleVerifyEmailMutation(email, verificationCode)
            }
          })
        }
      }
    })
  }

  return (
    <View style={styles.headerRow}>
      <Text style={[styles.title, styles[theme].title]} testID={testSelectors.title}>{APP_TITLE}</Text>
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={toggleTheme}>
          <Image
            source={theme === THEMES.DARK ? light : dark}
            style={styles.themeImage}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLogin}>
          <Image
            source={theme === THEMES.DARK ? userLight : userDark}
            style={styles.userImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
