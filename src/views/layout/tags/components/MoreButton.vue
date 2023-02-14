<template>
  <el-dropdown trigger="hover">
    <el-button class="more_btn" size="small" color="#178557">
      <span>更多</span>
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="closeCurrentTab">
          <el-icon :size="14">
            <FolderRemove/>
          </el-icon>
          关闭当前
        </el-dropdown-item>
        <el-dropdown-item @click="closeOtherTab">
          <el-icon :size="14">
            <Close/>
          </el-icon>
          关闭其他
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">
          <el-icon :size="14">
            <FolderDelete/>
          </el-icon>
          关闭所有
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useSettingStore} from "../../../../store/modules/setting";
import {useTagsViewStore} from "../../../../store/modules/tagsView";
import {useRouter, useRoute} from "vue-router";

const router = useRouter();
const route = useRoute();
const settingStore = useSettingStore();
const tagsViewStore = useTagsViewStore();
const visitedViews = computed(() => tagsViewStore.visitedViews);

// 关闭其他tab页
const closeOtherTab = async () => {
  tagsViewStore.delOtherViews(route.path);
}

// 关闭所有标签页
const closeAllTab = async () => {
  await tagsViewStore.delAllViews(route.path);
  tagsViewStore.goHome();
}
</script>

<style scoped>
.more {
  background-color: grey;
  color: white;
}

.more .tags-view-item {
  display: flex;
  align-items: center;
}

.more_btn{
  height: 40px;
}
</style>