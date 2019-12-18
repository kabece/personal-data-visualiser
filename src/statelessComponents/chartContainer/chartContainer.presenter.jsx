import React from 'react'
import {node, func} from 'prop-types'

import ChartControls from '../chartControls/chartControls.presenter'
import {optionsShape} from '../../index.shapes'

const ChartContainer = ({
  children,
  dataSourceOptions,
  chartTypeOptions,
  onDataSourceSelect,
  onChartTypeSelect
}) => (
  <div>
    <ChartControls
      dataSourceOptions={dataSourceOptions}
      chartTypeOptions={chartTypeOptions}
      onDataSourceSelect={onDataSourceSelect}
      onChartTypeSelect={onChartTypeSelect}
    />
    {children}
  </div>
)

ChartContainer.propTypes = {
  children: node.isRequired,
  dataSourceOptions: optionsShape.isRequired,
  chartTypeOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired
}

export default ChartContainer
