import React from 'react'

import SleepData from '../sleepData/sleepData.presenter'
import {convertSleepDataToTimeseries} from './main.data.helper'
import sleepData from '../../data/sleepData.json'

const Main = () => (
  <div>
    <SleepData sleepDataSeries={convertSleepDataToTimeseries(sleepData)} />
  </div>
)

export default Main
