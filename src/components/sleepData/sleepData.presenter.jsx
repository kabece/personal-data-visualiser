import React from 'react'
import {object, func} from 'prop-types'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler
} from 'react-timeseries-charts'

import {timeRangeShape} from '../main/main.shapes'

const SleepData = ({
  sleepDataSeries,
  primaryTimeRange,
  onSetPrimaryTimeRange
}) => (
  <ChartContainer
    title='DDoS attack - connections vs requests'
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
    onTimeRangeChanged={newTimeRange => onSetPrimaryTimeRange({primaryTimeRange: newTimeRange})}
    timeRange={primaryTimeRange || sleepDataSeries.timerange()}
    maxTime={sleepDataSeries.range().end()}
    minTime={sleepDataSeries.range().begin()}
  >
    <ChartRow height='300'>
      <YAxis
        id='activityAxis'
        label='Activity'
        labelOffset={-20}
        min={0}
        max={sleepDataSeries.max('activity')}
        format=',.0f'
        width='60'
        type='linear'
      />
      <Charts>
        <LineChart
          key='activity'
          axis='activityAxis'
          series={sleepDataSeries}
          columns={['activity']}
          style={styler}
          interpolation='curveBasis'
        />
        <LineChart
          key='timeInBed'
          axis='timeInBedAxis'
          series={sleepDataSeries}
          columns={['timeInBed']}
          style={styler}
          interpolation='curveBasis'
        />
      </Charts>
      <YAxis
        id='timeInBedAxis'
        label='Time in bed'
        labelOffset={2}
        min={0}
        format=',.0f'
        max={sleepDataSeries.max('timeInBed')}
        width='80'
        type='linear'
      />
    </ChartRow>
  </ChartContainer>
)

SleepData.propTypes = {
  sleepDataSeries: object.isRequired,
  primaryTimeRange: timeRangeShape.isRequired,
  onSetPrimaryTimeRange: func.isRequired
}

export default SleepData
