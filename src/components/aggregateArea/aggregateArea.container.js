import React, {useEffect} from 'react'
import {objectOf, func} from 'prop-types'
import {connect} from 'react-redux'

import AggregateChart from './aggregateChart/aggregateChart.presenter'
import AggregateControls from './aggregateControls/aggregateControls.presenter'
import AggregatePlaceholder from './aggregatePlaceholder/aggregatePlaceholder.presenter'
import {setDataSource, setChartType} from '../../actionCreators'
import selector from '../../selector'
import {chartShape, optionsShape} from '../../index.shapes'

const AggregateArea = ({
  charts,
  aggregateChartTypeOptions,
  dataSourceOptions,
  onDataSourceSelect,
  onChartTypeSelect
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
      <div className='aggregateBlock'>
        <AggregateControls
          chartTypeOptions={aggregateChartTypeOptions}
          onChartTypeSelect={({selectedValue}) =>
            onChartTypeSelect({
              chartId: 'aggregate1',
              chartTypeOption: aggregateChartTypeOptions.find(option => option.value === selectedValue)
            })}
        />
        {charts.aggregate1?.chartType ? <AggregateChart chart={charts.aggregate1} /> : <AggregatePlaceholder />}
      </div>
      <div className='aggregateBlock'>
        <AggregateControls
          chartTypeOptions={aggregateChartTypeOptions}
          onChartTypeSelect={({selectedValue}) =>
            onChartTypeSelect({
              chartId: 'aggregate2',
              chartTypeOption: aggregateChartTypeOptions.find(option => option.value === selectedValue)
            })}
        />
        {charts.aggregate2?.chartType ? <AggregateChart chart={charts.aggregate2} /> : <AggregatePlaceholder />}
      </div>
    </div>
  )
}

AggregateArea.propTypes = {
  charts: objectOf(chartShape).isRequired,
  aggregateChartTypeOptions: optionsShape.isRequired,
  dataSourceOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onDataSourceSelect: ({dataSourceOption, chartId}) => dispatch(setDataSource({dataSourceOption, chartId})),
  onChartTypeSelect: ({chartTypeOption, chartId}) => dispatch(setChartType({chartTypeOption, chartId}))
})

export default connect(selector, mapDispatchToProps)(AggregateArea)
