import fetch from '../fetch.js'
import apiConfig from '../apiConfig.js'

export const doProductList= (id) => {
  return fetch({
    url: apiConfig.COMMODITY_LIST ,
    method: 'post',
  })
}

export const getBrandList = () => {
  return fetch({
    url: apiConfig.BRAND_LIST ,
    method: 'post',
  })
}

export const getProductById = (id) => {
  return fetch({
    url: apiConfig.COMMODITY_INFO_BY_ID + id,
    method: 'get',
  })
}

export const getProductTypeByCateId = (id) => {
  return fetch({
    url: apiConfig.COMMODITY_LIST,
    method: 'post',
  })
}

export const getProductClass= (id) => {
  return fetch({
    url: "http://mock/product/productClass" ,
    method: 'post',
  })
}

export const getAttrList= (id) => {
  return fetch({
    url: "http://mock/product/attrList" ,
    method: 'post',
  })
}

export const doCateList= (id) => {
  return fetch({
    url: "http://mock/product/cateList" ,
    method: 'post',
  })
}



// import axios from 'axios';
//
//
// export default function fetch (options) {
//
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: ''
//     })
//     // http request 拦截器
//     instance.interceptors.request.use(
//       config => {
//         config.headers.platform_token = localStorage.getItem("platform_token");
//
//         return config
//       },
//       err => {
//         return Promise.reject(err)
//       })
//
//
//     // 请求处理
//     instance(options)
//       .then((res) => {
//         if(res && res.data){
//           resolve(res.data)
//         }
//         return false
//       }).catch((error) => {
//       reject(error)
//     })
//   })
// }
