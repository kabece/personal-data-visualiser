import React from 'react'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart
} from 'react-timeseries-charts'

import sleepData from '../../data/sleepData.json'
import {convertSleepDataToTimeSeries} from './sleepData.helper'

const SleepData = () => {
  const sleepDataSeries = convertSleepDataToTimeSeries(sleepData)
  console.log('timeRange', sleepDataSeries.timerange())
  console.log('sleepDataSeries', sleepDataSeries.toString())

  return (
    <ChartContainer timeRange={sleepDataSeries.timerange()} width={800}>
      <ChartRow height='200'>
        <YAxis id='axis1' label='Activity' min={0.5} max={15000.5} width='60' type='linear' format='.2f' />
        <Charts>
          <LineChart axis='axis1' series={sleepDataSeries} columns={['activity']} />
        </Charts>
      </ChartRow>
    </ChartContainer>
  )
}

export default SleepData
