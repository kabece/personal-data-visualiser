import React, {Fragment, useState} from 'react'
import {ResponsiveHeatMap} from '@nivo/heatmap'
import {capitalize} from 'lodash'

import Select from '../select/select.presenter'
import CheckBox from '../checkBox/checkBox.presenter'
import {ROLLUP_TYPES, chartShape} from '../../index.shapes'
import {convertAggregateMoodDataToHeatMapFormat} from './heatMapChartWrapper.helper'

const {DAILY, WEEKLY, MONTHLY} = ROLLUP_TYPES

const HeatMapChartWrapper = ({chart}) => {
  const [rollupType, setRollupType] = useState(WEEKLY)
  const [isDetailedView, setIsDetailedView] = useState(false)

  const data = convertAggregateMoodDataToHeatMapFormat({
    aggregateMoodData: chart,
    isDetailedView,
    rollupType
  })

  return (
    <Fragment>
      <div className='heatMapChartWrapperControls'>
        <Select
          options={[DAILY, WEEKLY, MONTHLY].map(element => ({displayName: capitalize(element), value: element}))}
          label='Rollup Type: '
          onChange={({selectedValue}) => setRollupType(selectedValue)}
        />
        <CheckBox
          label='Show detailed view:'
          isChecked={isDetailedView}
          onChange={() => setIsDetailedView(!isDetailedView)}
        />
      </div>
      <ResponsiveHeatMap
        data={data.values}
        keys={data.keys}
        indexBy='weekday'
        margin={{top: 20, right: 60, bottom: 120, left: 60}}
        forceSquare
        axisTop={{orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -40, legend: '', legendOffset: 36}}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0
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
      />
    </Fragment>
  )
}

HeatMapChartWrapper.propTypes = {
  chart: chartShape.isRequired
}

export default HeatMapChartWrapper
