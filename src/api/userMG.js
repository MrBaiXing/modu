import axios from 'axios';
import { loginreq, req } from './axiosFun';

// 登录接口 
export const login = (params) => { return loginreq("post", "http://42.51.10.118:7071/API/DataAPI.ashx?action=GetUserLogin", params) };
// 退出接口
// export const loginout = () => { return axios.delete("/api/login?&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };
// /**
//  * 导航管理 
//  **/
// 获取导航列表
export const menu = (params) => { return req("post","http://42.51.10.118:7071/API/PcData.ashx?action=GetCaiDan",params)};
// 导航管理-编辑
export const editmenu = (params) => { return req("post","http://42.51.10.118:7071/API/PcData.ashx?action=appUpdateDataByprojectTreeByID",params)};
// 导航管理-添加
export const addmenu = (params) => { return req("post","http://42.51.10.118:7071/API/PcData.ashx?action=appSaveDataByprojectTree",params)};
// 导航管理-删除
export const delectmenu = (params) => { return req("post","http://42.51.10.118:7071/API/PcData.ashx?action=appDeleteDataByprojectTreeByID",params)};

// /**
//  * 项目管理 
//  **/
// // 项目管理-分页获取项目列表
export const userList = (params) => {return req("post","http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataByQzjPorjectAllListWithFenye",params)};

// // 项目管理-未分页获取项目列表
export const appGetDataByQzjPorjectAllListNoFenye = (params) => {return req("post","http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataByQzjPorjectAllListNoFenye",params)};
// 项目管理-添加项目
export const userSave = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appSaveDataByQzjPorject", params) };
// // 项目管理-删除用户
export const deptDelete = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appDeleteDataByQzjPorjectByID", params) };
// // 项目管理-编辑用户
export const editlist = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appUpdateDataByQzjPorjectByID", params) };


// /**
//  * 公司管理 
//  **/
// // 公司管理-获取公司列表
export const deptList = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataByQzjCompanyAllListWithFenye", params) };
// // 公司管理-未分页获取公司列表

export const appGetDataByQzjCompanyAllListNoFenye = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataByQzjCompanyAllListNoFenye", params) };
// // 公司管理-保存（添加编辑）
export const deptSave = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appSaveDataByQzjCompany", params) };
// // 公司管理-删除公司
export const depDelete = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appDeleteDataByQzjCompanyByID", params) };
// // 公司管理-编辑公司
export const deptedit = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appUpdateDataByQzjCompanyByID", params) };
// // 公司管理-未分页项目列表
export const deptFenye = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataByQzjPorjectAllListNoFenye", params) };







// /**
//  * 用户管理 
//  **/
// 用户管理-列表
export const userPwd = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataByQzjAppUserAllListWithFenye", params) };
// 用户管理-添加
export const userLock = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appSaveDataByQzjAppUser", params) };
// 用户管理-修改
export const UserDeptTree = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appUpdateDataByQzjAppUserByID", params) };
// 用户管理-删除
export const UserDeptSave = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appDeleteDataByQzjAppUserByID", params) };

// // 用户管理-获取部门设置
export const UserDeptdeptTree = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=GetXMGSCaiDan", params) };
export const SaveDataBySysRoleFP01 = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=SaveDataBySysRoleFP01", params) };
export const appGetDataByQzjQzjCompany = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=GetCompanyByUserid", params) };

// export const UserDeptdeptTree = (params) => { return axios.get("/api/UserDept/deptTree/" + params + "?token=" + sessionStorage.getItem('logintoken')) };
// // 用户管理-保存部门设置
// export const UserChangeDept = (params) => { return req("post", "/api/User/change/dept", params) };
// // 用户管理-用户下线
// export const userExpireToken = (params) => { return req("get", "/api/User/expireToken/" + params, {}) };
// // 用户管理-刷新缓存
// export const userFlashCache = (params) => { return req("get", "/api/User/flashCache/" + params, {}) };

/**
 * 数据字典
 **/
// 菜单管理-获取菜单Module/list
export const ModuleList = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataBySysdict00AllListWithFenye", params) };
// 菜单管理-保存
export const ModuleGet = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appSaveDataBySysdict00", params) };
// // 菜单管理-修改
export const ModuleNodes = (params) => { return req("post", "/api/Module/nodes", params) };
// 菜单管理-修改菜单
export const ModuleSave = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appUpdateDataBySysdict00ByID", params) };
// 菜单管理-删除菜单
export const ModuleDelete = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appDeleteDataBySysdict00ByID", params) };


// /**
//  * 角色管理 
//  **/
// // 角色管理-获取角色列表
export const roleList = (params) => { return req("post", "/api/Role/list", params) };
// 角色管理-保存（添加编辑）
export const roleSave = (params) => { return req("post", "/api/Role/save", params) };
// 角色管理-删除角色
export const roleDelete = (params) => { return axios.delete("/api/Role/delete?ids=" + params + "&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };
// 角色管理-菜单权限（获取）
export const RoleRightTree = (params) => { return axios.get("/api/RoleRight/tree/" + params + "?token=" + sessionStorage.getItem('logintoken')) };
// 角色管理-菜单权限（保存）
export const RoleRightSave = (params) => { return req("post", "/api/RoleRight/save", params) };

/**
 * 消息管理 
 **/
// 消息管理-获取消息管理列表
export const variableList = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataByQzjGongGaoAllListWithFenye", params) };
// 消息管理-已读
export const variableSave = (params) => { return req("post", "http://42.51.10.118:7071/API/DataAPI.ashx?action=SetXiaoXiReadByUser", params) };
// 消息管理-保存
export const variableSaves = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appSaveDataByQzjGongGao", params) };
// 消息管理-删除消息管理
export const variableDelete = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appDeleteDataByQzjGongGaoByID", params) };
// 消息管理-删除消息管理
export const variableEdit = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appUpdateDataByQzjGongGaoByID", params) };

// /**
//  * 权限管理 
//  **/
// 权限管理-获取权限列表
export const permissionList = (params) => { return req("post", "/api/Permission/list", params) };
// 权限管理-保存权限
export const ermissionSave = (params) => { return req("post", "/api/Permission/save", params) };
// 权限管理-删除权限
export const ermissionDelete = (params) => { return axios.delete("/api/Permission/delete?ids=" + params + "&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };
// 权限管理-获取权限
export const roleDropDown = () => { return axios.get("/api/Role/dropDown/all?&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };
// 权限管理-配置权限
export const RolePermission = (params) => { return req("post", "/api/RolePermission/save", params) };


// /**
//  * 个人中心 
//  **/
// 个人中心-获取权限列表 
export const GetChangePwd = (params) => { return req("post", "http://42.51.10.118:7071/API/AppData.ashx?action=GetChangePwd", params) };

// 个人中心-保存权限
export const UpdateUserByID = (params) => { return req("post", "http://42.51.10.118:7071/API/DataAPI.ashx?action=UpdateUserByID", params) };

// 个人中心-删除权限
export const GetUserByID = (params) => { return req("post", "http://42.51.10.118:7071/API/DataAPI.ashx?action=GetUserByID", params) };


// 个人中心-获取权限
export const appFileUpload = (params) => { return req("post", "http://42.51.10.118:7071/API/DataAPI.ashx?action=appFileUploadByBase64", params) };

// 个人中心-配置权限
export const appChangePersonTX = (params) => { return req("post", "http://42.51.10.118:7071/API/DataAPI.ashx?action=appChangePersonTX", params) };
