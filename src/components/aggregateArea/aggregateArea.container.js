import React, {useEffect} from 'react'
import {objectOf, func} from 'prop-types'
import {connect} from 'react-redux'

import AggregateChart from './aggregateChart/aggregateChart.presenter'
import AggregatePlaceholder from './aggregatePlaceholder/aggregatePlaceholder.presenter'
import {setDataSource} from '../../actionCreators'
import selector from '../../selector'
import {chartShape, optionsShape} from '../../index.shapes'

const AggregateArea = ({
  charts,
  dataSourceOptions,
  onDataSourceSelect
}) => {
  useEffect(() => {
    onDataSourceSelect({
      dataSourceOption: dataSourceOptions.filter(option => option.value === 'Step Count')[0],
      chartId: 'aggregated'
    })
  }, [])

  const aggregateChart = charts.aggregated

  return (
    <div className='aggregateArea'>
      {aggregateChart ? <AggregateChart chart={aggregateChart} /> : <AggregatePlaceholder />}
    </div>
  )
}

AggregateArea.propTypes = {
  charts: objectOf(chartShape).isRequired,
  dataSourceOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onDataSourceSelect: ({dataSourceOption, chartId}) => dispatch(setDataSource({dataSourceOption, chartId}))
})

export default connect(selector, mapDispatchToProps)(AggregateArea)
