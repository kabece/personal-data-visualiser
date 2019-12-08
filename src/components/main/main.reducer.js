import createReducer from '@agillic/create-reducer'

const initialState = {}

const mainReducer = createReducer({
  initialState,
  actions: {},
  options: {
    mode: 'setState'
  }
})

export default mainReducer
