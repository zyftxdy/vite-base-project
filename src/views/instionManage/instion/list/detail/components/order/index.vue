<template>
  <div v-if="!operState.showDetail" class="order">
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
        <el-button link type="primary" @click="goDetail(row.orderId)">查看订单</el-button>
      </template>
    </usual-table>
  </div>
  <order-detail v-if="operState.showDetail" :order-id="operState.orderId" @back="back" />
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { scrollTo } from '@/utils/scrollTo'
import { listQuery, searchOptions, columns } from './data'
import orderDetail from './components/orderDetail.vue'
import type { ListState, QueryState } from '#/base'

const { reqApi, route } = useCommon()
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
const { loading, run: getList } = useRequest(data => reqApi.school.orderList(data), {
  immediate: true,
  onBefore: () => Object.assign({}, queryState.listQuery, { schoolId: route.query.id as string }),
  onSuccess: res => {
    listState.total = res.total
    listState.list = res.records
  }
})

const operState = reactive({
  showDetail: false,
  orderId: ''
})
const goDetail = (id: string) => {
  scrollTo(0)
  operState.orderId = id
  operState.showDetail = true
}
const back = () => {
  queryState.listQuery = listQuery()
  operState.showDetail = false
}

defineExpose({
  operState
})
</script>
