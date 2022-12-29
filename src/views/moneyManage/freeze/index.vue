<template>
  <div class="freeze content-box">
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
      @pagination="getList"/>
  </div>
</template>

<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'
import { useCommon, useProvinces, useDepart, useRequest } from '@/hooks'
import { setItemList } from '@/utils/mUtils'
import { columns, searchOptions, listQuery } from './enum'
import type { QueryState, ListState } from '#/base'

const { reqApi } = useCommon()
const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: []
})
const { deptList } = useDepart({
  FnType: 'depart',
  immediate: true,
  onSuccess: () => setItemList(queryState.searchOptions, 'deptId', unref(deptList))
})
const { areaType, areaList, codeChange } = useProvinces({
  target: queryState,
  immediate: true,
  onSuccess: () => setItemList(queryState.searchOptions, unref(areaType), unref(areaList))
})

queryState.listQuery.payStartTime = useRouteQuery('start', '').value
queryState.listQuery.payEndTime = useRouteQuery('end', '').value
queryState.listQuery.dates = [queryState.listQuery.payStartTime, queryState.listQuery.payEndTime]

const dateChange = (e: any) => {
  queryState.listQuery.payStartTime = e ? e[0] : ''
  queryState.listQuery.payEndTime = e ? e[1] : ''
}

queryState.searchOptions = searchOptions(dateChange, codeChange)

const listState = reactive<ListState>({
  list: [],
  columns: columns,
  total: 0
})
const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const { loading, run: getList } = useRequest(() => reqApi.money.getFreezeList(queryState.listQuery), {
  immediate: true,
  onSuccess: res => {
    listState.list = res.records
    listState.total = res.total
  }
})
</script>
