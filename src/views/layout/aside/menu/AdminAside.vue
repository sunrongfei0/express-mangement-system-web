<template>
  <el-menu-item index="/home">
    <el-icon>
      <House/>
    </el-icon>
    <span>首页</span>
  </el-menu-item>


  <el-menu-item index="/index/userInfo">
    <el-icon><Avatar /></el-icon>
    <span>个人设置</span>
  </el-menu-item>

  <el-menu-item index="/index/user">
    <el-icon><Briefcase /></el-icon>
    <span>用户管理</span>
  </el-menu-item>

  <el-menu-item index="/index/announcement">
    <el-icon>
      <Microphone/>
    </el-icon>
    <span>公告管理</span>
  </el-menu-item>
</template>

<script setup lang="ts">

</script>

<style scoped>
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