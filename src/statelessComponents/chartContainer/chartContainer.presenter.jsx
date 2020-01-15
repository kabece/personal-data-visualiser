import React from 'react'
import {func} from 'prop-types'

import ChartControls from '../chartControls/chartControls.presenter'
import ChartTypeSwitcher from './chartTypeSwitcher/chartTypeSwitcher.presenter'
import {optionsShape, chartShape} from '../../index.shapes'

const ChartContainer = ({
  chart,
  dataSourceOptions,
  chartTypeOptions,
  onDataSourceSelect,
  onChartTypeSelect,
  onSetTimeRange
}) => (
  <div>
    <ChartControls
      dataSourceOptions={dataSourceOptions}
      chartTypeOptions={chartTypeOptions}
      onDataSourceSelect={onDataSourceSelect}
      onChartTypeSelect={onChartTypeSelect}
    />
    <ChartTypeSwitcher
      chart={chart}
      onSetTimeRange={onSetTimeRange}
    />
  </div>
)

ChartContainer.propTypes = {
  chart: chartShape,
  dataSourceOptions: optionsShape.isRequired,
  chartTypeOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired,
  onSetTimeRange: func.isRequired
}

export default ChartContainer
