import React from 'react'
import {oneOf} from 'prop-types'

import CalendarChartWrapper from '../../../statelessComponents/calendarChartWrapper/calendarChartWrapper.presenter'
import HeatMapChartWrapper from '../../../statelessComponents/heatMapChartWrapper/heatMapChartWrapper.presenter'
import {convertAggregateMoodDataToHeatMapFormat, convertAggregateMoodDataToCalendarFormat} from './aggregateChart.helper'
import {chartShape, ROLLUP_TYPES, AGGREGATE_CHART_TYPES} from '../../../index.shapes'

const {DAILY, WEEKLY, MONTHLY} = ROLLUP_TYPES
const {HEATMAP_CHART, CALENDAR_CHART} = AGGREGATE_CHART_TYPES

const AggregateChart = ({
  chart,
  rollupType
}) => {
  switch (chart.chartType) {
    case HEATMAP_CHART:
      return (
        <div className='aggregateChart'>
          <HeatMapChartWrapper
            data={convertAggregateMoodDataToHeatMapFormat({
              aggregateMoodData: chart,
              isDetailedView: false,
              rollupType: MONTHLY
            })}
          />
        </div>
      )
    case CALENDAR_CHART:
      return (
        <div className='aggregateChart'>
          <CalendarChartWrapper
            timeRange={chart.dataSeries.timerange()}
            data={convertAggregateMoodDataToCalendarFormat({aggregateMoodData: chart})}
          />
        </div>
      )
    default:
      return null
  }
}

AggregateChart.propTypes = {
  chart: chartShape,
  rollupType: oneOf([DAILY, WEEKLY, MONTHLY])
}

export default AggregateChart
