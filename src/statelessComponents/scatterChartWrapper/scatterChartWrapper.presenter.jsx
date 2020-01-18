import React from 'react'
import {object, string, func} from 'prop-types'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  ScatterChart,
  styler
} from 'react-timeseries-charts'

import {timeRangeShape} from '../../index.shapes'

const ScatterChartWrapper = ({
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
        min={dataSeries.min('value')}
        max={dataSeries.max('value')}
        format=',.0f'
        width='60'
        type='linear'
      />
      <Charts>
        <ScatterChart
          key='value'
          axis='value'
          series={dataSeries}
          columns={['value']}
          // style={styler}
        />
      </Charts>
      <YAxis
        id='value'
        min={dataSeries.min('value')}
        max={dataSeries.max('value')}
        format=',.0f'
        width='60'
        type='linear'
      />
    </ChartRow>
  </ChartContainer>
)

ScatterChartWrapper.propTypes = {
  dataSeries: object.isRequired, // FIXME:
  timeRange: timeRangeShape.isRequired,
  chartTitle: string.isRequired,
  onSetTimeRange: func.isRequired
}

export default ScatterChartWrapper
