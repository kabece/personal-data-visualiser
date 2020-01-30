import React from 'react'
import {arrayOf, objectOf, string} from 'prop-types'
import {ResponsiveHeatMap} from '@nivo/heatmap'

const HeatMapChartWrapper = ({data}) => (
  <ResponsiveHeatMap
    data={data}
    keys={['rad', 'excited', 'good', 'hopeful', 'confident', 'motivated', 'calm', 'meh', 'normal', 'uneasy', 'putting up a fight', 'tired', 'confused', 'bad', 'emotionally tired', 'lonely', 'demotivated', 'awful', 'emotional hijacking']}
    indexBy='weekday'
    margin={{top: 100, right: 60, bottom: 60, left: 60}}
    forceSquare
    axisTop={{orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -40, legend: '', legendOffset: 36}}
    axisRight={null}
    axisBottom={null}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'weekday',
      legendPosition: 'middle',
      legendOffset: -80
    }}
    cellOpacity={1}
    cellBorderColor={{from: 'color', modifiers: [['darker', 0.4]]}}
    labelTextColor={{from: 'color', modifiers: [['darker', 1.8]]}}
    defs={[
      {
        id: 'lines',
        type: 'patternLines',
        background: 'inherit',
        color: 'rgba(0, 0, 0, 0.1)',
        rotation: -45,
        lineWidth: 4,
        spacing: 7
      }
    ]}
    fill={[{id: 'lines'}]}
    animate
    motionStiffness={80}
    motionDamping={9}
    hoverTarget='rowColumn'
    cellHoverOthersOpacity={0.25}
    minValue={undefined}
  />
)

HeatMapChartWrapper.propTypes = {
  data: arrayOf(objectOf(string)).isRequired
}

export default HeatMapChartWrapper
