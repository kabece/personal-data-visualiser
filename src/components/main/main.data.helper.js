import moment from 'moment'
import {TimeRange, TimeSeries, TimeRangeEvent, TimeEvent} from 'pondjs'

import sleepData from '../../data/sleepData.json'
import moodData from '../../data/moodData.json'

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

const prepareMoodData = data =>
  data.reverse().map(element => ({
    ...element,
    activities: element.activities.split('|').map(value => value.trim())
  }))

const convertTimeInBedToTimeSeries = data => {
  const name = 'Time in Bed'
  const events = data.map(element => new TimeRangeEvent(
    createTimeRange(element.start, element.end),
    {
      value: prepareTimeInBed(element.timeInBed)
    }
  ))

  return new TimeSeries({name, events})
}

const convertStepCountToTimeSeries = data => {
  const name = 'Step Count'
  const events = data.map(element => new TimeRangeEvent(
    createTimeRange(element.start, element.end),
    {
      value: element.activity
    }
  ))

  return new TimeSeries({name, events})
}

const convertSleepQualityToTimeSeries = data => {
  const name = 'Sleep Quality (%)'
  const events = data.map(element => new TimeRangeEvent(
    createTimeRange(element.start, element.end),
    {
      value: prepareSleepQuality(element.sleepQuality)
    }
  ))

  return new TimeSeries({name, events})
}

const convertMoodDataToTimeSeries = data => {
  const name = 'Mood Data'
  const events = data.map(element => new TimeEvent(
    moment(`${element.full_date} ${element.time.replace('.', ':')}`, timeFormat),
    {
      ...element
    }
  ))

  return new TimeSeries({name, events})
}

const prepareData = () => {
  const preparedSleepData = prepareSleepData(sleepData)
  const preparedMoodData = prepareMoodData(moodData)
  const timeInBedTimeSeries = convertTimeInBedToTimeSeries(preparedSleepData)
  const stepCountTimeSeries = convertStepCountToTimeSeries(preparedSleepData)
  const sleepQualityTimeSeries = convertSleepQualityToTimeSeries(preparedSleepData)
  const moodDataTimeSeries = convertMoodDataToTimeSeries(preparedMoodData)
  return [timeInBedTimeSeries, stepCountTimeSeries, sleepQualityTimeSeries, moodDataTimeSeries]
}

// eslint-disable-next-line import/prefer-default-export
export {prepareData}
