import React from 'react'
import {func, bool} from 'prop-types'

import Select from '../../../../statelessComponents/select/select.presenter'
import CheckBox from '../../../../statelessComponents/checkBox/checkBox.presenter'
import {optionsShape} from '../../../../index.shapes'

const ChartControls = ({
  dataSourceOptions,
  chartTypeOptions,
  timeRangeSourceOptions,
  areBaselinesVisible,
  onDataSourceSelect,
  onChartTypeSelect,
  onTimeRangeSourceSelect,
  onShowBaselines
}) => (
  <div className='chartControls'>
    <Select
      options={dataSourceOptions}
      label='Data Source: '
      onChange={onDataSourceSelect}
    />
    <Select
      options={chartTypeOptions}
      label='Chart Type: '
      onChange={onChartTypeSelect}
    />
    <Select
      options={timeRangeSourceOptions}
      label='Time Range: '
      onChange={onTimeRangeSourceSelect}
    />
    <CheckBox
      label='Show baselines:'
      isChecked={areBaselinesVisible}
      onChange={onShowBaselines}
    />
  </div>
)

ChartControls.propTypes = {
  dataSourceOptions: optionsShape.isRequired,
  chartTypeOptions: optionsShape.isRequired,
  timeRangeSourceOptions: optionsShape.isRequired,
  areBaselinesVisible: bool,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired,
  onTimeRangeSourceSelect: func.isRequired,
  onShowBaselines: func.isRequired
}

export default ChartControls
