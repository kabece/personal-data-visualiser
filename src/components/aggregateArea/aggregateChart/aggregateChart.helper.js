import {avg} from 'pondjs'

export const convertAggregateMoodDataToCalendarFormat = ({aggregateMoodData}) =>
  aggregateMoodData.dataSeries.dailyRollup({aggregation: {value: {value: avg()}}}).toJSON().points.map(element => ({
    day: element[0],
    value: Number(element[1].toFixed(2))
  }))

export const convertAggregateMoodDataToHeatMapFormat = ({aggregateMoodData}) => {
  console.log('a', aggregateMoodData.dataSeries.toJSON())
}

