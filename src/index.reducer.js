import {combineReducers} from 'redux'

import mainReducer from './components/main/main.reducer'

const rootReducer = combineReducers({
  main: mainReducer
})

export default rootReducer
