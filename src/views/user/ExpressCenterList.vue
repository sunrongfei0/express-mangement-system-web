<template>
  <el-card class="box-card">
    <!-- 头部 start -->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;">
            <UserFilled/>
          </el-icon>
          快递中心列表
        </h3>
        <!-- 搜索区域 start -->
        <div class="card-search">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-input :prefix-icon="Search" v-model="searchValue" @keyup.enter.native="search"
                        placeholder="关键字搜索(回车)"></el-input>
            </el-col>
            <el-col :span="8">
              <el-select v-model="status" placeholder="请选择状态">
                <el-option label="全部" value="-1"></el-option>
                <el-option label="封禁" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
              </el-select>
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

        <el-table-column label="快递中心名称">
          <template #default="scope">
            <el-tooltip :content="scope.row.realname" placement="top" effect="light">
              <span class="highlight">{{ scope.row.realname }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="邮箱">
          <template #default="scope">
            <el-tooltip :content="scope.row.email" placement="top" effect="light">
              <span class="highlight">{{ scope.row.email }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="角色">
          <template #default="scope">
            <div v-if="scope.row.role===0">管理员</div>
            <div v-else-if="scope.row.role===1">用户</div>
            <div v-else-if="scope.row.role===2">快递中心</div>
            <div v-else-if="scope.row.role===3">快递员</div>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template #default="scope">
            <div v-if="scope.row.status===1">正常</div>
            <div v-else>封禁</div>
          </template>
        </el-table-column>

        <el-table-column label="创建时间">
          <template #default="scope">
            <el-tooltip :content="scope.row.createTime" placement="top" effect="light">
              <span class="highlight">{{ formatTime(scope.row.createTime, 'yyyy-MM-dd') }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-popconfirm v-if="!scope.row.isassociation" confirm-button-text="确定" cancel-button-text="取消" :icon="Delete"
                           icon-color="#626AEF"
                           :title="'确定关联名称为「'+scope.row.realname+'」的快递中心吗?'"
                           @confirm="relevance(scope.row.id)">
              <template #reference>
                <el-button size="small" type="success" style="margin-bottom: 10px">关联</el-button>
              </template>
            </el-popconfirm>

            <el-popconfirm v-else confirm-button-text="确定" cancel-button-text="取消" :icon="Delete"
                           icon-color="#626AEF"
                           :title="'确定解除与名称为「'+scope.row.realname+'」的快递中心的关联吗?'"
                           @confirm="delrelevance(scope.row.id)">
              <template #reference>
                <el-button size="small" type="danger" style="margin-bottom: 10px">解除关联</el-button>
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

</template>

<script setup lang="ts">
import {Refresh, Search} from "@element-plus/icons-vue";
import {reactive, toRefs, onMounted, watch, ref} from "vue";
import {getUserListApi} from "../../api/user/user";
import {formatTime} from "../../utils/date";
import {ElMessage} from "element-plus";
import {delrelevanceApi, relevanceApi} from "../../api/association/association";

const state = reactive({
  // 搜索表单内容
  searchValue: "",
  // 表格数据内容
  tableData: [],
  // 登录用户信息
  userInfo: null,
  // 用户状态
  status: null,
  //总条数
  total: 0,
  // 每页显示行数
  pageSize: 10,
  //当前页码
  pageIndex: 1,
  //数据加载
  loading: false,
  // 角色
  role: null
})

// 获取用户列表数据
const loadData = async (state: any) => {
  state.loading = true
  // 先清空数据
  state.tableData = []
  // 本列表只会显示快递中心
  state.role = 2
  const params = {
    'pageIndex': state.pageIndex,
    'pageSize': state.pageSize,
    'status': state.status == -1 ? '' : state.status,
    'searchValue': state.searchValue,
    'role': state.role == -1 ? '' : state.role
  }

  const {data} = await getUserListApi(params)
  state.tableData = data.dataList
  state.total = data.total
  state.loading = false
}

const savedata = reactive({
  centerid: 0,
})

// 刷新
const refresh = () => {
  state.searchValue = ""
  state.status = null
  state.role = null
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

// 监听用户状态下拉框内容的改变
watch(() => state.status, (val, preVal) => {
      if (val) {
        state.searchValue = ""
        if (state.status === -1) {
          // 查询全部内容
          loadData(null);
        } else {
          loadData(state);
        }
      }
    }
)

// 切换分页
const changePage = (val: number) => {
  state.pageIndex = val
  loadData(state);
}

// 添加关联
const relevance = async (id: number) => {
  savedata.centerid = id;
  const {data} = await relevanceApi(savedata)
  if (data.status === 200) {
    ElMessage.success(data.message)
    await loadData(state)
  } else {
    ElMessage.error(data.message)
  }
}

// 解除关联
const delrelevance = async (id:number) =>{
  const {data} = await delrelevanceApi(id)
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

const {tableData, pageIndex, pageSize, loading, total, status, role, searchValue} = toRefs(state);
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