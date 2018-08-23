import {GET_BOX_LIST,GET_RACK_NAMES} from '../actions/action'

export const boxInfoReducer = (state={}, action) => {
  switch(action.type){

    case GET_BOX_LIST:
      return {...state,boxList:action.payload}

      case GET_RACK_NAMES:
        return {...state,rackNames:action.payload}
    default:
      return state
  }
}
