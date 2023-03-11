<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formExpress" label-width="100px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="快递单号" prop="expressno">
          <el-input v-model="formExpress.expressno" placeholder="请输入快递单号"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="快递类型" prop="expresstype">
          <el-select v-model="formExpress.expresstype" placeholder="请选择快递类型">
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
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="寄件人" prop="sender">
          <el-input v-model="formExpress.sender" placeholder="请输入寄件人"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="寄件人电话" prop="sender_phone">
          <el-input v-model="formExpress.senderPhone" placeholder="请输入寄件人电话"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="寄件人地址" prop="sender_address">
          <el-input type="textarea" v-model="formExpress.senderAddress" placeholder="请输入寄件人地址"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="收件人" prop="recipient">
          <el-input v-model="formExpress.recipient" placeholder="请输入收件人"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="收件人电话" prop="recipient_phone">
          <el-input v-model="formExpress.recipientPhone" placeholder="请输入收件人电话"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="收件人地址" prop="recipient_address">
          <el-input type="textarea" v-model="formExpress.recipientAddress" placeholder="请输入收件人地址"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="formExpress.remark" placeholder="请输入收件人地址"/>
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button @click="addExpress(ruleFormRef)" :loading="subLoading" type="success">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {addExpressApi} from "../../api/express/express";

const emit = defineEmits(['closeAddExpressForm', 'success'])
const props = defineProps(['expressInfo'])

const expressInfo = ref(props.expressInfo)

const subLoading = ref(false);
const ruleFormRef = ref<FormInstance>()
const formExpress = reactive({
  expressno: '',
  sender: '',
  senderAddress: '',
  senderPhone: '',
  recipient: '',
  recipientAddress: '',
  recipientPhone: '',
  expresstype: '',
  centerid: '',
  remark: ''
})

formExpress.centerid = expressInfo.value.centerid

// 存在id
if (expressInfo.value.id) {
  // 给表单填充数据
  for (const key in formExpress) {
    formExpress[key] = expressInfo.value[key]
  }
}


// 定义表单约束规则
const rules = reactive<FormRules>({
  expressno: [{required: true, message: '快递单号不能为空', trigger: 'blur'}],
  sender: [{required: true, message: '寄件人不能为空', trigger: 'blur'}],
  senderAddress: [{required: true, message: '寄件人地址不能为空', trigger: 'blur'}],
  senderPhone: [{required: true, message: '寄件人电话不能为空', trigger: 'blur'}],
  recipient: [{required: true, message: '收件人不能为空', trigger: 'blur'}],
  recipientAddress: [{required: true, message: '收件人地址不能为空', trigger: 'blur'}],
  recipientPhone: [{required: true, message: '收件人电话不能为空', trigger: 'blur'}],
  expresstype: [{required: true, message: '快递类型不能为空', trigger: 'blur'}]
})

// 新增用户信息
const addExpress = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      const {data} = await addExpressApi(formExpress)
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
  emit('closeAddExpressForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}
</style>