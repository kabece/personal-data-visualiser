import React from 'react'
import {object, string, func, bool} from 'prop-types'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  Baseline,
  styler
} from 'react-timeseries-charts'

import {timeRangeShape} from '../../index.shapes'

const baselineStyleLite = {
  line: {
    stroke: 'steelblue',
    strokeWidth: 1,
    opacity: 0.5
  },
  label: {
    fill: 'steelblue'
  }
}

const LineChartWrapper = ({
  dataSeries,
  timeRange,
  chartTitle,
  areBaselinesVisible,
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
        <LineChart
          key='value'
          axis='value'
          series={dataSeries}
          columns={['value']}
          style={styler}
          interpolation='curveLinear'
        />
        {['min', 'max', 'avg'].map(element => (
          <Baseline
            axis='value'
            style={baselineStyleLite}
            value={dataSeries[element]('value')}
            label={element[0].toUpperCase() + element.slice(1)}
            position='right'
            visible={areBaselinesVisible}
            key={element}
          />
        ))}
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

LineChartWrapper.propTypes = {
  dataSeries: object.isRequired, // FIXME:
  timeRange: timeRangeShape.isRequired,
  chartTitle: string.isRequired,
  areBaselinesVisible: bool.isRequired,
  onSetTimeRange: func.isRequired
}

export default LineChartWrapper
