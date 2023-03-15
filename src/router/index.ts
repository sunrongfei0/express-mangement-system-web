// 导入vue router模块
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"
import Nprogress from '../config/nprogress'
import {validateTokenApi} from "../api/login/login";
// 定义一些路由，每个都要映射到一个组件
const routers = [{
    path: '/:pathMatch(.*)',
    redirect: '/home'
}, {
    path: '/',
    name: 'Login',
    meta: {title: '校园快递管理系统'},
    component: () => import('../views/login/Login.vue')
}, {
    path: '/index',
    name: 'index',
    component: () => import('../views/layout/Index.vue'),
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'home',
        meta: {title: '首页', icon: 'House', affix: true},
        component: () => import('../views/home/Index.vue'),
    }, {
        path: 'user',
        name: 'user',
        meta: {title: '用户管理'},
        component: () => import('../views/user/UserList.vue')
    }, { // 快递员
        path: 'addexpress',
        name: 'addexpress',
        meta: {title: '新增快递'},
        component: () => import('../views/express/ExpressCenterList.vue')
    }, {
        path: 'expresslist',
        name: 'expresslist',
        meta: {title: '快递列表'},
        component: () => import('../views/express/ExpressList.vue')
    }, {
        path: 'expresscenter',
        name: 'expresscenter',
        meta: {title: '关联快递中心'},
        component: () => import('../views/user/ExpressCenterList.vue')
    }, {// 快递中心
        path: 'insertlibrary',
        name: 'insertlibrary',
        meta: {title: '快递整理'},
        component: () => import('../views/delivery/ExpressList_Center.vue')
    }, {
        path: 'expressmanagement',
        name: 'expressmanagement',
        meta: {title: '快递管理'},
        component: () => import('../views/delivery/DeliveryList.vue')
    }, {
        path: 'helpget',
        name: 'helpget',
        meta: {title: '快递广场'},
        component: () => import('../views/helpget/HelpgetList.vue')
    }, {
        path: 'send',
        name: 'send',
        meta: {title: '寄件服务'},
        component: () => import('../views/send/SendList.vue')
    }, {
        path: 'track',
        name: 'track',
        meta: {title: '快递追踪'},
        component: () => import('../views/track/TrackList.vue')
    }, {
        path: 'announcement',
        name: 'announcement',
        meta: {title: '公告管理'},
        component: () => import('../views/announcement/AnnouncementList.vue')
    }, {
        path: 'message',
        name: 'message',
        meta: {title: '消息查看'},
        component: () => import('../views/message/MessageList.vue')
    }, {
        path: 'userInfo',
        name: 'userInfo',
        meta: {title: '个人设置'},
        component: () => import('../views/user/MyInfo.vue')
    }]
}]

// 创建路由实例并传递
const router = createRouter({
    history: createWebHistory(),
    routes: routers
})

//路由拦截守卫
router.beforeEach(async (to, from, next) => {
    // 1. Nprogress开始
    Nprogress.start()
    next()
})

// 路由跳转结束
router.afterEach(() => {
    Nprogress.done()
})

// 路由跳转失败
router.onError(error => {
    Nprogress.done()
    console.warn("路由错误", error.message)
})
export default router