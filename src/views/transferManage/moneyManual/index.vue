<template>
  <div class="money_list content-box">
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
        <el-button link type="primary" @click="onClick(row.transferId, false)">查看明细</el-button>
        <template v-if="row.transferStatus === 'APPLYING' || row.transferStatus === 'APPROVING'">
          <el-button link type="primary" @click="onTransfer(row.transferId)">确认划拨</el-button>
          <el-button link type="danger" @click="onClick(row.transferId, true)">驳回申请</el-button>
        </template>
      </template>
    </usual-table>

    <usual-dialog
      v-model:show="operState.showInfo"
      :title="operState.title"
      :show-footer="operState.showOper"
      width="564px">
      <reject :show-oper="operState.showOper" :id="operState.id" @oper="getList"/>
    </usual-dialog>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useRequest } from '@/hooks'
import reject from './components/reject.vue'
import { listQuery, searchOptions, columns } from './data'
import type { QueryState, ListState } from '#/base'

const { message, reqApi } = useCommon()
const { messageConfirm } = useMessage()
const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: searchOptions()
})

const listState = reactive<ListState>({
  list: [],
  columns: columns,
  total: 0
})

const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const { loading, run: getList } = useRequest(() => reqApi.transfer.manualPage(queryState.listQuery), {
  immediate: true,
  onSuccess: res => {
    listState.list = res.records
    listState.total = res.total
  }
})

const operState = reactive({
  showInfo: false,
  showOper: false,
  id: '',
  title: '查看明细'
})
const onClick = (id: string, boole: boolean) => {
  operState.id = id
  operState.showInfo = true
  operState.showOper = boole
  operState.title = boole ? '确认驳回本次划拨申请' : '查看明细'
}
const onTransfer = (id: string) => {
  messageConfirm({
    message: '确认要划拨吗？'
  }).then(() => {
    transfer(id)
  })
}

const { run: transfer } = useRequest(id => reqApi.transfer.manualApply({
  transferId: id,
  isAgree: 'AGREE'
}), {
  onSuccess: () => {
    message.success('操作成功')
    getList()
  }
})
</script>
