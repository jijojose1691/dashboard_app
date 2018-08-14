import { PLUS, MINUS, RESET } from './../constants/constants.js'
import { combineReducers } from 'redux'
import {GET_RACK,GET_RACK_STATUS} from '../actions/action'

const helloWorldReducer = (state={rackNames:[],rackTable:[]}, action) => {
  switch(action.type){

    case PLUS:
      console.log('PLUS reducer')
      return Object.assign({}, state, { message: state.message + 1 })

    case MINUS:
      console.log('MINUS reducer')
      return Object.assign({}, state, { message: state.message - 1 })

    case RESET:
      console.log('RESET reducer')
      return Object.assign({}, state, { message: 0 })

    case GET_RACK:
      return Object.assign({}, state, {rackNames:action.payload})

    case GET_RACK_STATUS:
      return Object.assign({}, state, {rackTable:action.payload})


    default:
      console.log('default reducer')
      return state
  }
}
const combReducer = combineReducers({
  helloWorldReducer,
})

export default combReducer
