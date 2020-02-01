import React from 'react'
import {oneOf} from 'prop-types'

// import CalendarChartWrapper from '../../../statelessComponents/calendarChartWrapper/calendarChartWrapper.presenter'
import HeatMapChartWrapper from '../../../statelessComponents/heatMapChartWrapper/heatMapChartWrapper.presenter'
// import {convertAggregateMoodDataToCalendarFormat} from './aggregateChart.helper'
import {convertAggregateMoodDataToHeatMapFormat} from './aggregateChart.helper'
import {chartShape, ROLLUP_TYPES} from '../../../index.shapes'

const {DAILY, WEEKLY, MONTHLY} = ROLLUP_TYPES

const AggregateChart = ({
  chart,
  rollupType
}) => (
  <div className='aggregateChart'>
    {/* <CalendarChartWrapper timeRange={chart.dataSeries.timerange()} data={convertAggregateMoodDataToCalendarFormat({aggregateMoodData: chart})} /> */}
    <HeatMapChartWrapper
      data={convertAggregateMoodDataToHeatMapFormat({
        aggregateMoodData: chart,
        isDetailedView: false,
        rollupType: MONTHLY
      })}
    />
  </div>
)

AggregateChart.propTypes = {
  chart: chartShape,
  rollupType: oneOf([DAILY, WEEKLY, MONTHLY])
}

export default AggregateChart
