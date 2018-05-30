// 接口配置
// 服务器接口根地址
var config = require('../../config')
var isProduction = process.env.NODE_ENV === 'production'
var isUT = process.env.NODE_ENV === 'ut'
// 服务器地址
// export const SERVER_BASE_URL = isProduction ? 'http://gank.io' : 'www.baidu.com'

const SERVER_BASE_URL = (isProduction ? config.build.baseServerUrl : (isUT ? config.ut.baseServerUrl : config.dev.baseServerUrl))
//const SERVER_BASE_URL = "http://localhost:8082";
const securityModuleName = isUT ? "" : "/api/security";
const commodityModuleName = isUT ? "" : "/api/commodity";
const SECURITY_V1 = SERVER_BASE_URL+"/api";
const COMMODITY_V1 = SERVER_BASE_URL + "/api";

let LOGIN , LOGOUT , CHANGE_PWD , PROFILE , BIZ_PROFILE;
if(isUT){
    //LOGIN = 'http://localhost:'+config.ut.port+'/static/data/login.json';
    LOGIN = 'http://localhost:8765/gateway/v1/auth/login';
    //LOGOUT = 'http://localhost:'+config.ut.port+'/static/data/logout.json';
    LOGOUT = 'http://localhost:8765/gateway/v1/auth/logout';
    CHANGE_PWD = 'http://localhost:'+config.ut.port+'/static/data/changePwd.json';
    PROFILE = 'http://localhost:'+config.ut.port+'/static/data/profile.json';
    BIZ_PROFILE = 'http://localhost:'+config.ut.port+'/static/data/profile/biz.json';
}else{
    LOGIN = SERVER_BASE_URL + '/login';
    LOGOUT = SERVER_BASE_URL + '/v1/auth/logout';
    CHANGE_PWD = SERVER_BASE_URL+securityModuleName+'/changePwd';
    PROFILE = SERVER_BASE_URL + '/v1/auth/profile';
    BIZ_PROFILE = SERVER_BASE_URL + 'v1/profile/biz';
}
let SYS_USER_LIST = SECURITY_V1+'/userlist',
    SYS_USER_SAVE  = SECURITY_V1+"/user/",
    SYS_USER_DEL  = SECURITY_V1+"/user/",
    SYS_USER_INFO = SECURITY_V1+"/user/",
    SYS_USER_BIND_ROLES = SECURITY_V1+"/user/",
    SYS_USER_ROLE_INFO  = SECURITY_V1+"/user/",
    SYS_USER_RESET_PWD  = SECURITY_V1+"/user/reset/pwd",
    SYS_USER_RESET_PWD_LOIGN  = SECURITY_V1+"/user/changePws",

    SYS_ROLE_LIST = SECURITY_V1+'/rolelist',
    SYS_ROLE_SAVE  = SECURITY_V1+"/role/",
    SYS_ROLE_INFO = SECURITY_V1+"/role/",
    SYS_ROLE_DEL  = SECURITY_V1+"/role/",
    SYS_ROLE_MENU = SECURITY_V1+"/role/",
    SYS_ROLE_BIND_MENU  = SECURITY_V1+'/roleMenus',
    SYS_ROLE_MENU_BY_ID = SECURITY_V1+'/roleMenulist',
    SYS_ROLE_MENU_BY_BIZID = SECURITY_V1+'/menu/allbybizId',

    SYS_PARAM_LIST = SECURITY_V1 + "/reference/referencelist",
    SYS_PARAM_SAVE  = SECURITY_V1+'/reference/',
    SYS_PARAM_INFO = SECURITY_V1+'/reference/',
    SYS_PARAM_DEL  = SECURITY_V1+'/reference/',
    SYS_PARAM_CATEGORY = SECURITY_V1+'/reference/category/',

    SYS_RESOURCE_LIST = SECURITY_V1+'/resource/',
    SYS_RESOURCE_SAVE = SECURITY_V1+'/resource/',
    SYS_RESOURCE_DEL  = SECURITY_V1+'/resource/',

    SYS_MENU_ALL = SECURITY_V1 + "/menu/all",
    SYS_MENU_SAVE  = SECURITY_V1 + "/menu/",
    SYS_MENU_INFO = SECURITY_V1 + "/menu/",
    SYS_MENU_DEL  = SECURITY_V1 + "/menu/",


    BIZ_BASE_LIST  = SECURITY_V1+'/business/businesslist',
    BIZ_BASE_SAVE  = SECURITY_V1 + "/business/",
    BIZ_BASE_INFO = SECURITY_V1 + "/business/",
    BIZ_BASE_DEL  = SECURITY_V1 + "/business/",
    BIZ_ALL_SAVE =  SECURITY_V1 + "/saveAllBusiness",


    ORG_LIST  = SECURITY_V1+'/organization/organizationlist',
    ORG_SAVE  = SECURITY_V1 + "/organization/",
    ORG_INFO = SECURITY_V1 + "/organization/",
    ORG_DEL  = SECURITY_V1 + "/organization/",


    EMPLOYEE_LIST  = SECURITY_V1+'/employee/employeelist',
    EMPLOYEE_SAVE  = SECURITY_V1 + "/employee/",
    EMPLOYEE_INFO = SECURITY_V1 + "/employee/",
    EMPLOYEE_DEL  = SECURITY_V1 + "/employee/",

    ADDRESS_LIST  = SECURITY_V1+'/address/addresslist',
    ADDRESS_SAVE  = SECURITY_V1 + "/address/",
    ADDRESS_INFO = SECURITY_V1 + "/address/",
    ADDRESS_DEL  = SECURITY_V1 + "/address/",


    TAG_LIST  = COMMODITY_V1+'/tag/taglist',
    TAG_SAVE  = COMMODITY_V1 + "/tag/",
    TAG_INFO = COMMODITY_V1 + "/tag/",
    TAG_DEL  = COMMODITY_V1 + "/tag/",

    BRAND_LIST  = COMMODITY_V1+'/brand/brandlist',
    BRAND_SAVE  = COMMODITY_V1 + "/brand/",
    BRAND_INFO = COMMODITY_V1 + "/brand/",
    BRAND_DEL  = COMMODITY_V1 + "/brand/",
    BRAND_UPLOAD = COMMODITY_V1 + "/brand/logo",
    BRAND_WITH_GROUP = COMMODITY_V1 + "/brand/brandlistWithGroup",

    //product
    COMMODITY_LIST   = COMMODITY_V1 + "/commodityInfo/commodityInfolist",
    COMMODITY_INFO_BY_ID = COMMODITY_V1 + "/commodityInfo/",

    //for new
    BUYING_LIST = COMMODITY_V1 + "/requestBring/list",
    BUYING_DEL  = COMMODITY_V1 + "/requestBring/del",
    TAKING_LIST = COMMODITY_V1 + "/helpBring/list",
    TAKING_DEL  =  COMMODITY_V1 + "/helpBring/del",
    TAKING_INFO = COMMODITY_V1 + "/helpBring/detail",
    TAKING_TICKET_AGREE = COMMODITY_V1 + "/helpBring/verifyTicket",
    TAKING_TICKET_REJECT = COMMODITY_V1 + "/helpBring/rejectTicket",
    AUTH_LIST   =  COMMODITY_V1 + "/auth/list",
    AUTH_PASS   =  COMMODITY_V1 + "/auth/pass",
    AUTH_DETAIL = COMMODITY_V1 + "/auth/detail",
    AUTH_REJECT = COMMODITY_V1 + "/auth/reject",
    USER_LIST   = COMMODITY_V1 + "/user/list",
    CIRCLE_LIST = COMMODITY_V1 + "/message/list",
    CIRCLE_ADD  = COMMODITY_V1 + "/message/issue",
    CIRCLE_INFO = COMMODITY_V1 + "/message/detail",

    ORDER_ALL_LIST = COMMODITY_V1 + "/order/listOrders",
    ADD_LIST = SERVER_BASE_URL + "/ad/listAllAds",
    EXCHANGE_ALL_LIST = COMMODITY_V1 + "/exchangeRate/list",
    MESSAGE_LIST = COMMODITY_V1 + "/notification/list",
    PUSH_MESSAGE = COMMODITY_V1 + "/notification/push",
    WITHDRAW_LIST = COMMODITY_V1 + "/withdraw/list",
    WITHDRAW_REJECT = COMMODITY_V1 + "/withdraw/reject",
    WITHDRAW_AGREE = COMMODITY_V1 + "/withdraw/approve",
    ADD_MESSAGE =  COMMODITY_V1 + "/notification/issue";
export {
  LOGIN , LOGOUT,CHANGE_PWD,PROFILE,BIZ_PROFILE,
  SYS_USER_LIST,SYS_USER_SAVE,SYS_USER_DEL,SYS_USER_INFO,SYS_USER_BIND_ROLES,SYS_USER_ROLE_INFO,SYS_USER_RESET_PWD,SYS_USER_RESET_PWD_LOIGN,
  SYS_ROLE_LIST,SYS_ROLE_SAVE,SYS_ROLE_INFO,SYS_ROLE_DEL,
  SYS_ROLE_BIND_MENU,SYS_ROLE_MENU_BY_ID,SYS_ROLE_MENU_BY_BIZID,
  SYS_MENU_ALL, SYS_MENU_SAVE, SYS_MENU_INFO, SYS_MENU_DEL,
  SYS_RESOURCE_LIST,SYS_RESOURCE_SAVE,SYS_RESOURCE_DEL,SYS_ROLE_MENU,
  SYS_PARAM_LIST , SYS_PARAM_SAVE , SYS_PARAM_INFO , SYS_PARAM_DEL , SYS_PARAM_CATEGORY,
  BIZ_BASE_LIST,BIZ_BASE_SAVE,BIZ_BASE_INFO,BIZ_BASE_DEL,BIZ_ALL_SAVE,
  ORG_LIST,ORG_SAVE,ORG_INFO,ORG_DEL,
  EMPLOYEE_LIST,EMPLOYEE_SAVE,EMPLOYEE_INFO,EMPLOYEE_DEL,
  ADDRESS_LIST,ADDRESS_SAVE,ADDRESS_INFO,ADDRESS_DEL,
  TAG_LIST,TAG_SAVE,TAG_INFO,TAG_DEL,
  BRAND_LIST,BRAND_SAVE,BRAND_INFO,BRAND_DEL,BRAND_UPLOAD,BRAND_WITH_GROUP,COMMODITY_LIST,COMMODITY_INFO_BY_ID,
  //new
  BUYING_LIST,BUYING_DEL,TAKING_LIST,TAKING_DEL,AUTH_LIST,AUTH_PASS,AUTH_REJECT,USER_LIST,AUTH_DETAIL,CIRCLE_LIST,CIRCLE_ADD,CIRCLE_INFO,ORDER_ALL_LIST,
  EXCHANGE_ALL_LIST,ADD_LIST,ADD_MESSAGE,MESSAGE_LIST,PUSH_MESSAGE,WITHDRAW_LIST,WITHDRAW_REJECT,WITHDRAW_AGREE,TAKING_INFO,TAKING_TICKET_AGREE,TAKING_TICKET_REJECT
}
