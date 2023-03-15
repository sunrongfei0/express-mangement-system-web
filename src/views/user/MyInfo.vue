<template>
  <div>
    <el-card style="width: 1200px; height: 930px; margin-left: 300px">
      <el-form ref="ruleFormRef" :rules="rules" :model="formData" label-width="80px" size="large">

        <div style="text-align: center;margin: 10px 0">
          <el-upload
              class="avatar-uploader"
              action="http://localhost:8080/user/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
            <img v-if="formData.userIcon" :src="formData.userIcon" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </div>

        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" disabled/>
        </el-form-item>

        <el-form-item label="密码:">
          <el-button color="#178557" @click="editPassword(formData.id)">修改密码</el-button>
        </el-form-item>

        <el-form-item label="姓名:" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
        </el-form-item>

        <el-form-item label="电话:" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入联系电话"/>
        </el-form-item>

        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email" placeholder="请输入联系邮箱"/>
        </el-form-item>

        <el-form-item label="性别:">
          <el-radio-group v-model="formData.sex" fill="#178557" disabled>
            <el-radio-button label="男"/>
            <el-radio-button label="女"/>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="角色:">
          <el-radio-group v-model="formData.role" fill="#178557" disabled>
            <el-radio-button :label="1">普通用户</el-radio-button>
            <el-radio-button :label="2">快递站</el-radio-button>
            <el-radio-button :label="3">快递员</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="注册时间:">
          <el-input type="text" v-model="formData.createTime" disabled/>
        </el-form-item>

        <el-form-item label="地址:" prop="address">
          <el-input type="textarea" v-model="formData.address" placeholder="请输入地址"/>
        </el-form-item>

      </el-form>

      <div style="text-align: center;margin-top: 55px;" class="dialong__button--wrap">
        <el-button size="large" style="width: 100px;" color="#178557" @click="editUser(ruleFormRef)"
                   :loading="subLoading">保 存
        </el-button>
      </div>

    </el-card>
  </div>

  <!-- 修改密码弹出框 start -->
  <el-dialog align-center v-model="editPasswordDialogFormVisible" width="20%" destroy-on-close>
    <template #header="{close,titleId,titleClass}">
      <div class="my-header">
        <el-icon size="26px">
          <EditPen/>
        </el-icon>
        <h1 id="titleId">密码修改</h1>
      </div>
    </template>
    <!-- 编写快递组件start  和新增页共用组件 -->
    <EditPassword :userId="userId" @closeEditPasswordForm="closeEditPasswordForm" @success="success"/>
    <!-- 编写快递组件end -->

  </el-dialog>
  <!-- 修改密码弹出框 end -->
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {editUserApi, getMyInfoApi} from "../../api/user/user";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import EditPassword from "./EditPassword.vue";

// 定义表单约束规则
const rules = reactive<FormRules>({
  username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
  realname: [{required: true, message: '真实姓名不能为空', trigger: 'blur'}],
  email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
  phone: [{required: true, message: '联系电话不能为空', trigger: 'blur'}],
  address: [{required: true, message: '地址不能为空', trigger: 'blur'}]
})

let formData = reactive({
  id: null,
  username: '',
  password: '',
  status: null,
  realname: '',
  email: '',
  sex: '',
  role: '',
  userIcon: '',
  phone: '',
  address: '',
  createTime: '',
  lastlogintime: ''
})

const ruleFormRef = ref<FormInstance>()

const subLoading = ref(false)

const editUser = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const {data} = await editUserApi(formData)
      if (data.status === 200) {
        ElMessage.success(data.message)
        await getMyInfo();
      } else {
        ElMessage.error(data.message)
      }
    } else {
      ElMessage.error('提交失败，你还有未填项！')
      console.log('error submit', fields)
    }
  })

  subLoading.value = false
}

const handleAvatarSuccess = async (res: any) => {
  formData.userIcon = res
}

const getMyInfo = async () => {
  const {data} = await getMyInfoApi();
  console.log(data.result)
  if (data.status == 200) {
    for (const key in data.result) {
      formData[key] = data.result[key]
    }
  }
}

// 添加弹窗状态
const editPasswordDialogFormVisible = ref(false);

const userId = ref();

const editPassword = async (id: number) => {
  if (id == null) return;
  userId.value = id
  editPasswordDialogFormVisible.value = true
}

const closeEditPasswordForm =()=>{
  editPasswordDialogFormVisible.value =false
}

const success = () => {
  editPasswordDialogFormVisible.value = false
}

onMounted(() => {
  getMyInfo();
})
</script>

<style scoped>

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.my-header {
  display: flex;
  justify-content: flex-start;
}

.card-search {
  float: none;
}
</style>