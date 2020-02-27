import {createSelector} from 'reselect'

const mainSelector = state => state

export default createSelector(
  mainSelector,
  main => ({
    ...main,
    timeRangeSourceOptions: Object.keys(main.charts)
      .filter(key => main.charts[key].dataType && main.charts[key].chartType)
      .filter(key => key !== 'aggregate1' && key !== 'aggregate2')
      .map(key => ({
        displayName: main.charts[key].title || '',
        value: key
      }))
  })
)
