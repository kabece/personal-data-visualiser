import React from 'react'
import {object, string, func, bool} from 'prop-types'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  BandChart,
  styler
} from 'react-timeseries-charts'
import {percentile, median} from 'pondjs'

import {timeRangeShape} from '../../index.shapes'

const bandStyle = styler([{key: 'value', color: 'red', width: 10, opacity: 0.9}])

const BandChartWrapper = ({
  dataSeries,
  timeRange,
  chartTitle
  // areBaselinesVisible,
  // onSetTimeRange
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
    // onTimeRangeChanged={newTimeRange => onSetTimeRange({newTimeRange})}
    timeRange={timeRange}
    maxTime={dataSeries.range().end()} // FIXME: maybe figure out how to use that
    minTime={dataSeries.range().begin()}
    width={500}
  >
    <ChartRow height='200'>
      <YAxis
        id='value'
        min={0}
        max={15000}
        format=',.0f'
        width='60'
        type='linear'
      />
      <Charts>
        <BandChart
          key='value'
          axis='value'
          series={dataSeries}
          column='value'
          style={bandStyle}
          aggregation={{
            size: '24h',
            reducers: {
              outer: [percentile(5), percentile(95)],
              inner: [percentile(25), percentile(75)],
              center: median()
            }
          }}
          interpolation='curveBasis'
        />
        {/* {['min', 'max', 'avg'].map(element => (
          <Baseline
            axis='value'
            style={baselineStyleLite}
            value={dataSeries[element]('value')}
            label={element[0].toUpperCase() + element.slice(1)}
            position='right'
            visible={areBaselinesVisible}
            key={element}
          />
        ))} */}
      </Charts>
      <YAxis
        id='value'
        min={0}
        max={15000}
        format=',.0f'
        width='60'
        type='linear'
      />
    </ChartRow>
  </ChartContainer>
)

BandChartWrapper.propTypes = {
  dataSeries: object.isRequired, // FIXME:
  timeRange: timeRangeShape.isRequired,
  chartTitle: string.isRequired,
  areBaselinesVisible: bool.isRequired,
  onSetTimeRange: func.isRequired
}

export default BandChartWrapper
