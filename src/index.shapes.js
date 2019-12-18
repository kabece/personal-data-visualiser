import {shape, string, arrayOf} from 'prop-types'

const optionsShape = arrayOf(shape({
  displayName: string.isRequired,
  value: string.isRequired
}))

const timeRangeShape = shape({
  0: string.isRequired,
  1: string.isRequired
})

export {optionsShape, timeRangeShape}
