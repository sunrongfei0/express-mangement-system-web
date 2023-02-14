import {defineStore} from 'pinia'

export const useSettingStore = defineStore({
    id: 'settingState',
    state: () => ({
        // menu是否收缩
        isCollapse: true,
    }),
    getters: {},
    actions: {
        //切换collapse
        setCollapse(value: boolean) {
            this.isCollapse = value
        }
    }
})