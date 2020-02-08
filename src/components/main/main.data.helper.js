import moment from 'moment'
import {TimeSeries, TimeEvent} from 'pondjs'

import sleepData from '../../data/sleepData.json'
import moodData from '../../data/moodData.json'

const timeFormat = 'YYYY-MM-DD HH:mm:ss'

// const createTimeRange = (beginTime, endTime) => new TimeRange(
//   moment(beginTime, timeFormat),
//   moment(endTime, timeFormat)
// )

const prepareTimeInBed = timeInBed => Number(timeInBed.split(':')[0]) + Number(timeInBed.split(':')[1]) / 60
const prepareSleepQuality = sleepQuality => Number(sleepQuality.slice(0, -1))

// more generic mood ratings
// const moodMappings = {
//   rad: 5,
//   excited: 5,
//   good: 4,
//   hopeful: 4,
//   confident: 4,
//   motivated: 4,
//   calm: 4,
//   meh: 3,
//   normal: 3,
//   uneasy: 3,
//   'putting up a fight': 3,
//   tired: 3,
//   confused: 3,
//   bad: 2,
//   'emotionally tired': 2,
//   lonely: 2,
//   demotivated: 2,
//   awful: 1,
//   'emotional hijacking': 1
// }

const moodMappings = {
  rad: 19,
  excited: 18,
  good: 17,
  hopeful: 16,
  confident: 15,
  motivated: 14,
  calm: 13,
  meh: 12,
  normal: 11,
  uneasy: 10,
  'putting up a fight': 9,
  tired: 8,
  confused: 7,
  bad: 6,
  'emotionally tired': 5,
  lonely: 4,
  demotivated: 3,
  awful: 2,
  'emotional hijacking': 1
}

const moodGroupMappings = {
  rad: 'amazing',
  excited: 'amazing',
  good: 'good',
  hopeful: 'good',
  confident: 'good',
  motivated: 'good',
  calm: 'good',
  meh: 'normal',
  normal: 'normal',
  uneasy: 'normal',
  'putting up a fight': 'normal',
  tired: 'normal',
  confused: 'normal',
  bad: 'bad',
  'emotionally tired': 'bad',
  lonely: 'bad',
  demotivated: 'awful',
  awful: 'awful',
  'emotional hijacking': 'awful'
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
    mood: element.mood,
    value: moodMappings[element.mood],
    moodGroup: moodGroupMappings[element.mood],
    activities: element.activities.split('|').map(value => value.trim())
  }))

const convertTimeInBedToTimeSeries = data => {
  const name = 'Time in Bed'
  const events = data.map(element => new TimeEvent(
    moment(element.start),
    {
      value: prepareTimeInBed(element.timeInBed)
    }
  ))

  return new TimeSeries({name, events})
}

const convertStepCountToTimeSeries = data => {
  const name = 'Step Count'
  const events = data.map(element => new TimeEvent(
    moment(element.start),
    {
      value: element.activity
    }
  ))

  return new TimeSeries({name, events})
}

const convertSleepQualityToTimeSeries = data => {
  const name = 'Sleep Quality (%)'
  const events = data.map(element => new TimeEvent(
    moment(element.start),
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
