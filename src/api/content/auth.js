import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getAuthList = params => {
  let pageNo = params["pageNo"];
  let pageSize = params["pageSize"];
  return fetch({
    url: apiConfig.AUTH_LIST + "?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: 'get'
  })
}


export const doAuthPass = authId => {
  return fetch({
    url: apiConfig.AUTH_PASS + "?authId=" + authId,
    method: 'post'
  })
}

export const doAuthReject = (authId,rejectReason) => {
  return fetch({
    url: apiConfig.AUTH_REJECT + "?authId=" + authId + "&rejectReason=" + rejectReason,
    method: 'post'
  })
}


export const doAuthDetail = authId =>{
  return fetch({
    url: apiConfig.AUTH_DETAIL + "?authId=" + authId,
    method: 'get'
  })
}



