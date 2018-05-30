import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getTakingList = params => {
  let pageNo = params["pageNo"];
  let pageSize = params["pageSize"];
  return fetch({
    url: apiConfig.TAKING_LIST + "?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: 'get'
  })
}

export const getTakingInfo = id => {

  return fetch({
    url: apiConfig.TAKING_INFO + "?helpBringId=" + id ,
    method: 'get'
  })
}


export const doTicketAgree = id => {

  return fetch({
    url: apiConfig.TAKING_TICKET_AGREE + "?helpBringId=" + id ,
    method: 'post'
  })
}

export const doRejectTicket = params => {
  return fetch({
    url: apiConfig.TAKING_TICKET_REJECT + "?helpBringId=" + params["id"] + "&rejectReason=" + params["rejectReason"],
    method: 'post'
  })
}



export const doTakingDel = id => {
  return fetch({
    url: apiConfig.TAKING_DEL + id,
    method: 'delete',
  })
}



