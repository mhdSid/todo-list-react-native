import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hasLoader } from '@todo-list/store/src/loading/actions'

const useLoadingEffect = (loaderId = null) => {
  const dispatch = useDispatch()
  const loaders = useSelector(state => state.loading.loaders)
  const [isLoading, setIsLoading] = useState(false)

  const checkLoader = useCallback(async () => {
    const result = await dispatch(hasLoader(loaderId))
    setIsLoading(result)
  }, [dispatch, loaderId, loaders])

  useEffect(() => {
    checkLoader()
  }, [checkLoader])

  return isLoading
}

export default useLoadingEffect
