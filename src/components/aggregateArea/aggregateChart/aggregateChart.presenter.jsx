import React from 'react'

import CalendarChartWrapper from '../../../statelessComponents/calendarChartWrapper/calendarChartWrapper.presenter'
import HeatMapChartWrapper from '../../../statelessComponents/heatMapChartWrapper/heatMapChartWrapper.presenter'
import {chartShape, AGGREGATE_CHART_TYPES} from '../../../index.shapes'

const {HEATMAP_CHART, CALENDAR_CHART} = AGGREGATE_CHART_TYPES

const AggregateChart = ({
  chart
}) => {
  switch (chart.chartType) {
    case HEATMAP_CHART:
      return (
        <div className='aggregateChart'>
          <HeatMapChartWrapper chart={chart} />
        </div>
      )
    case CALENDAR_CHART:
      return (
        <div className='aggregateChart'>
          <CalendarChartWrapper
            timeRange={chart.dataSeries.timerange()}
            chart={chart}
          />
        </div>
      )
    default:
      return null
  }
}

AggregateChart.propTypes = {
  chart: chartShape
}

export default AggregateChart
