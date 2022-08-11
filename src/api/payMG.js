import axios from 'axios';
import { req } from './axiosFun';
/**
 * 支付配置信息
//  **/
// // 支付配置信息-获取支付配置信息列表
// export const MachineConfigList = (params) => { return req("post", "/api/MachineConfig/list", params) };
// // 支付配置信息-保存支付配置信息
// export const MachineConfigSave = (params) => { return req("post", "/api/MachineConfig/save", params) };
// // 支付配置信息-删除支付配置信息
// export const MachineConfigDelete = (params) => { return axios.delete("/api/MachineConfig/delete?ids=" + params + "&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };

// /**
//  * 支付配置 
//  **/
// // 支付配置-获取支付配置列表
// export const ConfigList = (params) => { return req("post", "/api/Config/list", params) };
// // 支付配置-保存支付配置
export const ConfigSave = (params) => { return req("post", "/api/Config/save", params) };
// 支付配置-删除支付配置
export const ConfigDelete = (params) => { return axios.delete("/api/Config/delete?ids=" + params + "&token=" + sessionStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 系统管理-设备管理 
 **/
// 系统管理-设备管理 获取列表
export const OrderList = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataByVQzjDeviceAllListWithFenye", params) };
// 系统管理-设备管理  删除
export const OrderDelete = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appDeleteDataByQzjDeviceByID", params) };
// 系统管理-设备管理 添加
export const OrderRefund = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appSaveDataByQzjDevice", params) };
// 系统管理-设备管理  编辑
export const editOrderlist = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appUpdateDataByQzjDeviceByID", params) };
// 公司管理-未分页列表
export const Qzjlist = (params) => { return req("post", "http://42.51.10.118:7071/API/PcData.ashx?action=appGetDataByQzjCompanyAllListNoFenye", params) };
