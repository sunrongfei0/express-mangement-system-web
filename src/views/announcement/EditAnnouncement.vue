<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formAnn" label-width="80px">
    <el-row>

      <el-col :span="24">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formAnn.title" placeholder="请输入标题"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" :rows="18" v-model="formAnn.content" placeholder="请输入内容"/>
        </el-form-item>
      </el-col>
    </el-row>

  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button color="#178557" type="success" @click="editAnn(ruleFormRef)" :loading="subLoading">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {addAnnApi, editAnnApi} from "../../api/announcement/announcement";

// 获取从list传过来的对象
const props = defineProps(['annInfo'])
const annInfo = ref(props.annInfo)

const ruleFormRef = ref<FormInstance>()

const subLoading = ref(false)

const emit = defineEmits(['closeEditAnnForm', 'success'])

const formAnn = reactive({
  id: null,
  title: '',
  content: ''
})

if (annInfo.value.id) {
  // 给表单填充数据
  for (const key in formAnn) {
    formAnn[key] = annInfo.value[key]
  }
}

// 定义表单约束规则
const rules = reactive<FormRules>({
  title: [{required: true, message: '标题不能为空', trigger: 'blur'}],
  content: [{required: true, message: '内容不能为空', trigger: 'blur'}]
})

// 编辑用户信息
const editAnn = async (formEl: FormInstance) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      if (!formAnn.id) {
        const {data} = await addAnnApi(formAnn)
        if (data.status === 200) {
          ElMessage.success(data.message)
          emit('success')
        } else {
          ElMessage.error(data.message)
        }
      } else {
        const {data} = await editAnnApi(formAnn)
        if (data.status === 200) {
          ElMessage.success(data.message)
          emit('success')
        } else {
          ElMessage.error(data.message)
        }
      }

    } else {
      ElMessage.error('提交失败，你还有未填项！')
      console.log('error submit', fields)
    }
  })

  subLoading.value = false
}

const close = () => {
  emit('closeEditAnnForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>