<template>
  <usual-search
    v-model:list-query="queryState.listQuery"
    :search-options="queryState.searchOptions"
    @select="handleSelect"
  />
  <usual-table
    v-model:page-num="queryState.listQuery.current"
    v-model:page-size="queryState.listQuery.size"
    :loading="listState.loading"
    :columns="listState.columns"
    :list="listState.list"
    :total="listState.total"
    @pagination="getList"
  >
    <template #action="{ row }">
      <el-button link type="primary" @click="goDetail(row.historyId)">详情</el-button>
    </template>
  </usual-table>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { columns, listQuery, searchOptions } from './enum'
import type { QueryState, ListState } from '#/base'

const { router, reqApi, message } = useCommon()
const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: searchOptions()
})

const listState = reactive<ListState>({
  list: [],
  total: 0,
  loading: false,
  columns: columns
})
const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const getList = async () => {
  listState.loading = true
  try {
    const res = await reqApi.pricing.list(queryState.listQuery)
    res.data.records.map((m: any) => {
      m.items.map((n: any) => {
        m.realAmount = parseFloat(m.realAmount ? m.realAmount : 0) + parseFloat(n.realAmount)
        m.originAmount =
          parseFloat(m.originAmount ? m.originAmount : 0) + parseFloat(n.originAmount)
      })
    })
    listState.list = res.data.records
    listState.total = res.data.total
  } catch (err: any) {
    message.error(err)
  }
  listState.loading = false
}
const goDetail = (id: string) => {
  router.push({
    name: 'pricingDetail',
    query: {
      id
    }
  })
}
getList()
</script>
