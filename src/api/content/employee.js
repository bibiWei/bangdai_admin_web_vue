import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getEmployeeList = params => {
  let startIndex = params["startIndex"], endIndex = params["endIndex"], 
  	bizId = params["bizId"] , loading = params["loading"];
  return fetch({
      url: apiConfig.EMPLOYEE_LIST + "?__spin__&startIndex=" + startIndex 
      		+ "&endIndex=" + endIndex + (bizId?("&bizId="+bizId):"")
      		+ ('N'==loading?'&__spin__':''),
      method: 'post'
  })
}

export const doEmployeeSave = (params) => {
  return fetch({
    url: apiConfig.EMPLOYEE_SAVE ,
    method: 'post',
    data: params
  })
}

export const doEmployeeDel = employeeId => {
  return fetch({
    url: apiConfig.EMPLOYEE_DEL + employeeId,
    method: 'delete',
  })
}

export const doEmployeeInfo = (employeeId , loading) => {
  return fetch({
    url: apiConfig.EMPLOYEE_INFO + employeeId + ('N'==loading?'?__spin__':''),
    method: 'get',
  })
}
