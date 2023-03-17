<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formUser" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formUser.username" placeholder="请输入用户名"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formUser.realname" placeholder="请输入真实姓名"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="formUser.phone" placeholder="请输入联系电话"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="formUser.email" placeholder="请输入联系邮箱"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="性别">
          <el-radio-group v-model="formUser.sex" fill="#178557">
            <el-radio-button label="男"/>
            <el-radio-button label="女"/>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="用户状态">
          <el-radio-group v-model="formUser.status" fill="#178557">
            <el-radio-button :label="1">正常</el-radio-button>
            <el-radio-button :label="0">封禁</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="用户角色">
          <el-radio-group v-model="formUser.role" fill="#178557">
            <el-radio-button :label="1">普通用户</el-radio-button>
            <el-radio-button :label="2">快递站</el-radio-button>
            <el-radio-button :label="3">快递员</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="地址" prop="address">
          <el-input type="textarea" v-model="formUser.address" placeholder="请输入地址"/>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button color="#178557" type="success" @click="editUser(ruleFormRef)" :loading="subLoading">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {editUserApi} from "../../api/user/user";

// 获取从list传过来的对象
const props = defineProps(['userInfo'])
const userInfo = ref(props.userInfo)

const subLoading = ref(false)

const emit = defineEmits(['closeEditUserForm', 'success'])

const formUser = reactive({
  id: 0,
  username: '',
  status: 1,
  realname: '',
  email: '',
  sex: '',
  role: '1',
  address:'',
  phone:''
})

// 给表单填充数据
for (const key in formUser) {
  formUser[key] = userInfo.value[key]
}

const ruleFormRef = ref<FormInstance>()

// 定义表单约束规则
const rules = reactive<FormRules>({
  username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
  realname: [{required: true, message: '真实姓名不能为空', trigger: 'blur'}],
  email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
  phone: [{required: true, message: '联系电话不能为空', trigger: 'blur'}],
})

// 编辑用户信息
const editUser = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const {data} = await editUserApi(formUser)
      if (data.status === 200) {
        ElMessage.success(data.message)
        emit('success')
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

const close = () => {
  emit('closeEditUserForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>