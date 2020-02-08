import React, {useEffect} from 'react'
import {objectOf, func, instanceOf, object, arrayOf} from 'prop-types'
import {connect} from 'react-redux'

import AggregateChart from './aggregateChart/aggregateChart.presenter'
import AggregateControls from './aggregateControls/aggregateControls.presenter'
import AggregatePlaceholder from './aggregatePlaceholder/aggregatePlaceholder.presenter'
import EventDetailsArea from './eventDetailsArea/eventDetailsArea.presenter'
import MultiChartWrapper from '../../statelessComponents/multiChartWrapper/multiChartWrapper.presenter'
import {setDataSource, setChartType, setTimeRangeSource, selectEventTime} from '../../actionCreators'
import selector from '../../selector'
import {chartShape, optionsShape} from '../../index.shapes'

const AggregateArea = ({
  selectedEventTime,
  charts,
  data,
  aggregateChartTypeOptions,
  timeRangeSourceOptions,
  dataSourceOptions,
  onDataSourceSelect,
  onChartTypeSelect,
  onTimeRangeSourceSelect,
  onSelectEventTime
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
      <div className='multiChart'>
        {(charts[1]?.chartType && charts[2]?.chartType)
          ? (
            <MultiChartWrapper
              leftChart={charts[1]}
              rightChart={charts[2]}
              scatterChart={charts.aggregate1}
              onSelectEventTime={onSelectEventTime}
            />
          )
          : <AggregatePlaceholder />
        }
      </div>
      {selectedEventTime && <EventDetailsArea selectedEventTime={selectedEventTime} data={data} />}
    </div>
  )
}

AggregateArea.propTypes = {
  selectedEventTime: instanceOf(Date),
  charts: objectOf(chartShape).isRequired,
  data: arrayOf(object),
  aggregateChartTypeOptions: optionsShape.isRequired,
  timeRangeSourceOptions: optionsShape.isRequired,
  dataSourceOptions: optionsShape.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired,
  onTimeRangeSourceSelect: func.isRequired,
  onSelectEventTime: func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onDataSourceSelect: ({dataSourceOption, chartId}) => dispatch(setDataSource({dataSourceOption, chartId})),
  onChartTypeSelect: ({chartTypeOption, chartId}) => dispatch(setChartType({chartTypeOption, chartId})),
  onTimeRangeSourceSelect: ({timeRangeSourceOption, chartId}) => dispatch(setTimeRangeSource({timeRangeSourceOption, chartId})),
  onSelectEventTime: ({selectedEventTime}) => dispatch(selectEventTime({selectedEventTime}))
})

export default connect(selector, mapDispatchToProps)(AggregateArea)
