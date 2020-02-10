import React, {useState} from 'react'
import {instanceOf} from 'prop-types'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'

import geolocationData from '../../../../data/locationData.json'

const GeolocationDisplay = ({selectedEventTime}) => {
  const [overlay, setOverlay] = useState(null)

  const locationsForSelectedDay = geolocationData.locations.filter(location =>
    new Date(parseInt(location.timestampMs, 10)).setHours(0, 0, 0, 0) === selectedEventTime.setHours(0, 0, 0, 0))

  // eslint-disable-next-line id-length
  const mapTilerProvider = (x, y, z) => `https://api.maptiler.com/maps/streets/${z}/${x}/${y}.png?key=ZfN84VoddPEHGTdMW1xw`

  const getCoordinatesForLocation = location => [location.latitudeE7 / 10000000, location.longitudeE7 / 10000000]

  const getFormattedTimeFromTimestamp = timestamp => {
    const date = new Date(parseInt(timestamp, 10))
    return `${date.getHours()}:${date.getMinutes()}`
  }

  return (
    <div className='geolocationDisplay'>
      <div className='geolocationHeader'>
        Your location history
      </div>
      <Map
        defaultCenter={getCoordinatesForLocation(locationsForSelectedDay[Math.floor(locationsForSelectedDay.length / 2)])}
        defaultZoom={12}
        provider={mapTilerProvider}
      >
        {locationsForSelectedDay.map((location, index) => (
          <Marker
            key={location.timestampMs}
            anchor={getCoordinatesForLocation(location)}
            payload={index}
            onClick={() => setOverlay(location)}
          />
        ))}
        {overlay && (
          <Overlay
            anchor={getCoordinatesForLocation(overlay)}
            offset={[-30, 30]}
          >
            <div className='markerOverlay'>
              {getFormattedTimeFromTimestamp(overlay.timestampMs)}
            </div>
          </Overlay>
        )}
      </Map>
    </div>
  )
}

GeolocationDisplay.propTypes = {
  selectedEventTime: instanceOf(Date).isRequired
}

export default GeolocationDisplay
