import React from 'react'
import {func, bool} from 'prop-types'

import Select from '../../../../statelessComponents/select/select.presenter'
import CheckBox from '../../../../statelessComponents/checkBox/checkBox.presenter'
import {optionsShape} from '../../../../index.shapes'

const AggregateControls = ({
  aggregateSourceOptions,
  chartTypeOptions,
  areBaselinesVisible,
  onAggregateSourceSelect,
  onChartTypeSelect,
  onShowBaselines
}) => (
  <div className='aggregateControls'>
    <Select
      options={aggregateSourceOptions}
      label='Aggregate Source: '
      onChange={onAggregateSourceSelect}
    />
    <Select
      options={chartTypeOptions}
      label='Chart Type: '
      onChange={onChartTypeSelect}
    />
    <CheckBox
      label='Show baselines: '
      isChecked={areBaselinesVisible}
      onChange={onShowBaselines}
    />
  </div>
)

AggregateControls.propTypes = {
  aggregateSourceOptions: optionsShape.isRequired,
  chartTypeOptions: optionsShape.isRequired,
  areBaselinesVisible: bool.isRequired,
  onAggregateSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired,
  onShowBaselines: func.isRequired
}

export default AggregateControls
