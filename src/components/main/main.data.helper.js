import moment from 'moment'
import {TimeRange, TimeSeries, TimeRangeEvent} from 'pondjs'

import sleepData from '../../data/sleepData.json'

const timeFormat = 'YYYY-MM-DD HH:mm:ss'

const createTimeRange = (beginTime, endTime) => new TimeRange(
  moment(beginTime, timeFormat),
  moment(endTime, timeFormat)
)

const prepareTimeInBed = timeInBed => Number(timeInBed.split(':')[0]) + Number(timeInBed.split(':')[1]) / 60

const prepareSleepData = data =>
  data.map(element => ({
    start: element['Start'], // eslint-disable-line dot-notation
    end: element['End'], // eslint-disable-line dot-notation
    sleepQuality: element['Sleep quality'],
    timeInBed: element['Time in bed'],
    activity: Number(element['Activity (steps)'])
  }))

const convertSleepDataToTimeseries = data => {
  const name = 'Sleep Data'
  const events = prepareSleepData(data).map(element => new TimeRangeEvent(
    createTimeRange(element.start, element.end),
    {
      sleepQuality: element.sleepQuality,
      timeInBed: prepareTimeInBed(element.timeInBed),
      activity: element.activity
    }
  ))

  return new TimeSeries({name, events})
}

const prepareData = () => {
  const sleepDataTimeSeries = convertSleepDataToTimeseries(sleepData)
  return [sleepDataTimeSeries]
}

// eslint-disable-next-line import/prefer-default-export
export {prepareData}
