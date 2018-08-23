import {GET_RACK_EXECUTION,GET_RACK_NAMES} from '../actions/action'

export const rackExecInfoReducer = (state={}, action) => {
  switch(action.type){

    case GET_RACK_EXECUTION:
      return {...state, rackExecuionList:action.payload}

      case GET_RACK_NAMES:
        return {...state, rackNames:action.payload}
    default:
      return state
  }
}
