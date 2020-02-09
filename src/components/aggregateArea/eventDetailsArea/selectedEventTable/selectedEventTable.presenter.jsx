import React from 'react'
import {array} from 'prop-types'

const SelectedEventTable = ({selectedEventData}) => (
  <div className='selectedEventTable'>
    <div className='headers'>
      <div>Time</div>
      <div>Mood</div>
      <div>Activities</div>
    </div>
    {selectedEventData.map(row => (
      <div key={row[0]} className='row'>
        <div>{row[4]}</div>
        <div>{row[5]}</div>
        <div>{row[6].join(' | ')}</div>
      </div>
    ))}
  </div>
)

SelectedEventTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  selectedEventData: array.isRequired
}

export default SelectedEventTable
