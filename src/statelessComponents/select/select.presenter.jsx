import React from 'react'
import {func, string} from 'prop-types'

import {optionsShape} from '../../index.shapes'

const Select = ({
  options,
  label,
  onChange
}) => (
  <div className='select'>
    <span>{label}</span>
    <select onChange={event => onChange({selectedValue: event.target.value})}>
      <option value=''>Please choose</option>
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.displayName}
        </option>
      ))}
    </select>
  </div>
)

Select.propTypes = {
  options: optionsShape.isRequired,
  label: string.isRequired,
  onChange: func.isRequired
}

export default Select
