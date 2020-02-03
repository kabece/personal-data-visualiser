import {groupBy, countBy} from 'lodash'

import {ROLLUP_TYPES} from '../../index.shapes'

const heatMapKeysMood = ['rad', 'excited', 'good', 'hopeful', 'confident', 'motivated', 'calm', 'meh', 'normal', 'uneasy', 'putting up a fight', 'tired', 'confused', 'bad', 'emotionally tired', 'lonely', 'demotivated', 'awful', 'emotional hijacking']
const heatMapKeysMoodGroups = ['amazing', 'good', 'normal', 'bad', 'awful']
const {DAILY, WEEKLY, MONTHLY} = ROLLUP_TYPES


const fillInEmptyGroupings = (group, isDetailedView) =>
  Object.fromEntries((isDetailedView ? heatMapKeysMood : heatMapKeysMoodGroups)
    .map(element => [[element], group[element] || 0]))

const groupMoodDataByRollupType = (dataInTimeRange, rollupType) => {
  switch (rollupType) {
    case DAILY:
      return groupBy(dataInTimeRange.toJSON().points, value => value[2].split(' ')[0])
    case WEEKLY:
      return groupBy(dataInTimeRange.toJSON().points, value => value[3])
    case MONTHLY:
      return groupBy(dataInTimeRange.toJSON().points, value => value[2].split(' ')[1])
    default:
      return null
  }
}

export const convertAggregateMoodDataToHeatMapFormat = ({aggregateMoodData, isDetailedView = false, rollupType}) => {
  const dataInTimeRange = aggregateMoodData.dataSeries.crop(aggregateMoodData.timeRange)
  const moodDataGroupedByRollupType = groupMoodDataByRollupType(dataInTimeRange, rollupType)
  const groupByMoodInWeekday = Object.keys(moodDataGroupedByRollupType)
    .map(key => ({
      weekday: key,
      ...countBy(moodDataGroupedByRollupType[key], value => value[isDetailedView ? 5 : 8])
    }))
    .map(group => ({
      ...group,
      ...fillInEmptyGroupings(group, isDetailedView)
    }))
  const keys = isDetailedView ? heatMapKeysMood : heatMapKeysMoodGroups
  return {
    keys,
    values: groupByMoodInWeekday
  }
}
