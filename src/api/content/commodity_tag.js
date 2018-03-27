import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getTagList = params => {
  let startIndex = params["startIndex"], endIndex = params["endIndex"],tagName=params["tagName"];
  return fetch({
      url: apiConfig.TAG_LIST + "?startIndex=" + startIndex + "&endIndex=" + endIndex+ "&tagName=" + tagName,
      method: 'post',
  })
}

export const doTagSave = (params) => {
  return fetch({
    url: apiConfig.TAG_SAVE ,
    method: 'post',
    data: params
  })
}

export const doTagDel = bizId => {
  return fetch({
    url: apiConfig.TAG_DEL + bizId,
    method: 'delete',
  })
}

export const doTagInfo = bizId => {
  return fetch({
    url: apiConfig.TAG_INFO + bizId,
    method: 'get',
  })
}
