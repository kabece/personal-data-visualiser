import React from 'react'
import {func} from 'prop-types'

import Select from '../select/select.presenter'
import {optionsShape} from '../../index.shapes'

const ChartControls = ({
  dataSourceOptions,
  chartTypeOptions,
  timeRangeSourceOptions,
  onDataSourceSelect,
  onChartTypeSelect,
  onTimeRangeSourceSelect
}) => (
  <div>
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
  </div>
)

ChartControls.propTypes = {
  dataSourceOptions: optionsShape.isRequired,
  chartTypeOptions: optionsShape.isRequired,
  timeRangeSourceOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired,
  onTimeRangeSourceSelect: func.isRequired
}

export default ChartControls
