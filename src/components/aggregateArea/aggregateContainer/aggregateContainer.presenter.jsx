import React from 'react'
import {objectOf} from 'prop-types'
import {connect} from 'react-redux'

import AggregateControls from './aggregateControls/aggregateControls.presenter'
import AggregatePlaceholder from './aggregatePlaceholder/aggregatePlaceholder.presenter'
import mainSelector from '../../../selector'
import {optionsShape, chartShape} from '../../../index.shapes'

const AggregateContainer = ({
  charts,
  dataSourceOptions,
  chartTypeOptions,
  timeRangeSourceOptions
}) => (
  <div className='aggregateContainer'>
    {/* <AggregateControls
      aggregateSourceOptions={dataSourceOptions}
    /> */}
    <AggregatePlaceholder />
  </div>
)

AggregateContainer.propTypes = {
  charts: objectOf(chartShape).isRequired,
  dataSourceOptions: optionsShape.isRequired,
  chartTypeOptions: optionsShape.isRequired,
  timeRangeSourceOptions: optionsShape.isRequired,
}

export default connect(mainSelector)(AggregateContainer)
