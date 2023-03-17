<template>
  <!-- 背景图 -->
  <div id="ebg">

  </div>

  <div class="common-layout">
    <el-container>
      <!-- 左侧菜单 start -->
      <el-aside width="auto">
        <AsideMenu/>
      </el-aside>
      <!-- 左侧菜单 end -->
      <el-container>
        <!-- 顶部 start -->
        <el-header>
          <TopBar/>
        </el-header>
        <!-- 顶部 end -->
        <!-- 主要内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <!-- 新增快递信息弹出框 start -->
  <el-dialog align-center v-model="editMsgDialogFormVisible" width="42%" destroy-on-close>
    <template #header="{close,titleId,titleClass}">
      <div class="my-header">
        <el-icon size="26px">
          <EditPen/>
        </el-icon>
        <h1 id="titleId">来自：「{{ editTitle }}」的消息</h1>
      </div>
    </template>
    <!-- 编写快递组件start  和新增页共用组件 -->
    <MessageDetail :msgInfo="msgInfo"/>
    <!-- 编写快递组件end -->

  </el-dialog>
  <!-- 新增快递信息弹出框 end -->
</template>

<script setup lang="ts">
// 引入左侧菜单栏
import AsideMenu from './aside/Index.vue'
// 引入顶部自定义组件
import TopBar from "./header/TopBar.vue"
import {onMounted, onUnmounted, ref} from "vue";
import {validateTokenApi} from "../../api/login/login";
import {showMessageApi} from "../../api/message/message";
import MessageDetail from "../message/MessageDetail.vue";

const timer = ref()

// 定义表单标题
let editTitle = "";
const editMsgDialogFormVisible = ref(false);
const msgInfo = ref()
const showMessage = async () => {
  const {data} = await showMessageApi()
  if (data.status === 200) {
    msgInfo.value = data.result
    editTitle = msgInfo.value.sender;
    editMsgDialogFormVisible.value = true;
  }
}

// 组件加载时创建定时器
onMounted(async () => {
  console.log("定时器创建...")
  const {data} = await validateTokenApi()
  if (data.status !== 200) {
    // 返回登录页
    window.location.href = "/";
  }
  await showMessage();
  timer.value = setInterval(async () => {
    console.log("定时器执行一次...")
    const {data} = await validateTokenApi()
    if (data.status !== 200) {
      // 返回登录页
      window.location.href = "/";
      clearInterval(timer.value)
      timer.value = ""
      console.log("定时器被销毁...")
    }
  }, 20000)
})

// 组件销毁之前销毁定时器
onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = ""
  console.log("定时器被销毁...")
})
</script>

<style scoped>
/* 顶部导航栏 */
.el-header {
  --el-header-padding: 0px;
  --el-header-height: auto;
  height: 111px;
  background: #f3f3f3;
}

.el-main {
  background: #f3f3f3;
}

.el-container {
  height: 100%;
}

.common-layout {
  width: 99vw;
  height: 98vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
}

#ebg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  background-image: url("../../assets/system-bg.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>