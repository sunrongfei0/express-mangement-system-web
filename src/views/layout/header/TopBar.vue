<template>
  <div class="main">
    <div class="tool-left">
      <CollapseIcon/>
      <Hamburger/>
    </div>

    <div class="linkBox">
      <div>
        <el-icon size="30px" style="margin-right: 30px;margin-top: 5px; color:#d8d8d8;"><Bell /></el-icon>
      </div>
      <!-- 登录信息 start -->
      <el-popover :width="300">
        <!-- 头像 start-->
        <template #reference>
          <el-link :underline="false">
            <!-- 如果用户没有上传自己头像，就默认头像 -->
            <img src="../../../assets/default_avatar.png" style="width: 40px; border-radius:50px ;">
            <span>{{ userInfo.realname }}</span>
          </el-link>
        </template>

        <!-- 头像 end-->
        <!-- 用户信息 start -->
        <template #default>
          <div style="display: flex;gap: 16px;flex-direction: column">
            <div class="info-card">
              <div>
                <img src="../../../assets/default_avatar.png">
                <p>用户名：{{ userInfo.realname }}</p>
                <p>Email:{{ userInfo.email }}</p>
                <p>注册时间：{{ userInfo.createTime }}</p>
              </div>
              <div class="info-card-desc" style="margin: 0">
                <div style="float: left;width: 75px;padding: 10px;border-right: 1px;text-align:center;">
                  <p>待定内容</p>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- 用户信息 end -->
      </el-popover>
      <!-- 登录信息 end -->

      <!-- 退出系统 start -->
      <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="SwitchButton" icon-color="#30bcd7"
                     title="确认退出系统吗?" @confirm="exit">
        <template #reference>
          <el-link :underline="false">
            <el-icon>
              <SwitchButton/>
            </el-icon>
          </el-link>
        </template>
      </el-popconfirm>
      <!-- 退出系统 end -->
    </div>
  </div>
  <!-- tabs多标签页 start -->
  <TabsView/>
  <!-- tabs多标签页 end -->
</template>

<script setup lang="ts">
import {SwitchButton} from "@element-plus/icons-vue";
import CollapseIcon from "./CollapseIcon.vue";
import Hamburger from "./Hamburger.vue";
import TabsView from "../tags/Index.vue";
import {useUserStore} from "../../../store/modules/user";
import {loginOutApi} from "../../../api/login/login";

const {userInfo} = useUserStore();

// 退出
const exit = async () => {
  const {data} = await loginOutApi();
  if (data.status === 200) {
    // 清除用户登录信息
    window.localStorage.removeItem("userStore");
    // 返回登录页
    window.location.href = "/";
  }
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: space-between;
  height: 70px;
  box-shadow: rgb(0 0 0 /10%) 0px 0px 10px;
  background: white;
}

.linkBox {
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  float: right;
}

.linkBox .bell{
  height: 100px;
  width: 100px;
}

.linkBox .el-link {
  margin-right: 25px;
  color: #8c8c8c;
}

.linkBox .el-link:hover {
  color: #30bcd7;
}

.linkBox .el-link span {
  margin-left: 8px;
}

/*鼠标滑向头像的样式*/
.info-card img {
  width: 55px;
  margin: 0px 15px 0px 0px;
  border-radius: 50px;
  float: left;;
}

.info-card p {
  margin-right: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-left {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>