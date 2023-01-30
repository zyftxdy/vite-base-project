<template>
  <div class="supervise content-box">
    <usual-search
      v-model:list-query="queryState.listQuery"
      :search-options="queryState.searchOptions"
      @select="handleSelect"
    />
    <usual-table
      v-model:page-num="queryState.listQuery.current"
      v-model:page-size="queryState.listQuery.size"
      :loading="loading"
      :columns="listState.columns"
      :list="listState.list"
      :total="listState.total"
      @pagination="getList"
    >
      <template #action="{ row }">
        <el-button link type="primary" @click="goDetail(row.schoolId)">详情</el-button>
      </template>
    </usual-table>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useProvinces, useDepart, useRequest } from '@/hooks'
import { setItemList } from '@/utils/mUtils'
import { columns, searchOptions, listQuery } from './enum'
import type { QueryState, ListState } from '#/base'

const { reqApi, router } = useCommon()
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

const dateChange = (e: any) => {
  queryState.listQuery.registerStartTime = e ? e[0] : ''
  queryState.listQuery.registerEndTime = e ? e[1] : ''
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
const { loading, run: getList } = useRequest(
  () => reqApi.money.getSuperList(queryState.listQuery),
  {
    immediate: true,
    onSuccess: res => {
      listState.list = res.records
      listState.total = res.total
    }
  }
)
const goDetail = (id: string) => {
  router.push({
    name: 'instionDetail',
    query: {
      id
    }
  })
}
</script>
