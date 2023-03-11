<template>
  <el-card class="box-card">
    <!-- 头部 start -->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;">
            <UserFilled/>
          </el-icon>
          公告列表
        </h3>
        <!-- 搜索区域 start -->
        <div class="card-search">
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input :prefix-icon="Search" v-model="searchValue" @keyup.enter.native="search"
                        placeholder="关键字搜索(回车)"></el-input>
            </el-col>
            <el-col :span="3" style="display: inline-flex;justify-content: center;align-items: center;cursor: pointer">
              <el-icon style="font-size: 20px;color: #b3b6bc" @click="refresh">
                <Refresh/>
              </el-icon>
            </el-col>

            <el-col :span="6">
              <el-button plain style="width: 100%; color: #2fa7b9" @click="addAnn">添加公告</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 搜索区域 end -->
      </div>
    </template>
    <!-- 头部 end -->

    <!-- 表格区域 start -->
    <div class="table-box">
      <el-table element-loading-text="数据加载中..." v-loading="loading" :data="tableData"
                style="width: 100%;text-align:center;" :cell-style="{textAlign:'center'}"
                :row-class-name="rowClassName"
                :header-cell-style="{fontSize:'15px',background:'#148557',color:'white',textAlign:'center'}">
        <el-table-column label="序号" width="100" type="index" :index="Nindex"/>

        <el-table-column label="标题">
          <template #default="scope">
            <el-tooltip :content="scope.row.title" placement="top" effect="light">
              <span class="highlight">{{ scope.row.title }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="发送人">
          <template #default="scope">
            <el-tooltip :content="scope.row.sender" placement="top" effect="light">
              <span class="highlight">{{ scope.row.sender }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template #default="scope">
            <div v-if="scope.row.ispublish===0">未发布</div>
            <div v-else-if="scope.row.ispublish===1">已发布</div>
          </template>
        </el-table-column>


        <el-table-column label="发布时间">
          <template #default="scope">
            <el-tooltip :content="scope.row.updateTime" placement="top" effect="light">
              <span class="highlight">{{ formatTime(scope.row.updateTime, 'yyyy-MM-dd HH:mm:ss') }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.ispublish===0" @click="editExpress(scope.row.id)" style="margin-bottom: 10px">
              编辑
            </el-button>
            <el-popconfirm v-if="scope.row.ispublish===0" confirm-button-text="确定" cancel-button-text="取消"
                           :icon="Delete"
                           icon-color="#626AEF"
                           :title="'确定删除公告：「'+scope.row.title+'」吗?'"
                           @confirm="delAnn(scope.row.id)">
              <template #reference>
                <el-button type="danger" style="margin-bottom: 10px">删除</el-button>
              </template>
            </el-popconfirm>

            <el-popconfirm v-if="scope.row.ispublish===0" confirm-button-text="确定" cancel-button-text="取消"
                           :icon="Delete"
                           icon-color="#626AEF"
                           :title="'确定发布公告：「'+scope.row.title+'」吗?发布后用户将收到消息，无法撤回'"
                           @confirm="publishAnn(scope.row.id)">
              <template #reference>
                <el-button type="primary" style="margin-bottom: 10px">发布</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 start -->
      <el-pagination background layout="total,sizes,prev,pager,next,jumper" :total="total"
                     v-model:page-size="pageSize"
                     @current-change="changePage"
                     :page-size="[10,20,30,40]"></el-pagination>
      <!-- 分页 end -->
    </div>
    <!-- 表格区域 end -->
  </el-card>

  <!-- 新增快递信息弹出框 start -->
  <el-dialog align-center v-model="editAnnDialogFormVisible" width="42%" destroy-on-close>
    <template #header="{close,titleId,titleClass}">
      <div class="my-header">
        <el-icon size="26px">
          <EditPen/>
        </el-icon>
        <h1 id="titleId">{{ editTitle }}</h1>
      </div>
    </template>
    <!-- 编写快递组件start  和新增页共用组件 -->
    <EditAnnouncement :annInfo="annInfo" @closeEditAnnForm="closeEditAnnForm" @success="success"/>
    <!-- 编写快递组件end -->

  </el-dialog>
  <!-- 新增快递信息弹出框 end -->
</template>
<script setup lang="ts">
import {Refresh, Search} from "@element-plus/icons-vue";
import {reactive, toRefs, onMounted, ref} from "vue";
import {formatTime} from "../../utils/date";
import {ElMessage} from "element-plus";
import {getAnnListApi} from "../../api/announcement/announcement";
import EditAnnouncement from "./EditAnnouncement.vue";

const state = reactive({
  // 搜索表单内容
  searchValue: "",
  // 表格数据内容
  tableData: [],
  // 登录用户信息
  userInfo: null,
  //总条数
  total: 0,
  // 每页显示行数
  pageSize: 10,
  //当前页码
  pageIndex: 1,
  //数据加载
  loading: false,
})

// 获取快递列表数据
const loadData = async (state: any) => {
  state.loading = true
  // 先清空数据
  state.tableData = []
  const params = {
    'pageIndex': state.pageIndex,
    'pageSize': state.pageSize,
    'searchValue': state.searchValue
  }

  const {data} = await getAnnListApi(params)
  state.tableData = data.dataList
  state.total = data.total
  state.loading = false
}

// 添加弹窗状态
const editAnnDialogFormVisible = ref(false);
const annInfo = ref()
// 定义表单标题
let editTitle = "";
// 修改
const editAnn = async (id: number) => {
  editTitle = "修改公告";
  const {data} = await getAnnApi(id);
  annInfo.value = data.result
  editAnnDialogFormVisible.value = true;
}

const addAnn = async () => {
  editTitle = "新增公告"
  editAnnDialogFormVisible.value = true
}

// 关闭新增弹出框
const closeEditAnnForm = () => {
  editAnnDialogFormVisible.value = false
}

const success = () => {
  editAnnDialogFormVisible.value = false
}

// 刷新
const refresh = () => {
  state.searchValue = ""
  loadData(state)
}

// 搜索
const search = () => {
  if (state.searchValue !== null) {
    ElMessage({
      type: 'success',
      message: `关键字“${state.searchValue}”搜索内容如下`,
    })
    loadData(state)
  }
}

// 处理序号
const Nindex = (index: number) => {
  const page = state.pageIndex //当前的页码
  const pageSize = state.pageSize //每条页数
  return index + 1 + (page - 1) * pageSize
}

// 切换分页
const changePage = (val: number) => {
  state.pageIndex = val
  loadData(state);
}

// 删除数据
const delAnn = async (id: number) => {
  if (id == null) return
  const {data} = await deleteAnnApi(id)
  if (data.status === 200) {
    ElMessage.success(data.message)
    await loadData(state)
  } else {
    ElMessage.error(data.message)
  }
}

// 挂载后加载数据
onMounted(() => {
  loadData(state)
})

const {tableData, pageIndex, pageSize, loading, total, searchValue} = toRefs(state)
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-card__header) {
  border-bottom: 1px solid rgb(238 238 238);
  color: #178557;
}

.el-card {
  border-radius: 0px;
  border: none;
}

/* 分页样式 */
:deep(.el-pagination .is-background .el-pager li:not(.is-disabled).is-active) {
  background: #178557;
}

.el-pagination {
  margin-top: 20px;
  justify-content: center;
}

/* 新增用户弹出框自定义头部样式 */
.my-header {
  display: flex;
  justify-content: flex-start;
}

.card-search {
  float: none;
}
</style>