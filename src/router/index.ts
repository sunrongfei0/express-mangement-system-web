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
    component: ()=> import('../views/layout/Index.vue'),
    redirect: '/home',
    children: [{
        path: '/home',
        name: 'home',
        meta: {title: '首页', icon: 'House', affix: true},
        component: () => import('../views/home/Index.vue'),
    }]
}, {
    path: '/system',
    name: 'system',
    meta: {title: '系统管理'},
    redirect: '/system/user',
    component: () => import('../views/layout/Index.vue'),
    children: [{
        path: 'user',
        name: 'user',
        meta: {title: '个人设置'},
        component: () => import('../views/user/UserList.vue')
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