import {shape, string, arrayOf, oneOf, object, bool} from 'prop-types'

const dataTypes = {
  numerical: 'NUMERICAL',
  categorical: 'CATEGORICAL'
}

const chartTypes = {
  lineChart: 'LINE_CHART',
  scatterChart: 'SCATTER_CHART'
}

const optionsShape = arrayOf(shape({
  displayName: string.isRequired,
  value: string.isRequired,
  dataType: oneOf([dataTypes.numerical])
}))

const timeRangeShape = shape({
  0: string,
  1: string
})

const chartShape = shape({
  title: string,
  areBaselinesVisible: bool.isRequired,
  dataType: oneOf([dataTypes.numerical]),
  chartType: oneOf([chartTypes.lineChart, chartTypes.scatterChart]),
  timeRange: timeRangeShape,
  dataSeries: object // TODO: proptypes
})

export {optionsShape, timeRangeShape, dataTypes, chartTypes, chartShape}
