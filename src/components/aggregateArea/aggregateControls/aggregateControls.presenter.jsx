import React from 'react'
import {func} from 'prop-types'

import Select from '../../../statelessComponents/select/select.presenter'
import {optionsShape} from '../../../index.shapes'

const AggregateControls = ({chartTypeOptions, onChartTypeSelect}) => (
  <div className='aggregateControls'>
    <Select
      options={chartTypeOptions}
      label='Chart Type: '
      onChange={onChartTypeSelect}
    />
  </div>
)

AggregateControls.propTypes = {
  chartTypeOptions: optionsShape.isRequired,
  onChartTypeSelect: func.isRequired
}

export default AggregateControls
