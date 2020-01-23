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
  onShowBaselines,
  onSetTimeRange
}) => (
  <div className='chartContainer'>
    <ChartControls
      dataSourceOptions={dataSourceOptions}
      chartTypeOptions={chartTypeOptions}
      timeRangeSourceOptions={timeRangeSourceOptions}
      areBaselinesVisible={chart.areBaselinesVisible}
      onDataSourceSelect={onDataSourceSelect}
      onChartTypeSelect={onChartTypeSelect}
      onShowBaselines={onShowBaselines}
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
  onShowBaselines: func.isRequired,
  onSetTimeRange: func.isRequired
}

export default ChartContainer
