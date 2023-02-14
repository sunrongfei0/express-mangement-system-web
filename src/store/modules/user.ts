import {defineStore} from "pinia";

export const useUserStore = defineStore({
    id: 'userStore',
    state: () => {
        return {
            // 登录token
            token: '',
            //登录用户信息
            userInfo: {},
            //角色
            roles: []
        }
    },
    getters: {},
    actions: {
        // 设置登录token
        setToken(token: string) {
            this.token = token;
        },
        //设置用户登录信息
        setUserInfo(userInfo: any) {
            this.userInfo = userInfo;
        }
    },
    persist: true
})