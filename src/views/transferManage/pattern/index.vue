<template>
  <div class="rule_list content-box">
    <usual-search
      v-model:list-query="queryState.listQuery"
      :search-options="queryState.searchOptions"
      @select="handleSelect"
    >
      <template #extraBtn>
        <el-button class="btn-small btn-usual" @click="toggle()">添加</el-button>
      </template>
    </usual-search>
    <usual-table
      v-model:page-num="queryState.listQuery.current"
      v-model:page-size="queryState.listQuery.size"
      :loading="loading"
      :columns="listState.columns"
      :list="listState.list"
      :total="listState.total"
      @pagination="getList"
    />

    <usual-dialog v-model:show="showOper" title="添加划拨规则" width="576px">
      <add @getList="handleSelect" />
    </usual-dialog>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { useCommon, useMessage, useRequest } from '@/hooks'
import { backPageNum } from '@/utils/mUtils'
import Add from './components/add.vue'
import { listQuery, searchOptions, columns } from './data'
import type { QueryState, ListState } from '#/base'

const { message, reqApi } = useCommon()
const { messageConfirm } = useMessage()
const [showOper, toggle] = useToggle(false)

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
const { loading, run: getList } = useRequest(
  () => reqApi.transfer.scalePage(queryState.listQuery),
  {
    immediate: true,
    onSuccess: res => {
      listState.list = res.records
      listState.total = res.total
    }
  }
)

const handleDel = (id: string) => {
  messageConfirm({ message: '确定要删除该规则吗？' })
    .then(() => {
      del(id)
    })
    .catch()
}

const { run: del } = useRequest(id => reqApi.transfer.scaleDel({ scaleRuleId: id }), {
  onSuccess: () => {
    message.success('删除成功')
    queryState.listQuery.current = backPageNum(listState.list, queryState.listQuery.current)
    getList()
  }
})

listState.columns = columns({ handleDel })
</script>
