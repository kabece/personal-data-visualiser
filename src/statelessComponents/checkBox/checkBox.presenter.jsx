import React from 'react'
import {string, bool, func} from 'prop-types'

const CheckBox = ({
  label,
  isChecked,
  onChange
}) => (
  <div className='checkBox'>
    <span>{label}</span>
    <input type='checkbox' name={label} onChange={onChange} checked={isChecked} />
  </div>
)

CheckBox.propTypes = {
  label: string.isRequired,
  isChecked: bool,
  onChange: func.isRequired
}

export default CheckBox
