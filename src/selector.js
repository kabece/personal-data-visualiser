import {createSelector} from 'reselect'

const mainSelector = state => state

export default createSelector(
  mainSelector,
  main => ({
    ...main,
    timeRangeSourceOptions: Object.keys(main.charts).map(key => ({
      displayName: main.charts[key].title || '',
      value: key
    }))
  })
)
