<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formUser" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formUser.username" placeholder="请输入用户名"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="formUser.password" placeholder="请输入登录密码"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formUser.realname" placeholder="请输入真实姓名"/>
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

      <el-col :span="12">
        <el-form-item label="email" prop="email">
          <el-input v-model="formUser.email" placeholder="请输入邮箱"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="formUser.phone" placeholder="请输入联系电话"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="地址" prop="address">
          <el-input v-model="formUser.address" placeholder="请输入地址"/>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="formUser.role!==2">
        <el-form-item label="性别">
          <el-radio-group v-model="formUser.sex">
            <el-radio-button label="男"/>
            <el-radio-button label="女"/>
          </el-radio-group>
        </el-form-item>
      </el-col>

      <!--      <el-col :span="12">-->
      <!--        <el-form-item label="快递类型" prop="expresstype">-->
      <!--          <el-select v-model="formUser.expresstype" placeholder="请选择快递类型">-->
      <!--            <el-option label="顺丰" value="SF"></el-option>-->
      <!--            <el-option label="京东" value="JD"></el-option>-->
      <!--            <el-option label="邮政" value="EMS"></el-option>-->
      <!--            <el-option label="韵达" value="YUNDA"></el-option>-->
      <!--            <el-option label="申通" value="STO"></el-option>-->
      <!--            <el-option label="圆通" value="YTO"></el-option>-->
      <!--            <el-option label="中通" value="ZTO"></el-option>-->
      <!--            <el-option label="极兔" value="JS"></el-option>-->
      <!--            <el-option label="其它" value="QT"></el-option>-->
      <!--          </el-select>-->
      <!--        </el-form-item>-->
      <!--      </el-col>-->
    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button @click="addUser(ruleFormRef)" :loading="subLoading" type="success">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {addUserApi} from "../../api/user/user";

const subLoading = ref(false);
const ruleFormRef = ref<FormInstance>()
const formUser = reactive({
  username: '',
  password: '123456',
  status: 1,
  role: 2,
  realname: '',
  phone: '',
  address: '',
  email: '',
  sex: '男',
  expresstype: ''
})

const emit = defineEmits(['closeAddUserForm', 'success'])


// 定义表单约束规则
const rules = reactive<FormRules>({
  username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
  password: [{required: true, message: '登录密码不能为空', trigger: 'blur'}],
  realname: [{required: true, message: '真实姓名不能为空', trigger: 'blur'}],
  email: [{required: true, message: '邮箱不能为空', trigger: 'blur'}],
  expresstype: [{required: true, message: '快递类型不能为空', trigger: 'blur'}],
  address: [{required: true, message: '地址不能为空', trigger: 'blur'}],
  phone: [{required: true, message: '联系电话不能为空', trigger: 'blur'}]
})

// 新增用户信息
const addUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const {data} = await addUserApi(formUser)
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
  emit('closeAddUserForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>