<template>
  <div>
    <h2 style="text-align: center;font-size: 30px;">{{state.data.title}}</h2>
    <br>
    <br>
    <br>
    <p class="content" style="font-size: 20px">{{state.data.content}}</p>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {useUserStore} from "../../store/modules/user";
const {userInfo} = useUserStore();

const state = reactive({
  data: {}
})

// 获取从list传过来的对象
const props = defineProps(['msgInfo'])
const msgInfo = ref(props.msgInfo)

state.data = msgInfo.value

</script>

<style scoped>
.dialong__button--wrap {
  text-align: center;
  margin-top: 20px;
}

.el-form-item {
  margin-bottom: 30px;
}

.content{
  white-space:pre-wrap;
}

</style>