/* eslint-disable import/prefer-default-export */
export const convertAggregateMoodDataToCalendarFormat = ({aggregateMoodData}) =>
  aggregateMoodData.dataSeries.toJSON().points.map(element => ({
    day: element[1],
    value: Number((element[2].reduce((left, right) => left + right, 0) / element[2].size).toFixed(2))
  }))

