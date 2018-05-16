

import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getUsertList = params => {
  let pageNo = params["pageNo"];
  let pageSize = params["pageSize"];
  return fetch({
    url: apiConfig.USER_LIST + "?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: 'get'
  })
}



export const doUserDel = id => {
  return fetch({
    url: apiConfig.TAKING_DEL + id,
    method: 'delete',
  })
}



