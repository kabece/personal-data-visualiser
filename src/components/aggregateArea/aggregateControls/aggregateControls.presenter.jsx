import React from 'react'
import {func} from 'prop-types'

import Select from '../../../statelessComponents/select/select.presenter'
import {optionsShape} from '../../../index.shapes'

const AggregateControls = ({
  chartTypeOptions,
  timeRangeSourceOptions,
  onChartTypeSelect,
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
    <div className='bottomRow'>
      <Select
        options={chartTypeOptions}
        label='Chart Type: '
        onChange={({selectedValue}) =>
          onChartTypeSelect({
            chartId: 'aggregate1',
            chartTypeOption: chartTypeOptions.find(option => option.value === selectedValue)
          })}
      />
      <Select
        options={chartTypeOptions}
        label='Chart Type: '
        onChange={({selectedValue}) =>
          onChartTypeSelect({
            chartId: 'aggregate2',
            chartTypeOption: chartTypeOptions.find(option => option.value === selectedValue)
          })}
      />
    </div>
  </div>
)

AggregateControls.propTypes = {
  chartTypeOptions: optionsShape.isRequired,
  timeRangeSourceOptions: optionsShape.isRequired,
  onChartTypeSelect: func.isRequired,
  onTimeRangeSourceSelect: func.isRequired
}

export default AggregateControls
