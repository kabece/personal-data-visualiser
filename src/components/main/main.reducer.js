import createReducer from '@agillic/create-reducer'

const initialState = {}

const mainReducer = createReducer({
  initialState,
  actions: {
    abc: () => ({abc: 123})
  },
  options: {
    mode: 'setState'
  }
})

export default mainReducer
