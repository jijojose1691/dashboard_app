import * as request from 'superagent'
import {baseUrl} from '../constants/constants.js'
import { PLUS, MINUS, RESET } from './../constants/constants.js'
export const GET_RACK='GET_RACK'
export const GET_RACK_STATUS='GET_RACK_STATUS'

export const increment = () => {
  console.log('+ action created')
  return {
    type: PLUS,
  }
}
export const decrement = () => {
  console.log('- action created')
  return {
    type: MINUS,
  }
}
export const reset = () => {
  console.log('reset action created')
  return {
    type: RESET,
  }
}

export const getRack=(platform)=>(dispatch)=>{
  request.get(`${baseUrl}/racks`)
  .then(result=>{
    console.log('result',result.body)
    dispatch({
      type:GET_RACK,
      payload:result.body
    })
  })
}


export const getRackStatus=(platform, rackName)=>(dispatch)=>{
  request.get(`${baseUrl}/posts`)
  .then(result=>{
    console.log('result',result.body)
    dispatch({
      type:GET_RACK_STATUS,
      payload:result.body
    })
  })
}
