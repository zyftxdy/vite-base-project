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
      :loading="loading"
      :columns="listState.columns"
      :list="listState.list"
      :total="listState.total"
      @pagination="getList"
    >
    </usual-table>

    <usual-dialog v-model:show="operState.show" :title="operState.title">
      <edit-oper :data="operState.data" @getList="getList" />
    </usual-dialog>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useProvinces, useRequest } from '@/hooks'
import { columns, searchOptions, listQuery } from './enum'
import { setItemList } from '@/utils/mUtils'
import editOper from './components/editOper.vue'
import type { QueryState, ListState } from '#/base'

const { router, reqApi } = useCommon()
const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: []
})
const { areaType, areaList, codeChange } = useProvinces({
  target: queryState,
  immediate: true,
  onSuccess: () => setItemList(queryState.searchOptions, unref(areaType), unref(areaList))
})

queryState.searchOptions = searchOptions(codeChange)

const listState = reactive<ListState>({
  list: [],
  columns: [],
  total: 0
})
const { loading, run: getList } = useRequest(() => reqApi.school.schoolList(queryState.listQuery), {
  immediate: true,
  onSuccess: res => {
    listState.list = res.records
    listState.total = res.total
  }
})
const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const goDetail = (id: string) => {
  router.push({
    name: 'instionDetail',
    query: { id }
  })
}

const operState = reactive({
  show: false,
  data: {} as Recordable,
  title: ''
})
const handleClick = (data: Recordable, type: string) => {
  operState.show = true
  operState.data = data
  operState.data.type = type
  operState.title = type === 'DEPART' ? '修改部门' : '修改评级'
}

listState.columns = columns({ goDetail, handleClick })
</script>
