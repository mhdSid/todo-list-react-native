import { createSelector } from 'reselect'

const getIsLoggedIn = state => state.auth.user.isLoggedIn

const isLoggedInSelector = createSelector(
  [getIsLoggedIn],
  isLoggedIn => isLoggedIn
)

export default isLoggedInSelector
