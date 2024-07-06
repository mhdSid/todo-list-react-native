import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { addLoader, fulfillLoader } from '@todo-list/store/src/loading/actions'
import useAlert from '../alert/useAlert'
import { ALERT_TYPES } from '../../constants/alert'

const useAsyncAction = () => {
  const dispatch = useDispatch()
  const { setAlertType } = useAlert()

  const dispatchAsyncAction = useCallback(async (action, loaderId) => {
    let isSuccess = false
    try {
      dispatch(addLoader(loaderId))
      await dispatch(action)
      isSuccess = true
    } catch (err) {
      setAlertType({ type: ALERT_TYPES.ERROR, error: err })
      isSuccess = false
    } finally {
      dispatch(fulfillLoader(loaderId))
    }
    return isSuccess
  }, [])

  return { dispatchAsyncAction }
}

export default useAsyncAction
