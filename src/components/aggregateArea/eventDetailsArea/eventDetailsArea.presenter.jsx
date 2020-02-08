import React, {Fragment} from 'react'
import {instanceOf, object, arrayOf} from 'prop-types'

import SelectedEventTable from './selectedEventTable/selectedEventTable.presenter'

const EventDetailsArea = ({
  selectedEventTime,
  data
}) => {
  const formattedSelectedEventTime = `${selectedEventTime.getFullYear()}-${selectedEventTime.getMonth() + 1}-${selectedEventTime.getDate()}`
  const selectedEventData = data[3].toJSON().points.filter(point => point[1] === formattedSelectedEventTime)

  console.log(selectedEventData, formattedSelectedEventTime)

  return (
    <Fragment>
      <div className='eventDetailsHeader'>
        <div>Selected event details for: </div>
        <div>{new Date(selectedEventTime).toDateString()}</div>
      </div>
      <div className='eventDetailsArea'>
        <div className='selectedEvent'>
          <SelectedEventTable selectedEventData={selectedEventData} />
        </div>
        <div>
    On that day
        </div>
      </div>
    </Fragment>
  )
}

EventDetailsArea.propTypes = {
  selectedEventTime: instanceOf(Date).isRequired,
  data: arrayOf(object)
}

export default EventDetailsArea
