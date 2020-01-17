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
      displayName: 'Time in Bed',
      value: 'Time in Bed',
      dataType: dataTypes.numerical
    },
    {
      displayName: 'Step Count',
      value: 'Step Count',
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
    [actions.LOAD_DATA]: ({action: {data}}) => ({data}),
    [actions.SET_TIME_RANGE]: ({
      action: {newTimeRange, chartId},
      state: {charts: previousCharts}
    }) => ({
      charts: {
        ...previousCharts,
        [chartId]: {
          ...previousCharts[chartId],
          timeRange: newTimeRange
        },
        ...Object.keys(previousCharts)
          .filter(key => previousCharts[key].timeRangeSource === chartId)
          .reduce((acc, currentKey) => {
            acc[currentKey] = {
              ...previousCharts[currentKey],
              timeRange: newTimeRange
            }
            return acc
          }, {})
      }
    }),
    [actions.SET_DATA_SOURCE]: ({
      action: {dataSourceOption, chartId},
      state: {charts: previousCharts, data}
    }) => ({
      charts: {
        ...previousCharts,
        [chartId]: {
          ...previousCharts[chartId],
          dataSeries: data.find(dataElement => dataElement.name() === dataSourceOption.value),
          timeRange: data.find(dataElement => dataElement.name() === dataSourceOption.value).timerange(),
          dataType: dataSourceOption.dataType,
          title: dataSourceOption.displayName,
          plottedParameter: dataSourceOption.plottedParameter
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
    }),
    [actions.SET_TIME_RANGE_SOURCE]: ({
      action: {timeRangeSourceOption, chartId},
      state: {charts: previousCharts}
    }) => ({
      charts: {
        ...previousCharts,
        [chartId]: {
          ...previousCharts[chartId],
          timeRangeSource: timeRangeSourceOption.value,
          timeRange: Object.keys(previousCharts)
            .map(key => previousCharts[key])
            .find(element => element.title === timeRangeSourceOption.displayName)
            .timeRange
        }
      }
    })
  },
  options: {
    mode: 'setState'
  }
})

export default mainReducer
