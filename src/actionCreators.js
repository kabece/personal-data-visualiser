import * as actions from './actions'

export const setTimeRange = ({newTimeRange, chartId}) => ({
  type: actions.SET_TIME_RANGE,
  newTimeRange,
  chartId
})

export const setDataSource = ({dataSourceOption, chartId}) => ({
  type: actions.SET_DATA_SOURCE,
  dataSourceOption,
  chartId
})

export const setChartType = ({chartTypeOption, chartId}) => ({
  type: actions.SET_CHART_TYPE,
  chartTypeOption,
  chartId
})

export const setTimeRangeSource = ({timeRangeSourceOption, chartId}) => ({
  type: actions.SET_TIME_RANGE_SOURCE,
  timeRangeSourceOption,
  chartId
})

export const showBaselines = ({chartId}) => ({
  type: actions.SHOW_BASELINES,
  chartId
})

export const loadData = ({data}) => ({
  type: actions.LOAD_DATA,
  data
})
