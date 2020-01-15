import React from 'react'
import {func, oneOf} from 'prop-types'

import ChartControls from '../chartControls/chartControls.presenter'
import ChartTypeSwitcher from './chartTypeSwitcher/chartTypeSwitcher.presenter'
import {optionsShape, chartTypes, timeRangeShape, chartShape} from '../../index.shapes'

const ChartContainer = ({
  chart,
  chartType,
  dataSourceOptions,
  chartTypeOptions,
  onDataSourceSelect,
  onChartTypeSelect,
  primaryTimeRange,
  onSetPrimaryTimeRange
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
      chartType={chartType}
      primaryTimeRange={primaryTimeRange}
      onSetPrimaryTimeRange={onSetPrimaryTimeRange}
    />
  </div>
)

ChartContainer.propTypes = {
  chart: chartShape,
  chartType: oneOf([chartTypes.lineChart]),
  primaryTimeRange: timeRangeShape,
  dataSourceOptions: optionsShape.isRequired,
  chartTypeOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired,
  onSetPrimaryTimeRange: func.isRequired
}

export default ChartContainer
