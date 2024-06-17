import { createSelector } from 'reselect'

const getLoaders = state => state.loading.loaders

const loadingSelector = createSelector(
  [getLoaders],
  loaders => loaders
)

export default loadingSelector
