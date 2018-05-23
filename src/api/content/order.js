import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getAllOrderList = params => {
  let pageNo = params["pageNo"];
  let pageSize = params["pageSize"];
  return fetch({
    url: apiConfig.ORDER_ALL_LIST + "?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: 'get'
  })
}







