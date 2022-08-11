// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */
// 商品管理
import Goods from '@/views/goods/Goods';
// 机器信息管理
import Machine from '@/views/machine/Machine';
// 货道信息管理
import MachineAisle from '@/views/machine/MachineAisle';
/**
 * 订单管理
 */
// 交易订单
import Order from '@/views/pay/Order';
/**
 * 系统管理
 */
// 用户管理
import user from '@/views/system/user';
// 菜单管理
import Module from '@/views/system/Module';
// 角色管理
import Role from '@/views/system/Role';
// 公司管理
import Dept from '@/views/system/Dept';
// 系统环境变量
import Variable from '@/views/system/Variable';
// 权限管理
import Permission from '@/views/system/Permission';
/**
 * 支付管理
 */
// 支付配置信息
import MachineConfig from '@/views/machine/MachineConfig';
// 支付配置
import Config from '@/views/pay/Config';
/**
 * 数据监控
 */
// 监控查询
import druidLogin from '@/views/druid/login';

// 导航管理
import navigation from '@/views/navigation/navigation';
// 个人中心
import my from '@/views/my/my';
// 监控数据
import monitoring from '@/views/monitoring/monitoring';
// 报警信息
import information from '@/views/alarm/information';
// 趋势分析
import analysis from '@/views/trend/analysis';
// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: 'login',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/goods/Goods',
            name: '项目管理',
            component: Goods,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/machine/Machine',
            name: '数据字典',
            component: Machine,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/machine/MachineAisle',
            name: '设备遥测',
            component: MachineAisle,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/pay/Order',
            name: '设备管理',
            component: Order,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/user',
            name: '用户管理',
            component: user,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Module',
            name: '菜单管理',
            component: Module,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Role',
            name: '角色管理',
            component: Role,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Dept',
            name: '公司管理',
            component: Dept,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Variable',
            name: '消息列表',
            component: Variable,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Permission',
            name: '权限管理',
            component: Permission,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/machine/MachineConfig',
            name: '消息管理',
            component: MachineConfig,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/pay/Config',
            name: '支付配置',
            component: Config,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/druid/login',
            name: '实时数据',
            component: druidLogin,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/navigation',
            name: '导航管理',
            component: navigation,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/my',
            name: '个人中心',
            component: my,
            meta: {
                requireAuth: true
            }
        }
        , {
            path: '/monitoring',
            name: '监控数据',
            component: monitoring,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/alarm/information',
            name: '报警信息',
            component: information,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/trend/analysis',
            name: '趋势分析',
            component: analysis,
            meta: {
                requireAuth: true
            }
        }]
    }]
})