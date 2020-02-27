/* eslint-disable function-paren-newline */
import React from 'react'
import {render} from 'react-dom'
import {createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import Main from './components/main/main.container'
import AggregateArea from './components/aggregateArea/aggregateArea.container'
import rootReducer from './reducer'
import './index.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle

const store = createStore(
  rootReducer,
  composeEnhancers()
)

render(
  <Provider store={store}>
    <div className='header'>Inspector Area</div>
    <Main />
    <AggregateArea />
  </Provider>,
  document.getElementById('root')
)
