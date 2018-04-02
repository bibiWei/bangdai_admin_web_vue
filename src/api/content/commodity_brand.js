import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const brandUploadURL = apiConfig.BRAND_UPLOAD

export const getBrandList = params => {
  let startIndex = params["startIndex"], endIndex = params["endIndex"],tagName=params["tagName"];
  return fetch({
      url: apiConfig.BRAND_LIST + "?st" +
      "artIndex=" + startIndex + "&endIndex=" + endIndex+ "&tagName=" + tagName,
      method: 'post',
  })
}

export const getBrandlistWithGroup = params => {
  return fetch({
      url: apiConfig.BRAND_WITH_GROUP,
      method: 'post',
  })
}

export const doBrandSave = (params) => {
  return fetch({
    url: apiConfig.BRAND_SAVE ,
    method: 'post',
    data: params
  })
}

export const doBrandDel = bizId => {
  return fetch({
    url: apiConfig.BRAND_DEL + bizId,
    method: 'delete',
  })
}

export const doBrandInfo = bizId => {
  return fetch({
    url: apiConfig.BRAND_INFO + bizId,
    method: 'get',
  })
}
