import { combineReducers } from 'redux'
import {GET_RACK_NAMES,GET_BOX_LIST} from '../actions/action'

const rackListReducer = (state={rackNames:[],rackTable:[]}, action) => {
  switch(action.type){

    case GET_RACK_NAMES:
      return Object.assign({}, state, {rackNames:action.payload})

    case GET_BOX_LIST:
      return Object.assign({}, state, {rackTable:action.payload})


    default:
      console.log('default reducer')
      return state
  }
}
const combReducer = combineReducers({
  rackListReducer,
})

export default combReducer
