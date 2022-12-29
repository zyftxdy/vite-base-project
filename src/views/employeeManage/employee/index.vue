<template>
  <div class="employee content-box">
    <usual-search
      v-model:list-query="queryState.listQuery"
      :search-options="queryState.searchOptions"
      @handleSelect="handleSelect">
      <template #extraBtn>
        <el-button class="btn-big btn-border" :icon="Plus" @click="handleEdit()">添加员工</el-button>
      </template>
    </usual-search>

    <usual-table
      row-key="userId"
      :loading="loading"
      :columns="listState.columns"
      :list="listState.list"
      :total="listState.total"
      v-model:page-num="queryState.listQuery.current"
      v-model:page-size="queryState.listQuery.size"
      @pagination="getList">
      <template #action="{ row }">
        <span v-if="row.adminFlag">--</span>
        <template v-else>
          <el-button link type="primary" @click="handleEdit(row.userId)">编辑</el-button>
          <el-button link type="primary" @click="handleDel(row.userId)">删除</el-button>
        </template>
      </template>
    </usual-table>

    <usual-dialog
      v-model:show="operState.showEdit"
      :title="operState.title"
    >
      <edit-user
        :user-id="operState.userId"
        :role-list="roleList"
        @updateFn="getList"
        @addFn="handleSelect"/>
    </usual-dialog>
  </div>
</template>

<script setup lang="ts">
import { useCommon, useMessage, useRequest } from '@/hooks'
import { setItemList, backPageNum } from '@/utils/mUtils'
import { listQuery, searchOptions, columns } from './enum'
import { Plus } from '@element-plus/icons-vue'
import editUser from './components/editUser.vue'
import type { ListState, QueryState } from '#/base'

const { reqApi, message } = useCommon()
const { messageConfirm } = useMessage()
const queryState = reactive<QueryState>({
  listQuery: listQuery(),
  searchOptions: searchOptions()
})

const { result: roleList } = useRequest<Recordable[]>(() => reqApi.role.roleList({
  current: 1,
  size: 100
}), {
  defaultValue: [],
  immediate: true,
  formatResult: res => res.records,
  onSuccess: res => setItemList(queryState.searchOptions, 'roleId', res.records)
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
const { loading, run: getList } = useRequest(() => reqApi.user.userList(queryState.listQuery), {
  immediate: true,
  onSuccess: res => {
    listState.list = res.records
    listState.total = res.total
  }
})

const operState = reactive({
  userId: '',
  title: '',
  showEdit: false
})
const handleEdit = (id?: string) => {
  operState.userId = id ?? ''
  operState.title = id ? '修改员工' : '添加员工'
  operState.showEdit = true
}
const handleDel = (id: string) => {
  messageConfirm({ message: '确认要删除该员工吗？' })
  .then(() => {
    delUser(id)
  })
}
const { run: delUser } = useRequest(id => reqApi.user.userDel({ userId: id }), {
  onSuccess: () => {
    message.success('删除成功')
    queryState.listQuery.current = backPageNum(listState.list, queryState.listQuery.current)
    getList()
  }
})
</script>
