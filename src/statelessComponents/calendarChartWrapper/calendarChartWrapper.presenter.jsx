import React from 'react'
import {arrayOf, shape, string, oneOfType, number} from 'prop-types'
import {ResponsiveCalendar} from '@nivo/calendar'

import {timeRangeShape} from '../../index.shapes'

const CalendarChartWrapper = ({data, timeRange}) => (
  <ResponsiveCalendar
    data={data}
    from={timeRange.begin()}
    to={timeRange.end()}
    emptyColor='#eeeeee'
    colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
    margin={{top: 40, right: 40, bottom: 40, left: 40}}
    yearSpacing={40}
    monthBorderColor='#000000'
    dayBorderWidth={1}
    dayBorderColor='#000000'
    monthBorderWidth={1}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'row',
        translateY: 36,
        itemCount: 4,
        itemWidth: 42,
        itemHeight: 36,
        itemsSpacing: 14,
        itemDirection: 'right-to-left'
      }
    ]}
  />
)

CalendarChartWrapper.propTypes = {
  data: arrayOf(shape({
    day: string.isRequired,
    value: oneOfType([number, string]).isRequired
  })).isRequired,
  timeRange: timeRangeShape.isRequired
}

export default CalendarChartWrapper
