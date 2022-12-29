<template>
  <page-title title="最新实时订单"/>
  <usual-table
    :loading="loading"
    :columns="columns"
    :list="list">
    <template #action="{ row }">
      <el-button v-auth:disabled="'09444fd98fc1f87003'" link type="primary" @click="goDetail(row.schoolId, row.orderId)">查看订单</el-button>
    </template>
  </usual-table>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { basicProps, columns } from '../enum'

const props = defineProps(basicProps)
const { reqApi, router } = useCommon()
const { result: list, loading, run: getList } = useRequest<Recordable[]>(() => reqApi.dashboard.getSupeList({ deptIds: props.deptIds }), {
  defaultValue: [],
  immediate: true,
  formatResult: res => res?.records ?? []
})
watch(() => props.deptIds, () => getList(), {
  deep: true
})

const goDetail = (schoolId: string, orderId: string) => {
  router.push({
    name: 'instionDetail',
    query: {
      id: schoolId,
      orderId,
      type: 'orderDetail'
    }
  })
}
</script>
