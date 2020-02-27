import React from 'react'
import {func} from 'prop-types'

import Select from '../../../statelessComponents/select/select.presenter'
import {optionsShape} from '../../../index.shapes'

const AggregateControls = ({
  timeRangeSourceOptions,
  onTimeRangeSourceSelect
}) => (
  <div className='aggregateControls'>
    <div className='topRow'>
      <Select
        options={timeRangeSourceOptions}
        label='Time Range: '
        onChange={({selectedValue}) => {
          onTimeRangeSourceSelect({
            chartId: 'aggregate1',
            timeRangeSourceOption: timeRangeSourceOptions.find(option => option.value === selectedValue)
          })
          onTimeRangeSourceSelect({
            chartId: 'aggregate2',
            timeRangeSourceOption: timeRangeSourceOptions.find(option => option.value === selectedValue)
          })
        }}
      />
    </div>
  </div>
)

AggregateControls.propTypes = {
  timeRangeSourceOptions: optionsShape.isRequired,
  onTimeRangeSourceSelect: func.isRequired
}

export default AggregateControls
