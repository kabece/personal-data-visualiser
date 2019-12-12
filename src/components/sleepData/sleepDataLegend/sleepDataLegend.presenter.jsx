import React from 'react'
import {object} from 'prop-types'
import {Legend} from 'react-timeseries-charts'

const legendCategories = [
  {
    key: 'requests',
    label: 'Requests',
    disabled: false
  },
  {
    key: 'connections',
    label: 'Connections',
    disabled: false
  }
]

const SleepDataLegend = ({styler}) => (
  <Legend
    type='line'
    style={styler}
    categories={legendCategories}
    onSelectionChange={() => console.log('Legend Click')}
  />
)

SleepDataLegend.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  styler: object.isRequired
}

export default SleepDataLegend
