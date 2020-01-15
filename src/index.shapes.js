import {shape, string, arrayOf, oneOf, object} from 'prop-types'

const dataTypes = {
  numerical: 'NUMERICAL'
}

const chartTypes = {
  lineChart: 'LINE_CHART'
}

const optionsShape = arrayOf(shape({
  displayName: string.isRequired,
  value: string.isRequired,
  dataType: oneOf([dataTypes.numerical]).isRequired
}))

const timeRangeShape = shape({
  0: string.isRequired,
  1: string.isRequired
})

const chartShape = shape({
  title: string,
  dataType: oneOf([dataTypes.numerical]),
  chartType: oneOf([chartTypes.lineChart]),
  timeRange: timeRangeShape,
  dataSeries: object // TODO: proptypes
})

export {optionsShape, timeRangeShape, dataTypes, chartTypes, chartShape}
