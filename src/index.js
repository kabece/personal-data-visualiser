/* eslint-disable function-paren-newline */
import React from 'react'
import {render} from 'react-dom'
import {createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import Main from './components/main/main.container'
import rootReducer from './index.reducer'
import './index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle

const store = createStore(
  rootReducer,
  composeEnhancers
)

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root')
)
