import React from 'react'
import {func, string} from 'prop-types'

import {optionsShape} from '../../index.shapes'

const Select = ({
  options,
  label,
  onChange
}) => (
  <div>
    <span>{label}</span>
    <select onChange={event => onChange({selectedValue: event.target.value})}>
      {options.map(option => (
        <option value={option.value}>
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
