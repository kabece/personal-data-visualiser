import React, {useState} from 'react'
import {object} from 'prop-types'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler
} from 'react-timeseries-charts'

const SleepData = ({sleepDataSeries}) => {
  const [timerange, setTimerange] = useState(sleepDataSeries.timerange())

  console.log('sleepDataSeries', sleepDataSeries.toString())

  return (
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
      onTimeRangeChanged={newTimerange => setTimerange(newTimerange)}
      timeRange={timerange}
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
}

SleepData.propTypes = {
  sleepDataSeries: object.isRequired // eslint-disable-line react/forbid-prop-types
}

export default SleepData
