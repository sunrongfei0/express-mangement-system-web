<template>
  <el-menu-item index="/home">
    <el-icon>
      <House/>
    </el-icon>
    <span>首页</span>
  </el-menu-item>


  <el-menu-item index="/index/userInfo">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>个人设置</span>
  </el-menu-item>

  <el-menu-item index="/index/expressmanagement">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>我的快递</span>
  </el-menu-item>

  <el-menu-item index="/index/helpget">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>快递广场</span>
  </el-menu-item>

  <el-menu-item index="/index/expresscenter">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>关联快递中心</span>
  </el-menu-item>

  <el-menu-item index="/index/send">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>寄件服务</span>
  </el-menu-item>

  <el-menu-item index="/index/track">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>快递追踪</span>
  </el-menu-item>

  <el-menu-item index="/index/message">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>消息查看</span>
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