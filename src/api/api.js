import fetch from './fetch.js'
import apiConfig from './apiConfig.js'

var sysUser = require("./content/user");
var sysRole = require("./content/role");
var sysMenu = require("./content/menu");
var sysResource = require("./content/resource");
var sysParam = require("./content/param");
var sysMemer = require("./content/member");
var bizBusiness = require("./content/business");
var organization = require("./content/organization");
var employee = require("./content/employee");
var address = require("./content/address");
var product  = require("./content/product");
var commodityTag = require("./content/commodity_tag");
var commodityBrand = require("./content/commodity_brand");
const brandUploadAPI = "//jsonplaceholder.typicode.com/posts/"
const login = params => {
  let requestmethod = "post"
  if(apiConfig.LOGIN.indexOf(".json")!=-1)requestmethod = "get"
  return fetch({
    url: apiConfig.LOGIN,
    method: requestmethod,
    data: params
  })
}

export const getBizProfile = params => {
  return fetch({
    url: apiConfig.BIZ_PROFILE,
    method: 'get',
  })
}

const doUserSave = sysUser.doUserSave;
const doUserList = sysUser.doUserList;
const doUserDel  = sysUser.doUserDel;
const doUserInfo  = sysUser.doUserInfo;
const doUserRoles = sysUser.doUserRoles;
const doBindRoles = sysUser.doBindRoles;
const doUserRoleInfo = sysUser.doUserRoleInfo;
const doResetPwd = sysUser.doResetPwd;
const doResetPwdLogin = sysUser.doResetPwdLogin;

const doRoleList = sysRole.doRoleList;
const doRoleInfo = sysRole.doRoleInfo;
const doRoleDel  = sysRole.doRoleDel;
const doRoleSave  = sysRole.doRoleSave;
const doRoleMenu  = sysRole.doRoleMenu;
const getBizRoleList = sysRole.getBizRoleList;

const doRoleBindMenu = sysRole.doRoleBindMenu;
const doRoleMenuById = sysRole.doRoleMenuById;
const doRoleMenuByBizId = sysRole.doRoleMenuByBizId;

const doMenuAll   = sysMenu.doMenuAll;
const doMenuInfo  = sysMenu.doMenuInfo;
const doMenuDel   = sysMenu.doMenuDel;
const doMenuSave  = sysMenu.doMenuSave;

const doResourceList = sysResource.doResourceList;
const doResourceSave = sysResource.doResourceSave;
const doResourceDel  = sysResource.doResourceDel;

const doParamList = sysParam.doParamList;
const doParamInfo = sysParam.doParamInfo;
const doParamDel  = sysParam.doParamDel;
const doParamSave  = sysParam.doParamSave;
const getParamCategory  = sysParam.getParamCategory;



const getBusinessBaseList = bizBusiness.getBusinessBaseList;
const doBusinessBaseInfo = bizBusiness.doBusinessBaseInfo;
const doBusinessBaseDel  = bizBusiness.doBusinessBaseDel;
const doBusinessBaseSave  = bizBusiness.doBusinessBaseSave;
const freezeSalesBiz = bizBusiness.freezeSalesBiz;
const doBusinessSave = bizBusiness.doBusinessSave;


const getOrganizationList = organization.getOrganizationList;
const doOrganizationInfo = organization.doOrganizationInfo;
const doOrganizationDel  = organization.doOrganizationDel;
const doOrganizationSave  = organization.doOrganizationSave;


const getEmployeeList = employee.getEmployeeList;
const doEmployeeInfo = employee.doEmployeeInfo;
const doEmployeeDel  = employee.doEmployeeDel;
const doEmployeeSave  = employee.doEmployeeSave;


const getAddressList = address.getAddressList;
const doAddressInfo = address.doAddressInfo;
const doAddressDel  = address.doAddressDel;
const doAddressSave  = address.doAddressSave;

//product
const doProductList = product.doProductList;
const getBrandList = product.getBrandList;
const getProductById = product.getProductById;
const getProductTypeByCateId = product.getProductTypeByCateId;
const getProductClass = product.getProductClass;
const getAttrList = product.getAttrList;
const doCateList = product.doCateList;



const getTagList = commodityTag.getTagList;
const doTagInfo = commodityTag.doTagInfo;
const doTagDel  = commodityTag.doTagDel;
const doTagSave  = commodityTag.doTagSave;


const doBrandInfo = commodityBrand.doBrandInfo;
const doBrandDel  = commodityBrand.doBrandDel;
const doBrandSave  = commodityBrand.doBrandSave;
const brandUploadURL  = commodityBrand.brandUploadURL;
const getBrandlistWithGroup = commodityBrand.getBrandlistWithGroup;

const SUCCESS = 1;


const apiList = {
  SUCCESS,
  login,getBizProfile,
  doUserSave,doUserList,doUserDel,doUserInfo,doUserRoles,doBindRoles,doUserRoleInfo,doResetPwd,doResetPwdLogin,
  doRoleList, doRoleInfo, doRoleDel,doRoleSave,doRoleMenu,getBizRoleList,
  doRoleBindMenu,doRoleMenuById,doRoleMenuByBizId,
  doMenuAll, doMenuInfo, doMenuDel,doMenuSave,
  doResourceList,doResourceSave,doResourceDel,
  doParamList,doParamInfo,doParamDel,doParamSave,getParamCategory,
  getBusinessBaseList,doBusinessBaseInfo,doBusinessBaseDel,doBusinessBaseSave,freezeSalesBiz,doBusinessSave,
  getOrganizationList,doOrganizationInfo,doOrganizationDel,doOrganizationSave,
  getEmployeeList,doEmployeeInfo,doEmployeeDel,doEmployeeSave,
  getAddressList,doAddressInfo,doAddressDel,doAddressSave,
  getTagList,doTagInfo,doTagDel,doTagSave,
  doBrandInfo,doBrandDel,doBrandSave,brandUploadURL,getBrandlistWithGroup,
  doProductList,getBrandList,getProductById,getProductTypeByCateId,getProductClass,getAttrList,doCateList,
}


export default apiList
