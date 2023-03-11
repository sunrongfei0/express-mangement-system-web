<template>
  <el-card class="box-card">
    <!-- 头部 start -->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;">
            <UserFilled/>
          </el-icon>
          快递跟踪
        </h3>
        <!-- 搜索区域 start -->
        <div class="card-search">
          <el-row :gutter="18">
            <el-col :span="20">
              <el-input :prefix-icon="Search" v-model="expressno" @keyup.enter.native="getTrack"
                        placeholder="请输入单号(回车)"></el-input>
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

        <el-table-column label="快递类型">
          <template #default="scope">
            <div v-if="scope.row.expresstype==='SF'">顺丰</div>
            <div v-else-if="scope.row.expresstype==='JD'">京东</div>
            <div v-else-if="scope.row.expresstype==='YUNDA'">韵达</div>
            <div v-else-if="scope.row.expresstype==='EMS'">邮政</div>
            <div v-else-if="scope.row.expresstype==='YTO'">圆通</div>
            <div v-else-if="scope.row.expresstype==='ZTO'">中通</div>
            <div v-else-if="scope.row.expresstype==='STO'">申通</div>
            <div v-else-if="scope.row.expresstype==='JT'">极兔</div>
            <div v-else-if="scope.row.expresstype==='QT'">其它</div>
            <div v-else>其它</div>
          </template>
        </el-table-column>

        <el-table-column label="快递单号">
          <template #default="scope">
            <el-tooltip :content="scope.row.expressno" placement="top" effect="light">
              <span class="highlight">{{ scope.row.expressno }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="最新状态">
          <template #default="scope">
            <el-tooltip :content="scope.row.logisticsstatus" placement="top" effect="light">
              <span class="highlight">{{ scope.row.logisticsstatus }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="最新消息">
          <template #default="scope">
            <el-tooltip :content="scope.row.thelastmessage" placement="top" effect="light">
              <span class="highlight">{{ scope.row.thelastmessage }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="最新更新时间">
          <template #default="scope">
            <el-tooltip :content="scope.row.thelasttime" placement="top" effect="light">
              <span class="highlight">{{ formatTime(scope.row.thelasttime, 'yyyy-MM-dd HH:mm:ss') }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="进度">
          <template #default="scope">
            <el-tooltip :content="scope.row.progress" placement="top" effect="light">
              <el-progress :percentage="scope.row.progress" :color="customColorMethod" />
            </el-tooltip>
          </template>
        </el-table-column>


        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="success" @click="">更新</el-button>
            <el-button type="primary" @click="getDetail(scope.row.expressno)">查看详情</el-button>
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

  <!-- 修改寄件信息弹出框 start -->
  <el-dialog
      align-center
      v-model="trackDetailDialogVisible"
      width="30%"
      class="showAll_dialog"
      destroy-on-close>
    <template #header="{close,titleId,titleClass}">
      <div class="my-header">
        <el-icon size="26px">
          <EditPen/>
        </el-icon>
        <h1 id="titleId">{{ title }}</h1>
      </div>
    </template>

    <!-- 编写用户组件start -->
    <div style="height:70vh">
      <el-scrollbar>
        <TrackDetail class="trackDetail" :code="code"/>
      </el-scrollbar>
    </div>
    <!-- 编写用户组件end -->

  </el-dialog>
  <!-- 修改用户信息弹出框 end -->
</template>

<script setup lang="ts">
import {Refresh, Search} from "@element-plus/icons-vue";
import {reactive, toRefs, onMounted, watch, ref} from "vue";
import {formatTime} from "../../utils/date";
import {ElMessage} from "element-plus";
import {useUserStore} from "../../store/modules/user";
import {getTrackApi, getTrackListApi} from "../../api/track/track";
import TrackDetail from "./TrackDetail.vue";

const state = reactive({
  // 搜索表单内容
  searchValue: "",
  // 表格数据内容
  tableData: [],
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

const {userInfo} = useUserStore();

const expressno = ref()

// 获取用户列表数据
const loadData = async (state: any) => {
  state.loading = true
  // 先清空数据
  state.tableData = []
  const params = {
    'pageIndex': state.pageIndex,
    'pageSize': state.pageSize,
    'searchValue': state.searchValue
  }

  const {data} = await getTrackListApi(params)
  state.tableData = data.dataList
  state.total = data.total
  state.loading = false
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
      message: `单号“${state.searchValue}”搜索内容如下`,
    })
    loadData(state)
  }
}

const getTrack = async () => {
  if (expressno !== null) {
    const {data} = await getTrackApi(expressno.value)
    if (data.status === 200) {
      ElMessage.success(data.message)
      loadData(state)
    } else {
      ElMessage.error(data.message)
    }
    loadData(state)
  }
}


const code = ref()
const getDetail = async (expressno: string) => {
  if (code !== null) {
    code.value = expressno
    trackDetailDialogVisible.value = true
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

const trackDetailDialogVisible = ref(false)
const title = ref('追踪记录')


// 挂载后加载数据
onMounted(() => {
  loadData(state)
})

const {tableData, pageIndex, pageSize, loading, total, role, searchValue} = toRefs(state);
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

/* dialog */
.content-box{
  line-height: 30px;
}

</style>