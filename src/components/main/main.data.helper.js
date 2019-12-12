import moment from 'moment'
import {TimeRange, TimeSeries, TimeRangeEvent} from 'pondjs'

const timeFormat = 'YYYY-MM-DD HH:mm:ss'

const createTimeRange = (beginTime, endTime) => new TimeRange(
  moment(beginTime, timeFormat),
  moment(endTime, timeFormat)
)

const prepareSleepData = sleepData =>
  sleepData.map(element => ({
    start: element['Start'], // eslint-disable-line dot-notation
    end: element['End'], // eslint-disable-line dot-notation
    sleepQuality: element['Sleep quality'],
    timeInBed: element['Time in bed'],
    activity: Number(element['Activity (steps)'])
  }))

const convertSleepDataToTimeseries = sleepData => {
  const name = 'Sleep Data'
  const events = prepareSleepData(sleepData).map(element => new TimeRangeEvent(
    createTimeRange(element.start, element.end),
    {
      sleepQuality: element.sleepQuality,
      timeInBed: element.timeInBed,
      activity: element.activity
    }
  ))

  return new TimeSeries({name, events})
}

// eslint-disable-next-line import/prefer-default-export
export {convertSleepDataToTimeseries}
