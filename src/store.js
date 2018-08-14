import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'

import combReducer from './reducers/reducer'
// const reducer = combineReducers(co)

const devTools = window.devToolsExtension ? window.devToolsExtension() : (f) => f

const enhancer = compose(
  applyMiddleware(ReduxThunk),
  devTools
)

const store = createStore(combReducer, enhancer)

export default store
