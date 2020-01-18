import React from 'react'
import {func} from 'prop-types'

import ChartControls from './chartControls/chartControls.presenter'
import ChartTypeSwitcher from './chartTypeSwitcher/chartTypeSwitcher.presenter'
import {optionsShape, chartShape} from '../../index.shapes'

const ChartContainer = ({
  chart,
  dataSourceOptions,
  chartTypeOptions,
  timeRangeSourceOptions,
  onDataSourceSelect,
  onChartTypeSelect,
  onTimeRangeSourceSelect,
  onSetTimeRange
}) => (
  <div className='chartContainer'>
    <ChartControls
      dataSourceOptions={dataSourceOptions}
      chartTypeOptions={chartTypeOptions}
      timeRangeSourceOptions={timeRangeSourceOptions}
      onDataSourceSelect={onDataSourceSelect}
      onChartTypeSelect={onChartTypeSelect}
      onTimeRangeSourceSelect={onTimeRangeSourceSelect}
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
  timeRangeSourceOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired,
  onTimeRangeSourceSelect: func.isRequired,
  onSetTimeRange: func.isRequired
}

export default ChartContainer
