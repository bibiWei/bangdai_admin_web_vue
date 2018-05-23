import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const getExchangeList = () => {

  return fetch({
    url: apiConfig.EXCHANGE_ALL_LIST ,
    method: 'get'
  })
}







