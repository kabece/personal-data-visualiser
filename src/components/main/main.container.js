import React, {useEffect} from 'react'
import {func, objectOf} from 'prop-types'
import {connect} from 'react-redux'

import ChartContainer from '../../statelessComponents/chartContainer/chartContainer.presenter'
import selector from './main.selector'
import {prepareData} from './main.data.helper'
import {setTimeRange, setDataSource, setChartType, loadData} from './main.actionCreators'
import {optionsShape, chartShape} from '../../index.shapes'

const Main = ({
  charts,
  dataSourceOptions,
  chartTypeOptions,
  onSetTimeRange,
  onDataSourceSelect,
  onChartTypeSelect,
  onLoadData
}) => {
  useEffect(() => {
    onLoadData({data: prepareData()})
  }, [onLoadData])

  return (
    <div>
      {Object.keys(charts).map(key => (
        <ChartContainer
          key={key}
          chart={charts[key]}
          dataSourceOptions={dataSourceOptions}
          chartTypeOptions={chartTypeOptions}
          onDataSourceSelect={({selectedValue}) =>
            onDataSourceSelect({
              chartId: key,
              dataSourceOption: dataSourceOptions.find(option => option.value === selectedValue)
            })}
          onChartTypeSelect={({selectedValue}) =>
            onChartTypeSelect({
              chartId: key,
              chartTypeOption: chartTypeOptions.find(option => option.value === selectedValue)
            })}
          onSetTimeRange={({newTimeRange}) => onSetTimeRange({chartId: key, newTimeRange})}
        />
      ))}
    </div>
  )
}

Main.propTypes = {
  charts: objectOf(chartShape).isRequired,
  dataSourceOptions: optionsShape.isRequired,
  chartTypeOptions: optionsShape.isRequired,
  onSetTimeRange: func.isRequired,
  onDataSourceSelect: func.isRequired,
  onChartTypeSelect: func.isRequired,
  onLoadData: func.isRequired
}

const mapDispatchToProps = dispatch => ({
  onSetTimeRange: ({newTimeRange, chartId}) => dispatch(setTimeRange({newTimeRange, chartId})),
  onDataSourceSelect: ({dataSourceOption, chartId}) => dispatch(setDataSource({dataSourceOption, chartId})),
  onChartTypeSelect: ({chartTypeOption, chartId}) => dispatch(setChartType({chartTypeOption, chartId})),
  onLoadData: ({data}) => dispatch(loadData({data}))
})

export default connect(selector, mapDispatchToProps)(Main)
