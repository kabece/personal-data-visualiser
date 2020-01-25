import React from 'react'
import {func} from 'prop-types'

import ChartPlaceholder from '../chartPlaceholder/chartPlaceholder.presenter'
import LineChartWrapper from '../../../../statelessComponents/lineChartWrapper/lineChartWrapper.presenter'
import ScatterChartWrapper from '../../../../statelessComponents/scatterChartWrapper/scatterChartWrapper.presenter'
import CombinedChartWrapper from '../../../../statelessComponents/combinedChartWrapper/combinedChartWrapper'
import {chartTypes, chartShape} from '../../../../index.shapes'

const ChartTypeSwitcher = ({
  chart,
  onSetTimeRange
}) => {
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

    case chartTypes.combinedChart:
      return (
        <div className='chartWrapper'>
          <CombinedChartWrapper
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
