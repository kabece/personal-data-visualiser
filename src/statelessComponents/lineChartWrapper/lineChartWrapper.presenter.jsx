import React from 'react'
import {object, shape, string, func} from 'prop-types'
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
  plottedParameter,
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
  >
    <ChartRow height='300'>
      <YAxis
        id={plottedParameter.value}
        label={plottedParameter.displayName}
        labelOffset={-20}
        min={0}
        max={dataSeries.max(plottedParameter.value)}
        format=',.0f'
        width='60'
        type='linear'
      />
      <Charts>
        <LineChart
          key={plottedParameter.value}
          axis={plottedParameter.value}
          series={dataSeries}
          columns={[plottedParameter.value]}
          style={styler}
          interpolation='curveBasis'
        />
      </Charts>
      <YAxis
        id={plottedParameter.value}
        labelOffset={2}
        min={0}
        format=',.0f'
        max={dataSeries.max(plottedParameter.value)}
        width='80'
        type='linear'
      />
    </ChartRow>
  </ChartContainer>
)

LineChartWrapper.propTypes = {
  dataSeries: object.isRequired, // FIXME:
  plottedParameter: shape({
    displayName: string.isRequired,
    value: string.isRequired
  }),
  timeRange: timeRangeShape.isRequired,
  chartTitle: string.isRequired,
  onSetTimeRange: func.isRequired
}

export default LineChartWrapper
