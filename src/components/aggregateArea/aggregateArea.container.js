import React from 'react'
import {objectOf} from 'prop-types'
import {connect} from 'react-redux'

import AggregateChart from './aggregateChart/aggregateChart.presenter'
import AggregatePlaceholder from './aggregatePlaceholder/aggregatePlaceholder.presenter'
import selector from '../../selector'
import {chartShape} from '../../index.shapes'

const AggregateArea = ({
  charts
}) => {
  const aggregateChart = Object.keys(charts).filter(key => charts[key].title === 'Mood').map(key => charts[key])[0]

  return (
    <div className='aggregateArea'>
      {aggregateChart ? <AggregateChart chart={aggregateChart} /> : <AggregatePlaceholder />}
    </div>
  )
}

AggregateArea.propTypes = {
  charts: objectOf(chartShape).isRequired
}

export default connect(selector)(AggregateArea)
