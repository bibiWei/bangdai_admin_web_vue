import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const doRoleList = params => {
  let startIndex = params["startIndex"];
  let endIndex   = params["endIndex"];
  let rolename   = params["roleName"];
  let roleType   = params["roleType"];
  let bizId   = params["bizId"];
  let status   = params["status"];
  let loading   = params["loading"];//__spin__
  return fetch({
    url: apiConfig.SYS_ROLE_LIST + "?startIndex=" + startIndex + "&endIndex=" + endIndex+(bizId?("&bizId="+bizId):"")
    	+ "&roleName=" + rolename + "&roleType=" + roleType+ "&status=" + status+('N'==loading?'&__spin__':''),
    method: 'post',
  })
}

export const doRoleInfo = params => {
  let roleId = params["roleId"];
  return fetch({
    url: apiConfig.SYS_ROLE_INFO + roleId,
    method: 'get',
  })
}

export const doRoleSave= params => {
  return fetch({
    url: apiConfig.SYS_ROLE_SAVE,
    method: 'post',
    data: params
  })
}

export const doRoleDel= params => {
  let roleId = params["roleId"];
  return fetch({
    url: apiConfig.SYS_ROLE_DEL + roleId,
    method: 'delete',
  })
}

export const doRoleMenu= params => {
  return fetch({
    url: apiConfig.SYS_MENU_ALL+(!params?"":"?__spin__") ,
    method: 'get',
  })
}

export const doRoleBindMenu= params => {
  return fetch({
    url: apiConfig.SYS_ROLE_BIND_MENU,
    method: 'post',
    data:params
  })
}

export const doRoleMenuById= roleId => {
  return fetch({
    url: apiConfig.SYS_ROLE_MENU_BY_ID + "?roleId=" + roleId,
    method: 'get'
  })
}


export const doRoleMenuByBizId= bizId => {
  return fetch({
    url: apiConfig.SYS_ROLE_MENU_BY_BIZID + "?__spin__&bizId=" + bizId,
    method: 'get'
  })
}

export const getBizRoleList = (type) => {
  return fetch({
    url: apiConfig.SYS_ROLE_LIST + "?__spin__&startIndex=0&endIndex=999&roleType="+type+"&status=00",
    method: 'post',
  })
}
getBizRoleList

