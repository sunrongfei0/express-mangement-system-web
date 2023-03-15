<template>
  <el-menu color="white" text-color="#67879b" router :default-active="route.path" :unique-opened="false"
           :default-openeds="[route.path]" class="el-menu-vertical-demo" :collapse="isCollapse"
           :collapse-transition="true">
    <!--  logo start  -->
    <div class="imgBox hidden-xs-only" v-if="!isCollapse">
      <img src="../../../assets/logo2.png" width="88">
    </div>
    <!--  logo end  -->
    <AdminAside v-if="userInfo.role===0"/>
    <UserAside v-else-if="userInfo.role===1"/>
    <ExpressCenterAside v-else-if="userInfo.role===2"/>
    <CourierAside v-else-if="userInfo.role===3"/>
  </el-menu>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router';
import {computed} from "vue";
import {useSettingStore} from "../../../store/modules/setting";
import UserAside from "./menu/UserAside.vue";
import ExpressCenterAside from "./menu/ExpressCenterAside.vue";
import {useUserStore} from "../../../store/modules/user";
import AdminAside from "./menu/AdminAside.vue";
import CourierAside from "./menu/CourierAside.vue";

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
  margin-bottom: 30px;

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