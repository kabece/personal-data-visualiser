import React from 'react'
import {oneOf, func} from 'prop-types'

import LineChartWrapper from '../../lineChartWrapper/lineChartWrapper.presenter'
import {timeRangeShape, chartTypes, chartShape} from '../../../index.shapes'

const ChartTypeSwitcher = ({
  chart,
  chartType,
  primaryTimeRange,
  onSetPrimaryTimeRange
}) => {
  // FIXME:
  // eslint-disable-next-line
  switch (chartType) {
    case chartTypes.lineChart:
      return (
        <LineChartWrapper
          dataSeries={chart.dataSeries}
          chartTitle={chart.title}
          timeRange={chart.timeRange}
          primaryTimeRange={primaryTimeRange}
          onSetPrimaryTimeRange={onSetPrimaryTimeRange}
          key={chart.id}
        />
      )
    default:
      return (
        <div>Loading...</div>
      )
  }
}

ChartTypeSwitcher.propTypes = {
  chart: chartShape,
  chartType: oneOf([chartTypes.lineChart]),
  primaryTimeRange: timeRangeShape,
  onSetPrimaryTimeRange: func.isRequired
}

export default ChartTypeSwitcher
