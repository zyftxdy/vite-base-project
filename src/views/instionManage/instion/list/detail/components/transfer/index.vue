<template>
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
      <el-button
        :disabled="row.transferStatus !== 'APPLY_FAILED' && row.transferStatus !== 'TRANS_FAILED'"
        link
        type="primary"
        @click="handleTransfer(row.transferId)"
        >重新申请</el-button
      >
      <el-button
        :disabled="!row.orderId"
        link
        type="primary"
        @click="$emit('goDetail', row.orderId)"
        >订单详情</el-button
      >
    </template>
  </usual-table>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useRequest } from '@/hooks'
import { listQuery, searchOptions, columns } from './enum'
import type { QueryState, ListState } from '#/base'

defineEmits(['goDetail'])
const { reqApi, message, route } = useCommon()
const { messageConfirm } = useMessage()
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
  columns: columns,
  total: 0
})
const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const { loading, run: getList } = useRequest(data => reqApi.school.transferList(data), {
  immediate: true,
  onBefore: () => Object.assign(queryState.listQuery, { schoolId: route.query.id as string }),
  onSuccess: res => {
    listState.list = res.records
    listState.total = res.total
  }
})
const handleTransfer = (id: string) => {
  messageConfirm({ message: '确定要重新申请吗？' }).then(() => {
    transfer(id)
  })
}
const { run: transfer } = useRequest(id => reqApi.school.transfer({ transferId: id }), {
  onSuccess: () => {
    message.success('操作成功')
    getList()
  }
})
</script>
