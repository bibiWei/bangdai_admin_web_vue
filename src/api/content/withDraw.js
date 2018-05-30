import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getWithDrawList = params => {
  let pageNo = params["pageNo"];
  let pageSize = params["pageSize"];
  return fetch({
    url: apiConfig.WITHDRAW_LIST + "?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: 'get'
  })
}

export const doRejectWithDraw = params => {

  return fetch({
    url: apiConfig.WITHDRAW_REJECT + "?id=" + params["id"] + "&rejectReason=" + params["rejectReason"],
    method: 'post'
  })
}

export const doAgreeWithDraw = params => {

  return fetch({
    url: apiConfig.WITHDRAW_AGREE  + "?id=" + params["id"],
    method: 'post'
  })
}







