import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hasLoader } from '@todo-list/store/src/loading/actions'

const useLoadingEffect = loaderId => {
  const dispatch = useDispatch()
  const loaders = useSelector(state => state.loading.loaders)

  const checkLoader = useCallback(async () => {
    await dispatch(hasLoader(loaderId))
  })

  useEffect(() => {
    checkLoader()
  }, [dispatch, loaderId, loaders])

  return loaders[loaderId] === true
}

export default useLoadingEffect
