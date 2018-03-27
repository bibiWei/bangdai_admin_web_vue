import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getOrganizationList = params => {
  let startIndex = params["startIndex"], endIndex = params["endIndex"]
  return fetch({
      url: apiConfig.ORG_LIST + "?__spin__&startIndex=" + startIndex + "&endIndex=" + endIndex,
      method: 'post'
  })
}

export const doOrganizationSave = (params) => {
  return fetch({
    url: apiConfig.ORG_SAVE ,
    method: 'post',
    data: params
  })
}

export const doOrganizationDel = orgId => {
  return fetch({
    url: apiConfig.ORG_DEL + orgId,
    method: 'delete',
  })
}

export const doOrganizationInfo = orgId => {
  return fetch({
    url: apiConfig.ORG_INFO + orgId,
    method: 'get',
  })
}
