import {GET_BOX_LIST} from '../actions/action'

export const boxListReducer = (state={}, action) => {
  switch(action.type){

    case GET_BOX_LIST:
      // return Object.assign({}, state, {rackTable:action.payload})
      return {...state,rackTable:action.payload}

    default:
      return state
  }
}
