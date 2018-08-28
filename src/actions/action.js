import * as request from 'superagent'
import {baseUrl} from '../constants/constants.js'
export const GET_RACK_NAMES='GET_RACK_NAMES'
export const GET_BOX_LIST='GET_BOX_LIST'
export const GET_RACK_EXECUTION='GET_RACK_EXECUTION'
export const GET_EXECUTION_BY_PLATFORM='GET_EXECUTION_BY_PLATFORM'

export const getRackNames= (platform) => (dispatch) =>{
  request.get(`${baseUrl}/rackNames/${platform}`)
  .then(result=>{
    dispatch({
      type:GET_RACK_NAMES,
      payload:result.body
    })
  })
}


export const getBoxList= (rackName) => (dispatch) =>{
  request.get(`${baseUrl}/boxList/${rackName}`)
  .then(result=>{
    dispatch({
      type:GET_BOX_LIST,
      payload:result.body
    })
  })
}

export const getExecByRack= (rackName) => (dispatch) =>{
  request.get(`${baseUrl}/executionStatus/${rackName}`)
  .then(result=>{
    dispatch({
      type:GET_RACK_EXECUTION,
      payload:result.body
    })
  })
}


export const getExecOverviewByPlatform= (platform) => (dispatch) =>{
  request.get(`${baseUrl}/executionOverview/${platform}`)
  .then(result=>{
    dispatch({
      type:GET_EXECUTION_BY_PLATFORM,
      payload:result.body
    })
  })
}
