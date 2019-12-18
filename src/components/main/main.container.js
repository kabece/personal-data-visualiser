import React from 'react'
import {func} from 'prop-types'
import {connect} from 'react-redux'

import SleepData from '../sleepData/sleepData.presenter'
import {convertSleepDataToTimeseries} from './main.data.helper'
import sleepData from '../../data/sleepData.json'
import selector from './main.selector'
import {setPrimaryTimeRange} from './main.actionCreators'
import {timeRangeShape} from '../../index.shapes'

const Main = ({
  primaryTimeRange,
  onSetPrimaryTimeRange
}) => (
  <div>
    <SleepData
      sleepDataSeries={convertSleepDataToTimeseries(sleepData)}
      primaryTimeRange={primaryTimeRange}
      onSetPrimaryTimeRange={onSetPrimaryTimeRange}
    />
  </div>
)

Main.propTypes = {
  primaryTimeRange: timeRangeShape.isRequired,
  onSetPrimaryTimeRange: func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onSetPrimaryTimeRange: ({primaryTimeRange}) => dispatch(setPrimaryTimeRange({primaryTimeRange}))
})

export default connect(selector, mapDispatchToProps)(Main)
