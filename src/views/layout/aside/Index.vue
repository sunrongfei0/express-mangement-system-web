<template>
  <el-menu color="white" text-color="#67879b" router :default-active="route.path" :unique-opened="false"
           :default-openeds="[route.path]" class="el-menu-vertical-demo" :collapse="isCollapse"
           :collapse-transition="true">
    <!--  logo start  -->
    <div class="imgBox hidden-xs-only" v-if="!isCollapse">
      <img src="../../../assets/logo.png">
    </div>
    <!--  logo end  -->
    <UserAside v-if="userInfo.role===1"/>
    <ExpressCenter v-else-if="userInfo.role===2"/>
  </el-menu>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {computed} from "vue";
import {useSettingStore} from "../../../store/modules/setting";
import UserAside from "./menu/UserAside.vue";
import ExpressCenter from "./menu/ExpressCenter.vue";
import {useUserStore} from "../../../store/modules/user";

const route = useRoute();
const settingStore = useSettingStore();
//是否折叠
const isCollapse = computed(() => !settingStore.isCollapse);
const {userInfo} = useUserStore();
</script>

<style scoped>
.imgBox {
  width: 100%;
  height: 70px;
}

.imgBox img {
  margin: 6%;
}

.el-menu {
  height: 100%;
  border: 0px;
}

/* 选中的颜色 */
:deep(.el-menu-item.is-active) {
  color: white;
  background: linear-gradient(to right, #a0c594, #039459);
}
</style>