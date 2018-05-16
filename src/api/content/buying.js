import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getBuyingList = params => {
  let pageNo = params["pageNo"];
  let pageSize = params["pageSize"];
  return fetch({
    url: apiConfig.BUYING_LIST + "?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: 'get'
  })
}



export const doBuyingDel = id => {
  return fetch({
    url: apiConfig.BUYING_DEL + id,
    method: 'delete',
  })
}



