<template>
  <el-timeline :reverse="reverse">
    <el-timeline-item
        v-for="(data,index) in state.dataList"
        :timestamp="formatTime(data.time, 'yyyy-MM-dd HH:mm:ss')"
        :key="index"
        placement="top">
      <el-card>
        <h4 style="margin-bottom: 20px;">{{data.desc}}</h4>
        <p>{{data.areaName}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>


<script setup lang="ts">

import {onMounted, reactive, ref} from "vue";
import {getDetailApi} from "../../api/track/track";
import {formatTime} from "../../utils/date";

const state = reactive({
  dataList: [],
})
const props = defineProps(['code'])
const code = ref(props.code)

const getData = async (code: string) => {
  const {data} = await getDetailApi(code);
  state.dataList = data
}

onMounted(() => {
  getData(code.value)
})

</script>

<style scoped>

</style>