<template>
  <el-card class="box-card">
    <!-- 头部 start -->
    <template #header>
      <div class="card-header">
        <h3>
          <el-icon style="margin-right: 10px;">
            <UserFilled/>
          </el-icon>
          快递管理
        </h3>
        <!-- 搜索区域 start -->
        <div class="card-search">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-input :prefix-icon="Search" v-model="searchValue" @keyup.enter.native="search"
                        placeholder="关键字搜索(回车)"></el-input>
            </el-col>

            <el-col :span="6">
              <el-select v-model="expresstype" placeholder="请选择快递种类">
                <el-option label="全部" value="-"></el-option>
                <el-option label="顺丰" value="SF"></el-option>
                <el-option label="京东" value="JD"></el-option>
                <el-option label="邮政" value="EMS"></el-option>
                <el-option label="韵达" value="YUNDA"></el-option>
                <el-option label="申通" value="STO"></el-option>
                <el-option label="圆通" value="YTO"></el-option>
                <el-option label="中通" value="ZTO"></el-option>
                <el-option label="极兔" value="JS"></el-option>
                <el-option label="其它" value="QT"></el-option>
              </el-select>
            </el-col>

            <el-col :span="6">
              <el-select v-model="status" placeholder="请选择派送状态">
                <el-option label="全部" value=-1></el-option>
                <el-option label="未派送" value="0"></el-option>
                <el-option label="待取件" value="1"></el-option>
                <el-option label="已取件" value="1"></el-option>
                <el-option label="滞留件" value="3"></el-option>
                <el-option label="拒收" value="4"></el-option>
                <el-option label="未关联用户" value="5"></el-option>
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

        <el-table-column label="派送状态">
          <template #default="scope">
            <div v-if="scope.row.status===0">未派送</div>
            <div v-else-if="scope.row.status===1" style="color: green">正常派送中</div>
            <div v-else-if="scope.row.status===2" style="color: green">已取件</div>
            <div v-else-if="scope.row.status===3" style="color: red">滞留件</div>
            <div v-else-if="scope.row.status===4" style="color: orange">拒收</div>
            <div v-else-if="scope.row.status===5" style="color: blue;">未关联用户</div>
          </template>
        </el-table-column>

        <el-table-column label="取件号">
          <template #default="scope">
            <el-tooltip :content="scope.row.deliveryno" placement="top" effect="light">
              <span class="highlight">{{ scope.row.deliveryno }}</span>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.status===0" type="primary" @click="editDelivery(scope.row.id,0)">派送</el-button>
            <el-button v-if="scope.row.status!==0&&scope.row.status!==2&&scope.row.status!==4" type="success"
                       @click="editDelivery(scope.row.id,1)">
              取件
            </el-button>
            <el-button v-if="scope.row.status!==0&&scope.row.status!==2&&scope.row.status!==4" type="warning"
                       @click="editDelivery(scope.row.id,2)">
              拒收
            </el-button>
            <el-button v-if="scope.row.status===3" type="danger" @click="editDelivery(scope.row.id,3)">
              催拿
            </el-button>
            <el-popconfirm v-if="scope.row.status!==0&&scope.row.status!==2&&scope.row.status!==4&&userInfo.role===1" confirm-button-text="确定" cancel-button-text="取消" :icon="Delete"
                           icon-color="#626AEF"
                           :title="'确定要将单号为「'+scope.row.expressno+'」的快递投向广场找人代拿吗?'"
                           @confirm="editDelivery(scope.row.id,4)">
              <template #reference>
                <el-button type="info">代拿</el-button>
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
import {reactive, toRefs, onMounted, watch} from "vue";
import {ElMessage} from "element-plus";
import {editDeliveryApi, getDeliveryListApi} from "../../api/delivery/delivery";
import {useUserStore} from "../../store/modules/user";

const {userInfo} = useUserStore();

const state = reactive({
  // 搜索表单内容
  searchValue: "",
  // 表格数据内容
  tableData: [],
  //总条数
  total: 0,
  // 快递类型
  expresstype: '',
  // 派送状态
  status: null,
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
    'searchValue': state.searchValue,
    'status': state.status == -1 ? '' : state.status,
    'expresstype': state.expresstype == '-' ? '' : state.expresstype
  }

  const {data} = await getDeliveryListApi(params)
  state.tableData = data.dataList
  state.total = data.total
  state.loading = false
}

// 刷新
const refresh = () => {
  state.searchValue = ""
  state.status = null
  state.expresstype = ''
  loadData(state)
}

const editDelivery = async (id: number, operation: number) => {
  if (id == null) return
  const {data} = await editDeliveryApi(id, operation)
  if (data.status === 200) {
    ElMessage.success(data.message)
  } else {
    ElMessage.warning(data.message)
  }
  await loadData(state)
}

// 监听用户状态下拉框内容的改变
watch([() => state.expresstype, () => state.status], (val, preVal) => {
      if (val) {
        state.searchValue = ""
        if (state.expresstype === '-' && state.status === null) {
          // 查询全部内容
          loadData(null);
        } else {
          loadData(state);
        }
      }
    }
)

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

const {tableData, pageIndex, pageSize, expresstype, status, loading, total, searchValue} = toRefs(state)
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