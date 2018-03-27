import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getBusinessBaseList = params => {
  let startIndex = params["startIndex"], endIndex = params["endIndex"],loading = params["loading"],
  bizName = params["bizName"],bizType = params["bizType"],bizContactMan = params["bizContactMan"];
  return fetch({
      url: apiConfig.BIZ_BASE_LIST + "?startIndex=" + startIndex + "&endIndex=" + endIndex
       + "&bizName=" + bizName + "&bizType=" + bizType+"&bizContactMan="+bizContactMan+ ('N'==loading?'&__spin__':''),
      method: 'post',
  })
}

export const doBusinessBaseSave = (params) => {
  return fetch({
    url: apiConfig.BIZ_BASE_SAVE ,
    method: 'post',
    data: params
  })
}

export const doBusinessBaseDel = bizId => {
  return fetch({
    url: apiConfig.BIZ_BASE_DEL + bizId,
    method: 'delete',
  })
}

export const doBusinessBaseInfo = bizId => {
  return fetch({
    url: apiConfig.BIZ_BASE_INFO + bizId,
    method: 'get',
  })
}


export const freezeSalesBiz = (bizId , status) => {
  return fetch({
    url: apiConfig.BIZ_BASE_INFO + bizId+"/status?status="+status ,
    method: 'post'
  })
}


export const doBusinessSave = (params) => {
  return fetch({
    url: apiConfig.BIZ_ALL_SAVE ,
    method: 'post',
    data: params
  })
}
