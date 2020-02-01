import {avg} from 'pondjs'

export const convertAggregateMoodDataToCalendarFormat = ({aggregateMoodData}) => {
  const dataInTimeRange = aggregateMoodData.dataSeries.crop(aggregateMoodData.timeRange)
  const dataAggregatedByDay = dataInTimeRange.dailyRollup({aggregation: {value: {value: avg()}}}).toJSON().points
  return dataAggregatedByDay.map(element => ({
    day: element[0],
    value: Number(element[1].toFixed(2))
  }))
}
