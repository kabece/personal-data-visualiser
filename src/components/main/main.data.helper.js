import moment from 'moment'
import {TimeRange, TimeSeries, TimeRangeEvent} from 'pondjs'

import sleepData from '../../data/sleepData.json'

const timeFormat = 'YYYY-MM-DD HH:mm:ss'

const createTimeRange = (beginTime, endTime) => new TimeRange(
  moment(beginTime, timeFormat),
  moment(endTime, timeFormat)
)

const prepareTimeInBed = timeInBed => Number(timeInBed.split(':')[0]) + Number(timeInBed.split(':')[1]) / 60
const prepareSleepQuality = sleepQuality => Number(sleepQuality.slice(0, -1))

const prepareSleepData = data =>
  data.map(element => ({
    start: element['Start'], // eslint-disable-line dot-notation
    end: element['End'], // eslint-disable-line dot-notation
    sleepQuality: element['Sleep quality'],
    timeInBed: element['Time in bed'],
    activity: Number(element['Activity (steps)'])
  }))

const convertTimeInBedToTimeSeries = data => {
  const name = 'Time in Bed'
  const events = prepareSleepData(data).map(element => new TimeRangeEvent(
    createTimeRange(element.start, element.end),
    {
      value: prepareTimeInBed(element.timeInBed)
    }
  ))

  return new TimeSeries({name, events})
}

const convertStepCountToTimeSeries = data => {
  const name = 'Step Count'
  const events = prepareSleepData(data).map(element => new TimeRangeEvent(
    createTimeRange(element.start, element.end),
    {
      value: element.activity
    }
  ))

  return new TimeSeries({name, events})
}

const convertSleepQualityToTimeSeries = data => {
  const name = 'Sleep Quality (%)'
  const events = prepareSleepData(data).map(element => new TimeRangeEvent(
    createTimeRange(element.start, element.end),
    {
      value: prepareSleepQuality(element.sleepQuality)
    }
  ))

  return new TimeSeries({name, events})
}

const prepareData = () => {
  const timeInBedTimeSeries = convertTimeInBedToTimeSeries(sleepData)
  const stepCountTimeSeries = convertStepCountToTimeSeries(sleepData)
  const sleepQualityTimeSeries = convertSleepQualityToTimeSeries(sleepData)
  return [timeInBedTimeSeries, stepCountTimeSeries, sleepQualityTimeSeries]
}

// eslint-disable-next-line import/prefer-default-export
export {prepareData}
