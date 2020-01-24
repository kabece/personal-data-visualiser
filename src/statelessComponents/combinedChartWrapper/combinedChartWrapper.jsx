import React, {useState} from 'react'
import {object, string, func, bool} from 'prop-types'
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  ScatterChart,
  LineChart,
  Baseline
} from 'react-timeseries-charts'

import {timeRangeShape} from '../../index.shapes'

const CombinedChartWrapper = ({
  dataSeries,
  timeRange,
  chartTitle,
  areBaselinesVisible,
  onSetTimeRange
}) => {
  const [highlightedElement, setHighlightedElement] = useState(null)

  const getTrackerValues = () => highlightedElement && [{
    label: 'Value',
    value: highlightedElement.event.get(highlightedElement.column)
  }]

  const trackerStyle = {
    line: {
      stroke: 'white',
      strokeDasharray: 2
    },
    box: {
      fill: 'black'
    }
  }

  const baselineStyleLite = {
    line: {
      stroke: 'steelblue',
      strokeWidth: 1,
      opacity: 0.5
    },
    label: {
      fill: 'steelblue'
    }
  }

  return (
    <ChartContainer
      title={chartTitle}
      style={{
        background: '#201d1e',
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#232122',
        color: 'red'
      }}
      padding={20}
      paddingTop={5}
      paddingBottom={0}
      enableDragZoom
      enablePanZoom
      onTimeRangeChanged={newTimeRange => onSetTimeRange({newTimeRange})}
      timeRange={timeRange}
      maxTime={dataSeries.range().end()} // FIXME: maybe figure out how to use that
      minTime={dataSeries.range().begin()}
      width={500}
    >
      <ChartRow
        height='200'
        trackerShowTime
      >
        <YAxis
          id='value'
          min={dataSeries.min('value')}
          max={dataSeries.max('value')}
          format=',.0f'
          width='60'
          type='linear'
        />
        <Charts>
          <ScatterChart
            key='value'
            axis='value'
            series={dataSeries}
            columns={['value']}
            highlight={highlightedElement}
            info={getTrackerValues()}
            infoHeight={30}
            infoWidth={125}
            infoStyle={trackerStyle}
            onMouseNear={newHighlightedElement => setHighlightedElement(newHighlightedElement)}
          />
          <LineChart
            key='value'
            axis='value'
            series={dataSeries}
            columns={['value']}
            interpolation='curveLinear'
          />
          {['min', 'max', 'avg'].map(element => <Baseline axis='value' style={baselineStyleLite} value={dataSeries[element]('value')} label={element[0].toUpperCase() + element.slice(1)} position='right' visible={areBaselinesVisible} />)}
        </Charts>
        <YAxis
          id='value'
          min={dataSeries.min('value')}
          max={dataSeries.max('value')}
          format=',.0f'
          width='60'
          type='linear'
        />
      </ChartRow>
    </ChartContainer>
  )
}

CombinedChartWrapper.propTypes = {
  dataSeries: object.isRequired, // FIXME:
  timeRange: timeRangeShape.isRequired,
  chartTitle: string.isRequired,
  areBaselinesVisible: bool.isRequired,
  onSetTimeRange: func.isRequired
}

export default CombinedChartWrapper
