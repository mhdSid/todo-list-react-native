import { createSelector } from 'reselect'

const getTheme = state => state.theme.theme

const themeSelector = createSelector(
  [getTheme],
  theme => theme
)

export default themeSelector
