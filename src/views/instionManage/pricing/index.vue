<template>
  <div class="pricing content-box">
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
        <el-button v-auth:disabled="'09444fd98fc1f87502'" link type="primary" @click="goDetail(row.historyId)">详情</el-button>
      </template>
    </usual-table>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useRequest } from '@/hooks'
import { columns, listQuery, searchOptions } from './enum'
import type { QueryState, ListState } from '#/base'
import type { CascaderNode, CascaderProps, Resolve } from 'element-plus'

const { router, reqApi } = useCommon()
const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: []
})

const handleChange = (e: any) => {
  queryState.listQuery.bigCategoryId = e ? e[0] : ''
  queryState.listQuery.middleCategoryId = e ? e[1] : ''
}

const { run: getCList } = useRequest(() => reqApi.common.getCList(), {
  onSuccess: (res, node: CascaderNode, resolve: Resolve) => {
    // @ts-ignore
    const list = res.filter(item => item.childCount).map(item => {
      return {
        value: item.id,
        label: item.name,
        leaf: node.level >= 1
      }
    })
    resolve(list)
  }
})
const { run: getCcList } = useRequest((node: CascaderNode) => reqApi.common.getCcList({ pid: node.value }), {
  onSuccess: (res, node: CascaderNode, resolve: Resolve) => {
    // @ts-ignore
    const list = res.map(item => {
      return {
        value: item.id,
        label: item.name,
        leaf: node.level >= 1
      }
    })
    list.unshift({
      value: '',
      label: '全部分类',
      leaf: node.level >= 1
    })
    resolve(list)
  }
})
const props = reactive<CascaderProps>({
  lazy: true,
  lazyLoad: (node, resolve) => {
    const { level } = node
    console.log(node)
    level === 0 ? getCList(node, resolve ) : getCcList(node, resolve)
  }
})
queryState.searchOptions = searchOptions(props, handleChange)

const listState = reactive<ListState>({
  list: [],
  total: 0,
  columns: columns
})
const handleSelect = () => {
  queryState.listQuery.current = 1
  getList()
}
const { loading, run: getList } = useRequest(() => reqApi.pricing.list(queryState.listQuery), {
  immediate: true,
  onSuccess: res => {
    // @ts-ignore
    res.records.map(m => {
      // @ts-ignore
      m.items.map(n => {
        m.realAmount = parseFloat(m.realAmount ?? 0) + parseFloat(n.realAmount)
        m.originAmount = parseFloat(m.originAmount ?? 0) + parseFloat(n.originAmount)
      })
    })
    listState.list = res.records
    listState.total = res.total
  }
})
const goDetail = (id: string) => {
  router.push({
    name: 'pricingDetail',
    query: { id }
  })
}
</script>
