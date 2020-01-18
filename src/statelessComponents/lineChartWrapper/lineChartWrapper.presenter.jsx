import React from 'react'
import {object, string, func} from 'prop-types'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler
} from 'react-timeseries-charts'

import {timeRangeShape} from '../../index.shapes'

const LineChartWrapper = ({
  dataSeries,
  timeRange,
  chartTitle,
  onSetTimeRange
}) => (
  <ChartContainer
    title={chartTitle}
    style={{
      background: '#201d1e',
      borderRadius: 8,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#232122'
    }}
    padding={20}
    paddingTop={5}
    paddingBottom={0}
    enableDragZoom
    onTimeRangeChanged={newTimeRange => onSetTimeRange({newTimeRange})}
    timeRange={timeRange}
    maxTime={dataSeries.range().end()} // FIXME: maybe figure out how to use that
    minTime={dataSeries.range().begin()}
    width={500}
  >
    <ChartRow height='200'>
      <YAxis
        id='value'
        min={0}
        max={dataSeries.max('value')}
        format=',.0f'
        width='60'
        type='linear'
      />
      <Charts>
        <LineChart
          key='value'
          axis='value'
          series={dataSeries}
          columns={['value']}
          style={styler}
          interpolation='curveBasis'
        />
      </Charts>
      <YAxis
        id='value'
        min={0}
        format=',.0f'
        max={dataSeries.max('value')}
        width='60'
        type='linear'
      />
    </ChartRow>
  </ChartContainer>
)

LineChartWrapper.propTypes = {
  dataSeries: object.isRequired, // FIXME:
  timeRange: timeRangeShape.isRequired,
  chartTitle: string.isRequired,
  onSetTimeRange: func.isRequired
}

export default LineChartWrapper
