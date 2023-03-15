<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formPW" label-width="80px">
    <el-row>
      <el-col :span="24">
        <el-form-item label="原密码" prop="oldpw">
          <el-input type="password" v-model="formPW.oldpw" placeholder="请输入原密码"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="新密码" prop="newpw1">
          <el-input type="password" v-model="formPW.newpw1" placeholder="请输入新密码"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="再次输入" prop="newpw2">
          <el-input type="password" v-model="formPW.newpw2" placeholder="再次输入新密码"/>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button color="#178557" type="success" @click="editPW(ruleFormRef)" :loading="subLoading">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {editPWApi, editUserApi, validatePWApi} from "../../api/user/user";

// 获取从list传过来的对象
const props = defineProps(['userId'])
const userId = ref(props.userId)

const subLoading = ref(false)

const emit = defineEmits(['closeEditPasswordForm', 'success'])

const formPW = reactive({
  id: 0,
  oldpw: '',
  newpw1: '',
  newpw2: ''
})

formPW.id = userId.value

const ruleFormRef = ref<FormInstance>()

const validatePass = async (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('原密码不能为空'))
  } else {
    const {data} = await validatePWApi(formPW.id, value);
    if (data.status !== 200) {
      callback(new Error('原密码输入不正确'))
    } else {
      callback()
    }
  }
}

const validatePass1 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('新密码不能为空'))
  } else {
    if (formPW.newpw1 !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('newpw2', () => null)
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value == '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== formPW.newpw1) {
    callback(new Error('两次密码输入的不一致'))
  } else {
    callback()
  }
}

// 定义表单约束规则
const rules = reactive<FormRules>({
  oldpw: [{required: true, validator: validatePass, trigger: 'blur'}],
  newpw1: [{required: true, validator: validatePass1, trigger: 'blur'}],
  newpw2: [{required: true, validator: validatePass2, trigger: 'blur'}]
})

const editPW = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const {data} = await editPWApi(formPW.id, formPW.newpw1)
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
  emit('closeEditPasswordForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>