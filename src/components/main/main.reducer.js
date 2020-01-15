import createReducer from '@agillic/create-reducer'

import * as actions from './main.actions'
import {dataTypes, chartTypes} from '../../index.shapes'

const initialState = {
  primaryTimeRange: null,
  charts: {
    1: {},
    2: {}
  },
  data: [],
  dataSourceOptions: [
    {
      displayName: 'Sleep Data',
      value: 'Sleep Data',
      dataType: dataTypes.numerical
    },
    {
      displayName: 'Heart Rate Data',
      value: 'Heart Rate Data',
      dataType: dataTypes.numerical
    }
  ],
  chartTypeOptions: [
    {
      displayName: 'Line Chart',
      value: chartTypes.lineChart,
      dataType: dataTypes.numerical
    }
  ]
}

const mainReducer = createReducer({
  initialState,
  actions: {
    [actions.SET_PRIMARY_TIME_RANGE]: ({action: {primaryTimeRange}}) => ({primaryTimeRange}),
    [actions.LOAD_DATA]: ({action: {data}}) => ({data}),
    [actions.SET_DATA_SOURCE]: ({
      action: {dataSourceOption, chartId},
      state: {charts: previousCharts, data}
    }) => ({
      charts: {
        ...previousCharts,
        [chartId]: {
          ...previousCharts[chartId],
          dataType: dataSourceOption.dataType,
          dataSeries: data.find(dataElement => dataElement.name() === dataSourceOption.value)
        }
      }
    }),
    [actions.SET_CHART_TYPE]: ({
      action: {chartTypeOption, chartId},
      state: {charts: previousCharts}
    }) => ({
      charts: {
        ...previousCharts,
        [chartId]: {
          ...previousCharts[chartId],
          chartType: chartTypeOption.value
        }
      }
    })
  },
  options: {
    mode: 'setState'
  }
})

export default mainReducer
