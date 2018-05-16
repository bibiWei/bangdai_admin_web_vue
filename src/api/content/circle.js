import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getCircleList = params => {
  let pageNo = params["pageNo"];
  let pageSize = params["pageSize"];
  return fetch({
    url: apiConfig.CIRCLE_LIST + "?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: 'get'
  })
}

export const addCircle= params => {

  return fetch({
    url: apiConfig.CIRCLE_ADD ,
    method: 'post',
    data:params
  })
}

export const getCircleInfo = msgId =>{
  return fetch({
    url: apiConfig.CIRCLE_INFO + "?msgId=" + msgId ,
    method: 'get'
  })
}




export const doCircleDel = id => {
  return fetch({
    url: apiConfig.TAKING_DEL + id,
    method: 'delete',
  })
}



