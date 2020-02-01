import React, {useEffect} from 'react'
import {objectOf, func} from 'prop-types'
import {connect} from 'react-redux'

import AggregateChart from './aggregateChart/aggregateChart.presenter'
import AggregateControls from './aggregateControls/aggregateControls.presenter'
import AggregatePlaceholder from './aggregatePlaceholder/aggregatePlaceholder.presenter'
import {setDataSource, setChartType, setTimeRangeSource} from '../../actionCreators'
import selector from '../../selector'
import {chartShape, optionsShape} from '../../index.shapes'

const AggregateArea = ({
  charts,
  aggregateChartTypeOptions,
  timeRangeSourceOptions,
  dataSourceOptions,
  onDataSourceSelect,
  onChartTypeSelect,
  onTimeRangeSourceSelect
}) => {
  useEffect(() => {
    onDataSourceSelect({
      dataSourceOption: dataSourceOptions.filter(option => option.value === 'Mood')[0],
      chartId: 'aggregate1'
    })
    onDataSourceSelect({
      dataSourceOption: dataSourceOptions.filter(option => option.value === 'Mood')[0],
      chartId: 'aggregate2'
    })
  }, [dataSourceOptions, onDataSourceSelect])

  return (
    <div className='aggregateArea'>
      <AggregateControls
        chartTypeOptions={aggregateChartTypeOptions}
        timeRangeSourceOptions={timeRangeSourceOptions}
        onChartTypeSelect={onChartTypeSelect}
        onTimeRangeSourceSelect={onTimeRangeSourceSelect}
      />
      <div className='aggregateCharts'>
        {charts.aggregate1?.chartType ? <AggregateChart chart={charts.aggregate1} /> : <AggregatePlaceholder />}
        {charts.aggregate2?.chartType ? <AggregateChart chart={charts.aggregate2} /> : <AggregatePlaceholder />}
      </div>
    </div>
  )
}

AggregateArea.propTypes = {
  charts: objectOf(chartShape).isRequired,
  aggregateChartTypeOptions: optionsShape.isRequired,
  timeRangeSourceOptions: optionsShape.isRequired,
  dataSourceOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired,
  onTimeRangeSourceSelect: func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onDataSourceSelect: ({dataSourceOption, chartId}) => dispatch(setDataSource({dataSourceOption, chartId})),
  onChartTypeSelect: ({chartTypeOption, chartId}) => dispatch(setChartType({chartTypeOption, chartId})),
  onTimeRangeSourceSelect: ({timeRangeSourceOption, chartId}) => dispatch(setTimeRangeSource({timeRangeSourceOption, chartId})),
})

export default connect(selector, mapDispatchToProps)(AggregateArea)
