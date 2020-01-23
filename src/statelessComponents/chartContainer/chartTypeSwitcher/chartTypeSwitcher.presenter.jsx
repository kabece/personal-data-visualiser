import React from 'react'
import {func} from 'prop-types'

import ChartPlaceholder from '../chartPlaceholder/chartPlaceholder.presenter'
import LineChartWrapper from '../../lineChartWrapper/lineChartWrapper.presenter'
import ScatterChartWrapper from '../../scatterChartWrapper/scatterChartWrapper.presenter'
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
        <div className='chartWrapper'>
          <LineChartWrapper
            dataSeries={chart.dataSeries}
            chartTitle={chart.title}
            timeRange={chart.timeRange}
            onSetTimeRange={onSetTimeRange}
            key={chart.id}
            areBaselinesVisible={chart.areBaselinesVisible}
          />
        </div>
      )

    case chartTypes.scatterChart:
      return (
        <div className='chartWrapper'>
          <ScatterChartWrapper
            dataSeries={chart.dataSeries}
            chartTitle={chart.title}
            timeRange={chart.timeRange}
            onSetTimeRange={onSetTimeRange}
            key={chart.id}
            areBaselinesVisible={chart.areBaselinesVisible}
          />
        </div>
      )
    default:
      return (
        <ChartPlaceholder />
      )
  }
}

ChartTypeSwitcher.propTypes = {
  chart: chartShape,
  onSetTimeRange: func.isRequired
}

export default ChartTypeSwitcher
