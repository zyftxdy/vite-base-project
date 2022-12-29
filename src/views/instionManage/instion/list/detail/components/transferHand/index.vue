<template>
  <div v-if="!operState.showDetail" class="transferHand">
    <usual-search
      v-model:list-query="queryState.listQuery"
      :search-options="queryState.searchOptions"
      @handleSelect="handleSelect">
      <template #extraBtn>
        <el-button class="btn-small btn-usual" @click="operState.showDetail = true">手动划拨</el-button>
      </template>
    </usual-search>
    <usual-table
      row-key="intrSwfno"
      :loading="loading"
      :columns="listState.columns"
      :list="listState.list"
      :total="listState.total"
      v-model:page-num="queryState.listQuery.current"
      v-model:page-size="queryState.listQuery.size"
      @pagination="getList">
      <template #action="{ row }">
        <el-button link type="primary" @click="handleDetail(row.intrSwfno, row.schoolId)">详情</el-button>
      </template>
    </usual-table>

    <usual-dialog
      v-model:show="operState.showDialog"
      :show-footer="false"
      title="划拨记录详情"
      width="880px"
    >
      <description :schema="schemaDialog" :data="result"/>
      <transfer-info :data="result" :trd-amt="result.trdAmt"/>
      <description :schema="schemaDetail" :data="result"/>
    </usual-dialog>
  </div>
  <transfer-oper v-else @back="operState.showDetail = false"/>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { listQuery, searchOptions, columns, schemaDialog, schemaDetail } from './data'
import TransferOper from './components/transfer_oper.vue'
import TransferInfo from './components/transfer_info.vue'
import type { QueryState, ListState } from '#/base'
import { flatObject } from '@/utils/mUtils'

const { reqApi, route } = useCommon()
const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: []
})
const dateChange = (e: string) => {
  queryState.listQuery.startTime = e ? e[0] : ''
  queryState.listQuery.endTime = e ? e[1] : ''
}
queryState.searchOptions = searchOptions(dateChange)

const listState = reactive<ListState>({
  columns: columns,
  list: [],
  total: 0
})
const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const { loading, run: getList } = useRequest(data => reqApi.school.transferHandList(data), {
  immediate: true,
  onBefore: () => Object.assign(queryState.listQuery, { schoolId: route.query.id as string }),
  onSuccess: res => {
    listState.list = res.records
    listState.total = res.total
  }
})

const operState = reactive({
  showDetail: false,
  showDialog: false,
  data: {} as Recordable
})
const { result, run: handleDetail } = useRequest<Recordable>((intrSwfno, schoolId) => reqApi.school.transferHandInfo({ intrSwfno, schoolId }), {
  defaultValue: {},
  formatResult: res => handleData(res),
  onSuccess: () => {
    operState.showDialog = true
  }
})
const handleData = (data: Recordable): Recordable => {
  data.schoolInfoVo.bankSuperviseAccountName = data.bankManualTransferRecordVo.dfyActnm
  data.schoolInfoVo.bankTransferAccountName = data.bankManualTransferRecordVo.rcvmnActnm
  data.schoolInfoVo.bankSuperviseAccount = data.bankManualTransferRecordVo.dfyActno
  data.schoolInfoVo.bankSuperviseActbkApltn = data.bankManualTransferRecordVo.dfyActbkApltn
  data.schoolInfoVo.bankTransferAccount = data.bankManualTransferRecordVo.rcvmnActno
  data.schoolInfoVo.bankTransferActbkApltn = data.bankManualTransferRecordVo.rcvmnActbkApltn
  return flatObject(data)
}

defineExpose({
  operState
})
</script>
