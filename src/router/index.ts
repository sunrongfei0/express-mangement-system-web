// 导入vue router模块
import {createRouter, createWebHashHistory, createWebHistory} from "vue-router"
import Nprogress from '../config/nprogress'
// 定义一些路由，每个都要映射到一个组件
const routers = [{
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
        path: 'express',
        name: 'express',
        meta: {title: '快递管理'},
        redirect: '/index/express/addexpress',
        children: [{
            path: 'addexpress',
            name: 'addexpress',
            meta: {title: '新增快递'},
            component: () => import('../views/express/ExpressCenterList.vue')
        }, {
            path: 'expresslist',
            name: 'expresslist',
            meta: {title: '快递列表'},
            component: () => import('../views/express/ExpressList.vue')
        }]
    }, {
        path: 'expresscenter',
        name: 'expresscenter',
        meta: {title: '关联快递中心'},
        component: () => import('../views/user/ExpressCenterList.vue')
    }, {// 快递中心
        path: 'insertlibrary',
        name: 'insertlibrary',
        meta: {title: '快递整理'},
        component: () => import('../views/express/ExpressList_Center.vue')
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