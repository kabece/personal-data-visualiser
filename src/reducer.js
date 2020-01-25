import createReducer from '@agillic/create-reducer'

import * as actions from './actions'
import {dataTypes, chartTypes} from './index.shapes'

const initialState = {
  primaryTimeRange: null,
  charts: {
    1: {
      areBaselinesVisible: false
    },
    2: {
      areBaselinesVisible: false
    },
    3: {
      areBaselinesVisible: false
    },
    4: {
      areBaselinesVisible: false
    }
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
    },
    {
      displayName: 'Sleep Quality (%)',
      value: 'Sleep Quality (%)',
      dataType: dataTypes.numerical
    },
    {
      displayName: 'Mood',
      value: 'Mood',
      dataType: dataTypes.numerical
    },
    {
      displayName: 'Mood (Aggregated)',
      value: 'Mood (Aggregated)',
      dataType: dataTypes.numerical
    }
  ],
  chartTypeOptions: [
    {
      displayName: 'Line Chart',
      value: chartTypes.lineChart,
      dataType: dataTypes.numerical
    },
    {
      displayName: 'Scatter Chart',
      value: chartTypes.scatterChart,
      dataType: dataTypes.numerical
    },
    {
      displayName: 'Combined Chart',
      value: chartTypes.combinedChart,
      dataType: dataTypes.numerical
    }
  ]
}

const rootReducer = createReducer({
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
    }),
    [actions.SHOW_BASELINES]: ({
      action: {chartId},
      state: {charts: previousCharts}
    }) => ({
      charts: {
        ...previousCharts,
        [chartId]: {
          ...previousCharts[chartId],
          areBaselinesVisible: !previousCharts[chartId].areBaselinesVisible
        }
      }
    })
  },
  options: {
    mode: 'setState'
  }
})

export default rootReducer
