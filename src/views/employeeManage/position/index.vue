<template>
  <div class="position content-box">
    <el-button
      class="margin-bottom15 btn-big btn-border-color"
      type="primary"
      @click="handleEdit(null)"
    >
      <template #icon><i-ep-plus /></template>添加职位
    </el-button>
    <usual-table
      v-model:page-num="state.current"
      v-model:page-size="state.size"
      row-key="roleId"
      :loading="loading"
      :columns="state.columns"
      :list="state.list"
      :total="state.total"
      @pagination="getList"
    >
      <template #action="{ row }">
        <span v-if="row.adminFlag">--</span>
        <template v-else>
          <el-button link type="primary" @click="handleEdit(row.roleId)">编辑</el-button>
          <el-button link type="primary" @click="handleDel(row.roleId)">删除</el-button>
        </template>
      </template>
    </usual-table>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useRequest } from '@/hooks'
import { columns } from './enum'
import { backPageNum } from '@/utils/mUtils'

const { reqApi, message, router } = useCommon()
const { messageConfirm } = useMessage()
const state = reactive({
  list: [] as any[],
  columns: columns,
  current: 1,
  size: 20,
  total: 0
})

const { loading, run: getList } = useRequest(
  () =>
    reqApi.role.roleList({
      current: state.current,
      size: state.size
    }),
  {
    immediate: true,
    onSuccess: res => {
      state.list = res.records
      state.total = res.total
    }
  }
)
const handleEdit = (id: Nullable<string>) => {
  router.push({
    name: 'positionDetail',
    query: {
      id: id ?? ''
    }
  })
}
const handleDel = (id: string) => {
  messageConfirm({ message: '确认要删除该职位吗？' }).then(() => {
    delPosition(id)
  })
}
const { run: delPosition } = useRequest(id => reqApi.role.roleDel({ roleId: id }), {
  onSuccess: () => {
    message.success('删除成功')
    state.current = backPageNum(state.list, state.current)
    getList()
  }
})
</script>
