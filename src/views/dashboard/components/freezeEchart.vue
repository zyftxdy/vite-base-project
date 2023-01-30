<template>
  <page-title title="资金监管动态" />
  <div v-show="!showEmpty" ref="elRef" style="width: 100%; height: 300px" />
  <el-empty v-show="showEmpty" description="暂无数据" />
</template>

<script setup lang="ts">
import { echartOptions, basicProps } from '../enum'
import { useCommon, useEcharts, useRequest } from '@/hooks'
import type { Ref } from 'vue'

const props = defineProps(basicProps)
const { reqApi } = useCommon()
const elRef = ref<HTMLDivElement>()
const showEmpty = ref(false)

const { setOptions } = useEcharts(elRef as Ref<HTMLDivElement>)

const { run: getData } = useRequest(() => reqApi.dashboard.freezeBar({ deptIds: props.deptIds }), {
  onSuccess: res => {
    showEmpty.value = !res
    const xData: string[] = [],
      yData: string[] = []
    res.map((item: any) => {
      xData.push(item.days)
      yData.push(item.totalAmount)
    })
    const options = echartOptions(xData, yData, '当日监管资金总额', '#88a7dc')
    setOptions(options)
  }
})

watch(
  () => props.deptIds,
  () => getData(),
  { deep: true }
)
onMounted(() => getData())
</script>
