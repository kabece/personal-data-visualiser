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
      {data.filter(_ => _.name() !== 'Mood').map(element => {
        const average = element.avg().toFixed(2)
        const valueForSelectedDay = findElement(element.toJSON().points)
        const difference = ((valueForSelectedDay - average) / average * 100).toFixed(2)

        return (
          <div key={element.name()} className='dayStatisticsRow'>
            <div>
              <span>{`Your ${element.name()} was `}</span>
              <span className='value'>{`${element.avg().toFixed(3)}`}</span>
            </div>
            <div>
              <span>which is</span>
              <span className={`difference ${difference > 0 ? 'positive' : 'negative'}`}>{` ${difference.toString().replace('-', '')}% ${difference > 0 ? 'higher' : 'lower'}`}</span>
            </div>
            <div>
              <span>than the average (</span>
              <span className='average'>{`${average})`}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
DayStatisticsArea.propTypes = {
  formattedSelectedEventTime: string.isRequired,
  data: arrayOf(object).isRequired
}

export default DayStatisticsArea
