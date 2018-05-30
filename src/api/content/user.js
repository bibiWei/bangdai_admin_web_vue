

import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getUsertList = params => {
  let pageNo = params["pageNo"];
  let pageSize = params["pageSize"];
  let phone = params["phone"];
  let nickName = params["nickName"];
  return fetch({
    url: apiConfig.USER_LIST + "?pageNo=" + pageNo + "&pageSize=" + pageSize + "&phone=" + phone + "&nickName=" + nickName,
    method: 'get'
  })
}



export const doUserDel = id => {
  return fetch({
    url: apiConfig.TAKING_DEL + id,
    method: 'delete',
  })
}



