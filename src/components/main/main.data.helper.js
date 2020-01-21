import moment from 'moment'
import {TimeRange, TimeSeries, TimeRangeEvent, TimeEvent} from 'pondjs'
import {groupBy} from 'lodash'

import sleepData from '../../data/sleepData.json'
import moodData from '../../data/moodData.json'

const timeFormat = 'YYYY-MM-DD HH:mm:ss'

const createTimeRange = (beginTime, endTime) => new TimeRange(
  moment(beginTime, timeFormat),
  moment(endTime, timeFormat)
)

const prepareTimeInBed = timeInBed => Number(timeInBed.split(':')[0]) + Number(timeInBed.split(':')[1]) / 60
const prepareSleepQuality = sleepQuality => Number(sleepQuality.slice(0, -1))

const moodMappings = {
  rad: 5,
  excited: 5,
  good: 4,
  hopeful: 4,
  confident: 4,
  motivated: 4,
  calm: 4,
  meh: 3,
  normal: 3,
  uneasy: 3,
  'putting up a fight': 3,
  tired: 3,
  confused: 3,
  bad: 2,
  'emotionally tired': 2,
  lonely: 2,
  demotivated: 2,
  awful: 1,
  'emotional hijacking': 1
}

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
    value: moodMappings[element.mood],
    activities: element.activities.split('|').map(value => value.trim())
  }))

const aggregateMoodData = data =>
  Object.values(groupBy(data, 'full_date'))
    .map(element => ({
      full_date: element[0].full_date,
      value: element.map(_ => _.value).reduce((left, right) => left + right, 0) / element.length
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
  const name = 'Mood'
  const events = data.map(element => new TimeEvent(
    moment(`${element.full_date} ${element.time.replace('.', ':')}`, timeFormat),
    {
      ...element
    }
  ))

  return new TimeSeries({name, events})
}

const convertAggregatedMoodDataToTimeSeries = data => {
  const name = 'Mood (Aggregated)'
  const events = data.map(element => new TimeEvent(
    moment(element.full_date, 'YYYY-MM-DD'),
    {
      ...element
    }
  ))

  return new TimeSeries({name, events})
}

const prepareData = () => {
  const preparedSleepData = prepareSleepData(sleepData)
  const preparedMoodData = prepareMoodData(moodData)
  const aggregatedMoodData = aggregateMoodData(preparedMoodData)
  const timeInBedTimeSeries = convertTimeInBedToTimeSeries(preparedSleepData)
  const stepCountTimeSeries = convertStepCountToTimeSeries(preparedSleepData)
  const sleepQualityTimeSeries = convertSleepQualityToTimeSeries(preparedSleepData)
  const moodDataTimeSeries = convertMoodDataToTimeSeries(preparedMoodData)
  const aggregaredMoodDataTimeSeries = convertAggregatedMoodDataToTimeSeries(aggregatedMoodData)
  return [timeInBedTimeSeries, stepCountTimeSeries, sleepQualityTimeSeries, moodDataTimeSeries, aggregaredMoodDataTimeSeries]
}

// eslint-disable-next-line import/prefer-default-export
export {prepareData}
