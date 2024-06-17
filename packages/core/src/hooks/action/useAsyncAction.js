import { useDispatch } from 'react-redux'
import { useState, useCallback } from 'react'
import { addLoader, fulfillLoader } from '@todo-list/store/src/loading/actions'

const useAsyncAction = loaderId => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  const dispatchAsyncAction = useCallback(async action => {
    try {
      dispatch(addLoader(loaderId))
      await dispatch(action)
    } catch (err) {
      setError(err)
    } finally {
      dispatch(fulfillLoader(loaderId))
    }
  }, [dispatch, loaderId])

  return { dispatchAsyncAction, error }
}

export default useAsyncAction
