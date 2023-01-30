<template>
  <list-header
    title="资金监管统计"
    desc="仅统计已经成功创建订单的支付流水"
    @dateChange="dateChange"
  />
  <usual-table
    v-model:page-num="queryState.current"
    v-model:page-size="queryState.size"
    :loading="loading"
    :columns="state.columns"
    :list="state.list"
    :total="state.total"
    :scroll-top="false"
    :page-sizes="[5]"
    @pagination="getList"
  >
    <template #action="{ row }">
      <el-button
        v-auth:disabled="'09444fd98fc1f87508'"
        link
        type="primary"
        @click="goDetail(row.payTime)"
        >查看详情</el-button
      >
    </template>
  </usual-table>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { basicProps, freezeColumns } from '../enum'
import ListHeader from './list-header.vue'
import type { ListState } from '#/base'

const props = defineProps(basicProps)
const { reqApi, router } = useCommon()
const queryState = reactive({
  startTime: '',
  endTime: '',
  current: 1,
  size: 5
})

const dateChange = (e: any) => {
  queryState.startTime = e ? e[0] : ''
  queryState.endTime = e ? e[1] : ''
  queryState.current = 1
  getList()
}

const state = reactive<ListState>({
  total: 0,
  list: [],
  columns: freezeColumns
})

watch(
  () => props.deptIds,
  () => {
    queryState.current = 1
    getList()
  },
  {
    deep: true
  }
)

const { loading, run: getList } = useRequest(
  () =>
    reqApi.dashboard.freezeList({
      ...queryState,
      deptIds: props.deptIds
    }),
  {
    immediate: true,
    onSuccess: res => {
      state.list = res?.records ?? []
      state.total = res?.total ?? 0
    }
  }
)
const goDetail = (day: string) => {
  router.push({
    name: 'freeze',
    query: {
      start: day,
      end: day
    }
  })
}
</script>
