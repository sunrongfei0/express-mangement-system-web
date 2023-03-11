<template>
  <el-card class="box-card">
    <!-- 头部 start -->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;">
            <UserFilled/>
          </el-icon>
          寄件服务
        </h3>
        <!-- 搜索区域 start -->
        <div class="card-search">
          <el-row :gutter="18">
            <el-col v-if="userInfo.role === 2" :span="18">
              <el-input :prefix-icon="Search" v-model="searchValue" @keyup.enter.native="search"
                        placeholder="请输入姓名(回车)"></el-input>
            </el-col>

            <el-col v-if="userInfo.role === 1" :span="12">
              <el-button plain type="primary" @click="addSend">填写快递单</el-button>
            </el-col>
            <el-col v-if="userInfo.role === 2" :span="3"
                    style="display: inline-flex;justify-content: center;align-items: center;cursor: pointer">
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

        <el-table-column label="寄件人">
          <template #default="scope">
            <el-tooltip :content="scope.row.sender" placement="top" effect="light">
              <span class="highlight">{{ scope.row.sender }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="寄件人电话">
          <template #default="scope">
            <el-tooltip :content="scope.row.senderPhone" placement="top" effect="light">
              <span class="highlight">{{ scope.row.senderPhone }}</span>
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

        <el-table-column label="揽收状态">
          <template #default="scope">
            <div v-if="scope.row.collectstatus===0">未揽收</div>
            <div v-else-if="scope.row.collectstatus===1" style="color: blue">已备货</div>
            <div v-else-if="scope.row.collectstatus===2" style="color: green">已揽收</div>
          </template>
        </el-table-column>

        <el-table-column label="下单时间">
          <template #default="scope">
            <el-tooltip :content="scope.row.createTime" placement="top" effect="light">
              <span class="highlight">{{ formatTime(scope.row.createTime, 'yyyy-MM-dd HH:mm:ss') }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="快递单号">
          <template #default="scope">
            <el-tooltip :content="scope.row.expressno" placement="top" effect="light">
              <span class="highlight">{{ scope.row.expressno }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="价格">
          <template #default="scope">
            <el-tooltip :content="scope.row.money" placement="top" effect="light">
              <span class="highlight">{{ scope.row.money }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.collectstatus === 0" @click="editSend(scope.row.id)">编辑</el-button>
            <el-popconfirm v-if="scope.row.collectstatus === 0" confirm-button-text="确定" cancel-button-text="取消"
                           :icon="Delete"
                           icon-color="#626AEF"
                           :title="'确定删除吗?'"
                           @confirm="delSend(scope.row.id)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>

            <el-popconfirm v-if="scope.row.collectstatus === 1&&userInfo.role === 1" confirm-button-text="确定"
                           cancel-button-text="取消" :icon="Delete"
                           icon-color="#626AEF"
                           :title="'确定支付吗?'"
                           @confirm="paySend(scope.row.id)">
              <template #reference>
                <el-button type="primary">支付</el-button>
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

  <!-- 修改寄件信息弹出框 start -->
  <el-dialog align-center v-model="editSendDialogFormVisible" width="60%" destroy-on-close>
    <template #header="{close,titleId,titleClass}">
      <div class="my-header">
        <el-icon size="26px">
          <EditPen/>
        </el-icon>
        <h1 id="titleId">{{ editTitle }}</h1>
      </div>
    </template>

    <!-- 编写用户组件start -->
    <EditSend :sendInfo="sendInfo" @closeEditSendForm="closeEditSendForm" @success="success"/>
    <!-- 编写用户组件end -->

  </el-dialog>
  <!-- 修改用户信息弹出框 end -->
</template>

<script setup lang="ts">
import {Refresh, Search} from "@element-plus/icons-vue";
import {reactive, toRefs, onMounted, watch, ref} from "vue";
import {formatTime} from "../../utils/date";
import {ElMessage} from "element-plus";
import {addSendApi, getMyInfoApi, getSendApi, getSendListApi, paySendApi} from "../../api/send/send";
import {useUserStore} from "../../store/modules/user";
import EditSend from "./EditSend.vue";

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
const sendInfo = ref()

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

  const {data} = await getSendListApi(params)
  state.tableData = data.dataList
  state.total = data.total
  state.loading = false
}

// 刷新
const refresh = () => {
  state.searchValue = ""
  state.role = null
  loadData(state)
}

const paySend = async (id: number) => {
  const {data} = await paySendApi(id)
  if (data.status === 200) {
    ElMessage.success(data.message)
    loadData(state)
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

// 关闭新增新增快递弹出框
const closeAddSendForm = () => {
  editSendDialogFormVisible.value = false
}

// 提交表单回调函数
const success = () => {
  loadData(state)
  editSendDialogFormVisible.value = false
}

// 编辑用户弹出框
const editSendDialogFormVisible = ref(false)
const editTitle = ref('填写快递单')

const editSend = async (id: number) => {
  const {data} = await getSendApi(id)
  sendInfo.value = data.result
  editSendDialogFormVisible.value = true
}

const addSend = async () => {
  // 获取自己的信息
  const {data} = await getMyInfoApi()
  sendInfo.value = data.result
  editSendDialogFormVisible.value = true
}

// 关闭编辑用户弹出框
const closeEditSendForm = () => {
  editSendDialogFormVisible.value = false
}

// 删除用户信息
const delSend = async (id: number) => {
  if (id == null) return
  const {data} = await deleteSendApi(id)
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
</style>