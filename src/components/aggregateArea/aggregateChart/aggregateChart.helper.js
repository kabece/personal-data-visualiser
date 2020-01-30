import {avg} from 'pondjs'
import {groupBy, countBy} from 'lodash'

export const convertAggregateMoodDataToCalendarFormat = ({aggregateMoodData}) =>
  aggregateMoodData.dataSeries.dailyRollup({aggregation: {value: {value: avg()}}}).toJSON().points.map(element => ({
    day: element[0],
    value: Number(element[1].toFixed(2))
  }))

export const convertAggregateMoodDataToHeatMapFormat = ({aggregateMoodData}) => {
  const groupedByWeekday = groupBy(aggregateMoodData.dataSeries.toJSON().points, value => value[3])
  return Object.keys(groupedByWeekday).map(key => ({weekday: key, ...countBy(groupedByWeekday[key], value => value[5])}))
}

