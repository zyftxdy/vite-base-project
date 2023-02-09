<template>
  <list-header
    title="资金划拨统计"
    desc="仅统计学生已经确认课时或超时自动确认课时后成功划拨的资金"
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
        v-auth:disabled="'09444fd98fc1f87518'"
        link
        type="primary"
        @click="goDetail(row.days)"
        >查看详情</el-button
      >
    </template>
  </usual-table>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { basicProps, thawColumns } from '../enum'
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
  columns: thawColumns
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
    reqApi.dashboard.thawList({
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
    name: 'thaw',
    query: {
      start: day,
      end: day
    }
  })
}
</script>
