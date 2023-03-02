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

  <el-sub-menu index="express">
    <template #title>
      <el-icon>
        <Basketball/>
      </el-icon>
      <span>快递管理</span>
    </template>

    <el-menu-item index="/index/express/addexpress">
      <el-icon>
        <Basketball/>
      </el-icon>
      <span>新增快递</span>
    </el-menu-item>

    <el-menu-item index="/index/express/expresslist">
      <el-icon>
        <Basketball/>
      </el-icon>
      <span>快递列表</span>
    </el-menu-item>
  </el-sub-menu>

  <el-menu-item index="/index/expresscenter">
    <el-icon>
      <Basketball/>
    </el-icon>
    <span>关联快递中心</span>
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