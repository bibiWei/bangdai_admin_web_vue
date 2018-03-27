import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getAddressList = params => {
  let startIndex = params["startIndex"], endIndex = params["endIndex"],
  addrPerson=params["addrPerson"],addrMobile=params["addrMobile"],addrName=params["addrName"];
  return fetch({
      url: apiConfig.ADDRESS_LIST + "?startIndex=" + startIndex + "&endIndex=" + endIndex
       + "&addrPerson=" + addrPerson + "&addrMobile=" + addrMobile+ "&addrName=" + addrName,
      method: 'post',
  })
}

export const doAddressSave = (params) => {
  return fetch({
    url: apiConfig.ADDRESS_SAVE ,
    method: 'post',
    data: params
  })
}

export const doAddressDel = bizId => {
  return fetch({
    url: apiConfig.ADDRESS_DEL + bizId,
    method: 'delete',
  })
}

export const doAddressInfo = bizId => {
  return fetch({
    url: apiConfig.ADDRESS_INFO + bizId,
    method: 'get',
  })
}
