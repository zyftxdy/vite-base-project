<template>
  <div class="pricing content-box">
    <usual-search
      v-model:list-query="queryState.listQuery"
      :search-options="queryState.searchOptions"
      @handleSelect="handleSelect"/>
    <usual-table
      :loading="loading"
      :columns="listState.columns"
      :list="listState.list"
      :total="listState.total"
      v-model:page-num="queryState.listQuery.current"
      v-model:page-size="queryState.listQuery.size"
      @pagination="getList">
      <template #action="{ row }">
        <el-button link type="primary" @click="goDetail(row.complaintId)">查看</el-button>
      </template>
    </usual-table>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { setItemList } from '@/utils/mUtils'
import { columns, listQuery, searchOptions } from './data'
import type { QueryState, ListState } from '#/base'

const { router, reqApi } = useCommon()
const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: []
})

const dateChange = (e: any) => {
  queryState.listQuery.startTime = e ? e[0] : ''
  queryState.listQuery.endTime = e ? e[1] : ''
}
queryState.searchOptions = searchOptions(dateChange)

useRequest(() => reqApi.sysytem.categoryList({ current: 1, size: 100 }), {
  immediate: true,
  onSuccess: res => setItemList(queryState.searchOptions, 'categoryId', res.records)
})

const listState = reactive<ListState>({
  list: [],
  total: 0,
  columns: columns
})
const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const { loading, run: getList } = useRequest(() => reqApi.complain.complaintList(queryState.listQuery), {
  immediate: true,
  onSuccess: res => {
    listState.total = res.total
    listState.list = res.records
  }
})

const goDetail = (id: string) => {
  router.push({
    name: 'complainDetail',
    query: { id }
  })
}
</script>
