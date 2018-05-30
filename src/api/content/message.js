import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'


export const doMessageAdd = params => {

  return fetch({
    url: apiConfig.ADD_MESSAGE ,
    method: 'post',
    data:params
  })
}

export const doMessagePush = id => {

  return fetch({
    url: apiConfig.PUSH_MESSAGE + "?notificationId=" + id ,
    method: 'post',
  })
}


export const getMessageList = params => {
  let pageNo = params["pageNo"];
  let pageSize = params["pageSize"];
  return fetch({
    url: apiConfig.MESSAGE_LIST + "?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: 'get'
  })
}




