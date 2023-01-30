<template>
  <div class="instion_list content-box">
    <usual-search
      v-model:list-query="queryState.listQuery"
      :search-options="queryState.searchOptions"
      @select="handleSelect"
    />

    <usual-table
      v-model:page-num="queryState.listQuery.current"
      v-model:page-size="queryState.listQuery.size"
      row-key="schoolId"
      :loading="listState.loading"
      :columns="listState.columns"
      :list="listState.list"
      :total="listState.total"
      @pagination="getList"
    >
      <template #action="{ row }"> </template>
    </usual-table>
  </div>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { columns, searchOptions, listQuery } from './enum'
import { setItemList } from '@/utils/mUtils'
import type { QueryState, ListState } from '#/base'

const { router, message, reqApi } = useCommon()

const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: []
})
const dateChange = (e: string) => {
  queryState.listQuery.startTime = e ? e[0] : ''
  queryState.listQuery.endTime = e ? e[1] : ''
}

queryState.searchOptions = searchOptions(dateChange)

const getDictList = async () => {
  try {
    const res = await reqApi.common.dictList()
    setItemList(queryState.searchOptions, 'tag', res.data)
  } catch (err: any) {
    message.error(err)
  }
}
getDictList()

const listState = reactive<ListState>({
  list: [],
  columns: columns,
  total: 0,
  loading: false
})

const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const getList = async () => {
  listState.loading = true
  listState.loading = false
}
getList()
</script>
