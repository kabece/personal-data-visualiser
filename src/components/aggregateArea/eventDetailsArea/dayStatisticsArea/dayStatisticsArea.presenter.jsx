import React from 'react'
import {object, arrayOf, string} from 'prop-types'

const DayStatisticsArea = ({formattedSelectedEventTime, data}) => {
  const findElement = points => points.filter(point => {
    const pointDate = new Date(point[0])
    const formattedDate = `${pointDate.getFullYear()}-${pointDate.getMonth() + 1}-${pointDate.getDate()}`
    return formattedDate === formattedSelectedEventTime
  })[0][1].toFixed(2)

  return (
    <div className='dayStatisticsArea'>
      {data.filter(_ => _.name() !== 'Mood').map(element => (
        <div key={element.name()} className='dayStatisticsRow'>
          <div className='averageValue'>
            <div>{`The average value of ${element.name()} is:`}</div>
            <div>{element.avg().toFixed(2)}</div>
          </div>
          <div className='onThisDayValue'>
            <div>On this day you have registered:</div>
            <div>{findElement(element.toJSON().points)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
DayStatisticsArea.propTypes = {
  formattedSelectedEventTime: string.isRequired,
  data: arrayOf(object).isRequired
}

export default DayStatisticsArea
