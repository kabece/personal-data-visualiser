import React from 'react'
import {func} from 'prop-types'

import LineChartWrapper from '../../lineChartWrapper/lineChartWrapper.presenter'
import {chartTypes, chartShape} from '../../../index.shapes'

const ChartTypeSwitcher = ({
  chart,
  onSetTimeRange
}) => {
  // FIXME:
  // eslint-disable-next-line
  switch (chart.chartType) {
    case chartTypes.lineChart:
      return (
        <LineChartWrapper
          dataSeries={chart.dataSeries}
          chartTitle={chart.title}
          timeRange={chart.timeRange}
          onSetTimeRange={onSetTimeRange}
          plottedParameter={chart.plottedParameter}
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
  onSetTimeRange: func.isRequired
}

export default ChartTypeSwitcher
