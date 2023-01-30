<template>
  <div class="instion_list content-box">
    <usual-search
      v-model:list-query="queryState.listQuery"
      :search-options="queryState.searchOptions"
      @select="handleSelect"
    />

    <el-empty description="暂无数据" />
  </div>
</template>

<script setup lang="ts">
import { useCommon } from '@/hooks'
import { searchOptions, listQuery } from './enum'
import { setItemList } from '@/utils/mUtils'
import type { SearchOptions } from '#/base'

const { message, reqApi } = useCommon()

const queryState = reactive({
  listQuery: listQuery(),
  searchOptions: [] as SearchOptions[]
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

const listState = reactive({
  list: [] as Recordable[],
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
</script>
