import {shape, string} from 'prop-types'

const timeRangeShape = shape({
  0: string.isRequired,
  1: string.isRequired
})

export {timeRangeShape}
