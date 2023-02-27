<template>
  <el-menu-item index="/home">
    <el-icon>
      <House/>
    </el-icon>
    <span>首页</span>
  </el-menu-item>


<!--  <el-menu-item index="/system/user">-->
<!--    <el-icon>-->
<!--      <Basketball/>-->
<!--    </el-icon>-->
<!--    <span>个人设置</span>-->
<!--  </el-menu-item>-->

  <el-menu-item index="2">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>待入库</span>
  </el-menu-item>

  <el-menu-item index="3">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>快递查询</span>
  </el-menu-item>

  <el-menu-item index="3">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>寄快递</span>
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