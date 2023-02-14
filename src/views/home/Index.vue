<template>
  <div class="home">
    <!-- 顶部背景图和内容 start -->
    <div class="top_bg">
      <h1>好好学习，天天向上</h1>
      <p>校园快递管理系统,欢迎您,admin</p>
    </div>
    <!-- 顶部背景图和内容 end -->
    <!-- 本站数据统计 start -->
    <div style="margin-bottom: 15px;color: #144b9f;">
      <div style="width: 12px;height: 12px;background-color:#f9a332;border-radius: 50%;
            float: left;margin-top: 5px;margin-right: 8px;"></div>
      本站数据统计
    </div>
    <el-row :gutter="40" class="data_row">
      <el-col :span="6">
        <div style="background:linear-gradient(to right,#6d80fe,#23d2fd);">
          <div class="data_left">
            <el-icon>
              <Avatar/>
            </el-icon>
          </div>
          <div class="data_right">
            <h1>45<span>人</span></h1>
            <p>人数</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div style="background:linear-gradient(to right,#6d80fe,#23d2fd);">
          <div class="data_left">
            <el-icon>
              <Avatar/>
            </el-icon>
          </div>
          <div class="data_right">
            <h1>45<span>人</span></h1>
            <p>人数</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div style="background:linear-gradient(to right,#6d80fe,#23d2fd);">
          <div class="data_left">
            <el-icon>
              <Avatar/>
            </el-icon>
          </div>
          <div class="data_right">
            <h1>45<span>人</span></h1>
            <p>人数</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div style="background:linear-gradient(to right,#6d80fe,#23d2fd);">
          <div class="data_left">
            <el-icon>
              <Avatar/>
            </el-icon>
          </div>
          <div class="data_right">
            <h1>45<span>人</span></h1>
            <p>人数</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 本站数据统计 end -->
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.home {
  width: 100%;
}

.top_bg {
  width: 100%;
  height: 200px;
  background-image: url("../../assets/banner01.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
  line-height: 60px;
  text-align: center;
  margin: 0 auto 10px;
}

.top_bg h1 {
  font-size: 60px;
  text-shadow: 3px 3px 0px #515151;
  padding-top: 50px;
}

.top_bg p {
  font-weight: lighter;
  font-size: 18px;
}

.data_row .el-col {
  height: 100px;
  margin-bottom: 20px;
  overflow: hidden;
}

.data_row .el-col > div {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  color: white;
}

.data_left {
  float: left;
  width: 40%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.data_left .el-icon {
  font-size: 60px;
}

.data_right {
  width: 60%;
  float: right;
  margin-top: 10px;
}

.data_right h1 {
  font-size: 40px;
}

.data_right h1 span {
  font-size: 15px;
  margin-left: 10px;
}

.data_right p {
  font-size: 14px;
  font-weight: 600;
  margin-left: 3px;
}
</style>