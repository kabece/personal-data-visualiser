import React from 'react'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart
} from 'react-timeseries-charts'

import sleepData from '../../data/sleepData.json'
import {convertSleepDataToTimeSeries} from './main.helper'

const Main = () => {
  const sleepDataSeries = convertSleepDataToTimeSeries(sleepData)

  return (
    <ChartContainer timeRange={sleepDataSeries.timerange()} width={800}>
      <ChartRow height='200'>
        <YAxis id='axis1' label='AUD' min={0.5} max={1.5} width='60' type='linear' format='$,.2f' />
        <Charts>
          <LineChart axis='axis1' series={sleepDataSeries} column={['Time in bed']} />
        </Charts>
        <YAxis id='axis2' label='Euro' min={0.5} max={1.5} width='80' type='linear' format='$,.2f' />
      </ChartRow>
    </ChartContainer>
  )
}

export default Main
