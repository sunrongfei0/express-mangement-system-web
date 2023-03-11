<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="formSend" label-width="80px">
    <el-row>

      <el-col v-if="userInfo.role === 2" :span="24">
        <el-form-item label="快递单号" prop="expressno">
          <el-input v-model="formSend.expressno" placeholder="请输入快递单号"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="寄件人" prop="sender">
          <el-input v-model="formSend.sender" placeholder="请输入寄件人姓名"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="寄件人电话" prop="senderPhone">
          <el-input v-model="formSend.senderPhone" placeholder="请输入寄件人电话"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="寄件人地址" prop="senderAddress">
          <el-input type="textarea" v-model="formSend.senderAddress" placeholder="请输入寄件人地址"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="收件人" prop="recipient">
          <el-input v-model="formSend.recipient" placeholder="请输入收件人姓名"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="收件人电话" prop="recipientPhone">
          <el-input v-model="formSend.recipientPhone" placeholder="请输入收件人电话"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="收件人地址" prop="recipientAddress">
          <el-input type="textarea" v-model="formSend.recipientAddress" placeholder="请输入收件人地址"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="快递类型" prop="expresstype">
          <el-select v-model="formSend.expresstype" placeholder="请选择快递类型">
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
        <el-form-item label="物品类型" prop="itemtype">
          <el-input v-model="formSend.itemtype" placeholder="电子设备、衣物，书籍等"/>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="重量" prop="weight">
          <el-input v-model="formSend.weight" placeholder="请输入重量，单位KG"/>
        </el-form-item>
      </el-col>

      <el-col v-if="userInfo.role === 2" :span="12">
        <el-form-item label="价格" prop="money">
          <el-input v-model="formSend.money" placeholder="请输入价格"/>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="formSend.remark" placeholder="请输入备注"/>
        </el-form-item>
      </el-col>

    </el-row>
  </el-form>

  <div class="dialong__button--wrap">
    <el-button @click="close">取消</el-button>
    <el-button v-if="userInfo.role === 1" @click="editSend(ruleFormRef,0)" :loading="subLoading" type="success">下单
    </el-button>
    <el-button v-else-if="userInfo.role === 2" @click="editSend(ruleFormRef,1)" :loading="subLoading" type="success">
      提交
    </el-button>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import {ElMessage, FormInstance, FormRules} from "element-plus";
import {useUserStore} from "../../store/modules/user";
import {addSendApi, editSendApi} from "../../api/send/send";

const subLoading = ref(false);
const ruleFormRef = ref<FormInstance>()
const formSend = reactive({
  id: null,
  expressno: '',
  sender: '',
  senderAddress: '',
  senderPhone: '',
  recipient: '',
  recipientAddress: '',
  recipientPhone: '',
  expresstype: '',
  itemtype: '',
  weight: '',
  money: '',
  remark: ''
})
const {userInfo} = useUserStore();

// 获取从list传过来的对象
const props = defineProps(['sendInfo'])
const sendInfo = ref(props.sendInfo)

const emit = defineEmits(['closeEditSendForm', 'success'])

// 给表单填充数据
for (const key in formSend) {
  formSend[key] = sendInfo.value[key]
}

// 定义表单约束规则
const rules = reactive<FormRules>({
  sender: [{required: true, message: '发件人不能为空', trigger: 'blur'}],
  senderPhone: [{required: true, message: '发件人电话不能为空', trigger: 'blur'}],
  senderAddress: [{required: true, message: '发件人地址不能为空', trigger: 'blur'}],
  recipient: [{required: true, message: '收件人不能为空', trigger: 'blur'}],
  expresstype: [{required: true, message: '快递类型不能为空', trigger: 'blur'}],
  recipientPhone: [{required: true, message: '收件人电话不能为空', trigger: 'blur'}],
  recipientAddress: [{required: true, message: '收件人地址不能为空', trigger: 'blur'}],
  itemtype: [{required: true, message: '物品类型不能为空', trigger: 'blur'}],
  money: [{required: true, message: '金额不能为空', trigger: 'blur'}],
  expressno: [{required: true, message: '快递单号不能为空', trigger: 'blur'}]
})

// 新增寄件信息
const editSend = async (formEl: FormInstance | undefined, op: number) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    subLoading.value = true
    if (valid) {
      if (formSend.id === null) {
        const {data} = await addSendApi(formSend)
        if (data.status === 200) {
          ElMessage.success(data.message)
          emit('success')
        } else {
          ElMessage.error(data.message)
        }
      }
      else {
        const {data} = await editSendApi(formSend, op)
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
  emit('closeEditSendForm')
}
</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}

.el-form-item {
  margin-bottom: 30px;
}

</style>