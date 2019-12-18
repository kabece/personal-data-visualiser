import React from 'react'
import {func} from 'prop-types'

import Select from '../select/select.presenter'
import {optionsShape} from '../../index.shapes'

const ChartControls = ({
  dataSourceOptions,
  chartTypeOptions,
  onDataSourceSelect,
  onChartTypeSelect
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
  </div>
)

ChartControls.propTypes = {
  dataSourceOptions: optionsShape.isRequired,
  chartTypeOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired
}

export default ChartControls
