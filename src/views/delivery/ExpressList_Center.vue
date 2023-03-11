<template>
  <el-card class="box-card">
    <!-- 头部 start -->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;">
            <UserFilled/>
          </el-icon>
          快递列表
        </h3>
        <!-- 搜索区域 start -->
        <div class="card-search">
          <el-row :gutter="10">
            <el-col :span="18">
              <el-input :prefix-icon="Search" v-model="searchValue" @keyup.enter.native="search"
                        placeholder="关键字搜索(回车)"></el-input>
            </el-col>
            <el-col :span="3" style="display: inline-flex;justify-content: center;align-items: center;cursor: pointer">
              <el-icon style="font-size: 20px;color: #b3b6bc" @click="refresh">
                <Refresh/>
              </el-icon>
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

        <el-table-column label="快递单号">
          <template #default="scope">
            <el-tooltip :content="scope.row.expressno" placement="top" effect="light">
              <span class="highlight">{{ scope.row.expressno }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="收件人">
          <template #default="scope">
            <el-tooltip :content="scope.row.recipient" placement="top" effect="light">
              <span class="highlight">{{ scope.row.recipient }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="收件人电话">
          <template #default="scope">
            <el-tooltip :content="scope.row.recipientPhone" placement="top" effect="light">
              <span class="highlight">{{ scope.row.recipientPhone }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="寄件人">
          <template #default="scope">
            <el-tooltip :content="scope.row.sender" placement="top" effect="light">
              <span class="highlight">{{ scope.row.sender }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="入站时间">
          <template #default="scope">
            <el-tooltip :content="scope.row.createTime" placement="top" effect="light">
              <span class="highlight">{{ formatTime(scope.row.createTime, 'yyyy-MM-dd HH:mm:ss') }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="insertlibray(scope.row.id)" style="margin-bottom: 10px">入库</el-button>
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
</template>
<script setup lang="ts">
import {Refresh, Search} from "@element-plus/icons-vue";
import {reactive, toRefs, onMounted, ref} from "vue";
import {getExpressListApi} from "../../api/express/express"
import {formatTime} from "../../utils/date";
import {ElMessage} from "element-plus";
import {insertlibrary} from "../../api/delivery/delivery";

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

  const {data} = await getExpressListApi(params)
  state.tableData = data.dataList
  state.total = data.total
  state.loading = false
}

// 刷新
const refresh = () => {
  state.searchValue = ""
  loadData(state)
}

const insertlibray = async (expressid: number) => {
  if (expressid == null) return
  const {data} = await insertlibrary(expressid)
  if (data.status === 200) {
    ElMessage.success(data.message)
    await loadData(state)
  } else {
    ElMessage.error(data.message)
  }
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