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
        <el-button link type="primary" @click="goDetail(row.appealId)">详情</el-button>
      </template>
    </usual-table>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { columns, listQuery, searchOptions } from './data'
import type { ListState, QueryState } from '#/base'

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

const listState = reactive<ListState>({
  list: [],
  total: 0,
  columns: columns
})
const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const { loading, run: getList } = useRequest(() => reqApi.complain.appealList(queryState.listQuery), {
  immediate: true,
  onSuccess: res => {
    listState.total = res.total
    listState.list = res.records
  }
})
const goDetail = (id: string) => {
  router.push({
    name: 'appealDetail',
    query: {
      id
    }
  })
}
</script>
