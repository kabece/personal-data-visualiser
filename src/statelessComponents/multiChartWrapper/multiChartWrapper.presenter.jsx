import React, {useState} from 'react'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  ScatterChart,
  styler
} from 'react-timeseries-charts'
import {avg, count} from 'pondjs'

import {chartShape} from '../../index.shapes'

const style = styler([
  {key: 'left', color: '#CA4040'},
  {key: 'right', color: '#9467bd'},
  {key: 'value', color: '#CC862A'}
])

const trackerStyle = {
  line: {
    stroke: 'white',
    strokeDasharray: 2
  },
  box: {
    fill: 'black'
  }
}

const MultiChartWrapper = ({
  leftChart,
  rightChart,
  scatterChart
}) => {
  const [highlightedElement, setHighlightedElement] = useState(null)

  const leftDataSeries = leftChart.dataSeries.renameColumns({renameMap: {value: 'left'}})
  const rightDataSeries = rightChart.dataSeries.renameColumns({renameMap: {value: 'right'}})
  const scatterDataSeries = scatterChart.dataSeries.dailyRollup({aggregation: {value: {value: avg()}, count: {value: count()}}})

  const getTrackerValues = () => highlightedElement && [{
    label: 'Average mood: ',
    // eslint-disable-next-line prefer-template
    value: highlightedElement.event.get(highlightedElement.column) + ''
  }]

  return (
    <ChartContainer
      style={{
        background: '#201d1e',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#232122'
      }}
      padding={20}
      paddingTop={5}
      paddingBottom={0}
      timeRange={leftChart.timeRange}
      maxTime={leftDataSeries.range().end()}
      minTime={leftDataSeries.range().begin()}
      width={1040}
    >
      <ChartRow
        height='200'
        trackerShowTime
      >
        <YAxis
          id='left'
          axis='left'
          label={leftChart.title}
          min={leftDataSeries.min('left')}
          max={leftDataSeries.max('left')}
          format=',.0f'
          width='80'
          type='linear'
          style={style.axisStyle('left')}
        />
        <Charts>
          <ScatterChart
            key='left'
            axis='left'
            series={leftDataSeries}
            columns={['left']}
            style={style}
          />
          <LineChart
            axis='left'
            series={leftDataSeries}
            columns={['left']}
            style={style}
            interpolation='curveLinear'
          />

          <ScatterChart
            key='right'
            axis='right'
            series={rightDataSeries}
            columns={['right']}
            style={style}
          />
          <LineChart
            axis='right'
            series={rightDataSeries}
            columns={['right']}
            style={style}
            interpolation='curveLinear'
          />

          <ScatterChart
            axis='value'
            series={scatterDataSeries}
            columns={['value']}
            style={style}
            radius={event => 1.5 * event.get('count')}
            highlight={highlightedElement}
            info={getTrackerValues()}
            infoHeight={30}
            infoWidth={125}
            infoStyle={trackerStyle}
            onMouseNear={newHighlightedElement => setHighlightedElement(newHighlightedElement)}
          />
        </Charts>
        <YAxis
          id='right'
          axis='right'
          label={rightChart.title}
          min={rightDataSeries.min('right')}
          max={rightDataSeries.max('right')}
          format=',.0f'
          width='80'
          type='linear'
          labelOffset={10}
          style={style.axisStyle('right')}
        />
        <YAxis
          id='value'
          axis='value'
          label={scatterChart.title}
          min={scatterDataSeries.min('value')}
          max={scatterDataSeries.max('value')}
          format=',.0f'
          width='80'
          type='linear'
          style={style.axisStyle('value')}
        />
      </ChartRow>
    </ChartContainer>
  )
}

MultiChartWrapper.propTypes = {
  leftChart: chartShape.isRequired,
  rightChart: chartShape.isRequired,
  scatterChart: chartShape.isRequired
}

export default MultiChartWrapper
