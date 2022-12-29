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
      @pagination="getList"/>

    <usual-dialog
      v-model:show="showInfo"
      :show-footer="false"
      title="资金汇总明细"
      width="864px">
      <template v-for="item in result" :key="item.id">
        <div class="desc-extra">
          <description :schema="schema" :data="item"/>
        </div>
      </template>
    </usual-dialog>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { listQuery, searchOptions, columns, schema } from './data'
import type { QueryState, ListState } from '#/base'

const { reqApi, router } = useCommon()

const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: searchOptions()
})
const listState = reactive<ListState>({
  list: [],
  columns: [],
  total: 0
})

const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const { loading, run: getList } = useRequest(() => reqApi.transfer.summaryPage(queryState.listQuery), {
  immediate: true,
  onSuccess: res => {
    listState.list = res.records
    listState.total = res.total
  }
})

const showInfo = ref(false)
const { result, run: handleInfo } = useRequest<Recordable[]>(id => reqApi.transfer.summaryInfo({ transferSummaryId: id }), {
  defaultValue: [],
  onSuccess: () => {
    showInfo.value = true
  }
})
const handleTransfer = (data: Recordable) => {
  router.push({
    name: 'instionDetail',
    query: {
      id: data.schoolId,
      type: 'transferHand'
    },
    params: {
      trdAmt: data.transferTotalAmount,
      transferSummaryId: data.transferSummaryId
    }
  })
}

listState.columns = columns({ handleInfo, handleTransfer })
</script>

<style lang="scss" scoped>
.desc-extra{
  @apply border-b border-dashed border-slate-400 last:border-0 py-4 first:pt-0;
}
</style>
