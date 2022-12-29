<template>
  <card
    v-model:tab-key="queryState.listQuery.creditLevel"
    :tabs-list="tabsList"
    @tab-change="tabChange">
    <usual-search
      v-model:list-query="queryState.listQuery"
      :search-options="queryState.searchOptions"
      @handleSelect="handleSelect"/>
    <usual-table
      row-key="schoolId"
      :loading="loading"
      :columns="listState.columns"
      :list="listState.list"
      :total="listState.total"
      v-model:page-num="queryState.listQuery.current"
      v-model:page-size="queryState.listQuery.size"
      @pagination="getList">
      <template #action="{ row }">
        <el-button v-auth:disabled="'09444fd98fc1f87003'" link type="primary" @click="goDetail(row.schoolId)">查看</el-button>
        <el-button link type="primary" @click="handleMove(row.schoolId)">移出</el-button>
      </template>
    </usual-table>
  </card>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useProvinces, useRequest } from '@/hooks'
import { setItemList } from '@/utils/mUtils'
import { cerditLvOptions } from '@/utils/sysBusi'
import { columns, searchOptions, listQuery } from './enum'
import type { TabPaneName } from 'element-plus'
import type { QueryState, ListState } from '#/base'
import type { Tab } from '@/components/Card/props'

const tabsList: Tab[] = [
  { label: '黑名单机构', name: 'BLACK' },
  { label: '白名单机构', name: 'WHITE' },
  { label: '灰名单机构', name: 'GREY' }
]

const { router, message, reqApi } = useCommon()
const { messageConfirm }  = useMessage()

const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: []
})
const { areaType, areaList, codeChange } = useProvinces({
  target: queryState,
  immediate: true,
  onSuccess: () => setItemList(queryState.searchOptions, unref(areaType), unref(areaList))
})

const tabChange = (e: TabPaneName) => {
  queryState.listQuery = listQuery()
  queryState.listQuery.creditLevel = e
  getList()
}
const dateChange = (e: any) => {
  queryState.listQuery.startTime = e ? e[0] : ''
  queryState.listQuery.endTime = e ? e[1] : ''
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
const { loading, run: getList } = useRequest(() => reqApi.school.creditList(queryState.listQuery), {
  immediate: true,
  onSuccess: res => {
    listState.total = res.total
    listState.list = res.records
  }
})

const goDetail = (id: string) => {
  router.push({
    name: 'instionDetail',
    query: { id }
  })
}
const handleMove = (id: string) => {
  const message = `确认将该机构移出${cerditLvOptions[queryState.listQuery.creditLevel]}吗？`
  messageConfirm({ message: message })
  .then(() => {
    moveCerdit(id)
  })
}
const { run: moveCerdit } = useRequest(id => reqApi.school.creditMove({ schoolId: id }), {
  onSuccess: () => {
    message.success('操作成功')
    getList()
  }
})
</script>
