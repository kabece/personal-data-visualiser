import createReducer from '@agillic/create-reducer'

import * as actions from './main.actions'

const initialState = {
  primaryTimeRange: null
}

const mainReducer = createReducer({
  initialState,
  actions: {
    [actions.SET_PRIMARY_TIME_RANGE]: ({action: {primaryTimeRange}}) => ({primaryTimeRange})
  },
  options: {
    mode: 'setState'
  }
})

export default mainReducer
