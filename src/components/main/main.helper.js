import moment from 'moment'
import {TimeRange, TimeSeries, TimeRangeEvent} from 'pondjs'

const createTimeRange = (beginTime, endTime) => {
  const timeFormat = 'YYYY-MM-DD HH:mm:ss'
  return new TimeRange(
    moment(beginTime, timeFormat),
    moment(endTime, timeFormat)
  )
}

const convertSleepDataToTimeSeries = sleepData => {
  const name = 'Sleep Data'
  const events = sleepData.map(element => new TimeRangeEvent(
    createTimeRange(element['Start'], element['End']), // eslint-disable-line dot-notation
    element['Sleep quality'],
    element['Time in bed'],
    element['Activity (steps)']
  ))

  return new TimeSeries({name, events})
}

// eslint-disable-next-line import/prefer-default-export
export {convertSleepDataToTimeSeries}
