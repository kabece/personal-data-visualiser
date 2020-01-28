import React from 'react'

import CalendarChartWrapper from '../../../statelessComponents/calendarChartWrapper/calendarChartWrapper.presenter'
import {convertAggregateMoodDataToCalendarFormat} from './aggregateChart.helper'
import {chartShape} from '../../../index.shapes'

const AggregateChart = ({
  chart
}) => (
  <div className='aggregateChart'>
    <CalendarChartWrapper timeRange={chart.dataSeries.timerange()} data={convertAggregateMoodDataToCalendarFormat({aggregateMoodData: chart})} />
  </div>
)

AggregateChart.propTypes = {
  chart: chartShape
}

export default AggregateChart
