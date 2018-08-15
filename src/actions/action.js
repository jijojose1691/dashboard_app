import * as request from 'superagent'
import {baseUrl} from '../constants/constants.js'
export const GET_RACK_NAMES='GET_RACK_NAMES'
export const GET_BOX_LIST='GET_BOX_LIST'

export const getRackNames= (platform) => (dispatch) =>{
  request.get(`${baseUrl}/rackNames/${platform}`)
  .then(result=>{
    console.log('result',result.body)
    dispatch({
      type:GET_RACK_NAMES,
      payload:result.body
    })
  })
}


export const getBoxList= (rackName) => (dispatch) =>{
  request.get(`${baseUrl}/racks`)
  .then(result=>{
    console.log('result',result.body)
    dispatch({
      type:GET_BOX_LIST,
      payload:result.body
    })
  })
}
